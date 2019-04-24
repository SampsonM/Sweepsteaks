'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../../db/seed';
import { DB_URL } from '../../config';
const request = require('supertest')(app)

describe('/users', () => {
  let userDocs;

  beforeEach(() => {
    return mongoose.connect(DB_URL, {useNewUrlParser: true})
    .then(() => {
      return seedDB();
    })
    .then(data => {
      userDocs = data.userDocs;
    })
    .catch(console.log)
  })

  after(() => {
    return mongoose.disconnect()
      .then(() => console.log('disconnected... 🧟'))
  })

  it('/:user_name returns user by name', () => {
    return request
      .get(`/api/users/${userDocs[0].username}`)
      .expect(200)
      .then(user => {
        expect(user.body.lastName).to.equal('davidson')
      })
  })
})
