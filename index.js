const { createApp } = require("./src/app");

const configuration = {
  serveFrom: './public',
  dataFile: './data/guestBook.json',
  logger: console.log
};

const users = { root: { name: 'root', password: 'root' } };
const sessions = {};
const app = createApp(configuration, users, sessions);

app.listen(80);
