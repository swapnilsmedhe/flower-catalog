const { startServer } = require('./src/server/server.js');
const { app } = require("./src/app");

const configuration = {
  serveFrom: './public',
  dataFile: './data/guestBook.json'
};

startServer(80, app(configuration));
