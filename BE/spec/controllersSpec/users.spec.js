'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../../db/seed';
import { DB_URL } from '../../config/environment';
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe.only('/users', () => {
  let userDocs
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username

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

  it('GET /:user_name returns user by name', () => {
    return request
      .get(`/api/users/${userDocs[0].username}`)
      .expect(200)
      .then(user => {
        expect(user.body.lastName).to.equal('davidson')
      })
  })

  describe('when user is not logged in', () => {
    it('POST /login returns 401 with invalid username', () => {
      return request
        .post('/api/users/login')
        .send({ username: 'noneExistentUsername', password: userZeroPass })
        .expect(response => {
          if (response.body.err !== 'Username not found, please enter valid username') {
            throw new Error(`Incorrect status code returned, expected 401 recieved: ${statusCode}`)
          }
        })
    })

    it('GET /current returns 401', () => {
      return request
        .get('/api/users/current')
        .set('authorisation', 'UN-authorised-token')
        .expect(response => {
          const statusCode = JSON.parse(response.error.text).status
          if (statusCode !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${statusCode}`)
        })
    })
  })

  describe.only('when a user is logged in', () => {
    let userToken

    beforeEach(() => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: userZeroPass })
        .then(response => {
          userToken = response.body.user.token
        })
    })
 
    it('GET /current returns 200', () => {
      return request
        .get('/api/users/current')
        .set({ 'authorisation': userToken })
        .expect(response => {
          const statusCode = response.statusCode
          if (statusCode !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${statusCode}`)
        })
    })

    it('GET /current returns 401', () => {
      return request
        .get('/api/users/current')
        .set({ 'authorisation': 'userToken' })
        .expect(response => {
          const statusCode = response.body.status
          if (statusCode !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${statusCode}`)
        })
    })
  })
})
