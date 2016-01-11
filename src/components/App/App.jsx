import log from 'picolog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl/lib/Layout';
import RightDrawer, { LayoutTitle, LayoutObfuscator } from '../RightDrawer';

log.debug('connect=%s, Layout=%s, Header=%s, Navigation=%s, Drawer=%s, Content=%s, RightDrawer=%s, LayoutTitle=%s, LayoutObfuscator=%s',
		connect, Layout, Header, Navigation, Drawer, Content, RightDrawer, LayoutTitle, LayoutObfuscator)

class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		rightDrawer: PropTypes.shape({
			open: PropTypes.bool.isRequired
		})
	};

	constructor(props) {
		super(props);
		this.closeRightDrawer = this.closeRightDrawer.bind(this);
		this.openRightDrawer = this.openRightDrawer.bind(this);
	}

	closeRightDrawer() {
		app.rightDrawer.close();
	}

	openRightDrawer() {
		log.info('clicked man!');
		app.rightDrawer.open();
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

/*

			<Layout fixedHeader fixedDrawer>
				<Header title="Title">
					<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/0.9.14/bridalapp/logo-bridalapp.png" />
					<Navigation className="ActionBar">
						<p>this.props.appbar</p>
					</Navigation>
					<Navigation>
						{!this.props.rightDrawer.open ? (
							<i className="material-icons" onClick={()=>app.rightDrawer.open()}>account_circle</i>
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


*/



// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)


//export default App;