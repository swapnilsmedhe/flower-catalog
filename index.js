const { startServer } = require('./src/server/server.js');
const { app } = require("./src/app");

const configuration = {
  serveFrom: './public',
  dataFile: './data/guestBook.json',
  logger: console.log
};

const users = {
  swapnil: {
    name: 'Swapnil',
    password: 'IamSwapnil',
  },
  azhar: {
    name: 'Azhar',
    password: 'ha toh'
  }
};

const sessions = {};

startServer(80, app(configuration, users, sessions));
