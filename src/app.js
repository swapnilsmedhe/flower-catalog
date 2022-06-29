const { createGuestBookHandler, getGuestBook } = require('./app/guestBookHandler.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const app = createRouter(
  createGuestBookHandler(getGuestBook()),
  serveStaticFrom('./public'),
  notFoundHandler
);

module.exports = { app };
