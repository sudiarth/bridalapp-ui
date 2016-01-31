import log from 'picolog';
import { expect } from 'chai';
import Api, { link } from 'redux-apis';

import SearchApi from '../Search/api';
import ProductsApi, { ProductSearch } from './api';

describe('ProductSearch', () => {
	const test = new ProductSearch({...SearchApi.INITIAL_STATE, filter: {a:'test', category:'cat'}});

	it('is a subclass of SearchApi', () => {
		expect(ProductSearch.prototype).to.be.an.instanceOf(SearchApi);
	});

	it('accepts a state slice', () => {
		expect(test.pending()).to.equal(true);
		expect(test.filter().a).to.equal('test');
		expect(test.filter().category).to.equal('cat');
	});

	it('has overridden `url(filter)`', () => {
		expect(test.url).to.equal(ProductSearch.prototype.url);
		expect(test.url).to.not.equal(SearchApi.prototype.url);
	});

	describe('url(filter)', () => {
		it('returns a custom search url', () => {
			const url = test.url(test.filter());
			expect(url).to.equal('/cat?a=test');
		});
	});

});

describe('ProductsApi', () => {
	it('is a subclass of Api', () => {
		expect(ProductsApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let products = new ProductsApi({search:{async:'DONE', filter:{}, results:['Yeah!']}});
		expect(products).to.be.an.instanceOf(ProductsApi);
		expect(products).to.have.a.property('getState');
		expect(products.getState()).to.have.a.property('search');
		expect(products.getState().search).to.have.a.property('async');
		expect(products.getState().search.async).to.equal('DONE');
		expect(products.search.done()).to.equal(true);
		expect(products.search.results()).to.have.a.property('length');
		expect(products.search.results().length).to.equal(1);
		expect(products.search.results()[0]).to.equal('Yeah!');
	});

	it('has a nested `search` api', () => {
		let products = new ProductsApi();
		expect(products).to.have.a.property('search');
	});

	it('has a nested `search` api that extends `ProductSearch`', () => {
		let products = new ProductsApi();
		expect(products.search).to.be.an.instanceOf(ProductSearch);
	});
});
