const { getUserData, findUserByEmail } = require('../../infrastructure/services/sequelize/helpers/user.helpers');

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

  return router;
};

module.exports = userRoutes;
