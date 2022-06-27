const parseQueryParams = (paramString) => {
  const queryParams = {};
  const params = paramString.split('&');

  params.forEach((param) => {
    const [field, value] = param.split('=');
    queryParams[field] = value;
  });

  return queryParams;
};

const parseUri = (rawUri) => {
  let queryParams = {};
  const [uri, paramString] = rawUri.split('?');
  if (paramString) {
    queryParams = parseQueryParams(paramString);
  }
  return { uri, queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  return { method, ...parseUri(rawUri), httpVersion };
};

const splitHeader = (line) => {
  const separatorIndex = line.indexOf(':');
  const header = line.substring(0, separatorIndex).trim();
  const value = line.substring(separatorIndex + 1).trim();
  return { header: header.toLowerCase(), value };
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;

  while (index < lines.length && lines[index].length > 0) {
    const { header, value } = splitHeader(lines[index]);
    headers[header] = value;
    index++;
  }
  return headers;
};

const parseRequest = (request) => {
  const lines = request.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest, parseHeaders, splitHeader };
