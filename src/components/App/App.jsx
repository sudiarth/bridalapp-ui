﻿import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, string, object, func, array, shape, any } = PropTypes;
import { Link } from 'react-router';
import { onload } from 'redux-load-api';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, Content, Button, Icon } from 'react-mdl';

import store from '../../store';
const app = store.app;
import { LayoutTitle, Drawer, Lightbox } from '../Mdl/mdl-extras';
import AuthDialog from '../Auth/AuthDialog';

@connect(app.connector)
export class App extends Component {
	static propTypes = {
		auth: shape({
			loggedIn: bool.isRequired,
			challenged: bool.isRequired,
			onProvoke: func,
			onLogin: func,
			onLogout: func,
			onRegister: func,
			onCancel: func,
			user: shape({
				id: any.isRequired,
				name: string.isRequired,
			}),
		}).isRequired,
		stores: shape({
			managedStore: shape({
				id: any.isRequired,
				name: string.isRequired,
				city: string.isRequired,
			}),
		}).isRequired,
		brands: shape({
			managedBrand: shape({
				id: any.isRequired,
				name: string.isRequired,
			}),
		}).isRequired,
		leftDrawer: object,
		rightDrawer: object,
		lightbox: object,
	};

	static childContextTypes = {
		lightbox: shape({
			onOpenLightbox: func.isRequired,
		}).isRequired,
	}

	constructor(props) {
		log.debug('constructor', props);
		super(props);
	}

	getChildContext() {
		const { lightbox } = this.props;
		return { lightbox };
	}

	render() {
		log.debug('render', this.props);
		const { auth, stores, brands, leftDrawer, rightDrawer, lightbox, children } = this.props;
		const { loggedIn, session, onProvoke, onLogout } = auth;
		const profile = auth.loggedIn ? `/profile/${auth.session.user.name}/${auth.session.user.id}` : '';
		return (
			<div className="mdl-layout mdl-layout--fixed-header"><div className="mdl-layout__inner-container">
				<header className="AppBar mdl-layout__header is-casting-shadow">
					<div tabIndex="0" className="mdl-layout__drawer-button" onClick={leftDrawer.onActivate}>
						<i className="material-icons">menu</i>
					</div>

					<div className="mdl-layout__header-row">
						<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />

						<div className="mdl-layout-spacer"></div>

						<Navigation className="RightDrawer">
							<Icon name="account_circle" onClick={rightDrawer.open ? ()=>{} : rightDrawer.onActivate} />
						</Navigation>
					</div>
				</header>

				<Drawer	modal autoClose {...leftDrawer}>
					<LayoutTitle>
						<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />
					</LayoutTitle>
					<Navigation>
						<Link to="/Wedding+Dresses">Wedding Dresses</Link>
						<Link to="/stores">Bridal Stores</Link>
						<Link to="/brands">Bridal Brands</Link>
					</Navigation>
				</Drawer>

				<Drawer right modal autoClose {...rightDrawer}>
					<LayoutTitle>
						<h4>
							{auth.loggedIn
								? <Button className="Logout" colored onClick={auth.onLogout}>Logout</Button>
								: <Button className="Login" colored raised onClick={auth.onProvoke}>Login</Button>
							}
							<Navigation className="Session">
								{auth.loggedIn
									? <Link className="Profile" onClick={e => e.preventDefault()} to={profile}><Icon name="account_circle" /> <span title={session.user.name}>{session.user.name}</span></Link>
									: <b>Not logged in</b>
								}
							</Navigation>
						</h4>
					</LayoutTitle>
					{stores.managedStore || brands.managedBrand ?
						<Navigation className="test">
							{stores.managedStore ? <Link to={`/store/${stores.managedStore.city}/${stores.managedStore.name}`}><Icon name="store" /> {stores.managedStore.name}</Link> : <i className="dummy"></i>}
							{brands.managedBrand ? <Link to={`/brand/${brands.managedBrand.name}`}><Icon name="content_cut" /> {brands.managedBrand.name}</Link> : <i className="dummy"></i>}

						</Navigation>
					:''}

					{auth.loggedIn ? <Navigation>
						<Link to="/loved/Wedding+Dresses"><Icon name="favorite" /> My Favorites</Link>
					</Navigation> : ''}
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
						) : ''}
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
					<LayoutTitle>{auth.loggedIn ?
						<h2>{auth.session.user.name}</h2>
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

export default App;