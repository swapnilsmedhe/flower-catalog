const fs = require('fs');

const readGuestBook = () => {
  const comments = fs.readFileSync('./data/guestBook.json', 'utf8');
  return comments;
};

const getGuestBook = () => {
  const guestBook = readGuestBook();
  return guestBook ? JSON.parse(guestBook) : [];
};

const readGuestBookTemplate = () => {
  const template = fs.readFileSync('./resources/guest-book-template.html', 'utf8');
  return template;
};

const saveGuestBook = (comments) => {
  fs.writeFileSync('./data/guestBook.json', JSON.stringify(comments), 'utf8');
};

const generateGuestBookPage = (guestBook) => {
  const template = readGuestBookTemplate();
  return template.replace('__COMMENTS__', guestBook.toHtml());
};

const showGuestBook = (request, response) => {
  response.end(generateGuestBookPage(request.guestBook));
  return true;
};

const getComment = ({ searchParams }) => {
  const comment = searchParams.get('comment');
  const name = searchParams.get('name');
  return { name, comment };
};

const commentsHandler = (request, response) => {
  const { guestBook } = request;
  const comment = getComment(request.url);
  guestBook.addComment(comment);

  saveGuestBook(guestBook.commentList)
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end();
  return true;
};

const createGuestBookHandler = (guestBook) => (request, response) => {
  const { pathname } = request.url;
  if (pathname === '/guest-book' && request.method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'GET') {
    request.guestBook = guestBook;
    return commentsHandler(request, response);
  }
  return false;
};

module.exports = { createGuestBookHandler, getGuestBook }
