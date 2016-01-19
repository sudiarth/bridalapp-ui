import log from 'picolog';
import Api from 'redux-apis';
import fetch from 'isomorphic-fetch';

import ApiClient from '../../api-client';

export default class BrandsApi extends Api {
	constructor(state) {
		super(state);
		this.addHandler('SEARCH', (action) => ({
			...this.state,
			filter: action.payload,
			loading: true,
		}));
		this.addHandler('SEARCH_SUCCESS', (action) => {
			return {
				...this.state,
				results: action.payload,
				loading: false,
				loaded: true,
			};
		});
		this.addHandler('SEARCH_ERROR', (action) => {
			log.error('Error searching for brands: ', action.payload, action.payload.stack);
			return {
				...this.state,
				results: [],
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
	}

	initialState() {
		return {
			loading: false,
			loaded: false,
			filter: {
			},
			results: [],
		};
	}

	search(filter) {
		// dispatch a function... redux-thunk will execute the function
		let dispatchResult = this.dispatch((dispatch, getState) => {
			this.dispatch(this.createAction('SEARCH')(filter));
			return ApiClient.fetch(`/brands/search`)
				.then(response => {
					if (response.status === 200) {return response.json();}
					else throw new Error('Not Found.');
				})
				.then(json => {
					return this.dispatch(this.createAction('SEARCH_SUCCESS')(json))
				})
				.catch(error => {
					return this.dispatch(this.createAction('SEARCH_ERROR')(error))
				});
		});
		return dispatchResult;
	}

	results() {
		return this.state.results;
	}
}
