import log from 'picolog';
import { Api, link } from 'redux-apis';
import { Async } from 'redux-async-api';
import { remote } from 'redux-fetch-api';
import shallowEqual from 'fbjs/lib/shallowEqual';

import { TextfieldApi } from '../Mdl/api';

import { fromJSON, toJSON, indexOf } from '../Entity/Entity';

export class FilterFields extends Api {
	constructor(state) {
		super(state);
		// query field is standard for all entities
		this.q = link(this, new TextfieldApi());
		this.q.type = 'text';
	}
}

export class FilterApi extends Api {
	static INITIAL_STATE = {
		open: false,
		values: {},
	}

	static ACTIVATE = 'ACTIVATE';
	static CANCEL = 'CANCEL';
	static SET_VALUES = 'SET_VALUES';
	static APPLY_FIELDS = 'APPLY_FIELDS';

	constructor(state = FilterApi.INITIAL_STATE) {
		super(state);

		this.setHandler(FilterApi.ACTIVATE, (state) => ({...state, open:true}));
		this.setHandler(FilterApi.CANCEL, (state) => ({...state, open:false}));
		this.setHandler(FilterApi.SET_VALUES, (state, {payload}) => ({...state, values:payload}));
		this.setHandler(FilterApi.APPLY_FIELDS, (state) => {
			let changed = false;
			const values = { ...this.values };
			const keys = Object.keys(this.fields);
			for (let i=0,key; key=keys[i]; i++) {
				if (this.fields[key].value !== values[key]) {
					changed = true;
					values[key] = this.fields[key].value;
				}
			}
			return changed ? {...state, values} : state;
		});

		Object.defineProperties(this, {
			open: {enumerable:true, get:() => this.getState().open},
			values: {enumerable:true, get:() => this.getState().values},
		});
		this.fields = this.createFields();

		this.onActivate = this.activate.bind(this);
		this.onCancel = this.cancel.bind(this);
		this.onApplyFields = this.applyFields.bind(this);
	}

	activate() {
		this.dispatch(this.createAction(FilterApi.ACTIVATE)());
	}

	cancel() {
		this.dispatch(this.createAction(FilterApi.CANCEL)());
	}

	applyFields() {
		this.dispatch(this.createAction(FilterApi.APPLY_FIELDS)());
		return this.values;
	}

	setValues(values) {
		this.dispatch(this.createAction(FilterApi.SET_VALUES)(values));
		Object.keys(this.fields).forEach(key => this.fields[key].setValue(values[key]));
	}

	createFields() {
		return link(this, new FilterFields());
	}
}


@remote
export class EntityApi extends Async {
	static INITIAL_STATE = {
		...Async.INITIAL_STATE,
		items: [],
		itemStates: {},
	}

	static SET_FILTER = 'SET_FILTER';
	static SET_ITEMS = 'SET_ITEMS';
	static SET_ITEM_STATES = 'SET_ITEM_STATES';

	constructor(state = EntityApi.INITIAL_STATE) {
		super(state);

		this.setHandler(EntityApi.SET_FILTER, (state, action) => ({...state, filter: action.payload}));
		this.setHandler(EntityApi.SET_ITEMS, (state, action) => ({...state, items: action.payload}));
		this.setHandler(EntityApi.SET_PROCESSING, (state, action) => ({...state, processing: action.payload}));

		Object.defineProperties(this, {
			items: {enumerable:true, get:() => this.getState().items},
			itemStates: {enumerable:true, get:() => this.getState().itemStates}
		})

		this.onSearch = () => this.search();
		this.onItemsChange = this.setItems.bind(this);
		this.onItemStatesChange = this.setItemStates.bind(this);

		this.item = {
			itemState: this.itemState.bind(this),
			onItemStateChange: this.setItemState.bind(this),
			onItemSave: this.save.bind(this),
		}

		this.filter = this.createFilter();
	}

	itemState(item) {
		return this.items[item.id] || Async.DONE;
	}

	setItemState(item, newState) {
		const newStates = { ...this.itemStates };
		if (newState != DONE) {newStates[item.id] = newState;}
		else {delete newStates[item.id];}
		this.setItemStates(newStates);
		return this;
	}

	save(item) {
		log.log('save', item);
		let result = Promise.resolve(item);
		if (this.itemState(item) !== Async.BUSY) {
			this.itemState(item, Async.BUSY);
			result = this.fetch('', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: toJSON(item),
			})
			.then(response => {
				if (response && response.status == 200) {
					return response.text();
				}
				return response.text().then(text => {
					const error = Error(text);
					error.status = response.status;
					error.statusText = response.statusText;
					throw error;
				});
			})
			.then(text => {
				this.itemState(item, Async.DONE);
				return fromJSON(text);
			})
			.catch(error => {
				this.itemState(item, error);
				throw error;
			});
		}
		return result;
	}

	setItems(items) {
		log.debug('setItems', items);
		this.dispatch(this.createAction(EntityApi.SET_ITEMS)(items));
	}

	setItemStates(itemStates) {
		log.debug('setItemStates', itemStates);
		this.dispatch(this.createAction(EntityApi.SET_ITEM_STATES)(itemStates));
	}


	searchUrl(filter) {
		const keys = Object.keys(filter);
		let result = '';
		for (let i=0,key; key=keys[i]; i++) {
			result += result ? '&' : '?';
			result += encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
		}
		return result;
	}

	search(params) {
		if (params && !shallowEqual(this.filter.values, params)) {this.filter.setValues(params);}
		const url = this.searchUrl(this.filter.values);
		log.log('search', url);
		this.setBusy();
		return new Promise((resolve, reject) => {
			this.fetch(url)
				.then(response => response && response.status === 200
					? response.text()
					: new Promise((ok, err) => {
						response.text().then(text => {
							const error = Error(text);
							error.message = text;
							error.status = response.status;
							error.statusText = response.statusText;
							err(error);
						});
					})
				)
				.then(text => fromJSON(text))
				.then(json => {
					log.debug('search: OK got ' + json.length + ' results');
					this.setItems(json);
					this.setDone();
					return json;
				})
				.then(resolve)
				.catch(error => {
					log.info('search: error=', error);
					this.setError(error);
					reject(error);
				});
		});
	}

	createFilter() {
		return link(this, new FilterApi());
	}
}
export default EntityApi;

