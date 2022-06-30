const { createApiHandler } = require('./app/apiHandler.js');
const { createGuestBook } = require('./app/guestBook.js');
const { createGuestBookHandler } = require('./app/guestBookHandler.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const guestBookfile = './data/guestBook.json';
const templateFile = './resources/guest-book-template.html';
const guestBook = createGuestBook(guestBookfile, templateFile);
const guestBookHandler = createGuestBookHandler(guestBook, guestBookfile);
const apiHandler = createApiHandler(guestBook);

const app = createRouter(
  apiHandler,
  guestBookHandler,
  serveStaticFrom('./public'),
  notFoundHandler
);

module.exports = { app };
