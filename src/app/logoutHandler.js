const createLogoutHandler = (sessions) => (request, response) => {
  const { sessionId } = request.cookies;
  const session = sessions[sessionId];

  if (!session) {
    response.status(400).end('Bad request');
    return;
  }

  delete sessions[sessionId];
  response.clearCookie('sessionId');
  response.redirect('/login');
}

module.exports = { createLogoutHandler };
