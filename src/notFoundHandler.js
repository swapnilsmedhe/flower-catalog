const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.send('Not found');
  return true;
};

module.exports = { notFoundHandler };
