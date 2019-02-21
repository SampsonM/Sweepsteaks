'use strict';
import { Users } from '../models/index';

// get user
function getUserByName(req, res, next) {
  const username = req.params.user_name;

  return Users.findOne({ username: username })
    .lean()
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      next({ err: err.message, err, root: 'getUserByName' })
    })
}

// create user
function createUser(req, res, next) {

}

// update user
function updateUser(req, res, next) {

}

// delete user
function deleteUser(req, res, next) {

}

module.exports = {
  getUserByName,
  createUser,
  updateUser,
  deleteUser
}