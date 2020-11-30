const sequelize = require('sequelize');

const getApplicationModel = sequelizeInstance => {
  const Application = sequelizeInstance.define('application', {
    id: {
      type: sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    eventDate: {
      type: sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: sequelize.DATE,
    },
  });

  return Application;
};

module.exports = getApplicationModel;
