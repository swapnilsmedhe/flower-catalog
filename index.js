const { serveFileContents } = require('./src/app/serveFileContents.js');
const { guestBookHandler } = require('./src/app/guestBookHandler.js');
const { notFoundHandler } = require('./src/app/notFoundHandler.js');
const { startServer } = require('./src/server/server.js');

const createHandler = (handlers, path = './public') => (request, response) => {
  return handlers.some((handler) => handler(request, response, path));
}

const handlers = [
  // serveFileContents,
  // guestBookHandler,
  notFoundHandler
];

const path = process.argv[2];
startServer(80, createHandler(handlers, path));
