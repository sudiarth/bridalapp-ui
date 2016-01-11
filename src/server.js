var chalk = require('chalk');
var Express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var log = require('picolog');

var cfg = require('../config');
var RequestHandler = require('./request-handler');

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
	var devMiddleware = require("webpack-dev-middleware");
	var hotMiddleware = require("webpack-hot-middleware");
	var compiler = webpack(webpackCfg);

	express.use(devMiddleware(compiler, {noInfo:true, publicPath:webpackCfg.output.publicPath}));
	express.use(hotMiddleware(compiler));
}

//if (! cfg.isProduction) {
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
	/*
	// Proxy to WebPack DEV server for HMR of client scripts
	log.log(gr('Proxying requests incoming at ') + w('http://%s:%s%s'), cfg.server.host, cfg.server.port, cfg.devServer.path);
	log.log(gr('   to ') + w('Webpack DEV Server') + gr(' at ') + w('http://%s:%s%s'), cfg.devServer.host, cfg.devServer.port, cfg.devServer.path);
	const devProxy = httpProxy.createProxyServer({
		target: {host:cfg.devServer.host, port:cfg.devServer.port, path:cfg.devServer.path},
	});
	express.use(cfg.devServer.path, function(req, res) {
		log.debug(gr('Received bundle request.'));
		devProxy.web(req, res);
	});
	*/
//}

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
    process.exit();
})});
process.on('exit', function() {log.warn(msg = (gb(' √  ') + g('Stopped ') + gb(cfg.server.name) + g(' on ' + Date(Date.now()) + '.\r\n')));});

if (module.hot) {
    module.hot.accept('./request-handler', function(){
        log.warn(g('Hot reloading ./request-handler'));
        RequestHandler = require('./request-handler');
    });
}
