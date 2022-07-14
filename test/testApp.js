const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app.js');

const logger = (x) => x;
const serveFrom = './test/data';
const dataFile = './test/data/guestBookData.json';
const config = { serveFrom, dataFile, logger };

describe('GET static pages', () => {
  it('should give Not found response with 404 on GET /hello.html', (done) => {
    request(createApp(config))
      .get('/hello')
      .expect('Not found')
      .expect(404, done);
  });

  it('should serve index.html on GET /', (done) => {
    request(createApp(config))
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html')
      .expect('Index page', done);
  });
});

describe('GET /api', () => {
  const comments = [
    { name: "james", comment: "Hello", timestamp: "13/07/2022 11:06:48" }
  ];

  beforeEach(() => {
    fs.writeFileSync(config.dataFile, JSON.stringify(comments));
  });

  afterEach(() => fs.writeFileSync(config.dataFile, ''));

  it('should give comments as json on GET /api/comments', (done) => {
    request(createApp(config))
      .get('/api/comments')
      .expect(200)
      .expect('content-type', 'application/json')
      .expect(comments, done);
  });
});

describe('GET /login', () => {
  it('should give login page when user is not logged in', (done) => {
    request(createApp(config))
      .get('/login')
      .expect(200)
      .expect('content-type', 'text/html')
      .expect(/<form action="\/login" method="post">/, done);
  });

  it('should redirect to /guest-book when user has already logged in', (done) => {
    const users = {};
    const sessions = {
      '348': {
        username: 'james', time: '2022-07-13T07:22:50.414Z', sessionId: 348
      }
    }

    request(createApp(config, users, sessions))
      .get('/login')
      .set('cookie', 'sessionId=348')
      .expect('Location', '/guest-book')
      .expect(302, done);
  });
});

describe('POST /login', () => {
  it('should redirect to /guest-book on successful login', (done) => {
    const users = { james: { name: 'James', password: 'james123' } };
    const sessions = {
      '348': {
        username: 'james', time: '2022-07-13T07:22:50.414Z', sessionId: 348
      }
    }

    request(createApp(config, users, sessions))
      .post('/login')
      .send('username=james&password=james123')
      .expect('Location', '/guest-book')
      .expect('set-cookie', /sessionId=..*/)
      .expect(302, done);
  });

  it('should respond 401 for unauthorised users', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=james&password=james5')
      .expect(401)
      .expect('Invalid username or password', done)
  });
});

describe('GET /logout', () => {
  it('should log a user out on GET /logout', (done) => {
    const users = { james: { name: 'james', password: 'james123' } };
    const sessions = {
      '348': {
        username: 'james', time: '2022-07-13T07:22:50.414Z', sessionId: 348
      }
    }

    request(createApp(config, users, sessions))
      .get('/logout')
      .set('cookie', 'sessionId=348')
      .expect('set-cookie', 'sessionId=348; Max-Age=0')
      .expect(302)
      .expect('Location', '/login', done);
  });
});

describe('GET /guest-book', () => {
  const comments = [
    { name: "james", comment: "Hello", timestamp: "13/07/2022 11:06:48" }
  ];

  beforeEach(() => fs.writeFileSync(config.dataFile, JSON.stringify(comments)));
  afterEach(() => fs.writeFileSync(config.dataFile, ''));

  const users = { james: { name: 'james', password: 'james123' } };
  const sessions = {
    '348': {
      username: 'james', time: '2022-07-13T07:22:50.414Z', sessionId: 348
    }
  }

  it('should respond with guest book when authorized user requests', (done) => {
    request(createApp(config, users, sessions))
      .get('/guest-book')
      .set('Cookie', 'sessionId=348')
      .expect(200)
      .expect(/james.*Hello/, done);
  });

  it('should redirect to login page when unauthorized user requests', (done) => {
    request(createApp(config))
      .get('/guest-book')
      .set('cookie', 'sessionId=123')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('POST /add-comment', () => {
  it('should post a comment', (done) => {
    const users = {};
    const sessions = {
      '348': {
        username: 'james', time: '2022-07-13T07:22:50.414Z', sessionId: 348
      }
    }

    request(createApp(config, users, sessions))
      .post('/add-comment')
      .set('Cookie', 'sessionId=348')
      .send('name=james&comment=hello')
      .expect(201, done);
  });
});
