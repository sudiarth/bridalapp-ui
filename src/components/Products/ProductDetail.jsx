import React from 'react';

export default class Products extends React.Component {
	render() {
		return (
			<div className="Products">
				{this.props.children}
			</div>
		);
	}
}
