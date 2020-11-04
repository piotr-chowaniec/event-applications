const passport = require('passport');

const jwtStrategy = require('./jwt.strategy');

const createPassportService = () => {
  passport.use(jwtStrategy());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return passport;
};

module.exports = createPassportService;
