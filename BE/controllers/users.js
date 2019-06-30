"use strict";
import { User } from "../models/index";
import passport from "passport";

// GET user
function getUserByName(req, res, next) {
  const username = req.params.user_name;

  if (username === 'current') {
    return next()
  }

  return User.findOne({ username: username })
    .lean()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      next({ err: err.message, err, root: "getUserByName" });
    });
}

// POST new user 
function createUser(req, res, next) {
  const { userData } = req.body;

  passport.authenticate('local', (err, user) => {  
    if (err) {
      return res.send({ err })
    }

    if (!user) {
      const newUser = new User(userData);

      if (userData.password) {
        newUser.setHash(userData.password)
      }

      return newUser.save()
        .then(user => {
          res.send({ user: user.toAuthJSON() })
        })
        .catch(err => {
          res.status(409).send({ err })
        })
    }

	})(req, res, next);
}

// POST existing user login
function logUserIn(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.send({ err })
    }

    if (!user) {
	  	return res.send({ USER: 'none existent'});
    }
    
    return res.send({ user: user.toAuthJSON() })
	})(req, res, next);
}

// GET checks if user is currently logged in
function getUserLoginState(req, res, next) {
  if (req.user.id) {
    return User.findById(req.user.id)
      .then((user) => {
        return res.send({ user: user.toAuthJSON() });
      })
      .catch(err => {
        res.sendStatus(400);
        next({ err: err.message, err, root: "getUserLoginState Function" });
      })
  }
}

// update user
function updateUser(req, res, next) {}

// delete user
function deleteUser(req, res, next) {}

function validateUserData(data) {
  const { firstName, lastName, username, email, password } = data;

  // validate email first last pass username
  // BE CAREFUL OF XSS AND INJECTION HERE!!!!

  if (!firstName || firstName.length < 2) {
    return 'First name must be atleast 2 characters'
  }

  if (!lastName || lastName.length < 2) {
    return 'Last name must be at least 2 characters'
  }

  body('userData.firstName', 'must provide first name').exists(),
  body('userData.lastName', 'must provide last name').exists(),
  body('userData.username', 'userName doesn\'t exist').exists(),
  body('userData.email', 'Invalid email').exists().isEmail(),
  body('userData.password', 'Invalid password').exists()
}

module.exports = {
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  getUserLoginState
};
