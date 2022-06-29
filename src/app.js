const { createGuestBook } = require('./app/guestBook.js');
const { createGuestBookHandler } = require('./app/guestBookHandler.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const guestBookfile = './data/guestBook.json';
const guestBook = createGuestBook(guestBookfile);
const guestBookHandler = createGuestBookHandler(guestBook, guestBookfile);

const app = createRouter(
  guestBookHandler,
  serveStaticFrom('./public'),
  notFoundHandler
);

module.exports = { app };
