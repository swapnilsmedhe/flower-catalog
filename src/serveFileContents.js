const fs = require('fs');

const contentTypes = {
  html: 'text/html',
  jpg: 'image/jpg',
  png: 'image/png',
  css: 'text/css',
  pdf: 'application/pdf'
};

const determineContentType = (fileName) => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  return contentTypes[extension] || 'text/plain';
};

const serveFileContents = (request, response, path) => {
  const { uri } = request;
  let fileName = uri === '/' ? path + '/index.html' : path + uri;

  if (!fs.existsSync(fileName)) {
    return false;
  }
  const content = fs.readFileSync(fileName);
  response.addHeader('Content-Type', determineContentType(fileName))
  response.send(content);
  return true;
};

module.exports = { serveFileContents };
