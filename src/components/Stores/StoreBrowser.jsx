import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, func, array, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import StoreCard from './StoreCard'

function load(params) {
	log.log('load', params);
	params && app.stores.setFilter(params);
	return app.stores.search()
		.then(results => {
			log.log('load: search returned ' + results.length + ' stores.');
			return results;
		})
		.catch((error) => {
			log.error('Searching stores failed.', error);
			return error;
		});
}

@onload(load)
@connect(app.stores.connector)
export default class StoreBrowser extends React.Component {
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
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	render() {
		log.debug('render', this.props);
		const { items, onMayPublish, onPublish, onUnpublish } = this.props;
		return (
			<Scroller
				className="StoreBrowser"
				bufferBefore={4}
				items={items}
				bufferAfter={8}
				renderItem ={ (item, idx) => (
					<StoreCard store={item}
						onMayPublish={onMayPublish}
						onPublish={onPublish}
						onUnpublish={onUnpublish}
					/>
				)}
			/>
		);
	}
}
