const fs = require('fs');
const request = require('supertest');
const { app } = require('../src/app.js');

const serveFrom = './test/data';
const dataFile = './test/data/guestBookData.json';

describe('GET static pages', () => {
  it('should give Not found response with 404 on GET /hello.html', (done) => {
    request(app({ serveFrom, dataFile }))
      .get('/hello')
      .expect('Not found')
      .expect(404, done);
  });

  it('should serve index.html on GET /', (done) => {
    request(app({ serveFrom, dataFile }))
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html')
      .expect('Index page', done);
  });
});

describe('GET /api', () => {
  const comments = [
    { name: "james", comment: "Hello", timestamp: "13/07/2022 11:06:48" }
  ]

  beforeEach(() => {
    fs.writeFileSync(dataFile, JSON.stringify(comments));
  });

  afterEach(() => fs.writeFileSync(dataFile, ''));

  it('should give comments as json on GET /api/comments', (done) => {
    request(app({ serveFrom, dataFile }))
      .get('/api/comments')
      .expect(200)
      .expect('content-type', 'application/json')
      .expect(comments, done);
  });
});
