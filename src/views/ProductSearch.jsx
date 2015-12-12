import log from 'picolog';
import React from 'react';
import ProductBrowser from './ProductBrowser';

export default class ProductSearch extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<ProductBrowser className={this.props.params.category} category={this.props.params.category} />
		);
	}
}

export class ProductSearchActionBar extends React.Component {
	render() {
		return (
			<div className="ActionBar ProductSearchActionBar">ProductSearchActionBar</div>
		);
	}
}

