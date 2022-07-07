const { loginPage } = require('../view/loginPage.js');

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

  if (request.method === 'GET' && !request.session) {
    response.end(loginPage);
    return;
  }

  const username = request.bodyParams.get('username');
  if (request.method === 'POST' && username) {
    const session = createSession(username);
    sessions[session.sessionId] = session;
    response.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
    response.statusCode = 302;
    response.setHeader('Location', '/guest-book');
    response.end();
    return;
  }

  next();
};

module.exports = { createLoginHandler };
