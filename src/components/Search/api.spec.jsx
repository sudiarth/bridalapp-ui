import log from 'picolog';
import { expect } from 'chai';

import Api, { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote, fetcher } from 'redux-fetch-api';

import SearchApi from './api';

describe('SearchApi', () => {
	it('is a subclass of Api', () => {
		expect(SearchApi.prototype).to.be.an.instanceOf(Api);
	});

	it('is a subclass of Async', () => {
		expect(SearchApi.prototype).to.be.an.instanceOf(Async);
	});

	it('accepts a state slice', () => {
		let search = new SearchApi({
			async: Async.PENDING,
			filter: {},
			results: [],
		});
		expect(search).to.be.an.instanceOf(SearchApi);
		expect(search).to.have.a.property('getState');
		expect(search.getState()).to.have.a.property('async');
		expect(search.getState().async).to.equal(Async.PENDING);
		expect(search.getState()).to.have.a.property('results');
		expect(search.getState().results).to.have.a.property('length');
		expect(search.getState().results.length).to.equal(0);
	});

	it('has methods to inspect it\'s state slice', () => {
		let search = new SearchApi();
		expect(search).to.have.property('results');
		expect(search.results).to.be.a('function');
	});

	it('has methods to dispatch actions to manipulate it\'s state slice', () => {
		let search = new SearchApi();
		expect(search).to.have.property('search');
		expect(search.search).to.be.a('function');
	});

	describe('results', () => {
		it('returns the value of the property `results` in the state slice', () => {
			let search = new SearchApi({results:[]});
			expect(search.results()).to.equal(search.getState().results);
		});
	});

	describe('search', () => {
		let dispatched = 0;
		let promise = null;
		let fetched = [];
		function fetch(url) {
			fetched.push(url);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
						return resolve({
							status: 200,
							json:()=>[
								{id:1, name:'A result', description:'woot woot!'},
								{id:2, name:'Another result', description:'Yay!'},
								{id:3, name:'And another', description:'Yeah!'},
							],
						})
					},
					0
				)
			});
		}
		@remote
		@fetcher(fetch)
		class TestSearch extends Api {
			constructor(state) {
				super(state);
				this.search = link(this, new SearchApi());
			}
			dispatch(action) {
				log.info('DISPATCH:', action);
				dispatched++;
				return super.dispatch(action);
			}
		}
		const test = new TestSearch().init();
		expect(dispatched).to.equal(1);

		it('creates and dispatches an action \'SEARCH\'', () => {
			expect(test.search.busy()).to.equal(false);
			promise = test.search.search();
			expect(dispatched >= 2);
		});

		it('results in `.busy()` returning `true`', () => {
			expect(test.search.busy()).to.equal(true);
		});

		it('results in `.done()` returning `false`', () => {
			expect(test.search.done()).to.equal(false);
		});

		it('returns a promise', () => {
			log.info('promise=', promise);
			expect(promise).to.not.equal(null);
			expect(promise.then).to.be.a('function');
		});

		it('results in `.busy()` returning `false` when the promise fulfills', (done) => {
			promise
				.then(() => {
					expect(test.search.busy()).to.equal(false);
					done();
				})
				.catch(done);

		});

		it('results in `.done()` returning `true` when the promise fulfills', (done) => {
			promise
				.then(() => {
					expect(test.search.done()).to.equal(true);
					done();
				})
				.catch(done);
		});


		it('results in `.results()` returning the search results when the promise fulfills', (done) => {
			promise
				.then(() => {
					expect(test.search.results().length).to.equal(3);
					done();
				})
				.catch(done);
		});

	});
});
