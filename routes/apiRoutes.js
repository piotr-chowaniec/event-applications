const express = require('express');
const passport = require('passport');
const { StatusCodes } = require('http-status-codes');
const { userSchemas } = require('@common-packages/validators');

const checkAuthToken = require('../infrastructure/middlewares/checkAuthToken');
const { User } = require('../infrastructure/services/sequelize/sequelizeInstance');
const { isValidationError } = require('../infrastructure/services/sequelize/helpers/sequelize.helpers');
const { loginUser } = require('../infrastructure/services/sequelize/helpers/user.helpers');
const validate = require('../infrastructure/validate');
const { authentication } = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await validate(req.body, userSchemas.registerUserSchema);
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = await loginUser({ email, password });
    res.header(authentication.accessTokenKey, token);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    error.message = isValidationError(error)
      ? 'Sorry, that email is already in use'
      : error.message;
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await validate(req.body, userSchemas.loginUserSchema);
    const token = await loginUser({ email, password });
    res.header(authentication.accessTokenKey, token);
    res.send({ message: 'Successfully logged in' });
  } catch (error) {
    next(error);
  }
});

router.get('/authorize', passport.authenticate('jwt'), (req, res) => {
  res.sendStatus(StatusCodes.NO_CONTENT);
});

router.get('/test-auth', checkAuthToken, (req, res) => {
  res.send('Authorized');
});

module.exports = router;
