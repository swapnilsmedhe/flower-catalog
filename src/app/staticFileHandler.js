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

const serveStaticFrom = (root) => (request, response) => {
  const { pathname } = request.url;
  const fileName = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(root, fileName);
  const extension = path.extname(fileName);
  const mimeType = getMimeType(extension);

  try {
    const content = fs.readFileSync(filePath);
    response.setHeader('Content-type', mimeType);
    response.end(content);
  } catch (error) {
    return false;
  }

  return true;
};

module.exports = { serveStaticFrom };
