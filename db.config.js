module.exports = {
  test: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DB || 'eventApplication',
    username: process.env.MYSQL_USER || 'Developer',
    password: process.env.MYSQL_PASS || 'secretPassword123',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
  },
  development: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DB || 'eventApplication',
    username: process.env.MYSQL_USER || 'Developer',
    password: process.env.MYSQL_PASS || 'secretPassword123',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
  },
  production: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DB || 'eventApplication',
    username: process.env.MYSQL_USER || 'Developer',
    password: process.env.MYSQL_PASS || 'secretPassword123',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
  },
};
