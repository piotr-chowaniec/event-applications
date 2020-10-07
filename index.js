const express = require('express');

const eventApplicationsApp = require('./app');
const { port } = require('./config');
const databaseConnectionServiceFactory = require('./infrastructure/services/databaseConnection');
const loggingMiddleware = require('./infrastructure/middlewares/logging');

(async function startup() {
  const app = express();

  app.locals.logger = loggingMiddleware.createLogger();
  const {
    getConnection,
    closeConnection,
  } = databaseConnectionServiceFactory(app.locals.logger);

  try {
    await getConnection();
    app.locals.logger.info('Successfully created DB connection pool.');
  } catch (error) {
    app.locals.logger.error('Creating DB connection pool failed.', error);
  }

  eventApplicationsApp(app);

  const server = app.listen(port, () => {
    app.locals.logger.info(`Application started on port: ${server.address().port}`);
  });

  server.on('close', () => {
    closeConnection();
    process.exit();
  });

  process.on('SIGTERM', () => {
    server.close();
  });

  process.on('SIGINT', () => {
    server.close();
  });
})();
