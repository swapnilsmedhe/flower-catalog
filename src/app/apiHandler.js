const createCommentsApiHandler = (guestBook) => (request, response) => {
  response.json(JSON.parse(guestBook.toString()));
};

module.exports = { createCommentsApiHandler }
