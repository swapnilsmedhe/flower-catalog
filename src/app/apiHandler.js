const commentsApiHandler = (request, response, next) => {
  const { guestBook } = request;
  response.setHeader('Content-type', 'application/json');
  response.end(guestBook.toString());
}

const createApiHandler = (guestBook) => (request, response, next) => {
  const { pathname } = request.url;
  if (pathname === '/api/comments' && request.method === 'GET') {
    request.guestBook = guestBook;
    commentsApiHandler(request, response, next);
  }
  next();
};

module.exports = { createApiHandler }
