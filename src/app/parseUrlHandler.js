const { URL } = require('url');

const parseUrlHandler = (request, response) => {
  request.url = new URL(`http://${request.headers.host}${request.url}`);
  return false;
};

module.exports = { parseUrlHandler };
