const Sequelize = require('sequelize');

const config = require('../../../config');

const UserModelDefinition = require('./models/user.model');

const { database, username, password, host, port, dialect } = config.dbConfig;

const associateTables = sequelizeInstance => {
  const User = UserModelDefinition(sequelizeInstance);

  return { User };
};

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  logging: false,
});

const connectToDb = async logger => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info('Connection to the database has been established successfully.');
    return sequelize;
  } catch (err) {
    logger.error('Failed to connect to the database.', err);
    process.exit(0);
  }
};

const { User } = associateTables(sequelize);

module.exports = {
  sequelize,
  connectToDb,
  User,
};
