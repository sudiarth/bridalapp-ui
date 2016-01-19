import log from 'picolog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
log.assert(connect !== undefined, 'connect is undefined');

import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/Layout';
log.assert(Layout !== undefined, 'Layout is undefined');
log.assert(Header !== undefined, 'Header is undefined');
log.assert(Navigation !== undefined, 'Navigation is undefined');
log.assert(Drawer !== undefined, 'Drawer is undefined');
log.assert(Content !== undefined, 'Content is undefined');

import RightDrawer, { LayoutTitle, LayoutObfuscator } from '../RightDrawer';
log.assert(RightDrawer !== undefined, 'RightDrawer is undefined');
log.assert(LayoutTitle !== undefined, 'LayoutTitle is undefined');
log.assert(LayoutObfuscator !== undefined, 'LayoutObfuscator is undefined');

class App extends Component {
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
						<p onClick={function(){alert('WTF');}}>this.props.appbar</p>
					</Navigation>
					<Navigation>
						{!this.props.rightDrawer.open ? (
							<i className="material-icons" onClick={()=>log.info('click!')}>account_circle</i>
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


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)


//export default App;