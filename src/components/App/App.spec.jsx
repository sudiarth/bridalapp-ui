import { expect } from 'chai';
import log from 'picolog';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Api from 'redux-apis';

import store from '../../store';
const app = store.app;
import App from './App';

log.debug('app=', app);

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
