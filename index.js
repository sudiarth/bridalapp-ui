var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	res.end('<!DOCTYPE html><html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>' + cfg.server.name + ' is ONLINE</p></body></html>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


