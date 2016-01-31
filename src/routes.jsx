import log from 'picolog';
import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App/App';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductBrowser from './components/Products/ProductBrowser';
import Brands from './components/Brands/Brands';
import BrandBrowser from './components/Brands/BrandBrowser';

export const routes = (
	<Route component={App}>
		<Route path="/" component={Home} />
		<Route path="/products" component={Products} >
			<IndexRedirect to="/products/Wedding+Dresses" />
			<Route path=":category" component={ProductBrowser} />
		</Route>
		<Route path="/brands" component={Brands} >
			<IndexRedirect to="/brands/all" />
			<Route path="all" component={BrandBrowser} />
		</Route>
	</Route>
);

export default routes;
