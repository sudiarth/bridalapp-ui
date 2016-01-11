import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { RootApi } from 'redux-apis';

var server = {
	// For now, just return a very simple page
	// Later, we could use this to show more detailed service status
    status: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>BridalApp UI Server is ONLINE</p></body></html>';
        res.end('<!DOCTYPE html>\r\n' + html);
    },

    get: function(req, res) {

		log.log('Processing request ' + req.originalUrl);

		// require again on each request, to enable hot-reload in development mode.
		// In production, this will just grab the module from require.cache.
		var routes = require('./routes').default;
		log.debug('routes=', routes);
		match({routes:routes, location:req.originalUrl}, function (error, redirectLocation, renderProps) {
			log.debug('Received routing result ', error, redirectLocation, renderProps);
			if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
			}
			else if (error) {
				log.warn(chalk.red.bold('ROUTER ERROR:'), pretty.render(error));
				res.status(500);
				res.send('Server error.');
			}
			else if (!renderProps) {
				res.status(404);
			}
			else {
				log.debug('Rendering markup');

				// require again on each request, to enable hot-reload in development mode.
				// In production, this will just grab the module from require.cache.
				var Html = require('./components/Html/Html').default;
				var App = require('./components/App/App').default;
				var AppApi = require('./components/App/api').default;

				const app = new RootApi(AppApi, createStore);

				// omg global state?
				// yes, but remember, a redux app only needs one variable,
				// the store that maintains the application state tree.
				// If you inspect RootApi closer, you'll see that it's actually
				// a convenience wrapper around the redux store.
				global.app = app;

				res.status(200);
				res.send('<!DOCTYPE html>\n' +
					ReactDOM.renderToString(
						<Html lang="en-US" store={app.store} {...renderProps} script="/assets/bridalapp-ui.js" />
					)
				);
			}
		});
		res.end();
    },
};

module.exports = server;

if (module.hot) {
	module.hot.accept('./routes');
	module.hot.accept('./components/Html/Html');
	module.hot.accept('./components/App/App');
	module.hot.accept('./components/App/api');
}