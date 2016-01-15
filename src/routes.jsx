import log from 'picolog';
import React from 'react';
import { Route } from 'react-router';

// Use require so we can hot-reload individual components
var App = require('./components/App').default;
var Home = require('./components/Home').default;
var Products = require('./components/Products').default;

log.assert(typeof App == 'function', 'App should be defined');
log.assert(typeof Home == 'function', 'Home should be defined');

const routes = (
	<Route component={App}>
		<Route path="/" component={Home} />
		<Route path="/products" component={Products} />
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
}
