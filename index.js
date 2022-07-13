const { startServer } = require('./src/server/server.js');
const { app } = require("./src/app");

const configuration = {
  serveFrom: './public',
  dataFile: './data/guestBook.json'
};

const sessions = {};

startServer(80, app(configuration, sessions));
