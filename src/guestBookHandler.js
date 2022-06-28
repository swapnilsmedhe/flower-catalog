const fs = require('fs');

const readComments = () => {
  const comments = fs.readFileSync('./data/comments.json', 'utf8');
  return comments;
};

const getComments = () => {
  const comments = readComments();
  return comments ? JSON.parse(comments) : [];
};

const readGuestBookTemplate = () => {
  const template = fs.readFileSync('./public/guest-book.html', 'utf8');
  return template;
};

const storeComments = (comments) => {
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments), 'utf8');
};

const generateCommentHtml = ({ name, comment, date }) => {
  return `<p>${date} ${name}: ${comment}</p>`;
};

const generateGuestBookHtml = (comments) => {
  const template = readGuestBookTemplate();
  const commentsHtml = comments.map(generateCommentHtml).join('');
  return template.replace('__COMMENTS__', commentsHtml);
};

const getTimestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const commentsHandler = (request, response) => {
  const comments = getComments();
  const { queryParams: { name, comment } } = request;

  if (name && comment) {
    comments.unshift({ name, comment, date: getTimestamp() });
    storeComments(comments);
  }

  const guestBook = generateGuestBookHtml(comments);
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
