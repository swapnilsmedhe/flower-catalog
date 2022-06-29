const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { serveStaticFrom } = require('./handlers/staticFileHandler.js');
const { createRouter } = require('./server/router.js');

const handle = createRouter(serveStaticFrom('./public'), notFoundHandler);

module.exports = { handle };
