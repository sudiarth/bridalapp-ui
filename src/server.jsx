var chalk = require('chalk');
var Express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var log = require('picolog');
var React = require('react');
var ReactDOM = require('react-dom/server')
var match = require('react-router').match;
var createStore = require('redux').createStore;
var RootApi = require('redux-apis').RootApi;

var cfg = require('../config');

var express = new Express();
var httpServer = new http.Server(express);

var g=chalk.green, gb=chalk.green.bold,  y=chalk,yellow, yb=chalk.yellow.bold,
	w=chalk.white, wb=chalk.white.bold, gr=chalk.grey,  grb=chalk.grey.bold,
	r=chalk.red, rb=chalk.red.bold;

// if the server is started in hot mode, we include webpack-dev-middleware
// and webpack-hot-middleware to serve a hot bundle to the client. In
// production mode, we serve up a static pre-compiled client bundle
if (module.hot) {
	var webpack = require('webpack');
	var webpackCfg = require('../webpack/development.client.config');
	var devMiddleware = require('webpack-dev-middleware');
	var hotMiddleware = require('webpack-hot-middleware');
	var compiler = webpack(webpackCfg);

	express.use(devMiddleware(compiler, {noInfo:true, publicPath:webpackCfg.output.publicPath}));
	express.use(hotMiddleware(compiler));
}

// We point to our static assets
express.use(Express.static(cfg.publicPath));

express.get('/status', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var html = '<html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>' + cfg.server.name + ' is ONLINE</p></body></html>';
	res.end('<!DOCTYPE html>\r\n' + html);
});

express.get(/\/.*/, function(req, res) {
	// require again on each request, to enable hot-reload in development mode.
	// In production, this will just grab the module from require.cache.
	var routes = require('./routes').default;
	match({routes:routes, location:req.originalUrl}, function (error, redirectLocation, renderProps) {
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
});

var server = httpServer.listen(cfg.server.port, cfg.server.host, function(error) {
	if (error) {throw error;}
	var addr = httpServer.address();
	log.warn();
	if (module.hot) {
		log.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot Module Replacement') + g(' is enabled.') : ''));
	} else {
		log.warn(gb(' √  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
	}
	log.warn(gb(' √  ') + g('Talking to ') + gb('%s') + g(' at ') + gb('%s:%s'), cfg.apiServer.name, cfg.apiServer.host, cfg.apiServer.port);
	log.warn(gb(' √  ') + g('Listening for connections at ') + gb('http://%s:%s'), addr.address, addr.port);
	log.warn(gb(' √  %s started succesfully on %s.'), cfg.server.name, Date(Date.now()));
	log.warn('');
});

var msg;
var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
SIGNALS.forEach(function(signal) {process.on(signal, function(){
	log.warn(msg = (rb(' ×  ') + g('Stopping ') + gb(cfg.server.name) + g(' after receiving ') + yb(signal) + g('.')));
	server.close();
    process.exit();
})});
process.on('uncaughtException', function(error){
	log.warn(msg = (rb(' ×  ') + g('Stopping ') + gb(cfg.server.name) + g(' due to uncaught exception ') + yb(error) + g('.')));
	server.close();
	process.exit();
});
process.on('exit', function() {log.warn(msg = (gb(' √  ') + g('Stopped ') + gb(cfg.server.name) + g(' on ' + Date(Date.now()) + '.\r\n')));});

if (module.hot) {
	module.hot.accept('./routes', function(){
        log.warn(yb('Hot reloading ') + g('\'./routes\'...'));
	});
	module.hot.accept('./components/Html/Html', function(){
        log.warn(yb('Hot reloading ') + g('\'./components/Html/Html\'...'));
	});
	module.hot.accept('./components/App/App', function(){
        log.warn(yb('Hot reloading ') + g('\'./components/App/App\'...'));
	});
	module.hot.accept('./components/App/api', function(){
        log.warn(yb('Hot reloading ') + g('\'./components/App/api\'...'));
	});

	// self-accept. This allows hot-reload of this very file. We cleanup in the
	// dispose handler and then the server will be restarted.
	module.hot.accept();
	// dispose handler
    module.hot.dispose(function() {
		server.close(function(){
			log.warn(g('Closed HTTP server listening on port ') + g(cfg.server.port));
		});
    });
}
