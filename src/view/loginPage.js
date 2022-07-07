const loginPage = `<html>
<head><title>Login</title></head>
<body>
  <form action="/login" method="post">
  <div>
    <label for="username">Username</label>
    <input type="text" name="username">
  </div>
  <input type="submit">
  </form>
</body>
</html>`

module.exports = { loginPage };
