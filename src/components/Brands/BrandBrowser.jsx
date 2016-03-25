import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, array, func, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Role from '../Auth/Role';
import Scroller from '../Scroller/Scroller';
import Card, { Front, Back } from '../Card/Card';
import BrandCard from './BrandCard'

function load(params) {
	log.log('load', params);
	params && app.brands.setFilter(params);
	return app.brands.search()
		.then(results => {
			log.log('load: search returned ' + results.length + ' brands.');
			return results;
		})
		.catch((error) => {
			log.error('Searching brands failed.', error);
			return error;
		});
}

@onload(load)
@connect((state, props) => ({...props, ...app.brands, lightbox:app.lightbox, user:app.auth.user}))
export default class BrandBrowser extends React.Component {
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
		const { items, lightbox, onPublish, onUnpublish } = this.props;
		return (
			<Scroller
				className={'BrandBrowser '}
				bufferBefore={2}
				items={items}
				bufferAfter={4}
				renderItem ={ (item, idx) => (
					<BrandCard brand={item} {...lightbox}
						mayPublish={this.mayPublish(item)}
						onPublish={onPublish}
						onUnpublish={onUnpublish}
					/>
				)}
			/>
		);
	}
}
