const { createApiHandler } = require('./app/apiHandler.js');
const { createGuestBook } = require('./app/guestBook.js');
const { createGuestBookHandler } = require('./app/guestBookHandler.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { parseUrlHandler } = require('./app/parseUrlHandler.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const app = ({ serveFrom, dataFile: guestBookFile }) => {
  const templateFile = './resources/guest-book-template.html';
  const guestBook = createGuestBook(guestBookFile, templateFile);
  const guestBookHandler = createGuestBookHandler(guestBook, guestBookFile);
  const apiHandler = createApiHandler(guestBook);

  const router = createRouter(
    parseUrlHandler,
    parseBodyParams,
    logRequestHandler,
    apiHandler,
    guestBookHandler,
    serveStaticFrom(serveFrom),
    notFoundHandler
  );
  return router;
}

module.exports = { app };
