#!/bin/env node

var chalk = require('chalk');
var Express = require('express');
var http = require('http');
var log = require('picolog');

var cfg = require('./config');
var server = require('./src/server');

var express = new Express();
var httpServer = new http.Server(express);

express.get('/status', function(req, res) {
    server.status(req, res);
});

express.get('*', function(req, res) {
    server.get(req, res);
});

var HTTP_SERVER_STARTED;
var STATUS;
httpServer.listen(cfg.ui.port, cfg.ui.host, function(error) {
	if (error) {throw error;}
    HTTP_SERVER_STARTED = Date(Date.now())
	var g=chalk.green, gb=chalk.green.bold, yb=chalk.yellow.bold;
	var addr = httpServer.address();
	if (!cfg.isProduction) {
		log.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot-reload') + g(' is enabled.') : ''));
	} else {
		log.warn(gb(' √  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
	}
	log.warn(gb(' √  ') + g('Talking to ') + gb('%s') + g(' at ') + gb('%s:%s'), cfg.api.name, cfg.api.host, cfg.api.port);
	log.warn(gb(' √  ') + g('Listening for connections at ') + gb('http://%s:%s'), addr.address, addr.port);
	log.warn(gb(' √  %s started succesfully on %s.'), cfg.ui.name, HTTP_SERVER_STARTED);
	log.warn('');
    STATUS = cfg.ui.name + ' is ONLINE since ' + HTTP_SERVER_STARTED + '.'
});

var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
SIGNALS.forEach(function(signal) {process.on(signal, function(){
    log.warn('Stopping %s after receiving %s.', cfg.ui.name, signal);
    process.exit();
})});
process.on('exit', function() {log.warn('Stopped %s on %s.\r\n', cfg.ui.name, Date(Date.now()));});

if (module.hot) {
    module.hot.accept('./src/server', function(){
        log.warn(chalk.green('Hot reloading ./src/server'));
        server = require('./src/server');
    });
}