import Api, { link } from 'redux-apis';
import { remote, endpoint } from 'redux-fetch-api';

import DrawerApi   from '../RightDrawer/api';
import BrandsApi   from '../Brands/api';
import ProductsApi from '../Products/api';

let API_URL = '/api';
if (typeof process != 'undefined') {
	const host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
	const port = process.env.OPENSHIFT_NODEJS_PORT || '80';
	const path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
	API_URL = 'http://' + host + (port === '80' ? '' : ':' + port) + path;
}

@remote(API_URL)
export class AppApi extends Api {
	constructor(state) {
		super(state);
		this.rightDrawer = link(this, new DrawerApi());
		this.brands = link(this, new BrandsApi());
		this.products = link(this, new ProductsApi());
	}

	reducer(state, action) {
		return super.reducer(state, action);
	}

}

export const app = new AppApi();
export default app;
