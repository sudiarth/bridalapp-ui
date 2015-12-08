import log from 'picolog';
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './views/App';
import Home, { HomeActionBar } from './views/Home';
import Products from './views/Products';
import ProductSearch, { ProductSearchActionBar } from './views/ProductSearch';
import Stores, { StoresActionBar } from './views/Stores';
import Brands, { BrandsActionBar } from './views/Brands';

export default (
	<Route component={App}>
		<Route path="/" components={{main:Home, appbar:HomeActionBar}} />
		<Route path="/products" components={{main:Products, appbar:ProductSearchActionBar}} >
			<IndexRedirect to="/products/search/Wedding+Dresses" />
			<Route path="search/:category" component={ProductSearch} />
		</Route>
		<Route path="/stores" components={{main:Stores, appbar:StoresActionBar}} />
		<Route path="/brands" components={{main:Brands, appbar:BrandsActionBar}} />
	</Route>
);
