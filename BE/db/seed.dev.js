'use strict';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { DB_URL } from '../config';
import seedDB from './seed.js';

mongoose.connect(DB_URL, {useNewUrlParser: true})
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .then(() => seedDB())
  .then(() => mongoose.disconnect())
  .then(() => console.log(`Disconnected from ${DB_URL}`))
  .catch(console.log)
