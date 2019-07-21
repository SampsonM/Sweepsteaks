'use strict';
import mongoose from 'mongoose';
import { stringify } from 'querystring';
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sport: {
    type: String,
    required: true
  },
  competitions: [{
    type: String,
    required: true
  }],
  pastCompetitions: [{
    type: String,
    required: false
  }]
});

module.exports = mongoose.model('teams', TeamSchema);