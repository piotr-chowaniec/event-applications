const { StatusCodes } = require('http-status-codes');
const { applicationSchema } = require('@common-packages/validators');

const { Application } = require('../infrastructure/services/sequelize/sequelizeInstance');
const {
  getUserApplication,
  getApplication,
  getAllApplication,
  deleteApplication,
  updateApplication,
} = require('../infrastructure/services/sequelize/helpers/application.helpers');
const validate = require('../infrastructure/validate');
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
      await validate(req.body, applicationSchema);
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

  router.get('/all', async (req, res, next) => {
    try {
      const applications = await getAllApplication();
      res.send(applications || {});
    } catch (error) {
      next(error);
    }
  });

  router.get('/:applicationId', async (req, res, next) => {
    const { applicationId } = req.params;

    try {
      const application = await getApplication(applicationId);
      res.send(application || {});
    } catch (error) {
      next(error);
    }
  });

  router.put('/:applicationId', async (req, res, next) => {
    const { applicationId } = req.params;
    const { eventDate } = req.body;

    try {
      await validate(req.body, applicationSchema);
      await updateApplication(applicationId, eventDate);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:applicationId', async (req, res, next) => {
    const { applicationId } = req.params;

    try {
      await deleteApplication(applicationId);
      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = applicationRoutes;
