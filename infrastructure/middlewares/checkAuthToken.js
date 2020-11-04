const httpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { authentication } = require('../../config');
const { verifyToken, prolongToken } = require('../services/auth/jwt.services');

const checkAuthToken = async (req, res, next) => {
  try {
    const jwtToken = req.header(authentication.authorizationKey);
    const user = verifyToken(jwtToken);
    const token = prolongToken(user);
    res.header(authentication.accessTokenKey, token);
    res.locals.user = { ...user };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(httpStatus.UNAUTHORIZED).send(httpStatus.getStatusText(httpStatus.UNAUTHORIZED));
    }
    return res.status(httpStatus.BAD_REQUEST).send(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
  }
};

module.exports = checkAuthToken;
