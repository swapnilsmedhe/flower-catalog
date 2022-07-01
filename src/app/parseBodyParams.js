const { URLSearchParams } = require('url');

const parseBodyParams = (request, response, next) => {
  let data = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => data += chunk);
  request.on('end', () => {
    request.bodyParams = new URLSearchParams(data);
    next();
  });
};

module.exports = { parseBodyParams }