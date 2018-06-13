const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true
  }
});

module.exports = mongoose.model('Team', Team);