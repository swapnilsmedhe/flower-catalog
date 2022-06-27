const EOL = '\r\n';

const statusMessages = {
  200: 'OK',
  404: 'Not found'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #responseLine() {
    const httpVersion = 'HTTP/1.1';
    const statusMessage = statusMessages[this.#statusCode];
    return [httpVersion, this.#statusCode, statusMessage].join(' ') + EOL;
  }

  addHeader(field, value) {
    this.#headers[field] = value;
  }

  #sendHeaders() {
    Object.entries(this.#headers).forEach(([field, value]) => {
      this.#socket.write(`${field}: ${value}${EOL}`);
    });
  }

  send(body) {
    this.addHeader('Content-Length', body.length);

    this.#socket.write(this.#responseLine());
    this.#sendHeaders();
    this.#socket.write(EOL)
    this.#socket.write(body);
    this.#socket.end();
  }
}

module.exports = { Response };
