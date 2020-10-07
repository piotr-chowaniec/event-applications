module.exports = {
  applicationName: 'event-applications',
  port: process.env.Port || 7000,
  isProductionEnvironment: process.env.NODE_ENV === 'production',
  loggingLevel: process.env.LOGGING_LEVEL || 'DEBUG',

  dbConfig: {
    server: process.env.SQL_SERVER || 'sql-server',
    database: process.env.SQL_DATABASE || 'master',
    user: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PASSWORD || 'secretPassword123',
    options: {
      enableArithAbort: true,
    },
  },
};
