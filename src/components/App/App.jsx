import log from 'picolog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/Layout';

import RightDrawer from '../RightDrawer/RightDrawer';
import LayoutTitle from '../RightDrawer/LayoutTitle';
import LayoutObfuscator from '../RightDrawer/LayoutObfuscator';
import app from './api';

@connect(app.connector)
export class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		rightDrawer: PropTypes.shape({
			open: PropTypes.bool.isRequired,
		}),
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout fixedHeader fixedDrawer>
				<Header title="Title">
					<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/0.9.14/bridalapp/logo-bridalapp.png" />
					<Navigation className="ActionBar">
						<p>this.props.appbar</p>
					</Navigation>
					<Navigation>
						{!this.props.rightDrawer.open ? (
							<i className="material-icons" onClick={()=>{this.props.api.rightDrawer.open();}}>account_circle</i>
						) : (
							<span></span>
						)}
					</Navigation>
				</Header>
				<RightDrawer open={this.props.rightDrawer.open}>
					<LayoutTitle>Right!</LayoutTitle>
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
					<div>{this.props.children}</div>
				</Content>
				<LayoutObfuscator visible={this.props.rightDrawer.open} onClick={()=>app.rightDrawer.close()} />
			</Layout>

		);
	}
}

export default App;