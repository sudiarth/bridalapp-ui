import log from 'picolog';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext, Router } from 'react-router'
import routes from './routes';

if (typeof window != 'undefined') {
	var createHistory = require('history/lib/createBrowserHistory');

	//Needed for onTouchTap
	//Can go away when react 1.0 release
	//Check this repo:
	//https://github.com/zilverline/react-tap-event-plugin
	require("react-tap-event-plugin")();

	document.addEventListener('DOMContentLoaded', function(){
		ReactDOM.render(
			<Router history={createHistory()}>{routes}</Router>
			, 
			document.getElementById('bridalapp-ui')
		);
	});
}
else if (typeof global != undefined) {
//	require('es6-symbol/implement'); // polyfill for ES6 'Symbol' class
	global.console = log;
	global.renderer = {
		route: function(path) {
			log.trace('Determining route for path [' + path + ']');
			var result = {};
			match({routes, location:path}, function(error, redirect, props){
				log.trace('matched: error=' + error + ', redirect=' + redirect + ', props=' + props);
				result.error = error;
				result.redirect = redirect;
				result.props = props;
			});
			log.debug('Determined route for path [' + path + ']: ' +	
				(result.error ? 'error: ' + result.error : 
				(result.redirect ? 'redirect: ' + result.redirect : 
				(result.props ? 'render: ' + result.props : 'not found')))
			);
			return result;
		}
		,
		render: function(props) {
			return ReactDOMServer.renderToString(<RoutingContext {...props} />);
		}
	};
	global.log = log;
}
else {
	log.error("No `global` context found. If running in Nashorn, please define `var global = this;` before loading this bundle.");
}
