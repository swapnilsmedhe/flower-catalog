const createRequestLogHandler = (logger) => (request, response, next) => {
  logger(request.method, request.url.pathname);
  next();
};

module.exports = { createRequestLogHandler };
