const sequelize = require('sequelize');

const { hashPassword, comparePassword } = require('../../passwordHashing');

const getUserModel = sequelizeInstance => {
  const User = sequelizeInstance.define('user', {
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
    role: {
      type: sequelize.STRING,
      defaultValue: 'participant',
      validate: {
        isIn: [['participant', 'admin']],
      },
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: sequelize.DATE,
    },
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  User.comparePassword = (user, passwordToMatch) =>
    comparePassword(passwordToMatch, user.get('password')());

  return User;
};

module.exports = getUserModel;
