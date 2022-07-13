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

const isUserValid = ({ username, password }, users) => {
  const user = users[username];
  if (!user) {
    return false;
  }
  return password === user.password;
};

const getLoginCredentials = ({ bodyParams }) => {
  const username = bodyParams.get('username');
  const password = bodyParams.get('password');
  return { username, password };
};

const invalidCredentialsHandler = (request, response) => {
  response.statusCode = 401;
  response.end('Invalid username or password');
};

const createLoginHandler = (sessions, users) => (request, response, next) => {
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
  if (!isUserValid(loginCredentials, users)) {
    invalidCredentialsHandler(request, response);
    return;
  }

  const session = createSession(loginCredentials.username);
  sessions[session.sessionId] = session;
  response.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);

  redirectToGuestBook(request, response);
};

module.exports = { createLoginHandler, loginPageHandler };
