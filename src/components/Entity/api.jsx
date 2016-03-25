import log from 'picolog';
import { Api, link } from 'redux-apis';
import { Async } from 'redux-async-api';
import { remote } from 'redux-fetch-api';

import { fromJSON, toJSON, indexOf } from '../Entity/Entity';

@remote
export class EntityApi extends Async {
	static INITIAL_STATE = {
		...Async.INITIAL_STATE,
		filter: {},
		items: [],
		itemStates: {}
	}

	static SET_FILTER = 'SET_FILTER';
	static SET_ITEMS = 'SET_ITEMS';
	static SET_ITEM_STATES = 'SET_ITEM_STATES';

	constructor(state = EntityApi.INITIAL_STATE) {
		super(state);
		this.setHandler(EntityApi.SET_FILTER, (state, action) => ({...state, filter: action.payload}));
		this.setHandler(EntityApi.SET_ITEMS, (state, action) => ({...state, items: action.payload}));
		this.setHandler(EntityApi.SET_PROCESSING, (state, action) => ({...state, processing: action.payload}));
		Object.defineProperty(this, 'filter', {enumerable:true, get:() => this.getState().filter});
		Object.defineProperty(this, 'items', {enumerable:true, get:() => this.getState().items});
		Object.defineProperty(this, 'itemStates', {enumerable:true, get:() => this.getState().itemStates});
		Object.defineProperty(this, 'itemState', {enumerable:true, value: this.itemState.bind(this)});
		Object.defineProperty(this, 'onFilterChange', {enumerable:true, value:this.setFilter.bind(this)});
		Object.defineProperty(this, 'onSearch', {enumerable:true, value:this.search.bind(this)});
		Object.defineProperty(this, 'onItemsChange', {enumerable:true, value:this.setItems.bind(this)});
		Object.defineProperty(this, 'onItemStatesChange', {enumerable:true, value:this.setItemStates.bind(this)});
		Object.defineProperty(this, 'onItemStateChange', {enumerable:true, value:this.setItemState.bind(this)});
		Object.defineProperty(this, 'onItemSave', {enumerable:true, value:this.save.bind(this)});
	}

	itemState(item, newState) {
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

	setFilter(filter) {
		log.debug('setFilter', filter);
		return this.dispatch(this.createAction(EntityApi.SET_FILTER)(filter));
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

	search() {
		const url = this.searchUrl(this.filter);
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
}
export default EntityApi;

