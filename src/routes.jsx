import log from 'picolog';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/App/App';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductBrowser from './components/Products/ProductBrowser';
import ProductEdit from './components/Products/ProductEdit';
import ProductDetails from './components/Products/ProductDetails';
import Brands from './components/Brands/Brands';
import BrandBrowser from './components/Brands/BrandBrowser';
import Stores from './components/Stores/Stores';
import StoreBrowser from './components/Stores/StoreBrowser';

export const routes = (
	<Route path="/" component={App}>
		<IndexRedirect to="/Wedding+Dresses" />
		<Route path="/brands" component={Brands} >
			<IndexRoute component={BrandBrowser} />
		</Route>
		<Route path="/stores" component={Stores} >
			<IndexRoute component={StoreBrowser} />
		</Route>
		<Route component={Products} >
			<Route path="/:rating/:category" component={ProductBrowser} />
			<Route path="/:category" component={ProductBrowser} />
		</Route>
	</Route>
);

export default routes;
