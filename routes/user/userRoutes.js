const get = require('lodash.get');
const httpStatus = require('http-status-codes');

const {
  getUserData,
  findUserByEmail,
  updateUserProfile,
} = require('../../infrastructure/services/sequelize/helpers/user.helpers');

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
      const errorNo = get(error, 'parent.errno', null);
      if (errorNo === 1062) {
        error.message = 'Sorry, that email is already in use';
      }
      next(error);
    }
  });

  return router;
};

module.exports = userRoutes;
