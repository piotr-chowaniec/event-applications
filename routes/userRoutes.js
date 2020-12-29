const { StatusCodes } = require('http-status-codes');

const { authentication } = require('../config');
const {
  loginUser,
  getAllUsers,
  getUserData,
  findUserById,
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
      await updateUserProfile(user.id, req.body);
      res.sendStatus(StatusCodes.NO_CONTENT);
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
      await deleteProfile(user.id);
      res.removeHeader(authentication.accessTokenKey);
      res.sendStatus(StatusCodes.NO_CONTENT);
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
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  router.get('/all', async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.send(users || {});
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const userData = getUserData(await findUserById(id));
      res.send(userData);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      await updateUserProfile(id, req.body);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      error.message = isValidationError(error)
        ? 'Sorry, that email is already in use'
        : error.message;
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      await deleteProfile(id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = userRoutes;
