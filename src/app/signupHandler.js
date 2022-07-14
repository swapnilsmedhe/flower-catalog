const getUserCredentials = ({ bodyParams }) => {
  const name = bodyParams.get('name');
  const username = bodyParams.get('username');
  const password = bodyParams.get('password');
  return { name, username, password };
};

const createSignupHandler = (users) => (request, response, next) => {
  const { pathname } = request.url;
  if (pathname !== '/signup' || request.method !== 'POST') {
    next();
    return;
  }

  const { name, username, password } = getUserCredentials(request);
  users[username] = { name, password };
  response.statusCode = 201;
  response.end('signed up');
};

module.exports = { createSignupHandler };
