const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Competition = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  }]
});

module.exports = mongoose.model('Competition', Competition);
