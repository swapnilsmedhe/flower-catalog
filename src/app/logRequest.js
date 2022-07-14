const createRequestLogHandler = (logger) => (request, response, next) => {
  logger(request.method, request.path);
  next();
};

module.exports = { createRequestLogHandler };
