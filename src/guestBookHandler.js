const fs = require('fs');

const readComments = () => {
  const comments = fs.readFileSync('./data/comments.json', 'utf8');
  return JSON.parse(comments);
};

const readGuestBookTemplate = () => {
  const template = fs.readFileSync('./public/guest-book.html', 'utf8');
  return template;
};

const updateComments = (comments) => {
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments), 'utf8');
};

const generateGuestBook = (comments) => {
  const template = readGuestBookTemplate();

  const commentsHtlm = comments.map(({ name, comment, date }) => {
    return `<p>${date} ${name} ${comment}</p>`;
  }).join('');

  return template.replace('__COMMENTS__', commentsHtlm);
};

const commentsHandler = (request, response) => {
  const comments = readComments();
  const { queryParams: { name, comment } } = request;

  if (name && comment) {
    comments.unshift({ name, comment, date: new Date().toString() });
    updateComments(comments);
  }

  const guestBook = generateGuestBook(comments);
  response.send(guestBook);
  return true;
};

const guestBookHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guest-book') {
    return commentsHandler(request, response);
  }
  return false;
};

module.exports = { guestBookHandler }
