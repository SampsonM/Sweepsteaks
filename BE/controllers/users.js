"use strict";
import { Users } from "../models/index";
import passport from "passport";
import { body } from 'express-validator/check';

// GET user
function getUserByName(req, res, next) {
  const username = req.params.user_name;

  return Users.findOne({ username: username })
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

  // Validate User Request
  // first, last, user, email, hash, salt
  
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.send({ err })
    }

    if (!user) {
      const newUser = new Users(userData);

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
function userLoggedIn(req, res, next) {
  const { id } = req.query;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.send({ user: user.toAuthJSON() });
    })
    .catch(err => {
      next({ err: err.message, err, root: "iuserLoggedIn Function" });
    })
}

// update user
function updateUser(req, res, next) {}

// delete user
function deleteUser(req, res, next) {}

function validate(method) {
  switch (method) {
    case 'createUser': {
     return [ 
        body('userData.firstName', 'Invalid email').exists(),
        body('userData.lastName', 'Invalid email').exists(),
        body('userData.username', 'userName doesn\'t exist').exists(),
        body('userData.email', 'Invalid email').exists().isEmail(),
        body('userData.password', 'Invalid password').exists()
      ]
    }
  }
}

module.exports = {
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  userLoggedIn,
  validate
};
