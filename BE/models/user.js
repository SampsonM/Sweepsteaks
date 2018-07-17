const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatarUrl: {
    type: String
  },
  sweepsWon: [{
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition'
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Groups'
    }
  }]
})

module.exports = mongoose.model('User', User)
