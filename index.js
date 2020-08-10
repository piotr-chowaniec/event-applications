const express = require('express');

const { port } = require('./config');
const loggingMiddleware = require('./infrastructure/middlewares/logging');

(async function startup() {
  const app = express();

  app.locals.logger = loggingMiddleware.createLogger();

  const server = app.listen(port, () => {
    app.locals.logger.info(`Application started on port: ${server.address().port}`);
  });

  server.on('close', () => {
    process.exit();
  });

  process.on('SIGTERM', () => {
    server.close();
  });

  process.on('SIGINT', () => {
    server.close();
  });
})();
