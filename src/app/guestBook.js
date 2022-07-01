const fs = require('fs');

const readFile = (fileName) => {
  const content = fs.readFileSync(fileName, 'utf8');
  return content;
};

const getGuestBook = (guestBookFile) => {
  const guestBook = readFile(guestBookFile);
  return guestBook ? JSON.parse(guestBook) : [];
};

const getTimestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const generateCommentRow = ({ name, comment, timestamp }) => {
  return `<tr><td>${timestamp}</td><td>${name}</td><td>${comment}</td></tr>`;
};

class GuestBook {
  #comments;
  #template;

  constructor(comments, template) {
    this.#comments = comments;
    this.#template = template;
  }

  addComment({ name, comment }) {
    this.#comments.unshift({ name, comment, timestamp: getTimestamp() });
  };

  toHtml() {
    const commentsHtml = this.#comments.map(generateCommentRow).join('');
    return this.#template.replace('__COMMENTS__', commentsHtml);
  }

  toString() {
    return JSON.stringify(this.#comments);
  }
}

const createGuestBook = (guestBookFile, templateFile) => {
  const comments = getGuestBook(guestBookFile);
  const template = readFile(templateFile);
  return new GuestBook(comments, template);
};

module.exports = { createGuestBook };
