var http = require('http');
var handler = require('./request-handler');
var handleRequest = handler.requestHandler;
var port = 3000;
var ip = '127.0.0.1';
var server = http.createServer(handleRequest);

console.log('Listening on http://' + ip + ':' + port);

server.listen(port, ip);