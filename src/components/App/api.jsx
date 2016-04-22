import log from 'picolog';
import Api, { link } from 'redux-apis';
import { remote, endpoint, fetcher } from 'redux-fetch-api';
import Suid from 'ws.suid';

import { Role } from '../Auth/Role';
import { Group } from '../Auth/Group';
import { Account } from '../Auth/Account';
import { AuthApi } from '../Auth/api';
import { Brand } from '../Brands/Brand';
import { BrandsApi } from '../Brands/api';
import { Product } from '../Products/Product';
import { Rating } from '../Products/Rating';
import { StockItem } from '../Products/StockItem';
import { ProductsApi } from '../Products/api';
import { Store } from '../Stores/Store';
import { StoresApi } from '../Stores/api';
import { DrawerApi, LightboxApi } from '../Mdl/api';

const API_URL = apiUrl();
log.info('Using BridalApp API Server url: ', API_URL);
let idx, lastSlash = 0;
while ((idx = API_URL.indexOf('/', lastSlash + 1)) !== -1) {lastSlash = idx;}
const SUID_URL = API_URL.substring(0, lastSlash) + '/suid/suid.json';
log.info('Using Suid Server url: ', SUID_URL);
Suid.config({server: SUID_URL});

// override the default fetcher with one that does a cross-origin (CORS) request and has a timeout
@fetcher(authenticatedCrossOriginFetchWithTimeout)
@remote(API_URL)
export class AppApi extends Api {
	static INITIAL_STATE = {
		managedStores: [],
		managedStoreIndex: 0,
		managedBrands: [],
		managedBrandIndex: 0,
	}

	static SET_MANAGED_STORES = 'SET_MANAGED_STORES';
	static SET_MANAGED_STORE_INDEX = 'SET_MANAGED_STORE_INDEX';
	static SET_MANAGED_BRANDS = 'SET_MANAGED_BRANDS';
	static SET_MANAGED_BRAND_INDEX = 'SET_MANAGED_BRAND_INDEX';

	constructor(state = AppApi.INITIAL_STATE) {
		super(state);

		Object.defineProperties(this, {
			Account: 	{enumerable:true, value:Account},
			Brand: 		{enumerable:true, value:Brand},
			Group: 		{enumerable:true, value:Group},
			Product: 	{enumerable:true, value:Product},
			Rating: 	{enumerable:true, value:Rating},
			Role: 		{enumerable:true, value:Role},
			StockItem: 	{enumerable:true, value:StockItem},
			Store: 		{enumerable:true, value:Store},
		});

		this.auth = remote('/auth')(
			link(this, new AuthApi())
		);

		this.brands = remote('/brands')(
			link(this, new BrandsApi())
		);

		this.products = remote('/products')(
			link(this, new ProductsApi())
		);

		this.stores = remote('/stores')(
			link(this, new StoresApi())
		);

		this.leftDrawer = link(this, new DrawerApi());
		this.rightDrawer = link(this, new DrawerApi());
		this.lightbox = link(this, new LightboxApi());
	}

	authenticated() {
		log.debug('authenticated');
		return this.auth.authenticated();
	}

	getSession() {
		return this.auth.session;
	}
}

// A version of fetch that sets cors headers and intercepts 401 Unauthorized responses.
// J2EE servers will, after a succesful login, send a 302 redirect with the original url.
// This function capitalizes on that to do transparent interception
function authenticatedCrossOriginFetchWithTimeout(url, opts) {
	log.log('authenticatedCrossOriginFetchWithTimeout', url);
	opts = {credentials:'include', mode:'cors', ...opts};

	if (typeof global == 'object' && global.session) {
		opts.headers = opts.headers || {};
		opts.headers['Cookie'] = 'JSESSIONID=' + global.session;
	}
	const result = new Promise((resolve, reject)=>{
		const timeout = setTimeout(() => {reject(Error(`timed out after 30s.`))}, 30000);
		log.debug('authenticatedCrossOriginFetchWithTimeout: fetching...');
		fetch(url, opts)
			.then(response => {
				clearTimeout(timeout);
				log.debug('authenticatedCrossOriginFetchWithTimeout: got response ', response);
				if (response.status && response.status === 401) {
					// auth needed
					log.debug('authenticatedCrossOriginFetchWithTimeout: auth needed');
					if (typeof window == 'object') {
						log.debug('authenticatedCrossOriginFetchWithTimeout: client, allow login');
						// client, allow user to login
						return response.json()
							.then(json => {
								log.debug('authenticatedCrossOriginFetchWithTimeout: calling auth.challenge...');
								return this.auth.challenge(json.challenge, resolve, reject)
							})
							.catch(reject);
					}
					// server, reject with error
					return response.text().then(text => {
						const error = Error(text);
						error.status = response.status;
						error.statusText = response.statusText;
						reject(error);
					})
				}
				resolve(response);
			})
			.catch(reject);
	});
	return result;
}

function apiUrl() {
	if (typeof window == 'object') {
		return window.__bridalapp_api_server || 'http://api.bridalapp.net/api';
	}
	const protocol = process.env.BRIDALAPP_API_SERVER_PROTOCOL || 'http://';
	const host = process.env.BRIDALAPP_API_SERVER_HOST || 'localhost';
	const port = process.env.BRIDALAPP_API_SERVER_PORT || '8080';
	const path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
	return protocol + host + (port == '80' ? '' : ':' + port) + path;
}
