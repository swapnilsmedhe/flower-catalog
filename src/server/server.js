const http = require('http');
const { URL } = require('url');

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    request.url = new URL(`http://${request.headers.host}${request.url}`);
    console.log(request.method, request.url.pathname);
    handler(request, response);
  });

  server.listen(port, console.log(`Listening on ${port}`))
};

module.exports = { startServer }
