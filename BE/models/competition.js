const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Competition = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  teams: {
    type: [Team],
    minlength: 2
  }
});

module.exports = mongoose.model('Competition', Competition);
