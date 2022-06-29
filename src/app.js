const { GuestBook } = require('./app/guestBook.js');
const { createGuestBookHandler, getGuestBook } = require('./app/guestBookHandler.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const guestBook = new GuestBook(getGuestBook());
const guestBookHandler = createGuestBookHandler(guestBook);

const app = createRouter(
  guestBookHandler,
  serveStaticFrom('./public'),
  notFoundHandler
);

module.exports = { app };
