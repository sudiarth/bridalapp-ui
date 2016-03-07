var chalk = require('chalk');
var log = require('picolog');
var http = require('http');

var cfg = require('../config');

var started = Date.now();

log.info(chalk.grey('Waiting for ') + chalk.white('%s') + chalk.grey(' at ') + chalk.white('http://%s:%s%s') + chalk.grey(' to start (max 30s)...'), cfg.devServer.name, cfg.devServer.host, cfg.devServer.port, '/');
setInterval(function(){
	if (Date.now() > started + 30000) {
		// Give up after 30 seconds
		log.error(chalk.red.bold('%s did not start in 30s... Giving up.'), cfg.devServer.name);
		process.exit(1);
	}

	try {
		var request = http.request({host:cfg.devServer.host, port:cfg.devServer.port, path:'/'}, function(response){
			response.on('data', function() {
				log.warn(chalk.green.bold('%s has started!'), cfg.devServer.name);
				process.exit(0);
			});
			response.on('error', function() {/* just ignore */});
		});

		request.on('socket', function (socket) {
			socket.setTimeout(1000);
			socket.on('timeout', function() {request.abort();});
			socket.on('error', function() {/* just ignore */});
		});

		request.on('error', function (error) {/* just ignore */})
		request.end();
	} catch(error) {/* just keep trying... */}
}, 1000);