const http = require('http');

const server = (function start() {
  const startServer = (app) => {
    const s = http.createServer(app);
    return s;
  };
  return {
    startServer,
  };
}());

const params = (function start(){
  return {};
}());

const callbacks = (function start(){
  return {};
}());

module.exports = { server, params, callbacks };
