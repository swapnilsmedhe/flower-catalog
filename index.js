const { startServer } = require('./src/server/server.js');
const { createApp } = require("./src/app");

const configuration = {
  serveFrom: './public',
  dataFile: './data/guestBook.json',
  logger: console.log
};

const users = { root: { name: 'root', password: 'root' } };
const sessions = {};

startServer(80, createApp(configuration, users, sessions));
