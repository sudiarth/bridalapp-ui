import log from 'picolog';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { RootApi } from 'redux-apis';
import { expect } from 'chai';

import App from './App';
import AppApi from './api';

var app = new RootApi(AppApi, createStore);
log.debug('app=', app);
log.debug('app.store=', app.store);

describe('App', () => {

	describe('component', () => {
		it('renders basic app layout containing a navbar, left and right drawers and content', () => {
			const renderer = ReactTestUtils.createRenderer();
			renderer.render(
				<Provider store={app.store}>
					<App>TEST</App>
				</Provider>
				,
				{}
			);
			const component = ShallowTestUtils.getMountedInstance(renderer);
			expect(component).to.not.equal(null);
		});
	});
});
