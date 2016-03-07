import React, { Component } from 'react';

export default class Brands extends Component {
	render() {
		const { children, ...others } = this.props;
		return <div className="Brands" {...others}>{children}</div>
	}
}
