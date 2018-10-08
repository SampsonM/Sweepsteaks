'use strict';
import app from '../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../db/seed';
import { DB_URL } from '../config';
const request = require('supertest')(app);

describe('/teams', () => {
  let teamDocs;
  let team;

  beforeEach(() => {
    return mongoose.connect(
      DB_URL,
      { useNewUrlParser: true }
    )
    .then(() => {
      return seedDB();
    })
    .then(data => {
      teamDocs = data.teamDocs;
      team = teamDocs[0];
    })
    .catch(console.log)
  });

  after(() => {
    return mongoose.connection
      .close()
      .then(() => console.log("disconnected... 🧟"));
  });
  
  it('GET / Returns all teams', () => {
    return request
      .get('/api/teams')
      .expect(200)
      .then(teams => {
        expect(teams.body.length).to.equal(teamDocs.length);
      });
  })

});
