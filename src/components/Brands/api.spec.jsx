import log from 'picolog';
import { expect } from 'chai';

import Api, { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote, fetcher } from 'redux-fetch-api';

import BrandsApi from './api';

describe('BrandsApi', () => {
	it('is a subclass of Api', () => {
		expect(BrandsApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let brands = new BrandsApi({search:{async:'DONE', filter:{}, results:['Yeah!']}});
		expect(brands).to.be.an.instanceOf(BrandsApi);
		expect(brands).to.have.a.property('getState');
		expect(brands.getState()).to.have.a.property('search');
		expect(brands.getState().search).to.have.a.property('async');
		expect(brands.getState().search.async).to.equal(Async.DONE);
		expect(brands.search.done).to.equal(true);
		expect(brands.search.results).to.have.a.property('length');
		expect(brands.search.results.length).to.equal(1);
		expect(brands.search.results[0]).to.equal('Yeah!');
	});

	it('has a nested `search` api', () => {
		let brands = new BrandsApi();
		expect(brands).to.have.a.property('search');
	});
});
