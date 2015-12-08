import React from 'react';

export default class Home extends React.Component {
	render() {
		return (
			<div style={{backgroundColor:'green', color:'white'}}>
				<h1>Home</h1>
				<p>Top-level product categories, news, featured products etc.</p>
			</div>
		);
	}
}

class HomeActionBar extends React.Component {
	render() {
		return (
			<div className="ActionBar HomeActionBar">HomeActionBar</div>
		);
	}
}

Home.HomeActionBar = HomeActionBar;
