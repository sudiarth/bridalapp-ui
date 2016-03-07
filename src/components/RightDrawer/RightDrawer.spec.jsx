import log from 'picolog';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { expect } from 'chai';

import RightDrawer from './RightDrawer';

describe('RightDrawer', () => {
	const VISIBLE = 'is-visible'
	const MDL_DRAWER = 'mdl-layout__drawer';
	const MDL_DRAWER_RIGHT = 'mdl-layout__drawer-right';
	const CUSTOM = 'custom';

	describe('component', () => {
		it('renders a `div` with classes \'' + MDL_DRAWER + '\' and \'' + MDL_DRAWER_RIGHT + '\'', () => {
			const renderer = ReactTestUtils.createRenderer();
			renderer.render(
				<RightDrawer />
				,
				{}
			);
			const component = ShallowTestUtils.getMountedInstance(renderer);
			expect(component).to.not.equal(null);
			const markup = renderer.getRenderOutput();
			const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
			expect(div).to.not.equal(null);
			expect(div).to.have.property('type');
			expect(div.type).to.equal('div');
			expect(div).to.have.property('props');
			expect(div.props).to.have.property('className');
			expect(div.props.className).to.contains(MDL_DRAWER);
			expect(div.props.className).to.contains(MDL_DRAWER_RIGHT);
		});
	});

	describe('property', () => {

		describe('`className`', () => {
			it('adds the given class name to the rendered `class` attribute', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer className={CUSTOM}/> , {}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.contains(CUSTOM);
				expect(div.props.className).to.contains(MDL_DRAWER);
				expect(div.props.className).to.contains(MDL_DRAWER_RIGHT);
			});
		});

		describe('`drawerClassName`', () => {
			it('replaces the default drawer classes with the given value', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer drawerClassName={CUSTOM} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.contains(CUSTOM);
				expect(div.props.className).to.not.contains(MDL_DRAWER);
				expect(div.props.className).to.not.contains(MDL_DRAWER_RIGHT);
			});
			it('combines with `className`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer drawerClassName={CUSTOM} className="custom2" />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.contains(CUSTOM);
				expect(div.props.className).to.contains('custom2');
			});
		});

		describe('`open`', () => {
			it('adds \'is-visible\' to the `class` when set to `true`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer open={true} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.contains(VISIBLE);
			});
			it('does not add \'is-visible\' to the `class` when set to `false`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer open={false} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.not.contains(VISIBLE);
			});
			it('defaults to `false`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.not.contains(VISIBLE);
			});
		});

		describe('`visibleClassName`', () => {
			it('replaces \'is-visible\' with the given value', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<RightDrawer open={true} visibleClassName={CUSTOM} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const div = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(div.props.className).to.contains(CUSTOM);
			});
		});
	});
});


