import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, func, shape, any } = PropTypes;
import shallowEqual from 'fbjs/lib/shallowEqual';
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';
import { Icon } from 'react-mdl';

import store from '../../store';
import AppApi from '../App/api'; // explicitly import to facilitate hot-reload
import { indexOf } from '../Entity/Entity';
import FilterPanel from '../Entity/FilterPanel';
import { Badge } from '../Mdl/mdl-extras';
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard';

const ANIMATION_TIME = 510;

function load(params) {
	log.log('load', params);
	return bridalapp.products.search(params)
		.then((results) => {
			log.debug('load: search returned ' + results.length + ' products.');
			return results;
		})
		.catch((error) => {
			log.error('Searching products failed.', error);
			return error;
		});
}

@onload(load)
@connect(bridalapp.products.connector)
export class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		location: shape({
			query: object,
		}).isRequired,
		filter: shape({
			values: object.isRequired,
		}).isRequired,
		items: array.isRequired,
		stockedItems: object.isRequired,
		pending: bool.isRequired,
		error: any,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		item: shape({
			onMayPublish: func.isRequired,
			onPublish: func.isRequired,
			onUnpublish: func.isRequired,
			onLove: func.isRequired,
			onDislike: func.isRequired,
			onUndoRating: func.isRequired,
			onMayToggleStock: func.isRequired,
			onIsStocked: func.isRequired,
			onToggleStock: func.isRequired,
		}).isRequired,
	}

	constructor(...args) {
		super(...args);
		this.state = { removing:{}, filterPanelOpen:false };
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { params, location: { query }, pending, error } = this.props;
		if (pending || error) {load({...query, ...params});}
	}

	componentWillReceiveProps(nextProps) {
		log.debug('componentWillReceiveProps', nextProps);
		const newFilter = {...nextProps.location.query, ...nextProps.params};
		const pathChanged = nextProps.location.pathname !== this.props.location.pathname;
		const queryChanged = !shallowEqual(nextProps.location.query, this.props.location.query);
		if (pathChanged || queryChanged || (nextProps.pending && !this.props.pending)) {
			if (Object.keys(this.state.removing).length > 0) {this.setState({ removing:{} });}
			load(newFilter);
		}
	}

	dislike(product) {
		log.log('dislike', product);
		const pid = product.id.toString();
		if (bridalapp.auth.loggedIn) {
			const removing = { ...this.state.removing };
			removing[pid] = 'disliked';
			this.setState({ ...this.state, removing });
		}
		const timer = new Promise(resolve => setTimeout(()=>resolve(), ANIMATION_TIME));
		return Promise.all([timer, this.props.item.onDislike(product)])
			.then(() => {
				const { items, onItemsChange } = this.props, idx = indexOf(items, product);
				if (idx >= 0) {
					onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
				}
				const removing = { ...this.state.removing };
				delete removing[pid];
				this.setState({...this.state, removing});
			})
	}

	love(product) {
		log.log('love', product);
		const pid = product.id.toString();
		if (bridalapp.auth.loggedIn) {
			const removing = { ...this.state.removing };
			removing[pid] = 'loved';
			this.setState({ ...this.state, removing });
		}
		const timer = new Promise(resolve => setTimeout(()=>resolve(), ANIMATION_TIME));
		return Promise.all([timer, this.props.item.onLove(product)])
			.then(() => {
				const { items, onItemsChange } = this.props, idx = indexOf(items, product);
				if (idx >= 0) {
					onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
				}
				const removing = { ...this.state.removing };
				delete removing[pid];
				this.setState({...this.state, removing});
			})
	}

	undoRating(product) {
		log.log('undoRating', product);
		const pid = product.id.toString();
		if (bridalapp.auth.loggedIn) {
			const removing = { ...this.state.removing };
			removing[pid] = 'undoRating';
			this.setState({ ...this.state, removing });
		}
		const timer = new Promise(resolve => setTimeout(()=>resolve(), ANIMATION_TIME));
		return Promise.all([timer, this.props.item.onUndoRating(product)])
			.then(() => {
				const { items, onItemsChange } = this.props, idx = indexOf(items, product);
				if (idx >= 0) {
					onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
				}
			})
	}

	render() {
		const { params, location, filter, onSearch, pending, error, items, onItemsChange, stockedItems } = this.props;

		log.debug('render', Object.keys(stockedItems).join(' '));
		const item = { ...this.props.item,
			onDislike: this.dislike.bind(this),
			onLove: this.love.bind(this),
			onUndoRating: this.undoRating.bind(this),
		}
		const state = Object.keys(stockedItems).join(' ') + ', ' + Object.keys(this.state.removing).join(' ');
		const filterProps = {onSearch, location, ...filter};
		return (
			<div style={{boxSizing:'border-box', height:'100%'}}>
				<FilterPanel {...filterProps} />
				<Scroller
					className={'ProductBrowser ' + filter.values.category}
					bufferBefore={4}
					items={items}
					itemSize={580}
					bufferAfter={16}
					renderItem ={(product, idx) => {
						const pid = product.id.toString();
						const props = {product, ...item, rating:filter.values.rating, stocked:!!stockedItems[pid],
							removing:this.state.removing[pid], frontLoadDelay: idx < 10 ? 0 : 500, backLoadDelay: idx < 10 ? 0 : 2500};
						return (
							<ProductCard {...props} />
						)
					}}
					state={state}
				/>
			</div>
		);
	}
}
export default ProductBrowser;

@connect(bridalapp.products.connector)
export class ProductBrowserAppBar extends Component {
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
