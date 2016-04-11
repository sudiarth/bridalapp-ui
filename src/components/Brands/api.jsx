import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import PublicationApi from '../Publication/api';
import Brand from './Brand';

@remote
export class BrandsApi extends PublicationApi {
	static INITIAL_STATE = {
		...PublicationApi.INITIAL_STATE,
		managedBrands: [],
		managedBrandIndex: 0,
	}

	static SET_MANAGED_BRANDS = 'SET_MANAGED_BRANDS';
	static SET_MANAGED_BRAND_INDEX = 'SET_MANAGED_BRAND_INDEX';

	constructor(state = BrandsApi.INITIAL_STATE) {
		super(state);

		this.setHandler(BrandsApi.SET_MANAGED_BRANDS, (state, {payload}) => ({...state, managedBrands:payload}));
		this.setHandler(BrandsApi.SET_MANAGED_BRAND_INDEX, (state, {payload}) => ({...state, managedBrandIndex:payload}));

		Object.defineProperties(this, {
			managedBrands: {enumerable:true, get:() => this.getState().managedBrands},
			managedBrandIndex: {enumerable:true, get:() => this.getState().managedBrandIndex},
			managedBrand: {enumerable:true, get:() => this.managedBrands[this.managedBrandIndex]},
		});
	}

	setManagedBrands(brands) {
		return this.dispatch(this.createAction(BrandsApi.SET_MANAGED_BRANDS)(brands));
	}

	setManagedBrandIndex(index) {
		return this.dispatch(this.createAction(BrandsApi.SET_MANAGED_BRAND_INDEX)(index));
	}
}
export default BrandsApi;