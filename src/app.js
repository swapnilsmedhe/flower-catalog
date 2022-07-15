const express = require('express');
const { createCommentsApiHandler } = require('./app/apiHandler.js');
const { createGuestBook } = require('./app/guestBook.js');
const { createRequestLogHandler } = require('./app/logRequest.js');
const { injectCookies } = require('./app/injectCookies.js');
const { createSessionInjector } = require('./app/injectSession.js');
const { createLoginHandler, loginPageHandler } = require('./app/loginHandler');
const { createLogoutHandler } = require('./app/logoutHandler.js');
const { createSignupHandler } = require('./app/signupHandler.js');
const {
  createGuestBookHandler,
  createAddcommentsHandler
} = require('./app/guestBookHandler.js');

const createApp = (config, users = {}, sessions = {}) => {
  const templateFile = './resources/guest-book-template.html';
  const guestBook = createGuestBook(config.guestBookFile, templateFile);

  const apiHandler = createCommentsApiHandler(guestBook);
  const logRequest = createRequestLogHandler(config.logger);
  const showGuestBook = createGuestBookHandler(guestBook);
  const addComments = createAddcommentsHandler(guestBook, config.guestBookFile);

  const injectSession = createSessionInjector(sessions);
  const loginHandler = createLoginHandler(sessions, users);
  const logoutHandler = createLogoutHandler(sessions);
  const signupHandler = createSignupHandler(users);

  const app = express();

  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectCookies);
  app.use(injectSession);
  app.use(express.static(config.serveFrom));

  app.get('/api/comments', apiHandler);
  app.get('/login', loginPageHandler);
  app.get('/logout', logoutHandler);
  app.get('/guest-book', showGuestBook);
  app.post('/login', loginHandler);
  app.post('/add-comment', addComments);
  app.post('/signup', signupHandler);

  return app;
}

module.exports = { createApp };
