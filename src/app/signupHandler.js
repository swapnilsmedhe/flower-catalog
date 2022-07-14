const createSignupHandler = (users) => (request, response) => {
  const { name, username, password } = request.body;
  users[username] = { name, password };
  response.status(201).end('signed up');
};

module.exports = { createSignupHandler };
