import log from 'picolog';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import { expect } from 'chai';
import Immutable from 'seamless-immutable';

import LayoutObfuscator from './LayoutObfuscator';

describe('LayoutObfuscator', () => {
	const OBFUSCATOR_CLASS = 'mdl-layout__obfuscator';
	const VISIBLE_CLASS = 'is-visible';
	const CUSTOM = 'custom';

	describe('component', () => {
		it('renders a `div` with `class` including \'' + OBFUSCATOR_CLASS + '\'', () => {
			const renderer = ReactTestUtils.createRenderer();
			renderer.render(
				<LayoutObfuscator />
				,
				{}
			);
			const component = ShallowTestUtils.getMountedInstance(renderer);
			expect(component).to.not.equal(null);
			const markup = renderer.getRenderOutput();
			const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
			expect(elem).to.not.equal(null);
			expect(elem).to.have.property('type');
			expect(elem.type).to.equal('div');
			expect(elem).to.have.property('props');
			expect(elem.props).to.have.property('className');
			expect(elem.props.className).to.contains(OBFUSCATOR_CLASS);
		});
	});

	describe('property', () => {

		describe('`className`', () => {
			it('adds the given class name to the rendered `class` attribute', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator className={CUSTOM} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.contains(CUSTOM);
				expect(elem.props.className).to.contains(OBFUSCATOR_CLASS);
			});
		});

		describe('`obfuscatorClassName`', () => {
			it('replaces the \'' + OBFUSCATOR_CLASS + '\' class with the given value', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator obfuscatorClassName={CUSTOM} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.contains(CUSTOM);
				expect(elem.props.className).to.not.contains(OBFUSCATOR_CLASS);
			});
		});

		describe('`visible`', () => {
			it('adds the \'' + VISIBLE_CLASS + '\' class when set to `true`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator visible={true} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.contains(VISIBLE_CLASS);
			});
			it('removes the \'' + VISIBLE_CLASS + '\' class when set to `false`', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator visible={false} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.not.contains(VISIBLE_CLASS);
			});
			it('defaults to `false`.', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.not.contains(VISIBLE_CLASS);
			});
		});

		describe('`visibleClassName`', () => {
			it('replaces the \'' + VISIBLE_CLASS + '\' class with the given value', () => {
				const renderer = ReactTestUtils.createRenderer();
				renderer.render(
					<LayoutObfuscator visibleClassName={CUSTOM} visible={true} />
					,
					{}
				);
				const markup = renderer.getRenderOutput();
				const elem = ShallowTestUtils.findAllWithType(markup, 'div')[0];
				expect(elem.props.className).to.contains(CUSTOM);
			});
		});
	});
});
