var chalk = require('chalk');
var Express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var log = require('picolog');

var cfg = require('../config');
var RequestHandler = require('./request-handler');

var express = new Express();
var httpServer = new http.Server(express);

if (! cfg.isProduction) {
	/*
	var webpack = require('webpack');
	var webpackConfig = require('../webpack/development.client.config');
	var compiler = webpack(webpackConfig);
	express.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));
	*/
	/*
	express.use(require("webpack-hot-middleware")(compiler));
	*/

	// Proxy to WebPack DEV server for HMR of client scripts
	log.log(chalk.grey('Proxying requests incoming at ') + chalk.white('http://%s:%s%s'), cfg.server.host, cfg.server.port, cfg.devServer.path);
	log.log(chalk.grey('   to ') + chalk.white('Webpack DEV Server') + chalk.grey(' at ') + chalk.white('http://%s:%s%s'), cfg.devServer.host, cfg.devServer.port, cfg.devServer.path);
	const devProxy = httpProxy.createProxyServer({
		target: {host:cfg.devServer.host, port:cfg.devServer.port, path:cfg.devServer.path},
	});
	express.use(cfg.devServer.path, function(req, res) {
		log.debug('Received bundle request.');
		devProxy.web(req, res);
	});
}

// We point to our static assets
express.use(Express.static(cfg.publicPath));

express.get('/status', function(req, res) {
    RequestHandler.status(req, res);
});

express.get('/', function(req, res) {
    RequestHandler.get(req, res);
});

httpServer.listen(cfg.server.port, cfg.server.host, function(error) {
	if (error) {throw error;}
	var g=chalk.green, gb=chalk.green.bold, yb=chalk.yellow.bold;
	var addr = httpServer.address();
	if (!cfg.isProduction) {
		log.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot-reload') + g(' is enabled.') : ''));
	} else {
		log.warn(gb(' v  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
	}
	log.warn(gb(' v  ') + g('Talking to ') + gb('%s') + g(' at ') + gb('%s:%s'), cfg.apiServer.name, cfg.apiServer.host, cfg.apiServer.port);
	log.warn(gb(' v  ') + g('Listening for connections at ') + gb('http://%s:%s'), addr.address, addr.port);
	log.warn(gb(' v  %s started succesfully on %s.'), cfg.server.name, Date(Date.now()));
	log.warn('');
});

var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
SIGNALS.forEach(function(signal) {process.on(signal, function(){
    log.warn('Stopping %s after receiving %s.', cfg.server.name, signal);
    process.exit();
})});
process.on('exit', function() {log.warn('Stopped %s on %s.\r\n', cfg.server.name, Date(Date.now()));});

if (module.hot) {
    module.hot.accept('./request-handler', function(){
        log.warn(chalk.green('Hot reloading ./request-handler'));
        RequestHandler = require('./request-handler');
    });
}
