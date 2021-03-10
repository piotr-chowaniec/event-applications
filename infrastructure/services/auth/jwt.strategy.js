const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { authentication } = require('../../../config');
const { getUserData, findUserByEmail } = require('../sequelize/helpers/user.helpers');

const {
  fromAuthHeaderAsBearerToken,
} = ExtractJwt;

const jwtStrategy = () => new JwtStrategy(
  {
    secretOrKey: authentication.jwtSecretKey,
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const { email } = payload;

    try {
      const user = await findUserByEmail(email);

      if (user) {
        const userData = getUserData(user);
        return done(null, userData);
      }

      done(null, false);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = jwtStrategy;
