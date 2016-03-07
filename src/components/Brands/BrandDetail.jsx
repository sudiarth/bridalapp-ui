import React from 'react';

export default class BrandDetail extends React.Component {
	render() {
		return (
			<div className="BrandDetail">
				{this.props.children}
			</div>
		);
	}
}
