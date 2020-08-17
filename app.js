const express = require('express');
const bodyParser = require('body-parser');

const { isProductionEnvironment } = require('./config');
const errorHandler = require('./infrastructure/middlewares/errorHandler');

module.exports = app => {
  app.use(bodyParser.json({ limit: '50mb' }));

  app.post('/api/register', async (req, res, next) => {
    const { body } = req;

    try {
      console.log(body);
      res.send({ message: 'api endpoint reached' });
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);

  if (isProductionEnvironment) {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
};
