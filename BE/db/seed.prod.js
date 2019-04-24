'use strict';
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { DB_URL } = require('../config');
const seedDB = require('./seed.js');

mongoose.connect(DB_URL, {useNewUrlParser: true})
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .then(() => seedDB())
  .then(() => mongoose.disconnect())
  .then(() => console.log(`Disconnected from ${DB_URL}`))
  .catch(console.log)