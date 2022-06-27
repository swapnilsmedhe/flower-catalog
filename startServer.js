const { createServer } = require('net');
const { onConnection } = require('./src/server.js');
const { serveFileContents } = require('./src/serveFileContents.js');
const { guestBookHandler } = require('./src/guestBookHandler.js');

const createHandler = (handlers, path = './public') => (request, response) => {
  return handlers.some((handler) => handler(request, response, path));
}

const startServer = (port, handler) => {
  const server = createServer((socket) => {
    onConnection(socket, handler);
  });

  server.listen(port, console.log(`Listening on ${port}`))
};

const handlers = [
  serveFileContents,
  guestBookHandler
];

const path = process.argv[2];
startServer(80, createHandler(handlers, path));
