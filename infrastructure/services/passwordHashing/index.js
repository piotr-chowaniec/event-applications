const bcrypt = require('bcrypt');

const hashPassword = async user => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password(), 10);
  }
};

const comparePassword = (plainTextPassword, password) =>
  bcrypt.compare(plainTextPassword, password);

module.exports = {
  hashPassword,
  comparePassword,
};
