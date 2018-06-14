const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Team', Team);