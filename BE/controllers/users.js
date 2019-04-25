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
        newUser.setHash(userData.passport)
      }

      return newUser.save()
        .then(user => {
          console.log(user)
          res.send({ user: user.toAuthJSON() })
        })
        .catch(err => {
          console.log('err', err)
        })
    }

	})(req, res, next);

}

// POST existing user login
function logUserIn(req, res, next) {

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.send({ err })
    }

    if (!user) {
	  	return res.send({ USER: 'none existent'});
    }
    
    return res.send({ user })
	})(req, res, next);

}

function userLoggedIn(req, res, next) {}

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
