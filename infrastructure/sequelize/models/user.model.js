const sequelize = require('sequelize');

const User = sequelizeInstance =>
  sequelizeInstance.define('User', {
    id: {
      type: sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue('password');
      },
    },
    salt: {
      type: sequelize.STRING,
      get() {
        return () => this.getDataValue('salt');
      },
    },
    role: {
      type: sequelize.STRING,
      defaultValue: 'participant',
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: sequelize.DATE,
    },
  });

module.exports = User;
