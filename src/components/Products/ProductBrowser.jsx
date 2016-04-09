import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, array, object, func, shape, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import { fromJSON, toJSON, indexOf } from '../Entity/Entity';
import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard';

const ANIMATION_TIME = 510;

function load(params) {
	log.info('load', params);
	app.products.setFilter({...params});
	return app.products.search()
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
@connect(app.products.connector)
export default class ProductBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		location: shape({
			query: object,
		}).isRequired,
		filter: object.isRequired,
		items: array.isRequired,
		stockedItems: object.isRequired,
		pending: bool.isRequired,
		error: any,
		onFilterChange: func.isRequired,
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
		this.state = { removing:{} };
	}

	componentDidMount() {
		log.debug('componentDidMount()');
		const { params, location: { query }, pending, error } = this.props;
		if (pending || error) {load({...query, ...params});}
	}

	componentWillReceiveProps(nextProps) {
		log.debug('componentWillReceiveProps', nextProps);
		if (nextProps.location.pathname !== this.props.location.pathname || nextProps.pending || nextProps.error) {
			this.setState({ removing:{} });
			load({...nextProps.location.query, ...nextProps.params});
		}
	}

	dislike(product) {
		log.log('dislike', product);
		const pid = product.id.toString();
		if (app.auth.loggedIn) {
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
		if (app.auth.loggedIn) {
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
		if (app.auth.loggedIn) {
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
		log.info('render', this.props, this.state);
		const { filter, items, stockedItems, item: { onIsStocked } } = this.props;
		const item = { ...this.props.item,
			onDislike: this.dislike.bind(this),
			onLove: this.love.bind(this),
			onUndoRating: this.undoRating.bind(this),
		}
		return (
			<Scroller
				className={'ProductBrowser ' + filter.category}
				bufferBefore={4}
				items={items}
				itemSize={580}
				bufferAfter={16}
				renderItem ={(product, idx) => {
					const pid = product.id.toString();
					const frontLoadDelay = idx < 10 ? 0 : 500;
					return (
						<ProductCard product={product} rating={filter.rating} stocked={onIsStocked(product)} {...item}
								removing={this.state.removing[pid]} frontLoadDelay={frontLoadDelay} />
					)
				}}
				state={'' + this.state.removing + JSON.stringify(stockedItems)}
			/>
		);
	}
}

