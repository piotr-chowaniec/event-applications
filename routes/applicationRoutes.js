const { StatusCodes } = require('http-status-codes');

const { Application } = require('../infrastructure/services/sequelize/sequelizeInstance');
const {
  getUserApplication,
  getApplication,
  getAllApplication,
  deleteUserApplication,
  deleteApplication,
  updateUserApplication,
} = require('../infrastructure/services/sequelize/helpers/application.helpers');
const { isValidationError } = require('../infrastructure/services/sequelize/helpers/sequelize.helpers');

const applicationRoutes = ({ router }) => {
  router.get('/', async (req, res, next) => {
    const { user } = res.locals;

    try {
      const application = await getUserApplication(user);
      res.send(application || {});
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { user } = res.locals;
    const { eventDate } = req.body;

    try {
      await Application.create({
        eventDate,
        userId: user.id,
      });
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      error.message = isValidationError(error)
        ? `Sorry, you're already registered to event`
        : error.message;
      next(error);
    }
  });

  router.put('/', async (req, res, next) => {
    const { user } = res.locals;
    const { eventDate } = req.body;

    try {
      await updateUserApplication(user, eventDate);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/', async (req, res, next) => {
    const { user } = res.locals;

    try {
      await deleteUserApplication(user);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  router.get('/all', async (req, res, next) => {
    try {
      const application = await getAllApplication();
      res.send(application || {});
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const application = await getApplication(id);
      res.send(application || {});
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      await deleteApplication(id);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = applicationRoutes;
