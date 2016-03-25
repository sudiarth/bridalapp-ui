import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, func, array, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Role from '../Auth/Role';
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
@connect((state, props) => ({
	...props,
	...app.stores.connector(),
	user: app.auth.user,
}))
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
		onPublish: func.isRequired,
		onUnpublish: func.isRequired,
		user: object,
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
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
		const { items, onPublish, onUnpublish } = this.props;
		return (
			<Scroller
				className="StoreBrowser"
				bufferBefore={4}
				items={items}
				bufferAfter={8}
				renderItem ={ (item, idx) => (
					<StoreCard store={item}
						mayPublish={this.mayPublish(item)}
						onPublish={onPublish}
						onUnpublish={onUnpublish}
					/>
				)}
			/>
		);
	}
}
