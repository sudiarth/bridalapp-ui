import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, string, object, func, array, shape, any } = PropTypes;
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Content, Button, Icon } from 'react-mdl';

import { LayoutTitle, Drawer, Sprite, Lightbox } from '../Mdl/mdl-extras';
import SessionPanel from '../Auth/SessionPanel';
import AuthDialog from '../Auth/AuthDialog';
import store from '../../store';
import AppApi from './api';

@connect(bridalapp.connector)
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
		appbarComponent: any,
		mainComponent: any,
	};

	static childContextTypes = {
		lightbox: shape({
			onOpenLightbox: func.isRequired,
		}).isRequired,
	}

	getChildContext() {
		return { lightbox: bridalapp.lightbox };
	}

	render() {
		log.debug('render', this.props);
		const { auth, stores:{managedStore}, brands:{managedBrand}, leftDrawer, rightDrawer, lightbox, className, appbarComponent, mainComponent } = this.props;
		log.log('render: appbarComponent=', appbarComponent);

		const logo = 'https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png';
		return (
			<div className="mdl-layout mdl-layout--fixed-header">
				<div className="mdl-layout__inner-container">

					<header className="AppBar mdl-layout__header is-casting-shadow">
						<div tabIndex="0" className="mdl-layout__drawer-button" onClick={leftDrawer.onActivate}><Icon name="menu" /></div>
						<div className="mdl-layout__header-row">
							<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />
							<div className="mdl-layout-spacer"></div>
							<Navigation className="ContextActions">{appbarComponent}</Navigation>
							<Navigation className="RightDrawer"><Icon name="account_circle" onClick={rightDrawer.onActivate} /></Navigation>
						</div>
					</header>

					<Drawer	modal autoClose {...leftDrawer}>
						<LayoutTitle><img className="logo" src={logo} alt="BridalApp" /></LayoutTitle>
						<Navigation>
							<Link to="/Wedding+Dresses"><Sprite name="bridal-dress" /> Wedding Dresses</Link>
							<Link to="/stores"><Icon name="store" /> Bridal Stores</Link>
							<Link to="/brands"><Icon name="content_cut" /> Bridal Brands</Link>
						</Navigation>
					</Drawer>

					<Drawer right modal autoClose {...rightDrawer}>
						<LayoutTitle><SessionPanel {...auth} /></LayoutTitle>
						{managedStore || managedBrand ? <Navigation>
							{managedStore ? <Link to={`/store/${managedStore.city}/${managedStore.name}`}><Icon name="store" /> {managedStore.name}</Link> : <i/>}
							{managedBrand ? <Link to={`/brand/${managedBrand.name}`}><Icon name="content_cut" /> {managedBrand.name}</Link> : <i/>}
						</Navigation> : ''}
						{auth.loggedIn ? <Navigation>
							<Link to="/loved/Wedding+Dresses"><Icon name="favorite" /> My Favorites</Link>
						</Navigation> : ''}
					</Drawer>

					<Content className="main">{mainComponent}</Content>

					<AuthDialog {...auth} />
					<Lightbox noNextOnClick noImageCount {...lightbox} />
				</div>
			</div>
		)
	}
}

export default App;