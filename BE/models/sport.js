const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Teams, Competition } = require('./index');

const Sport = new Schema({
  name: {
    type: String,
    required: true
  },
  competitions: {
    type: [Competition],
    required: true
  },
  teams: {
    type: [Teams]
  }
});

module.exports = mongoose.model('Sport', Sport);
