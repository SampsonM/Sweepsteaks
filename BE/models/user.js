'use strict';
import mongoose from 'mongoose';
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
    type: String
  },
  salt: {
    type: String
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

module.exports = mongoose.model('users', UserSchema);
