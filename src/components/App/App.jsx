import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, object, func, array, shape, any } = PropTypes;
import { Link } from 'react-router';
import { onload } from 'redux-load-api';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, Content, Button } from 'react-mdl';
import { LayoutTitle, Drawer, Lightbox } from '../Mdl/mdl-extras';
//import { Lightbox } from '../Gallery/Lightbox';
import AuthDialog from '../Auth/AuthDialog';
import app from './api';

@connect(app.connector)
export class App extends Component {
	static propTypes = {
		auth: shape({
			loggedIn: bool,
			user: object,
			challenged: bool,
			load: func,
		}),
		leftDrawer: object,
		rightDrawer: object,
		lightbox: object,
	};

	constructor(props) {
		log.debug('constructor', props);
		super(props);
	}

	componentDidMount() {
		log.debug('componentDidMount');
		app.auth.loadUser();
	}

	render() {
		log.debug('render', this.props);
		const { auth, leftDrawer, rightDrawer, lightbox, children } = this.props;
		return (
			<div className="mdl-layout mdl-layout--fixed-header"><div className="mdl-layout__inner-container">
				<header className="AppBar mdl-layout__header is-casting-shadow">
					<div tabIndex="0" className="mdl-layout__drawer-button" onClick={leftDrawer.onActivate}>
						<i className="material-icons">menu</i>
					</div>

					<div className="mdl-layout__header-row">
						<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />

						<div className="mdl-layout-spacer"></div>

						{false ? <Navigation className="ActionBar">
							<p style={{color:'black'}} onClick={()=>{
							}}>{auth.loggedIn && auth.user.name || 'anon'}</p>
						</Navigation> : undefined}

						{false ? <Navigation className="RightDrawer">
							{!rightDrawer.open ? (
								<i className="material-icons" onClick={rightDrawer.onActivate}>account_circle</i>
							) : (
								<span></span>
							)}
						</Navigation> : undefined}
					</div>
				</header>

				<Drawer	modal autoClose {...leftDrawer}>
					<LayoutTitle>
						<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />
					</LayoutTitle>
					<Navigation>
						<Link to="/products">Wedding Dresses</Link>
						<Link to="/stores">Bridal Stores</Link>
						<Link to="/brands">Bridal Brands</Link>
					</Navigation>
				</Drawer>

				<Drawer right modal autoClose {...rightDrawer}>
					<LayoutTitle>{auth.user ?
						<h4>{auth.user.name} <Button onClick={auth.onLogout}>Logout</Button></h4>
						:
						<Button onClick={auth.onProvoke}>Login</Button>
					}</LayoutTitle>
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						<Link to="/stores">Stores</Link>
						<Link to="/brands">Brands</Link>
					</Navigation>
				</Drawer>

				<Content className="main">
					{children}
				</Content>

				<AuthDialog {...auth} />

				<Lightbox noNextOnClick noImageCount {...lightbox} />
			</div></div>
		);
/*			<Layout fixedHeader>
				<LoginDialog open={!!auth.challenge} api={api.auth}/>
				<Header className="AppBar" title="Title">
					<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />
					<Navigation className="ActionBar">
						<p>this.props.appbar</p>
					</Navigation>
					<Navigation className="RightDrawer">
						{!rightDrawer.open ? (
							<i className="material-icons" onClick={()=>api.rightDrawer.open()}>account_circle</i>
						) : (
							<span></span>
						)}
					</Navigation>
				</Header>
				<Drawer api={api.leftDrawer} onClose={()=>api.leftDrawer.close()} open={leftDrawer.open}>
					<LayoutTitle><h2>Title</h2></LayoutTitle>
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						<Link to="/stores">Stores</Link>
						<Link to="/brands">Brands</Link>
					</Navigation>
				</Drawer>
				<Drawer align="right" onClose={()=>api.rightDrawer.close()} open={rightDrawer.open}>
					<LayoutTitle>{auth.user ?
						<h2>{auth.user.name}</h2>
						:
						<Button onClick={() => {
							api.rightDrawer.close();
							api.auth.challenge('/challenge')
						}}>Login</Button>
					}</LayoutTitle>
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/products">Products</Link>
						<Link to="/stores">Stores</Link>
						<Link to="/brands">Brands</Link>
					</Navigation>
				</Drawer>
				<Content className="main">
					<div>{children}</div>
				</Content>
			</Layout>

		);
*/
	}
}

/*
				{auth.challenge ? <div className="LoginDialog">LOGIN DIALOG</div>:''}
				{auth.challenge ? <LayoutObfuscator className="is-visible" onClick={() => {
					log.debug('login dialog obfuscator clicked');
					api.auth.cancel();
				}} /> :''}
*/

export default App;