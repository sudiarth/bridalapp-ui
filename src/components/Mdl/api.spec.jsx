import log from 'picolog';
import { expect } from 'chai';

import Api, { link } from 'redux-apis';
import DrawerApi from './api';

describe('DrawerApi', () => {
	it('is a subclass of Api', () => {
		expect(DrawerApi.prototype).to.be.an.instanceOf(Api);
	});

	it('accepts a state slice', () => {
		let drawer = new DrawerApi({open:true});
		expect(drawer).to.be.an.instanceOf(DrawerApi);
		expect(drawer).to.have.a.property('getState');
		expect(drawer.getState()).to.have.a.property('open');
		expect(drawer.getState().open).to.equal(true);
	});

	it('has methods to inspect it\'s state slice', () => {
		let drawer = new DrawerApi();
		expect(drawer).to.have.property('isOpen');
		expect(drawer.isOpen).to.be.a('function');
	});

	it('has methods to dispatch actions to manipulate it\'s state slice', () => {
		let drawer = new DrawerApi();
		expect(drawer).to.have.property('open');
		expect(drawer.open).to.be.a('function');
		expect(drawer).to.have.property('close');
		expect(drawer.close).to.be.a('function');
	});

	describe('isOpen', () => {
		it('returns the value of the property `open` in the state slice', () => {
			let drawer = new DrawerApi({open:true});
			expect(drawer.isOpen()).to.equal(true);
			expect(drawer.isOpen()).to.equal(drawer.getState().open);
			drawer = new DrawerApi({open:false});
			expect(drawer.isOpen()).to.equal(false);
			expect(drawer.isOpen()).to.equal(drawer.getState().open);
		});
	});

	describe('open', () => {
		class TestOpen extends Api {
			constructor(state={}) {
				super(state);
				this.drawer = link(this, new DrawerApi());
			}

			dispatch(action) {
				expect(action).to.be.an('object');
				expect(action).to.have.a.property('type');
				expect(action.type).to.be.a('string');
				expect(action.type).to.contain('/');
				let idx = action.type.indexOf('/');
				let apiPath = action.type.substring(0, idx);
				let apiAction = action.type.substring(idx + 1);
				expect(apiPath).to.equal('drawer');
				expect(apiAction).to.equal('OPEN');
				super.dispatch(action);
			}

			createAction(actionType, payload, ...args) {
				expect(actionType).to.be.a('string');
				expect(actionType).to.equal('drawer/OPEN');
				return super.createAction(actionType, payload, ...args);
			}
		}

		it('creates an action \'OPEN\' and dispatches it to the parent api', () => {
			const test = new TestOpen({drawer: {open:false}});
			expect(test.drawer.isOpen()).to.equal(false);
			test.drawer.open();
		});

		it('results in `isOpen()` returning `true`', () => {
			const test = new TestOpen({drawer: {open:false}});
			test.drawer.open();
			expect(test.drawer.isOpen()).to.equal(true);
		});
	});

	describe('close', () => {
		class TestClose extends Api {
			constructor(state={}) {
				super(state);
				this.drawer = link(this, new DrawerApi());
			}

			dispatch(action) {
				expect(action).to.be.an('object');
				expect(action).to.have.a.property('type');
				expect(action.type).to.be.a('string');
				expect(action.type).to.contain('/');
				let idx = action.type.indexOf('/');
				let apiPath = action.type.substring(0, idx);
				let apiAction = action.type.substring(idx + 1);
				expect(apiPath).to.equal('drawer');
				expect(apiAction).to.equal('CLOSE');
				super.dispatch(action);
			}

			createAction(actionType, payload, ...args) {
				expect(actionType).to.be.a('string');
				expect(actionType).to.equal('drawer/CLOSE');
				return super.createAction(actionType, payload, ...args);
			}
		}

		it('creates an action \'CLOSE\' and dispatches it to the parent api', () => {
			let test = new TestClose({drawer: {open:true}});
			expect(test.drawer.isOpen()).to.equal(true);
			test.drawer.close();
		});

		it('results in `isOpen()` returning `false`', () => {
			let test = new TestClose({drawer: {open:true}});
			test.drawer.close();
			expect(test.drawer.isOpen()).to.equal(false);
		});
	});
});
