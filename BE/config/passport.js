const LocalStrategy = require('passport-local').Strategy;
import passport from 'passport';
import Users from '../models/user';

passport.use(new LocalStrategy((username, password, done) => {
  Users.findOne({ username: username})
    .then((user, err) => {
      console.log('user', user)
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
));
