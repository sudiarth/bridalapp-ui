import log from 'picolog';
import { expect } from 'chai';

import Api from 'redux-apis';
import ProductsApi from './api';

describe('ProductsApi', () => {
	it('is a subclass of Api', () => {
		expect(ProductsApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let products = new ProductsApi({
			loading: true,
			loaded: false,
			filter: {
				category: 'Wedding+Dresses',
			},
			results: ['one result! yay'],
		});
		expect(products).to.be.an.instanceOf(ProductsApi);
		expect(products).to.have.a.property('state');
		expect(products.state).to.have.a.property('loading');
		expect(products.state.loading).to.equal(true);
		expect(products.state).to.have.a.property('results');
		expect(products.state.results).to.have.a.property('length');
		expect(products.state.results.length).to.equal(1);
	});

	it('has methods to inspect it\'s state slice', () => {
		let products = new ProductsApi();
		expect(products).to.have.property('results');
		expect(products.results).to.be.a('function');
	});

	it('has methods to dispatch actions to manipulate it\'s state slice', () => {
		let products = new ProductsApi();
		expect(products).to.have.property('search');
		expect(products.search).to.be.a('function');
	});

	describe('results', () => {
		it('returns the value of the property `results` in the state slice', () => {
			let products = new ProductsApi({results:[]});
			expect(products.results()).to.equal(products.state.results);
		});
	});

	describe('search', () => {
		let dispatched = false;
		let promise = null;
		class TestProducts extends Api {
			constructor(state) {
				super(state);
				this.sub('products', ProductsApi);
			}
			dispatch(action) {
				log.info('DISPATCH:', action);
				dispatched = true;
				return super.dispatch(action);
			}
		}
		const test = new TestProducts();
		test.dispatch(test.createAction('INIT')());
		dispatched = false;

		it('creates and dispatches an action \'SEARCH\'', () => {
			expect(test.products.state.loading).to.equal(false);
			expect(test.products.state.filter.category).to.equal('Wedding+Dresses');
			promise = test.products.search({category: 'Wedding+Dresses'});
			expect(dispatched).to.equal(true);
		});

		it('results in the `loading` flag being set to `true`', () => {
			expect(test.products.state.loading).to.equal(true);
		});

		it('results in the `filter` options being set to the given values', () => {
			expect(test.products.state.filter.category).to.equal('Wedding+Dresses');
		});

		it('returns a promise', () => {
			log.info('promise=', promise);
			expect(promise).to.not.equal(null);
			expect(promise.then).to.be.a('function');
		});

		it('sets the `loading` flag to `false` when the promise resolves', () => {
			promise.then(() => {
				expect(test.products.state.loading).to.equal(false);
			});
		});
	});
});
