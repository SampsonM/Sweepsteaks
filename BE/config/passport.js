const LocalStrategy = require('passport-local').Strategy;
import passport from 'passport';
import Users from '../models/user';
import { createHash } from '../utils';

passport.use(new LocalStrategy((username, password, done) => {

  function passwordInvalid(password, salt, hash) {
    const loginPassHash = createHash(password, salt);

    return loginPassHash !== hash;
  }

  Users.findOne({ username: username })
    .then((user, err) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (passwordInvalid(password, user.salt, user.hash)) {
        return done('password invalid', false);
      }

      return done(null, user);
    });
  }
));