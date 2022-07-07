const loginPage = `<html>
<head><title>Login</title></head>
<body>
  <form action="/login" method="post">
  <div>
    <label for="username">Username</label>
    <input type="text" name="username">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password">
  </div>
  <input type="submit" value="Login">
  </form>
</body>
</html>`

module.exports = { loginPage };
