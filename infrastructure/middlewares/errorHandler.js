const httpStatus = require('http-status-codes');

const errorHandler = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = res.locals;

  if (!error.httpStatusCode) {
    logger.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }

  const errorResponse = {
    details: error.details || null,
    message: error.message || null,
    statusText: httpStatus.getStatusText(error.httpStatusCode),
  };

  logger.error({
    ...errorResponse,
    ...(error.stack ? { stack: error.stack } : {}),
  });

  return res.status(error.httpStatusCode).send(errorResponse);
};

module.exports = errorHandler;
