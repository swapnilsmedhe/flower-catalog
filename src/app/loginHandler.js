const { loginPage } = require('../view/loginPage.js');

const redirectToGuestBook = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end();
};

const loginPageHandler = (request, response, next) => {
  const { pathname } = request.url;
  if (pathname !== '/login' || request.method !== 'GET') {
    next();
    return;
  }

  if (request.session) {
    redirectToGuestBook(request, response);
    return;
  }
  response.setHeader('Content-type', 'text/html');
  response.end(loginPage);
};

const createSession = (username) => {
  const time = new Date();
  return { username, time, sessionId: time.getTime() };
};

const isUserValid = ({ username, password }, userDatabase) => {
  if (!username || !password) {
    return false;
  }
  const registeredPassword = userDatabase[username];
  return password === registeredPassword;
};

const getLoginCredentials = ({ bodyParams }) => {
  const username = bodyParams.get('username');
  const password = bodyParams.get('password');
  return { username, password };
};

const invalidCredentialsHandler = (request, response) => {
  response.statusCode = 400;
  response.end('Invalid username or password');
};

const createLoginHandler = (sessions, userDatabase) =>
  (request, response, next) => {
    const { pathname } = request.url;

    if (pathname !== '/login' || request.method !== 'POST') {
      next();
      return;
    }

    if (request.session) {
      redirectToGuestBook(request, response);
      return;
    }

    const loginCredentials = getLoginCredentials(request);
    if (!isUserValid(loginCredentials, userDatabase)) {
      invalidCredentialsHandler(request, response);
      return;
    }

    const session = createSession(loginCredentials.username);
    sessions[session.sessionId] = session;
    response.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);

    redirectToGuestBook(request, response);
  };

module.exports = { createLoginHandler, loginPageHandler };
