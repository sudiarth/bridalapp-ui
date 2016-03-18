import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, func, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard';


function load(params) {
	log.log('load', params);
	const { category } = params;
	if (category) {
		app.products.search.setFilter({...app.products.search.filter, category:category});
	}
	return app.products.search.search()
		.then((results) => {
			log.log('load: search returned ' + results.length + ' products.');
			return results;
		})
		.catch((error) => {
			log.error('Searching products failed.', error);
			return error;
		});
}

@onload(load)
@connect((state, props) => ({
	...props,
	...app.products.search,
	lightbox: app.lightbox,
	mayPublish: app.auth.mayPublish,
}))
export default class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any,
		mayPublish: bool,
		onFilter: func,
		onSearch: func,
		onResults: func,
	};

	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	publish(product, idx) {
		const { mayPublish, results, onResults } = this.props;
		if (mayPublish && !product.published) {
			const newProduct = product.clone();
			newProduct.published = 1;
			newProduct.rollback = product;
			newResults = [ ...results ];
			newResults[idx] = newProduct;
			onResults(newResults);
		}
	}

	unpublish(product, idx) {
	}

	render() {
		log.debug('render', this.props);
		const { mayPublish, lightbox, filter, results } = this.props;
		return (
			<Scroller
				className={'ProductBrowser ' + filter.category}
				bufferBefore={8}
				items={results}
				itemSize={580}
				bufferAfter={12}
				renderItem ={ (item, idx) => (
					<ProductCard
						mayPublish={mayPublish}
						onPublish={() => {log.info('Publish clicked')}}
						onUnpublish={() => {log.info('Unpublish clicked')}}
						product={item}
						{...lightbox}
					/>
				)}
			/>
		);
	}
}

