import log from 'picolog';
import React from 'react';
log.debug('React=', React);
import ReactTestUtils from 'react-addons-test-utils';
log.debug('ReactTestUtils=', ReactTestUtils);
import ShallowTestUtils from 'react-shallow-testutils';
log.debug('ShallowTestUtils=', ShallowTestUtils);
import { Provider } from 'react-redux';
log.debug('Provider=', Provider);
import { expect } from 'chai';
log.debug('expect=', expect);

import App from './App';
log.debug('App=', App);
import app, { store }  from '../../app';
log.debug('app=', app);
log.debug('store=', store);

describe('App', () => {

	describe('component', () => {
		it('renders basic app layout containing a navbar, left and right drawers and content', () => {
			const renderer = ReactTestUtils.createRenderer();
			renderer.render(
				<Provider store={store}>
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
