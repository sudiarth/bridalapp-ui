import log from 'picolog';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/App/App';
import Home from './components/Home/Home';
import ProductBrowser, { ProductBrowserAppBar } from './components/Products/ProductBrowser';
// import ProductEdit from './components/Products/ProductEdit';
// import ProductDetails from './components/Products/ProductDetails';
import BrandBrowser, { BrandBrowserAppBar } from './components/Brands/BrandBrowser';
// import Stores from './components/Stores/Stores';
import StoreBrowser, { StoreBrowserAppBar } from './components/Stores/StoreBrowser';
// import StoreDetails from './components/Stores/StoreDetails';
// import { LayoutTest, ComponentA, ComponentB } from './components/Layout/Layout';

export const routes = (
	<Route path="/" component={App}>

		// redirect to 'Wedding Dresses' for the time being
		// until we get a decent homepage
		<IndexRedirect to="/Wedding+Dresses" />

		<Route path="/brands" 				components={{appbarComponent: BrandBrowserAppBar,		mainComponent: BrandBrowser}} />
		<Route path="/stores" 				components={{appbarComponent: StoreBrowserAppBar,		mainComponent: StoreBrowser}} />

		// products are mounted at the root, but you must always specify
		// a category, so as long as category names do not conflict with
		// root paths, this will work.
		// so don't create a category 'stores'  :)
		// TODO, probably if we hardcode the only two ratings,
		// 'loved' and 'disliked', we will open up more options
		// for short URLs, such as
		// '/:category/:country'
		// '/:category/:country/:city'
		<Route path="/:rating/:category"	components={{appbarComponent: ProductBrowserAppBar,		mainComponent: ProductBrowser}} />
		<Route path="/:category"			components={{appbarComponent: ProductBrowserAppBar,		mainComponent: ProductBrowser}} />
	</Route>
);

/*
		<Route path="/layout" component={LayoutTest}>
			<IndexRedirect to="/layout/a" />
			<Route path="a" component={ComponentA} />
			<Route path="b" component={ComponentB} />
		</Route>

		// we start with all routes that are not mounted at the root
		// so they will be matched before the products section,
		// which is mounted at the root.
		<Route path="/brands" component={Brands} >
			<IndexRoute component={BrandBrowser} />
		</Route>

		<Route path="/stores" component={Stores} >
			// not implemented yet
			<Route path=":city/:name" component={ProductDetails} />

			<IndexRoute component={StoreBrowser} />
		</Route>

		// products are mounted at the root, but you must always specify
		// a category, so as long as category names do not conflict with
		// root paths, this will work.
		// so don't create a category 'stores'  :)
		<Route component={Products} >
			// TODO, probably if we hardcode the only two ratings,
			// 'loved' and 'disliked', we will open up more options
			// for short URLs, such as
			// '/:category/:country'
			// '/:category/:country/:city'
			<Route path="/:rating/:category" component={ProductBrowser} />
			<Route path="/:category" component={ProductBrowser} />
		</Route>
*/

export default routes;
