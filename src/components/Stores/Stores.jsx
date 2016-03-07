import React, { Component } from 'react';

export default class Stores extends Component {
	render() {
		const { children, ...others } = this.props;
		return <div className="Stores" {...others}>{children}</div>
	}
}
