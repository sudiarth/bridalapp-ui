import log from 'picolog';
import { expect } from 'chai';

import Api, { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote, fetcher } from 'redux-fetch-api';

import StoresApi from './api';

describe('StoresApi', () => {
	it('is a subclass of Api', () => {
		expect(StoresApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let stores = new StoresApi({search:{async:'DONE', filter:{}, results:['Yeah!']}});
		expect(stores).to.be.an.instanceOf(StoresApi);
		expect(stores).to.have.a.property('getState');
		expect(stores.getState()).to.have.a.property('search');
		expect(stores.getState().search).to.have.a.property('async');
		expect(stores.getState().search.async).to.equal(Async.DONE);
		expect(stores.search.done).to.equal(true);
		expect(stores.search.results).to.have.a.property('length');
		expect(stores.search.results.length).to.equal(1);
		expect(stores.search.results[0]).to.equal('Yeah!');
	});

	it('has a nested `search` api', () => {
		let stores = new StoresApi();
		expect(stores).to.have.a.property('search');
	});
});
