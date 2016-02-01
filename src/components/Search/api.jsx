import log from 'picolog';
import { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote } from 'redux-fetch-api';


@remote
export class SearchApi extends Async {
	static INITIAL_STATE = {
		...Async.INITIAL_STATE,
		filter: {},
		results:[],
	};

	constructor(state = SearchApi.INITIAL_STATE) {
		super(state);
		this.setHandler('SET_FILTER', (state, action) => ({...state, filter: action.payload}));
		this.setHandler('SET_RESULTS', (state, action) => ({...state, results: action.payload}));
	}

	filter() {return this.getState().filter;}
	setFilter(filter) {return this.dispatch(this.createAction('SET_FILTER')(filter));}

	results() {return this.getState().results;}
	setResults(results) {return this.dispatch(this.createAction('SET_RESULTS')(results));}

	url(filter) {
		const keys = Object.keys(filter);
		let result = '';
		for (let key of keys) {
			result += result ? '&' : '?';
			result += encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
		}
		return result;
	}

	search() {
		log.warn('SEARCH: Dispatching search function...');
		// dispatch a function... redux-thunk will execute the function
		return this.dispatch(() => {
			log.warn('SEARCH: Executing search function...');
			const url = this.url(this.filter());
			this.setBusy();
			log.warn('SEARCH: Fetching ', url);
			return this.fetch(url)
				.then(response => {
					log.warn('SEARCH: Got response with status ', response.status);
					if (response.status === 200) {
						return response.json();
					}
					else {
						log.warn('SEARCH: Got an error response ', response.status, response.statusText);
						return new Promise((resolve, reject) => {
							response.text().then(text => {
								log.warn('SEARCH: ERROR ', response.status, text);
								const error = Error(text);
								error.status = response.status;
								error.statusText = response.statusText;
								reject(error);
							});
						});
					}
				})
				.then(json => {
					log.warn('SEARCH: OK got ' + json.length + ' results');
					this.setDone();
					return this.setResults(json);
				})
				.catch(error => {
					log.warn('SEARCH: ERROR error=', error);
					return this.setError(error);
				});
		});
	}
}
export default SearchApi;