const logRequestHandler = (request, response) => {
  console.log(request.method, request.url.pathname);
  return false
};

module.exports = { logRequestHandler };
