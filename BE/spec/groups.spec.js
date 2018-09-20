import app from '../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../db/seed';
import { DB_URL } from '../config';
const request = require('supertest')(app);

describe('/groups', () => {
  let groupDocs;

  beforeEach(() => {
    return mongoose.connect(DB_URL, {useNewUrlParser: true})
      .then(() => {
        return seedDB();
      })
      .then(data => {
        groupDocs = data.groupDocs;
      })
      .catch(console.log);
  });

  after(() => {
    return mongoose.connection.close()
      .then(() => console.log('disconnected... 🧟'))
  });

  it('GET / RETURNS all groups', () => {
    return request
      .get('/api/groups')
      .expect(200)
      .then(groups => {
        expect(groups.body.length).to.equal(groupDocs.length);
      })
  });

  it('GET /name?group_name RETURNS group by name', () => {
    return request
      .get(`/api/groups/name?group_name=${groupDocs[0].name}`)
      .expect(200)
      .then(group => {
        expect(group.body.name).to.equal(groupDocs[0].name);
      })
  })
});
