module.exports = {
  applicationName: 'event-applications',
  port: process.env.Port || 7000,
  isProductionEnvironment: process.env.NODE_ENV === 'production',
  loggingLevel: process.env.LOGGING_LEVEL || 'DEBUG',
};
