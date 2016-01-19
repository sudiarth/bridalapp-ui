import React from 'react';

export default class Brands extends React.Component {
	render() {
		return (
			<div className="Brands">
				{this.props.children}
			</div>
		);
	}
}
