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
	}

	static SET_FILTER = 'SET_FILTER';
	static SET_RESULTS = 'SET_RESULTS';

	constructor(state = SearchApi.INITIAL_STATE) {
		super(state);
		this.setHandler(SearchApi.SET_FILTER, (state, action) => ({...state, filter: action.payload}));
		this.setHandler(SearchApi.SET_RESULTS, (state, action) => ({...state, results: action.payload}));
		Object.defineProperty(this, 'filter', {enumerable:true, get:() => this.getState().filter});
		Object.defineProperty(this, 'results', {enumerable:true, get:() => this.getState().results});
		Object.defineProperty(this, 'onFilter', {enumerable:true, value:() => this.setFilter.bind(this)});
		Object.defineProperty(this, 'onSearch', {enumerable:true, value:() => this.search.bind(this)});
		Object.defineProperty(this, 'onResults', {enumerable:true, value:() => this.setResults.bind(this)});
	}

	setFilter(filter) {
		return this.dispatch(this.createAction(SearchApi.SET_FILTER)(filter));
	}

	setResults(results) {
		this.dispatch(this.createAction(SearchApi.SET_RESULTS)(results));
	}

	url(filter) {
		const keys = Object.keys(filter);
		let result = '';
		for (let i=0,key; key=keys[i]; i++) {
			result += result ? '&' : '?';
			result += encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
		}
		return result;
	}

	search() {
		const url = this.url(this.filter);
		log.log('search: fetching ', url);
		this.setBusy();
		return new Promise((resolve, reject) => {
			this.fetch(url)
				.then(response => {
					log.log('search: got response with status ', response.status);
					if (response && response.status === 200) {
						return response.json();
					}
					else {
						log.log('search: Got an error response ', response.status, response.statusText);
						return new Promise((ok, err) => {
							response.text().then(text => {
								log.log('search: ', response.status, text);
								const error = Error(text);
								error.status = response.status;
								error.statusText = response.statusText;
								err(error);
							});
						});
					}
				})
				.then(json => {
					log.log('search: OK got ' + json.length + ' results');
					this.setDone();
					this.setResults(json);
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
export default SearchApi;