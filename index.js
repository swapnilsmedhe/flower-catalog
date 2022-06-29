const { serveStaticFrom } = require('./src/handlers/staticFileHandler.js');
const { guestBookHandler } = require('./src/handlers/guestBookHandler.js');
const { notFoundHandler } = require('./src/handlers/notFoundHandler.js');
const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/server/router.js');

const router = createRouter(serveStaticFrom('./public'), notFoundHandler);
startServer(80, router);
