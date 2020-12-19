const { User, Application } = require('../sequelizeInstance');

const getUserApplication = async currentUser =>
  await Application.findOne({
    where: {
      userId: currentUser.id,
    },
  });

const getApplication = async id =>
  await Application.findOne({
    where: {
      id,
    },
  });

const getAllApplication = async () =>
  await Application.findAll({
    include: {
      model: User,
      attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
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


const deleteApplication = async id => {
  const application = await Application.findOne({
    where: {
      id,
    },
  });

  await application.destroy();
};

module.exports = {
  getUserApplication,
  getApplication,
  getAllApplication,
  updateUserApplication,
  deleteUserApplication,
  deleteApplication,
};
