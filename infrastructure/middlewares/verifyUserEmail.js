const httpStatus = require('http-status-codes');

const { findUserByEmail, getUserData } = require('../services/sequelize/helpers/user.helpers');

const verifyUserEmail = async (req, res, next) => {
  const { logger } = res.locals;
  const { email } = res.locals.user;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(httpStatus.FORBIDDEN).send(httpStatus.getStatusText(httpStatus.FORBIDDEN));
    }

    res.locals.user = { ...res.locals.user, ...getUserData(user) };
    next();
  } catch (error) {
    logger.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

module.exports = verifyUserEmail;
