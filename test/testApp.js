const fs = require('fs');
const request = require('supertest');
const { app } = require('../src/app.js');

const logger = (x) => x;
const serveFrom = './test/data';
const dataFile = './test/data/guestBookData.json';
const config = { serveFrom, dataFile, logger };

describe('GET static pages', () => {
  it('should give Not found response with 404 on GET /hello.html', (done) => {
    request(app(config))
      .get('/hello')
      .expect('Not found')
      .expect(404, done);
  });

  it('should serve index.html on GET /', (done) => {
    request(app(config))
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
    request(app(config))
      .get('/api/comments')
      .expect(200)
      .expect('content-type', 'application/json')
      .expect(comments, done);
  });
});

describe('GET /login', () => {
  it('should give login page when user is not logged in', (done) => {
    request(app(config))
      .get('/login')
      .expect(200)
      .expect('content-type', 'text/html')
      .expect(/<form action="\/login" method="post">/, done);
  });

  it('should redirect to /guest-book when user has already logged in', (done) => {
    const users = {};

    const sessions = {
      '1657696970414': {
        username: 'james',
        time: '2022-07-13T07:22:50.414Z',
        sessionId: 1657696970414
      }
    }

    request(app(config, users, sessions))
      .get('/login')
      .set('cookie', 'sessionId=1657696970414')
      .expect('Location', '/guest-book')
      .expect(302, done);
  });
});

describe('POST /login', () => {
  it('should redirect to /guest-book on successful login', (done) => {
    const users = { john: { name: 'John', password: 'john123' } };

    const sessions = {
      '1657696970414': {
        username: 'james',
        time: '2022-07-13T07:22:50.414Z',
        sessionId: 1657696970414
      }
    }

    request(app(config, users, sessions))
      .post('/login')
      .send('username=john&password=john123')
      .expect('Location', '/guest-book')
      .expect('set-cookie', /sessionId=..*/)
      .expect(302, done);
  });

  it('should respond 401 for unauthorised users', (done) => {
    const users = {};
    const sessions = {};

    request(app(config, users, sessions))
      .post('/login')
      .send('username=james&password=james5')
      .expect(401)
      .expect('Invalid username or password', done)
  });
});
