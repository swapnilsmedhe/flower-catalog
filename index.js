const { serveStaticFrom } = require('./src/app/staticFileHandler.js');
const { guestBookHandler } = require('./src/app/guestBookHandler.js');
const { notFoundHandler } = require('./src/app/notFoundHandler.js');
const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/server/router.js');

const router = createRouter(serveStaticFrom('./public'), notFoundHandler);
startServer(80, router);
