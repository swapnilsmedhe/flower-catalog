const { parseRequest } = require('./requestParser.js');
const { Response } = require('./response.js');

const onConnection = (socket, handler) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    console.log(request.method, request.uri);
    handler(request, response);
  });
  socket.on('error', (err) => console.error(err));
}

module.exports = { onConnection };
