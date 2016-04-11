import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import { Role } from '../Auth/Role';
import { authenticated } from '../Auth/api';
import { PublicationApi } from '../Publication/api';
import { fromJSON, toError } from '../Entity/Entity';
import Store from './Store';

@remote
@authenticated
export class StoresApi extends PublicationApi {
	static INITIAL_STATE = {
		...PublicationApi.INITIAL_STATE,
		managedStores: [],
		managedStoreIndex: 0,
	}

	static SET_MANAGED_STORES = 'SET_MANAGED_STORES';
	static SET_MANAGED_STORE_INDEX = 'SET_MANAGED_STORE_INDEX';

	constructor(state = StoresApi.INITIAL_STATE) {
		super(state);

		this.setHandler(StoresApi.SET_MANAGED_STORES, (state, {payload}) => ({...state, managedStores:payload}));
		this.setHandler(StoresApi.SET_MANAGED_STORE_INDEX, (state, {payload}) => ({...state, managedStoreIndex:payload}));

		Object.defineProperties(this, {
			managedStores: {enumerable:true, get:() => this.getState().managedStores},
			managedStoreIndex: {enumerable:true, get:() => this.getState().managedStoreIndex},
			managedStore: {enumerable:true, get:() => this.managedStores[this.managedStoreIndex]},
		});

		Object.defineProperties(this.item, {
			mayImpersonate: {enumerable:true, get:() => this.auth.is(Role.ADMINISTRATOR) || this.auth.isAny(Role.BRAUTSCHLOSS_ROLES)},
			onImpersonate: {enumerable:true, value:this.impersonate.bind(this)},
		});
	}

	setManagedStores(stores) {
		return this.dispatch(this.createAction(StoresApi.SET_MANAGED_STORES)(stores));
	}

	setManagedStoreIndex(index) {
		return this.dispatch(this.createAction(StoresApi.SET_MANAGED_STORE_INDEX)(index));
	}

	loadManagedStores() {
		log.debug('loadManagedStores');
		return this.fetch('/managed')
			.then(response => response && response.status === 200
				? response.text()
				: response.text().then(text => toError(text))
			)
			.then(text => fromJSON(text))
			.then(json => {
				log.debug('loadManagedStores: OK got ' + json.length + ' results');
				this.setManagedStores(json);
				log.debug('loadManagedStores: this.managedStores=', this.managedStores);
				return json;
			})
			.catch(error => {
				log.error('loadManagedStores: error=', error);
			});
	}

	impersonate(store) {
		this.setManagedStores([store]);
		this.setManagedStoreIndex(0);
		this.getParent().products.loadStock(this.managedStore);
	}
}
export default StoresApi;