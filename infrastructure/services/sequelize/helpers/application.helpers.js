const { Application } = require('../sequelizeInstance');

const getUserApplication = async currentUser =>
  await Application.findOne({
    where: {
      userId: currentUser.id,
    },
  });

const updateUserApplication = async (currentUser, newEventDate) => {
  const application = await Application.findOne({
    where: {
      id: currentUser.id,
    },
  });

  application.setDataValue('eventDate', newEventDate);

  await application.save();
};

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
  updateUserApplication,
  deleteUserApplication,
};
