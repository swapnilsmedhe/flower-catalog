const { loginPage } = require('../view/loginPage.js');

const loginPageHandler = (request, response) => {
  if (request.session) {
    response.redirect('/guest-book');
    return;
  }

  response.set('Content-type', 'text/html');
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

const invalidCredentialsHandler = (request, response) => {
  response.status(401).end('Invalid username or password');
};

const createLoginHandler = (sessions, users) => (request, response) => {
  if (request.session) {
    response.redirect('/guest-book');
  }

  const loginCredentials = request.body;
  if (!isUserValid(loginCredentials, users)) {
    invalidCredentialsHandler(request, response);
    return;
  }

  const session = createSession(loginCredentials.username);
  sessions[session.sessionId] = session;
  response.cookie('sessionId', session.sessionId);

  response.redirect('/guest-book');
};

module.exports = { createLoginHandler, loginPageHandler };
