import { expect } from 'chai';
import Api from 'redux-apis';

import { AppApi } from './api';

describe('AppApi', () => {
	it('is a subclass of Api', () => {
		expect(AppApi.prototype).to.be.an.instanceOf(Api);
	});
});
