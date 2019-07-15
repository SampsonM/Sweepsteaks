"use strict";
import { User } from "../models/index";
import passport from "passport";
import { userNameQuery } from '../config/mongoQueries'

// GET user
function getUserByName(req, res, next) {
  const username = req.params.user_name;

  if (username === 'current') {
    return next()
  }

  return User.findOne({ username: username }, userNameQuery)
    .lean()
    .then(user => {
      user._id = undefined
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(404).send('Invalid username');
    });
}

// POST new user 
function createUser(req, res, next) {
  const userData = req.body
  
  if (req.user) {
    return res.status(409).send('Please sign out to continue creating account.')
  }

  if (userData && Object.keys(userData).length > 0 && userData.constructor === Object) {
    
    const err = userDataValid(userData)
    if (err) return res.status(400).send(err)

    passport.authenticate('local', (err, user) => {

      if (err && err.split(' ')[0] !== 'Username') {
        return res.status(404).send(err)
      } else if (!user) {

        const newUser = new User(userData);
        newUser.setHash(userData.password)

        return newUser.save()
          .then(user => res.status(201).send({ user: user.toAuthJSON() }))
          .catch(err => res.status(400).send(err))

      } else if (user) {
        return res.status(409).send(err)
      }

    })(req, res, next);
  } else {
    return res.status(404).send('No userData attached to body')
  }
}

// POST existing user login
function logUserIn(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(404).send(err)
    }

    if (!user) {
	  	return res.status(404).send('User does not exist');
    }
    
    return res.status(200).send({ user: user.toAuthJSON() })
	})(req, res, next);
}

// GET checks if user is currently logged in
function getUserLoginState(req, res, next) {
  if (req.user.id) {
    return User.findById(req.user.id)
      .then((user) => {
        return res.status(200).send({ user: user.toAuthJSON() });
      })
      .catch(err => {
        res.status(400);
        next({ err: err.message, err, root: "getUserLoginState Function" });
      })
  } else {
    return res.staus(409).send({ err: 'User not signed in.'})
  }
}

// update user
function updateUser(req, res, next) {
  const id = req.params.user_id
  const userData = req.body

  // validate it is user by _id and JWT
  if (id === 'login') {
    return next(req, res, next)
  }

  return (id && Object.keys(userData).length > 0)
    ? User.findByIdAndUpdate(id, {$set: userData}, {new: true})
        .then(user => {
          return res.status(200).send(user)
        })
        .catch(err => {
          return res.status(404).send(err)
        })
    : res.status(400).send('No userdata found')
}

// delete user
function deleteUser(req, res, next) {}

function userDataValid(userData) {
  const { firstName, lastName, username, email, password } = userData;

  if (!firstName || firstName.length < 2 || firstName.match(/\d/g)) {
    return 'First name must be atleast 2 characters and be alphabetical characters only'
  }

  if (!lastName || lastName.length < 2 || lastName.match(/\d/g)) {
    return 'Last name must be at least 2 characters and be alphabetical characters only'
  }

  if (!email || !email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/g)) {
    return 'Email must be a valid format'
  }
  
  if (!username || username.length < 3 || username.length > 12) {
    return 'Username must be between 3 and 12 characters'
  }

  // Password requires at least:
  // 1 lower case character
  // 1 upper case character
  // 1 number
  // 1 special character
  // 6 - 20 characters
  if (!password || !password.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,20})/g) || password.length < 6 || password.length > 20) {
    return 'Password must contain atleast 1 lower & uppercase letter, number, special character and be between 6-20 characters'
  }
}

module.exports = {
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  logUserIn,
  getUserLoginState
};
