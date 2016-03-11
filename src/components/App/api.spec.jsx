import { expect } from 'chai';
import Api from 'redux-apis';

import { AppApi } from './api';
// import DrawerApi from '../../components/RightDrawer/api';

describe('AppApi', () => {
	it('is a subclass of Api', () => {
		expect(AppApi.prototype).to.be.an.instanceOf(Api);
	});
/*
	it('is the type of instance returned by `api`', () => {
		expect(app).to.be.an.instanceOf(AppApi);
	});
	it('instances have a property `rightDrawer` which is an instance of Drawer', () => {
		expect(app).to.have.a.property('rightDrawer');
		expect(app.rightDrawer).to.be.an.instanceOf(Drawer);
	});
*/
});
