"use strict";
import { Users } from "../models/index";
import passport from "passport";

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
  const { user } = req.body;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const newUser = new Users(user);

  newUser.setPassword(user.password);

  return newUser.save().then(() => res.json({ user: newUser.toAuthJSON() }));
}

// POST existing user login
function logUserIn(req, res, next) {

  passport.authenticate('local', (err, user, info) => {
    console.log('user', user)

    if (user) {
      return res.send({ err: user })
    }

    if (!user) {
	  	return res.send({ USER: 'none existent'});
	  }
	})(req, res, next);

}

function userLoggedIn(req, res, next) {
  const { id } = req.payload;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
}

// update user
function updateUser(req, res, next) {}

// delete user
function deleteUser(req, res, next) {}

module.exports = {
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  userLoggedIn
};
