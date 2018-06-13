const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Competition } = require('./competition');

const Sport = new Schema({
  name: {
    type: String,
    required: true
  },
  competitions: {
    type: [Competition],
    required: true
  }
});

module.exports = mongoose.model('Sport', Sport);
