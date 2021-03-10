const jwt = require('jsonwebtoken');

const { authentication } = require('../../../config');

const createToken = email =>
  jwt.sign(
    {
      email,
      expiresIn: Math.floor(Date.now() / 1000) + authentication.jwtExpireIn,
    },
    authentication.jwtSecretKey,
    {
      algorithm: 'HS256',
      expiresIn: authentication.jwtExpireInInactivity,
    }
  );

const prolongToken = ({ email, expiresIn }) =>
  jwt.sign({ expiresIn, email }, authentication.jwtSecretKey, {
    algorithm: 'HS256',
    expiresIn: authentication.jwtExpireInInactivity,
  });

const verifyToken = token => {
  const payload = jwt.verify(token, authentication.jwtSecretKey);
  const clockTimestamp = Math.floor(Date.now() / 1000);

  if (clockTimestamp >= payload.expiresIn) {
    throw new jwt.TokenExpiredError('jwt expired', new Date(payload.expiresIn * 1000));
  }
  return payload;
};

module.exports = {
  createToken,
  prolongToken,
  verifyToken,
};
