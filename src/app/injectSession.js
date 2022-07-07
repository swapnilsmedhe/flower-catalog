const createSessionInjector = (sessions) => (request, response, next) => {
  const { sessionId } = request.cookies;
  if (!sessions[sessionId]) {
    next();
    return;
  }
  request.session = sessions[sessionId];
  next();
};

module.exports = { createSessionInjector };
