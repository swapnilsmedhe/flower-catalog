const parseCookies = (cookieString) => {
  const cookies = {};
  if (!cookieString) {
    return cookies;
  }

  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  });
  return cookies;
};

const injectCookies = (request, response, next) => {
  const cookies = parseCookies(request.headers.cookie);
  request.cookies = cookies;
  next();
};

exports.injectCookies = injectCookies;
