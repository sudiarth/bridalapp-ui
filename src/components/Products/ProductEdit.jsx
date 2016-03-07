import React from 'react';

export default class ProductEdit extends React.Component {
	render() {
		return (
			<div className="ProductEdit" style={{height:'100%', width:'100%', boxSizing:'border-box'}}>
				{this.props.children}
			</div>
		);
	}
}
