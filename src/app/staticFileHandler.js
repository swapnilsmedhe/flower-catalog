const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.jpg': 'image/jpg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.css': 'text/css',
  '.pdf': 'application/pdf'
};

const getMimeType = (extension) => {
  return mimeTypes[extension] || 'text/plain';
};

const serveStaticFrom = (root) => (request, response, next) => {
  const { pathname } = request.url;
  const fileName = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(root, fileName);

  if (request.method !== 'GET') {
    next();
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      next();
      return;
    }
    const extension = path.extname(filePath);
    const mimeType = getMimeType(extension);

    response.setHeader('Content-type', mimeType);
    response.end(content);
  });
};

module.exports = { serveStaticFrom };
