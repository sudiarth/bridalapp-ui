import log from 'picolog';
import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// Use require so we can hot-reload individual components
var App = require('./components/App').default;
var Home = require('./components/Home').default;
var Products = require('./components/Products').default;
var ProductBrowser = require('./components/Products/ProductBrowser').default;
var Brands = require('./components/Brands').default;
var BrandBrowser = require('./components/Brands/BrandBrowser').default;

log.assert(typeof App == 'function', 'App should be a function');
log.assert(typeof Home == 'function', 'Home should be a function');
log.assert(typeof Products == 'function', 'Product should be a function');
log.assert(typeof ProductBrowser == 'function', 'ProductBrowser should be a function');
log.assert(typeof Brands == 'function', 'Brands should be a function');
log.assert(typeof BrandBrowser == 'function', 'BrandBrowser should be a function');

const routes = (
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

if (module.hot) {
	module.hot.accept('./components/App', function(){
		log.info('Hot-reloading \'./components/App\'...');
	});
	module.hot.accept('./components/Home', function(){
		log.info('Hot-reloading \'./components/Home\'...');
	});
	module.hot.accept('./components/Products', function(){
		log.info('Hot-reloading \'./components/Products\'...');
	});
	module.hot.accept('./components/Products/ProductBrowser', function(){
		log.info('Hot-reloading \'./components/Products/ProductBrowser\'...');
	});
	module.hot.accept('./components/Brands', function(){
		log.info('Hot-reloading \'./components/Brands\'...');
	});
	module.hot.accept('./components/Brands/BrandBrowser', function(){
		log.info('Hot-reloading \'./components/Brands/BrandBrowser\'...');
	});
}
