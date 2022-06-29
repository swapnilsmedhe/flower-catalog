const fs = require('fs');

const readGuestBook = (guestBookFile) => {
  const guestBook = fs.readFileSync(guestBookFile, 'utf8');
  return guestBook;
};

const getGuestBook = (guestBookFile) => {
  const guestBook = readGuestBook(guestBookFile);
  return guestBook ? JSON.parse(guestBook) : [];
};

const getTimestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

class GuestBook {
  #comments;

  constructor(comments) {
    this.#comments = comments;
  }

  addComment({ name, comment }) {
    this.#comments.unshift({ name, comment, timestamp: getTimestamp() });
  };

  toHtml() {
    return this.#comments.map(({ name, comment, timestamp }) =>
      `<p>${timestamp} ${name}: ${comment}</p>`
    ).join('');
  }

  toString() {
    return JSON.stringify(this.#comments);
  }
}

const createGuestBook = (guestBookFile) => {
  const comments = getGuestBook(guestBookFile);
  return new GuestBook(comments);
};

module.exports = { createGuestBook };
