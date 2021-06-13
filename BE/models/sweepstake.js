'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SweepstakeSchema = new Schema({
  competition: {
    type: String,
    required: true
  },
  wager: {
    type: String,
    required: true
  },
  allocations: {
		type: Array,
		required: true
	}
})

module.exports = mongoose.model('sweepstakes', SweepstakeSchema)
