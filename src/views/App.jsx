import log from 'picolog';
import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, HeaderRow, HeaderTabs, Drawer, Content } from 'react-mdl/lib/Layout';
import RightDrawer from '../components/RightDrawer';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			rightDrawerOpen: false
		};
		this.rightDrawerToggle = this.rightDrawerToggle.bind(this); 
	}
	rightDrawerToggle() {
		this.setState({
			rightDrawerOpen: !this.state.rightDrawerOpen
		});
	}
	render() {
		log.warn("appbar=" + this.props.appbar);
		log.warn("main=" + this.props.main);
//		let main = React.cloneElement(this.props.children, {
//            initialData: this.props.initialData
//        })
		return (
			<Layout fixedHeader fixedDrawer>
				<Header title="Title">
					<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/0.9.14/bridalapp/logo-bridalapp.png" />
					<Navigation className="ActionBar">
						{this.props.appbar}
					</Navigation>
					<Navigation>
						<i className="material-icons" onClick={this.rightDrawerToggle}>account_circle</i>
					</Navigation>
				</Header>
				<RightDrawer title="Right!" className={this.state.rightDrawerOpen ? 'is-visible' : ''}>
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						<Link to="/stores">Stores</Link>
						<Link to="/brands">Brands</Link>
					</Navigation>
				</RightDrawer>
				<Drawer title="Title">
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						<Link to="/stores">Stores</Link>
						<Link to="/brands">Brands</Link>
					</Navigation>
				</Drawer>
				<Content className="main">
					{this.props.main}
				</Content>
				<div className={'mdl-layout__obfuscator ' + (this.state.rightDrawerOpen ? 'is-visible' : '')} onClick={this.rightDrawerToggle}></div>
			</Layout>
		);
	}
}

/*
App.contextTypes = {
	history: React.PropTypes.object
};
*/