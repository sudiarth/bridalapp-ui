import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import PublicationApi from '../Publication/api';
import Brand from './Brand';

@remote
export class BrandsApi extends PublicationApi {
	static INITIAL_STATE = {
		...PublicationApi.INITIAL_STATE,
	}
	constructor(state = BrandsApi.INITIAL_STATE) {
		super(state);
	}
}
export default BrandsApi;