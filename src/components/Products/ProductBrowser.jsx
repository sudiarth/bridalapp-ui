import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import app from '../App/api';
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard';


function load(params) {
	log.log('load', params);
	const { category } = params;
	if (category) {
		app.products.search.setFilter({...app.products.search.filter, category:category});
	}
	return app.products.search.search()
		.catch((error) => {
			log.error('Searching products failed:', error);
		});
}

@onload(params => load(params))
@connect((state, props) => ({...props, lightbox:app.lightbox, ...app.products.search}))
export default class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any,
	};

	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	render() {
		log.debug('render', this.props);
		const { lightbox, filter, results } = this.props;
		return (
			<Scroller
				className={'ProductBrowser ' + filter.category}
				bufferBefore={8}
				items={results}
				itemSize={580}
				bufferAfter={12}
				renderItem ={ (item, idx) => (
					<ProductCard product={item} {...lightbox} />
				)}
			/>
		);
	}
}

