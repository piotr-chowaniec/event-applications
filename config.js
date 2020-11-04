const dbConfig = require('./db.config');

const env = process.env.NODE_ENV || 'development';
const eightHours = 28800;
const thirtyMinutes = 1800;

module.exports = {
  applicationName: 'event-applications',
  port: process.env.Port || 7000,
  isProductionEnvironment: process.env.NODE_ENV === 'production',
  loggingLevel: process.env.LOGGING_LEVEL || 'DEBUG',
  dbConfig: dbConfig[env],

  authentication: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY || 'access_token',
    authorizationKey: process.env.AUTHORIZATION_KEY || 'authorization',
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'NotSoSecretKey',
    jwtExpireIn: process.env.JWT_EXPIRE_IN ? parseInt(process.env.JWT_EXPIRE_IN) : eightHours,
    jwtExpireInInactivity: process.env.JWT_EXPIRE_IN_INACTIVITY
      ? parseInt(process.env.JWT_EXPIRE_IN_INACTIVITY)
      : thirtyMinutes,
  },
};
