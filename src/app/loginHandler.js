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

const createLoginHandler = (sessions) => (request, response, next) => {
  const { pathname } = request.url;

  if (pathname !== '/login') {
    next();
    return;
  }

  const username = request.bodyParams.get('username');
  if (request.method === 'POST' && username) {
    const session = createSession(username);
    sessions[session.sessionId] = session;
    response.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);

    redirectToGuestBook(request, response);
    return;
  }

  next();
};
module.exports = { createLoginHandler, loginPageHandler };
