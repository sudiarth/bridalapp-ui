import log from 'picolog';
import { expect } from 'chai';

import Api from 'redux-apis';
import BrandsApi from './api';

describe('BrandsApi', () => {
	it('is a subclass of Api', () => {
		expect(BrandsApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let brands = new BrandsApi({
			loading: true,
			loaded: false,
			filter: {
				category: 'Wedding+Dresses',
			},
			results: ['one result! yay'],
		});
		expect(brands).to.be.an.instanceOf(BrandsApi);
		expect(brands).to.have.a.property('state');
		expect(brands.state).to.have.a.property('loading');
		expect(brands.state.loading).to.equal(true);
		expect(brands.state).to.have.a.property('results');
		expect(brands.state.results).to.have.a.property('length');
		expect(brands.state.results.length).to.equal(1);
	});

	it('has methods to inspect it\'s state slice', () => {
		let brands = new BrandsApi();
		expect(brands).to.have.property('results');
		expect(brands.results).to.be.a('function');
	});

	it('has methods to dispatch actions to manipulate it\'s state slice', () => {
		let brands = new BrandsApi();
		expect(brands).to.have.property('search');
		expect(brands.search).to.be.a('function');
	});

	describe('results', () => {
		it('returns the value of the property `results` in the state slice', () => {
			let brands = new BrandsApi({results:[]});
			expect(brands.results()).to.equal(brands.state.results);
		});
	});

	describe('search', () => {
		let dispatched = false;
		let promise = null;
		class TestProducts extends Api {
			constructor(state) {
				super(state);
				this.sub('brands', BrandsApi);
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
			expect(test.brands.state.loading).to.equal(false);
			expect(test.brands.state.filter.category).to.equal('Wedding+Dresses');
			promise = test.brands.search({category: 'Wedding+Dresses'});
			expect(dispatched).to.equal(true);
		});

		it('results in the `loading` flag being set to `true`', () => {
			expect(test.brands.state.loading).to.equal(true);
		});

		it('results in the `filter` options being set to the given values', () => {
			expect(test.brands.state.filter.category).to.equal('Wedding+Dresses');
		});

		it('returns a promise', () => {
			log.info('promise=', promise);
			expect(promise).to.not.equal(null);
			expect(promise.then).to.be.a('function');
		});

		it('sets the `loading` flag to `false` when the promise resolves', () => {
			promise.then(() => {
				expect(test.brands.state.loading).to.equal(false);
			});
		});
	});
});
