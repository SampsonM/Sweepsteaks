const LocalStrategy = require('passport-local').Strategy;
import passport from 'passport';
import User from '../models/user';
import { createHash } from '../utils';

passport.use(new LocalStrategy((username, password, done) => {

  function passwordValid(password, salt, hash) {
    const loginPassHash = createHash(password, salt);

    return loginPassHash === hash;
  }

  User.findOne({ username })
    .then((user, err) => {
      if (err) {
        return done(err);
      }
      
      if (!user) {
        return done('Username not found, please enter valid username', false);
      }

      if (passwordValid(password, user.salt, user.hash)) {
        return done(null, user);
      }
      
      return done('Password invalid, please enter valid password or reset password', false);
    });
  }
));
