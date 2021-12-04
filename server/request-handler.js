var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var body = {
  data: []
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode;

  var headers = defaultCorsHeaders;

  // headers['Content-Type'] = 'text/plain';

  headers['Content-Type'] = 'application/json';

  if (request.method === 'GET' && request.url === '/classes/messages') {

    statusCode = 200;
    response.writeHead(statusCode, headers);
    // response.write(JSON.stringify(body.data));
    response.end(JSON.stringify(body.data));

  } else if (request.method === 'POST' && request.url === '/classes/messages') {

    statusCode = 201;
    response.writeHead(statusCode, headers);

    request.on('data', chunk => {
      let stringifiedChunk = chunk.toString();

      body.data.push(JSON.parse(stringifiedChunk));
    })

    request.on('end', () => {
      response.end(JSON.stringify(body.data));
    })

  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {

    statusCode = 204;
    response.writeHead(statusCode, headers);
    response.end();

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Wrong Endpoint');
  }

};


module.exports.requestHandler = requestHandler;