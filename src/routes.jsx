import log from 'picolog'; 
log.debug('Loading...');

import React from 'react';
import { Router, IndexRoute, Link, Route, RouteHandler } from 'react-router';
log.debug('Loaded. React=' + React + ', Router=' + Router + ', RouteHandler=' + RouteHandler + ', Route=' + Route + ', IndexRoute=' + IndexRoute + ', Link=' + Link);

import App from './views/App';
import Home from './views/Home';
import Products from './views/Products';
import Stores from './views/Stores';
import Brands from './views/Brands';

export default (
	<Route component={App}>
		<Route path="/" component={Home} />
		<Route path="/products" component={Products} />
		<Route path="/stores" component={Stores} />
		<Route path="/brands" component={Brands} />
	</Route>
);
