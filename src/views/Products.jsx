import React from 'react';

export default class Products extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="Products">
				{this.props.children}
			</div>
		);
	}
}
