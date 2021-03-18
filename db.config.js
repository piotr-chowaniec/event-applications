module.exports = {
  test: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
  development: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
  production: {
    host: process.env.MYSQL_HOST || 'db',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
};
