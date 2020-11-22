const { User } = require('../sequelizeInstance');
const { createToken } = require('../../auth/jwt.services');

const getUserData = user => ({
  id: user.get('id'),
  email: user.get('email'),
  role: user.get('role'),
  firstName: user.get('firstName'),
  lastName: user.get('lastName'),
});

const findUserByEmail = async email =>
  await User.findOne({
    where: {
      email,
    },
  });

const getAllUsers = async () =>
  await User.findAll({
    order: [['lastName', 'ASC']],
  });


const updateUserProfile = async (currentUser, updatedFields) => {
  const user = await User.findOne({
    where: {
      id: currentUser.id,
    },
  });

  const updatableFields = [
    'firstName',
    'lastName',
    'email',
  ];

  updatableFields.forEach(field => {
    if (typeof updatedFields[field] !== 'undefined') {
      user.setDataValue(field, updatedFields[field]);
    }
  });

  await user.save();
};

const updateUserPassword = async (currentUser, newPassword) => {
  const user = await User.findOne({
    where: {
      id: currentUser.id,
    },
  });

  user.setDataValue('password', newPassword);

  await user.save();
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Provided account does not exists');
  }
  const isMatch = await User.comparePassword(user, password);
  if (!isMatch) {
    throw new Error('Invalid password or email');
  }
  const userData = getUserData(user);
  return createToken(userData.email);
};

module.exports = {
  getUserData,
  findUserByEmail,
  getAllUsers,
  updateUserProfile,
  updateUserPassword,
  loginUser,
};
