const fs = require('fs');

const writeToFile = (fileName, content) => {
  fs.writeFileSync(fileName, content);
};

const showGuestBook = (request, response, next) => {
  response.end(request.guestBook.toHtml());
};

const getComment = ({ bodyParams }) => {
  const comment = bodyParams.get('comment');
  const name = bodyParams.get('name');
  return { name, comment };
};

const commentsHandler = (request, response, next) => {
  const { guestBook } = request;
  const comment = getComment(request);
  guestBook.addComment(comment);

  writeToFile(request.guestBookFile, guestBook.toString());
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end();
};

const createGuestBookRouter = (guestBook, guestBookFile) =>
  (request, response, next) => {
    const { pathname } = request.url;
    if (pathname === '/guest-book' && request.method === 'GET') {
      request.guestBook = guestBook;
      showGuestBook(request, response);
      return;
    }

    if (pathname === '/add-comment' && request.method === 'POST') {
      request.guestBook = guestBook;
      request.guestBookFile = guestBookFile;
      commentsHandler(request, response, next);
      return;
    }
    next()
  };

module.exports = { createGuestBookRouter }
