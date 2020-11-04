const express = require('express');

const eventApplicationsApp = require('./app');
const { port } = require('./config');
const { connectToDb } = require('./infrastructure/services/sequelize/sequelizeInstance');
const loggingMiddleware = require('./infrastructure/middlewares/logging');

(async function startup() {
  const app = express();

  app.locals.logger = loggingMiddleware.createLogger();
  const sequelizeInstance = await connectToDb(app.locals.logger);

  eventApplicationsApp(app);

  const server = app.listen(port, () => {
    app.locals.logger.info(`Application started on port: ${server.address().port}`);
  });

  server.on('close', () => {
    sequelizeInstance.close();
    process.exit();
  });

  process.on('SIGTERM', () => {
    server.close();
  });

  process.on('SIGINT', () => {
    server.close();
  });
})();
