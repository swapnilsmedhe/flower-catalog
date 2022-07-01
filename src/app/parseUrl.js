const { URL } = require('url');

const parseUrl = (request, response, next) => {
  request.url = new URL(`http://${request.headers.host}${request.url}`);
  next();
};

module.exports = { parseUrl };
