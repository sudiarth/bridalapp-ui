import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { expect } from 'chai';
import Immutable from 'seamless-immutable';

import LayoutTitle from './LayoutTitle';

describe('LayoutTitle', () => {
	const TITLE_CLASS = 'mdl-layout-title';
	const CUSTOM = 'custom';

	describe('component', () => {
		it('renders a `span` with `class` including \'' + TITLE_CLASS + '\'', () => {
			const renderer = ReactTestUtils.createRenderer();
			renderer.render(
				<LayoutTitle>My Title</LayoutTitle>
				,
				{}
			);
			const component = ShallowTestUtils.getMountedInstance(renderer);
			expect(component).to.not.equal(null);
			const markup = renderer.getRenderOutput();
			const elem = ShallowTestUtils.findAllWithType(markup, 'span')[0];
			expect(elem).to.not.equal(null);
			expect(elem).to.have.property('type');
			expect(elem.type).to.equal('span');
			expect(elem).to.have.property('props');
			expect(elem.props).to.have.property('className');
			expect(elem.props.className).to.contains(TITLE_CLASS);
		});
	});

	describe('property', () => {

		describe('`className`', () => {
			it('adds the given class name to the rendered `class` attribute', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutTitle className={CUSTOM}>My Title</LayoutTitle>
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'span')[0];
				expect(elem.props.className).to.contains(CUSTOM);
				expect(elem.props.className).to.contains(TITLE_CLASS);
			});
		});

		describe('`titleClassName`', () => {
			it('replaces the \'' + TITLE_CLASS + '\' class with the given value', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutTitle titleClassName={CUSTOM}>My Title</LayoutTitle>
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'span')[0];
				expect(elem.props.className).to.contains(CUSTOM);
				expect(elem.props.className).to.not.contains(TITLE_CLASS);
			});
		});
	});
});
