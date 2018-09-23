'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
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
    ref: 'teams',
    required: true
  }]
});

module.exports = mongoose.model('competition', CompetitionSchema);
