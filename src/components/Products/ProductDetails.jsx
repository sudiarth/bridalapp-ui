import React from 'react';

export default class ProductDetails extends React.Component {
	render() {
		return (
			<div className="ProductDetails">
				{this.props.children}
			</div>
		);
	}
}
