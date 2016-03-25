import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import PublicationApi from '../Publication/api';
import Store from './Store';

@remote
export class StoresApi extends PublicationApi {
	static INITIAL_STATE = {
		...PublicationApi.INITIAL_STATE,
	}
	constructor(state) {
		super(state);
	}
}
export default StoresApi;