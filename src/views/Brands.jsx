import React from 'react';

export default class Brands extends React.Component {
	render() {
		return (
			<div>
				<h1>Brands</h1>
				<p>Here you should be able to browse through all brands.</p>
			</div>
		);
	}
}

class BrandsActionBar extends React.Component {
	render() {
		return (
			<div className="ActionBar BrandsActionBar">BrandsActionBar</div>
		);
	}
}

Brands.BrandsActionBar = BrandsActionBar;
