const request = require('supertest');
const { app } = require('../src/app.js');

const serveFrom = './test/data';
const dataFile = './test/data/guestBookData.json';

describe('App Test', () => {
  it('should give Not found response with 404 on GET /hello', (done) => {
    request(app({ serveFrom, dataFile }))
      .get('/hello')
      .expect(404, done);
  });
});
