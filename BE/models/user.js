'use strict';
import mongoose from 'mongoose';
import { createHashSalt } from '../utils';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const Schema = mongoose.Schema;

const KEY = process.env.NODE_ENV === 'production'
  ? process.env.KEY
  : fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.key'));

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
  this.hash = hash;
};

UserSchema.methods.validatePassword = function(hash) {
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, KEY);
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('users', UserSchema);
