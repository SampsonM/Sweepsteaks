'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import mongooseConnect from '../../src/connectMongoose'
import { expect } from 'chai';
import seedDB from '../../db/seed';
const request = require('supertest')(app);

describe('/groups', () => {
  let groupDocs;
  let user;

  beforeEach(() => {
    return mongooseConnect()
      .then(() => {
        return seedDB();
      })
      .then(data => {
        groupDocs = data.groupDocs;
        user = data.userDocs[0];
      })
      .catch(console.log);
  });

  afterEach(() => {
    return mongoose.disconnect()
  })

  it('GET / RETURNS all groups', () => {
    return request
      .get('/api/groups')
      .expect(200)
      .then(groups => {
        expect(groups.body.length).to.equal(groupDocs.length);
      });
  });

  it('GET /:group_id returns group by id', () => {
    return request
      .get(`/api/groups/${groupDocs[0]._id}`)
      .expect(200)
      .then(group => {
        expect(group.body._id).to.equal(groupDocs[0]._id.toString());
      });
  });

  it('GET ?group_name RETURNS group by name', () => {
    return request
      .get(`/api/groups?name=${groupDocs[0].name}`)
      .expect(200)
      .then(group => {
        expect(group.body.name).to.equal(groupDocs[0].name);
      });
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
        expect(group.body).to.have.all.keys(
          '__v',
          '_id',
          'createdBy',
          'users',
          'wager',
          'name'
        );

        return request.get(`/api/groups?name=${group.body.name}`).expect(200);
      });
  });

  it('POST /name/:group_name EDITS group by name', () => {
    const data = {
      updatedGroupData: {
        name: 'daves pals'
      },
      id: user._id
    };

    return request
      .post(`/api/groups/${groupDocs[0].name}`)
      .send(data)
      .expect(200)
      .then(group => {
        expect(group.body.name).to.equal(data.updatedGroupData.name);
      });
  });
});
