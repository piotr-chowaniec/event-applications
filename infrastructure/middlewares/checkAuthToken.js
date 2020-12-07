const { StatusCodes, getReasonPhrase } = require('http-status-codes');
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
      return res.status(StatusCodes.UNAUTHORIZED).send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
    }
    return res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }
};

module.exports = checkAuthToken;
