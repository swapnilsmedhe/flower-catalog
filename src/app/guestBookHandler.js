const fs = require('fs');

const writeToFile = (fileName, content) => {
  fs.writeFileSync(fileName, content);
};

const createGuestBookHandler = (guestBook) => (request, response) => {
  if (!request.session) {
    response.redirect('/login');
    return;
  }
  response.end(guestBook.toHtml());
};

const createAddcommentsHandler = (guestBook, guestBookFile) =>
  (request, response) => {
    const comment = request.body;
    guestBook.addComment(comment);

    writeToFile(guestBookFile, guestBook.toString());
    response.status(201).end();
  };

module.exports = { createGuestBookHandler, createAddcommentsHandler }
