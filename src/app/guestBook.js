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
    const commentsHtml = this.#comments.map(({ name, comment, timestamp }) =>
      `<p>${timestamp} ${name}: ${comment}</p>`
    ).join('');
    return this.#template.replace('__COMMENTS', commentsHtml);
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
