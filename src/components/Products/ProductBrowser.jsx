import log from 'picolog';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import app from '../App/api';
import Scroller from '../Scroller/Scroller';
import ProductCard from './ProductCard'

@onload((params) => {
	const filter = app.products.search.filter();
	app.products.search.setFilter({...filter, category:params.category});
	return app.products.search.search().catch((error) => {log.error('ProductBrowser@onload: Searching products failed:', error);});
})
@connect(app.products.search.connector)
export default class ProductBrowser extends React.Component {
	static propTypes = {
		async: PropTypes.any.isRequired,
		filter: PropTypes.object.isRequired,
		results: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}

	getState(props) {
		let items = this.state && this.state.items || props.results;
		let itemCount = this.state && this.state.itemCount || props.itemCount || (props.results && props.results.length);
		return {
			items: items || [],
			itemCount: itemCount || items && items.length || 0
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps));
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.mounted = true;
		this.setState(this.getState(this.props));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	flipCard(component, event) {

	}

	render() {
		return (
			<Scroller
				className={'ProductBrowser ' + this.props.category}
				direction="vertical"
				bufferBefore={2}
				items={this.state.items}
				bufferAfter={4}
				itemCount={this.state.itemCount}
				itemSize={480}
				itemsPer={1}
				renderItem ={ (item, idx) => (
					<ProductCard product={item} />
				)}
			/>
		);
	}
}

