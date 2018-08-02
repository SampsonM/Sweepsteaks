const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  competition: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('teams', TeamSchema);