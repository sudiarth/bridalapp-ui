import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, func, shape, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Role from '../Auth/Role';
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
@connect((state, props) => ({...props, ...app.products, lightbox:app.lightbox, user:app.auth.user}))
export default class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		items: array.isRequired,
		pending: bool.isRequired,
		error: any,
		onFilterChange: func.isRequired,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		onPublish: func.isRequired,
		onUnpublish: func.isRequired,
		user: object,
	};

	componentDidMount() {
		log.debug('componentDidMount()');
		const { params, pending, error } = this.props;
		if (pending || error) {load(params);}
	}

	mayPublish(item) {
		const { user } = this.props;
		log.trace('mayPublish', user, this);
		if (user) {
			for (let i=0, role; role=user.roles[i]; i++) {
				if (role.equals(Role.BRAUTSCHLOSS_USER) ||
					role.equals(Role.BRAUTSCHLOSS_MANAGER) ||
					role.equals(Role.ADMINISTRATOR)) {
					return true;
				}
			}
		}
		return false;
	}

	render() {
		log.debug('render', this.props);
		const { onPublish, onUnpublish, lightbox, filter, items } = this.props;
		return (
			<Scroller
				className={'ProductBrowser ' + filter.category}
				bufferBefore={8}
				items={items}
				itemSize={580}
				bufferAfter={12}
				renderItem ={ (item, idx) => (
					<ProductCard product={item} {...lightbox}
						mayPublish={this.mayPublish(item)}
						onPublish={onPublish}
						onUnpublish={onUnpublish}
					/>
				)}
			/>
		);
	}
}

