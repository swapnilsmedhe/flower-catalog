const createLogoutHandler = (sessions) => (request, response, next) => {
  const { pathname } = request.url;
  if (pathname !== '/logout') {
    next();
    return;
  }

  const { sessionId } = request.cookies;
  const session = sessions[sessionId];

  if (!session) {
    response.statusCode = 400;
    response.end('Bad request');
    return;
  }

  delete sessions[sessionId];
  response.setHeader('Set-Cookie', `sessionId=${sessionId}; Max-Age=0`);
  response.statusCode = 302;
  response.setHeader('Location', '/login');
  response.end();
}

module.exports = { createLogoutHandler };
