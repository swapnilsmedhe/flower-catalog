const { createApiRouter } = require('./app/apiHandler.js');
const { createGuestBook } = require('./app/guestBook.js');
const { createGuestBookRouter } = require('./app/guestBookHandler.js');
const { createRequestLogHandler } = require('./app/logRequest.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { parseUrl } = require('./app/parseUrl.js');
const { serveStaticFrom } = require('./app/staticFileHandler.js');
const { createRouter } = require('./server/router.js');
const { injectCookies } = require('./app/injectCookies.js');
const { createSessionInjector } = require('./app/injectSession.js');
const { createLoginHandler, loginPageHandler } = require('./app/loginHandler');
const { createLogoutHandler } = require('./app/logoutHandler.js');
const { createSignupHandler } = require('./app/signupHandler.js');

const app = ({ serveFrom, dataFile: guestBookFile, logger }, users = {}, sessions = {}) => {
  const templateFile = './resources/guest-book-template.html';
  const guestBook = createGuestBook(guestBookFile, templateFile);
  const guestBookRouter = createGuestBookRouter(guestBook, guestBookFile);
  const apiRouter = createApiRouter(guestBook);
  const logRequest = createRequestLogHandler(logger);

  const injectSession = createSessionInjector(sessions);
  const loginHandler = createLoginHandler(sessions, users);
  const logoutHandler = createLogoutHandler(sessions);
  const signupHandler = createSignupHandler(users);

  const router = createRouter(
    parseUrl,
    parseBodyParams,
    logRequest,
    injectCookies,
    injectSession,
    signupHandler,
    loginPageHandler,
    loginHandler,
    logoutHandler,
    guestBookRouter,
    apiRouter,
    serveStaticFrom(serveFrom),
    notFoundHandler
  );
  return router;
}

module.exports = { app };
