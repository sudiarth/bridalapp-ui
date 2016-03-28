import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, func, shape, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard';

function load(params) {
	log.log('load', params);
	app.products.setFilter({...app.products.filter, ...params});
	return app.products.search()
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
@connect(app.products.connector)
export default class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		filter: object.isRequired,
		items: array.isRequired,
		pending: bool.isRequired,
		error: any,
		onFilterChange: func.isRequired,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		onMayPublish: func.isRequired,
		onPublish: func.isRequired,
		onUnpublish: func.isRequired,
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { params, pending, error } = this.props;
		if (pending || error) {load(params);}
	}

	render() {
		log.debug('render', this.props);
		const { onMayPublish, onPublish, onUnpublish, filter, items } = this.props;
		return (
			<Scroller
				className={'ProductBrowser ' + filter.category}
				bufferBefore={8}
				items={items}
				itemSize={580}
				bufferAfter={12}
				renderItem ={ (item, idx) => (
					<ProductCard product={item}
						onMayPublish={onMayPublish}
						onPublish={onPublish}
						onUnpublish={onUnpublish}
					/>
				)}
			/>
		);
	}
}

