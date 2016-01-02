var server = {
    status: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>' + STATUS + '</p></body></html>';
        res.end('<!DOCTYPE html>\r\n' + html);
    },
    get: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = '<html><head><title>BridalApp</title></head><body><h1>BridalApp</h1><p>Welcome to BridalApp</p></body></html>';
        res.end('<!DOCTYPE html>\r\n' + html);
    },
};

module.exports = server;
