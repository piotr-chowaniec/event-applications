const { Application } = require('../sequelizeInstance');

const getUserApplication = async currentUser =>
  await Application.findOne({
    where: {
      userId: currentUser.id,
    },
  });

const deleteUserApplication = async currentUser => {
  const application = await Application.findOne({
    where: {
      userId: currentUser.id,
    },
  });

  await application.destroy();
};

module.exports = {
  getUserApplication,
  deleteUserApplication,
};
