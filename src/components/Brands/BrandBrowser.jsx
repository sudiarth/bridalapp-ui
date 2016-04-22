import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, array, func, shape, any } = PropTypes;
import shallowEqual from 'fbjs/lib/shallowEqual';
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';
import { Icon } from 'react-mdl';

import store from '../../store';
import AppApi from '../App/api'; // explicitly import to facilitate hot-reload

import FilterPanel from '../Entity/FilterPanel';
import { Badge } from '../Mdl/mdl-extras';
import Scroller from '../Scroller/Scroller';
import BrandCard from './BrandCard'

function load(params) {
	log.log('load', params);
	return bridalapp.brands.search(params)
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
@connect(bridalapp.brands.connector)
export class BrandBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		location: shape({
			query: object,
		}).isRequired,
		filter: shape({
			values: object.isRequired,
		}).isRequired,
		items: array.isRequired,
		pending: bool.isRequired,
		error: any,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		item: shape({
			onMayPublish: func.isRequired,
			onPublish: func.isRequired,
			onUnpublish: func.isRequired,
		}).isRequired,
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	componentWillReceiveProps(nextProps) {
		log.debug('componentWillReceiveProps', nextProps);
		const newFilter = {...nextProps.location.query, ...nextProps.params};
		const pathChanged = nextProps.location.pathname !== this.props.location.pathname;
		const queryChanged = !shallowEqual(nextProps.location.query, this.props.location.query);
		if (pathChanged || queryChanged || (nextProps.pending && !this.props.pending)) {
			load(newFilter);
		}
	}

	render() {
		log.debug('render', this.props);
		const { params, location, filter, onSearch, pending, error, items, onItemsChange, stockedItems, item } = this.props;
		const filterProps = {onSearch, location, ...filter};

		return (
			<div style={{boxSizing:'border-box', height:'100%'}}>
				<FilterPanel {...filterProps} />
				<Scroller
					className={'BrandBrowser '}
					bufferBefore={2}
					items={items}
					bufferAfter={4}
					renderItem ={(brand, idx) => {
						const props = {brand, ...item, frontLoadDelay: idx < 10 ? 0 : 500, backLoadDelay: idx < 10 ? 0 : 2500};
						return (
							<BrandCard {...props} />
						)
					}}
				/>
			</div>
		);
	}
}
export default BrandBrowser;

@connect(bridalapp.brands.connector)
export class BrandBrowserAppBar extends Component {
	static propTypes = {
		filter: shape({
			open: bool.isRequired,
			onActivate: func.isRequired,
			onCancel: func.isRequired,
		}).isRequired,
		items: array.isRequired,
	}

	constructor(...args) {
		super(...args);
		this.filterClicked = this.filterClicked.bind(this);
	}

	filterClicked(event) {
		log.log('filterClicked', event);
		if (event) {event.preventDefault();}
		const { open, onActivate, onCancel } = this.props.filter;
		open ? onCancel() : onActivate();
	}

	render() {
		return (
			<Badge className="mdl-navigation__link" text={'' + this.props.items.length} onClick={this.filterClicked}>
				<Icon name="search" />
			</Badge>
		)
	}
}
