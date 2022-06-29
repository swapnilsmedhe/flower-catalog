const commentsApiHandler = (request, response) => {
  const { guestBook } = request;
  response.setHeader('Content-type', 'application/json');
  response.end(guestBook.toString());
  return true;
}

const createApiHandler = (guestBook) => (request, response) => {
  const { pathname } = request.url;
  if (pathname === '/api/comments' && request.method === 'GET') {
    request.guestBook = guestBook;
    return commentsApiHandler(request, response);
  }
  return false;
};

module.exports = { createApiHandler }
