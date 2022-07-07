const { createApiRouter } = require('./app/apiHandler.js');
const { createGuestBook } = require('./app/guestBook.js');
const { createGuestBookRouter } = require('./app/guestBookHandler.js');
const { logRequest } = require('./app/logRequest.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { parseUrl } = require('./app/parseUrl.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');
const { injectCookies } = require('./app/injectCookies.js');
const { createSessionInjector } = require('./app/injectSession.js');
const { createLoginHandler, loginPageHandler } = require('./app/loginHandler');


const app = ({ serveFrom, dataFile: guestBookFile }) => {
  const templateFile = './resources/guest-book-template.html';
  const guestBook = createGuestBook(guestBookFile, templateFile);
  const guestBookRouter = createGuestBookRouter(guestBook, guestBookFile);
  const apiRouter = createApiRouter(guestBook);

  const sessions = {};
  const injectSession = createSessionInjector(sessions);
  const loginHandler = createLoginHandler(sessions);

  const router = createRouter(
    parseUrl,
    parseBodyParams,
    logRequest,
    injectCookies,
    injectSession,
    loginPageHandler,
    loginHandler,
    apiRouter,
    guestBookRouter,
    serveStaticFrom(serveFrom),
    notFoundHandler
  );
  return router;
}

module.exports = { app };
