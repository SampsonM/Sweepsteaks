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
  const userData = req.body;

  if (Object.keys(userData).length > 0 && userData.constructor === Object) {

    // validate userData here
    userDataValid(userData)

    passport.authenticate('local', (err, user) => {
      if (err && err.split(' ')[0] !== 'Username') {
        return res.send(err)
      }
  
      if (!user) {
        const newUser = new User(userData);
  
        if (userData.password !== undefined) {
          newUser.setHash(userData.password)
        } else {
          return res.status(400).send({ errors: {
            password: { message: 'Password is required' }
          }})
        }

        return newUser.save()
          .then(user => {
            res.status(201).send({ user: user.toAuthJSON() })
          })
          .catch(err => {
            res.status(400).send(err)
          })
      } else {
        res.status(409).send(err)
      }
  
    })(req, res, next);
  } else {
    return next({ err: 'No userData attached to body', root: 'createUser', status: 400 })
  }
}

// POST existing user login
function logUserIn(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.send({ error: err, status: 404 })
    }

    if (!user) {
	  	return res.send({ USER: 'User does not exist'});
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
  } else {
    return res.staus(409).send({ err: 'User not signed in.'})
  }
}

// update user
function updateUser(req, res, next) {
  console.log(req)
  if (req.params.user_id === 'login') {
    return next(req, res, next)
  }
}

// delete user
function deleteUser(req, res, next) {}

function userDataValid(data) {
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
