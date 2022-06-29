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

const serveFileContents = (root) => (request, response) => {
  const { pathname } = request.url;
  let fileName = pathname === '/' ? root + '/index.html' : root + pathname;

  try {
    const content = fs.readFileSync(fileName);
    response.setHeader('Content-type', determineContentType(fileName));
    response.end(content);
  } catch (error) {
    return false;
  }

  return true;
};

module.exports = { serveFileContents };
