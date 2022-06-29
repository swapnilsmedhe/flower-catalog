const { startServer } = require('./src/server/server.js');
const { handle } = require("./src/app");

startServer(80, handle);
