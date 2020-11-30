const httpStatus = require('http-status-codes');

const { authentication } = require('../config');
const {
  loginUser,
  getUserData,
  findUserByEmail,
  updateUserProfile,
  updateUserPassword,
  deleteProfile,
} = require('../infrastructure/services/sequelize/helpers/user.helpers');
const { isValidationError } = require('../infrastructure/services/sequelize/helpers/sequelize.helpers');

const userRoutes = ({ router }) => {
  router.get('/', async (req, res, next) => {
    const { user } = res.locals;

    try {
      const userData = getUserData(await findUserByEmail(user.email));
      res.send(userData);
    } catch (error) {
      next(error);
    }
  });

  router.put('/', async (req, res, next) => {
    const { user } = res.locals;

    try {
      await updateUserProfile(user, req.body);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      error.message = isValidationError(error)
        ? 'Sorry, that email is already in use'
        : error.message;
      next(error);
    }
  });

  router.delete('/', async (req, res, next) => {
    const { user } = res.locals;

    try {
      await deleteProfile(user);
      res.removeHeader(authentication.accessTokenKey);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  router.put('/password', async (req, res, next) => {
    const { user } = res.locals;
    const { password } = req.body;

    try {
      await updateUserPassword(user, password);
      const token = await loginUser({ email: user.email, password });
      res.header(authentication.accessTokenKey, token);
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = userRoutes;
