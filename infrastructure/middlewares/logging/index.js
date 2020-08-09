const bunyan = require('bunyan');

const { applicationName, loggingLevel } = require('../../../config');

const createLogger = () => bunyan.createLogger({
  name: applicationName,
  level: loggingLevel,
});

module.exports = {
  createLogger,
};
