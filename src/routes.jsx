import log from 'picolog';
import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';


//var App = require('./components/App/App');
//var Home = require('./components/Home/Home');

log.assert(typeof App == 'function', 'App should be defined');
log.assert(typeof Home == 'function', 'Home should be defined');

const routes = (
	<Route component={App}>
		<Route path="/" component={Home} />
	</Route>
);

log.debug('routes=' + routes);

export default routes;