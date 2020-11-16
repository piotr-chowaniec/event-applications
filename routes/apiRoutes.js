const express = require('express');
const passport = require('passport');
const httpStatus = require('http-status-codes');
const get = require('lodash.get');

const checkAuthToken = require('../infrastructure/middlewares/checkAuthToken');
const { User } = require('../infrastructure/services/sequelize/sequelizeInstance');
const { loginUser } = require('../infrastructure/services/sequelize/helpers/user.helpers');
const { authentication } = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = await loginUser({ email, password });
    res.header(authentication.accessTokenKey, token);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    const errorNo = get(error, 'parent.errno', null);
    if (errorNo === 1062) {
      error.message = 'Sorry, that email is already in use';
    }
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser({ email, password });
    res.header(authentication.accessTokenKey, token);
    res.send({ message: 'Successfully logged in' });
  } catch (error) {
    next(error);
  }
});

router.get('/authorize', passport.authenticate('jwt'), (req, res) => {
  res.sendStatus(httpStatus.NO_CONTENT);
});

router.get('/test-auth', checkAuthToken, (req, res) => {
  res.send('Authorized');
});

module.exports = router;
