const bunyan = require('bunyan');

const { applicationName, loggingLevel } = require('../../config');

const createLogger = () => bunyan.createLogger({
  name: applicationName,
  level: loggingLevel,
});

const addLoggers = (_req, res, next) => {
  res.locals.logger = createLogger();

  next();
};

module.exports = {
  createLogger,
  addLoggers,
};
