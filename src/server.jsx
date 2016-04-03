require('babel-polyfill');
global.fetch = require('node-fetch');
import chalk from 'chalk';
import Express from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import http from 'http';
import httpProxy from 'http-proxy';
import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { load } from 'redux-load-api';

import cfg from '../config';
import store from './store';

const express = new Express();
const httpServer = new http.Server(express);

const g=chalk.green, gb=chalk.green.bold,  y=chalk.yellow, yb=chalk.yellow.bold,
	w=chalk.white, wb=chalk.white.bold, gr=chalk.grey,  grb=chalk.grey.bold,
	r=chalk.red, rb=chalk.red.bold;

// Enable gzip compresion
express.use(compress());

// parses request cookies
express.use(cookieParser());


// if the server is started in hot mode, we include webpack-dev-middleware
// and webpack-hot-middleware to serve a hot bundle to the client. In
// production mode, we serve up a static pre-compiled client bundle
if (module.hot) {
	// use require because it will be optimized out if !module.hot
	const webpack = require('webpack');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');
	const stats = {colors:true, chunks:false, hash:false, version:false};
	const clientCfg = require('../webpack/development.client.config');
	const clientCompiler = webpack(clientCfg);
	express.use(devMiddleware(clientCompiler, {stats, publicPath:clientCfg.output.publicPath}));
	express.use(hotMiddleware(clientCompiler));
}

// We point to our static assets
express.use(Express.static(cfg.publicPath));

// polled by OpenShift haproxy load balancer to test server availability
express.get('/status', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	res.end(`<!DOCTYPE html>
<html>
<head>
	<title>Status</title>
</head>
<body>
	<h1 style="color:green">ONLINE</h1>
	<p>${cfg.server.name} is ONLINE</p>
</body>
</html>`);
});

express.get(/\/.*/, (req, res) => {
	// Reset the store prior to each request
	store.dispatch({type:'@@bridalapp/RESET'});
	// require again on each request, to enable hot-reload in development mode.
	// In production, this will just grab the module from require.cache.
	const routes = require('./routes').routes;
	const Html = require('./components/Html/Html').Html;
	// match the current URL against defined routes
	match({routes:routes, location:req.originalUrl}, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
			res.end();
		}
		else if (error) {
			log.warn(rb('ROUTER ERROR:'), pretty.render(error));
			res.status(500);
			res.send('Server error.');
			res.end();
		}
		else if (!renderProps) {
			res.status(404);
			res.send('Not Found.');
			res.end();
		}
		else {
			log.debug(chalk.styles.gray.open, 'Rendering using props: ', renderProps, chalk.styles.gray.close);

			// Store session cookie so we can attach it to fetch calls
			global.session = req.cookies && req.cookies.BASESSION;
			global.session && log.debug('stored session cookie: ' + global.session);
			Promise.resolve(global.session ? store.app.auth.loadSession() : {sessionId:null, user:null})
			.then(session => {
				log.debug('loaded session: ', session);
				log.debug('store.app.auth.loggedIn=', store.app.auth.loggedIn);
				// pre-load onload actions
				const { routes, params, location: { query } } = renderProps;
				const loadParams = {...query, ...params};
				log.debug('LOAD params=', loadParams);
				return load(routes.map(x => x.component), loadParams);
			})
			.then(() => {
				// do awesome stuff knowing all promises (if any) are resolved
				log.debug('pre-load complete, rendering markup');
				res.status(200);
				res.send('<!DOCTYPE html>\n' +
					ReactDOM.renderToString(
						<Html store={store} apiUrl={cfg.apiServer.url} version={cfg.version} {...renderProps} />
					)
				);
				res.end();
				log.debug('rendering complete');
				return true;
			})
			.catch((error) => {
				log.error('Error rendering ' + req.originalUrl + ': ', error, error.stack);
				res.status(500);
				res.send('Server error.');
				res.end();
			});
		}
	});
});


var server = cfg.server.host
	? httpServer.listen(cfg.server.port, cfg.server.host, serverStartup)
	: httpServer.listen(cfg.server.port, serverStartup);

function serverStartup(error) {
	if (error) {throw error;}
	var addr = httpServer.address();
	log.warn();
	if (module.hot) {
		log.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot Module Replacement') + g(' is enabled.') : ''));
	} else {
		log.warn(gb(' √  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
	}
	log.warn(gb(' √  ') + g('Talking to ') + gb(cfg.apiServer.name) + g(' at ') + gb(cfg.apiServer.url));
	log.warn(gb(' √  ') + g('Listening for connections at ') + gb(cfg.server.protocol + addr.address + (addr.port == 80 ? '' : ':' + addr.port)));
	log.warn(gb(' √  %s started succesfully ') + g('on %s.'), cfg.server.name, Date(Date.now()));
	log.warn('');
}

var msg;
var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
SIGNALS.forEach(function(signal) {process.on(signal, function(){
	log.warn(msg = (rb(' ×  ') + g('Stopping ') + gb(cfg.server.name) + g(' after receiving ') + yb(signal) + g('.')));
	server.close();
    process.exit();
})});
process.on('uncaughtException', function(error){
	log.warn(msg = (rb(' ×  ') + g('Uncaught exception ') + yb(error) + g('.')));
});
process.on('exit', function() {log.warn(msg = (gb(' √  ') + g('Stopped ') + gb(cfg.server.name) + g(' on ' + Date(Date.now()) + '.\r\n')));});

if (module.hot) {
	module.hot.accept('./store', function(){
        log.warn(yb('Hot reloading ') + g('\'./store\'...'));
	});
	module.hot.accept('./routes', function(){
        log.warn(yb('Hot reloading ') + g('\'./routes\'...'));
	});
	module.hot.accept('./components/Html/Html', function(){
        log.warn(yb('Hot reloading ') + g('\'./components/Html/Html\'...'));
	});

/*  SHOULD BE POSSIBLE BUT CAN'T GET IT TO WORK RELIABLY
	// self-accept. This allows hot-reload of this very file. We cleanup in the
	// dispose handler and then the server will be restarted.
	module.hot.accept();
	// dispose handler
    module.hot.dispose(function() {
		server.close(function(){
			log.warn(g('Closed HTTP server listening on port ') + g(cfg.server.port));
		});
    });
*/
}
