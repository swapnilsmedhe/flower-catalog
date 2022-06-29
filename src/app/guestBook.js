const getTimestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

class GuestBook {
  #guestBook;
  constructor(guestBook) {
    this.#guestBook = guestBook;
  }

  addComment({ name, comment }) {
    this.#guestBook.unshift({ name, comment, timestamp: getTimestamp() });
  };

  toHtml() {
    return this.#guestBook.map(({ name, comment, timestamp }) =>
      `<p>${timestamp} ${name}: ${comment}</p>`
    ).join('');
  }

  get commentList() {
    return this.#guestBook;
  }
}

module.exports = { GuestBook };
