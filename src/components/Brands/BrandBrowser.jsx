import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, array, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import app from '../App/api';
import Scroller from '../Scroller/Scroller';
import Card, { Front, Back } from '../Card/Card';
import BrandCard from './BrandCard'

function load(filter) {
	filter && app.brands.search.setFilter(filter);
	return app.brands.search.search()
		.catch((error) => {
			log.error('Searching stores failed.', error);
		});
}

@onload(params => load(params))
@connect((state, props) => ({...props, lightbox:app.lightbox, ...app.brands.search}))
export default class BrandBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any,
	}


	componentDidMount() {
		log.log('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params)}
	}

	render() {
		const { results, lightbox } = this.props;
		return (
			<Scroller
				className={'BrandBrowser '}
				bufferBefore={2}
				items={results}
				bufferAfter={4}
				renderItem ={ (item, idx) => (
					<BrandCard brand={item} {...lightbox} />
				)}
			/>
		);
	}
}
