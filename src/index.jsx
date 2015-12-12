import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext, Router } from 'react-router';
import routes from './routes';

if (typeof window != 'undefined') {
	const apphistory = require('./apphistory');
	
	//Needed for onTouchTap
	//Can go away when react 1.0 release
	//Check this repo:
	//https://github.com/zilverline/react-tap-event-plugin
	require("react-tap-event-plugin")();

	document.addEventListener('DOMContentLoaded', function(){
		ReactDOM.render(
			<Router history={apphistory}>{routes}</Router>
			, 
			document.getElementById('bridalapp-ui')
		);
	});
}
else if (typeof global != undefined) {
	/**
	 * Determines the route for the given path and renders the markup for it if possible.
	 * 
	 * The resulting string consists of two parts, separated by a colon. The first part 
	 * indicates the type of result and can be one of 'MARKUP', 'REDIRECT', 'NOTFOUND' or 'ERROR'.
	 * The second part contains detail data for the result: HTML in case of 'MARKUP', the
	 * URL to redirect to in case of 'REDIRECT', the original path in case of 'NOTFOUND' 
	 * or an error message in case of 'ERROR'.
	 * <code><pre>
	 * 'MARKUP:<div>Some markup to render</div>'  
	 * 'REDIRECT:/new/route'
	 * 'NOTFOUND:/some/path'  
	 * 'ERROR:Oops something went wrong.'
	 * </pre></code>  
	 * 
	 * 
	 * @param path The path to render
	 * @returns A String consisting of a result identifier and result data, separated by a colon.
	 */
	global.render = function render(path, initialDataJSON) {
		var result;
		match({routes, location:path}, function(error, redirect, props){
			log.debug('match result for location [' + path + ']: props=' + props + ', redirect=' + redirect + ', error=' + error);
			if (redirect) {
				log.debug('redirecting to [' + redirect.pathname + redirect.search + ']...');
				result = 'REDIRECT:' + redirect.pathname + redirect.search;
			}
			else if (props) {
				log.debug('initialDataJSON=' + initialDataJSON);
				global.initialData = JSON.parse(initialDataJSON);
				log.debug('initialData=' + global.initialData);
				
				result = 'MARKUP:' + ReactDOMServer.renderToString(<RoutingContext {...props} />);
			}
			else if (error) {result = 'ERROR:' + error.message}
			else {result = 'NOTFOUND:' + path;}
		});
		return result;
	};
	global.log = log;
}
else {
	log.error("No `global` context found. If running in Nashorn, please eval `var global = this;` before loading this bundle.");
}
