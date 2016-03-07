import React, { Component } from 'react';

export default class Products extends Component {
	render() {
		const { children, ...others } = this.props;
		return <div className="Products" {...others} >{children}</div>
	}
}
