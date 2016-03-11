import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import SearchApi from '../Search/api';

@remote
export class StoresApi extends Api {
	constructor(state) {
		super(state);
		this.search = link(this, new SearchApi())
	}
}
export default StoresApi;