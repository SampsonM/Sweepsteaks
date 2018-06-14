const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Team } = require('./team');

const Competition = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport'
  },
  teams: {
    type: [Team],
  }
});

module.exports = mongoose.model('Competition', Competition);
