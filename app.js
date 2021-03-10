const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const { isProductionEnvironment } = require('./config');
const errorHandler = require('./infrastructure/middlewares/errorHandler');
const loggingMiddleware = require('./infrastructure/middlewares/logging');
const checkAuthToken = require('./infrastructure/middlewares/checkAuthToken');
const verifyUserEmail = require('./infrastructure/middlewares/verifyUserEmail');
const createPassportService = require('./infrastructure/services/auth/passport.service');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

module.exports = async app => {
  app.use(loggingMiddleware.addLoggers);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(passport.initialize());
  createPassportService();

  app.use('/api', apiRoutes);
  app.use('/api', checkAuthToken);
  app.use('/api', verifyUserEmail);

  app.use('/api/user', userRoutes({ router: express.Router() }));
  app.use('/api/application', applicationRoutes({ router: express.Router() }));

  app.use(errorHandler);

  if (isProductionEnvironment) {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
};
