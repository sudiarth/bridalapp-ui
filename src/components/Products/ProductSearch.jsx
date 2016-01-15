import log from 'picolog';
import React from 'react';
import ProductBrowser from './ProductBrowser';

export default class ProductSearch extends React.Component {
	render() {
		return (
			<ProductBrowser category={this.props.params.category} />
		);
	}
}
