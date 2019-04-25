'use strict';
import mongoose from 'mongoose';
import { createHashSalt } from '../utils';
import jwt from 'jsonwebtoken';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  sweepsWon: [{
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'competitions'
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groups'
    }
  }]
});


UserSchema.methods.setHash = function(password) {
  const { salt, hash } = createHashSalt(password)

  this.salt = salt;
  this.hash = hash
};

UserSchema.methods.validatePassword = function(password) {
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('users', UserSchema);
