process.env.NODE_ENV = 'test';
const app = require('../../src/app');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const request = require('supertest')(app);
const { expect } = require('chai');
const seedDB = require('../../db/seed');
const faker = require('faker');

describe('/competitions', () => {
  beforeEach(() => {
    return seedDB()
  });

  after(() => {
    return mongoose.connection.close()
      .then(() => console.log('disconnected... 🧟'))
  });

  it('connects and disconnects', () => {});

  it('GET / returns all competitions', () => {
    return request
      .get('/api/competitions')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2);
      })
  });
})
