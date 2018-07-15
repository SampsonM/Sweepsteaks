const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User} = require('./index');

const Group = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  users: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }]
  },
  wager: {
    type: Number,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model('Group', Group)
