const fs = require('fs');
const { URLSearchParams } = require('url');

const writeToFile = (fileName, content) => {
  fs.writeFileSync(fileName, content);
};

const showGuestBook = (request, response, next) => {
  response.end(request.guestBook.toHtml());
  return;
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
  return;
};

const createGuestBookHandler = (guestBook, guestBookFile) =>
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

      let data = '';
      request.setEncoding('utf8');
      request.on('data', (chunk) => data += chunk);
      request.on('end', () => {
        request.bodyParams = new URLSearchParams(data);
        commentsHandler(request, response, next);
      });
      return;
    }
    next()
  };

module.exports = { createGuestBookHandler }
