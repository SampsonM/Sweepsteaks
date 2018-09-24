'use strict';
import app from '../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../db/seed';
import { DB_URL } from '../config';
const request = require('supertest')(app);

describe('/groups', () => {
  let groupDocs;
  let user;

  beforeEach(() => {
    return mongoose.connect(DB_URL, {useNewUrlParser: true})
      .then(() => {
        return seedDB();
      })
      .then(data => {
        groupDocs = data.groupDocs;
        user = data.userDocs[0];
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
  });

  it('POST / ADDS a group', () => {
    const data = {
      newGroup: {
        name: 'ME JULIES NEW GROUP',
        createdBy: user._id,
        wager: 5
      }
    };

    return request
      .post('/api/groups')
      .send(data)
      .expect(201)
      .then(group => {
        expect(group.body).to.have.all.keys('__v', '_id','createdBy', 'users', 'wager', 'name');
        
        return request
          .get(`/api/groups/name?group_name=${group.body.name}`)
          .expect(200)
      })
  })

  it('POST /name/group_name EDITS group by name', () => {
    const data = {
      updatedGroupData: {
        name: "daves pals"
      }
    };

    return request
      .post(`/api/groups/name/${groupDocs[0].name}`)
      .send(data)
      .expect(200)
      .then(group => {
        expect(group.body.name).to.equal(data.updatedGroupData.name);
      })
  })
});
