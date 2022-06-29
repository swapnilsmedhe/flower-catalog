const { startServer } = require('./src/server/server.js');
const { app } = require("./src/app");

startServer(80, app);
