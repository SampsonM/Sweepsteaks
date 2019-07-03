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

  describe.only('when user is not logged in', () => {
    it('GET /:user_name returns user by name', () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(user => {
          expect(user.body.lastName).to.equal('davidson')
        })
    })

    it('POST /login returns 404 with invalid username', () => {
      return request
        .post('/api/users/login')
        .send({ username: 'noneExistentUsername', password: userZeroPass })
        .expect(response => {
          if (response.body.statusCode !== 404) throw new Error(`Incorrect status code returned, expected 401 recieved: ${response.body.statusCode}`)
        })
    })
    
    it('POST /login returns 404 with invalid password', () => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: 'invaliduserZeroPass' })
        .expect(response => {
          if (response.body.statusCode !== 404) throw new Error(`Incorrect status code returned, expected 401 recieved: ${response.body.statusCode}`)
        })
    })

    it('POST /login returns 200 with valid username and password', () => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: userZeroPass })
        .expect(response => {
          if (response.status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${response.status}`)
        })
    })
    
    it('POST /login returns username data with valid username and password', () => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: userZeroPass })
        .expect(response => {
          if (response.body.user.username !== userData[0].username) throw new Error(`Incorrect data returned, received: ${response.body.user.username}`)
        })
    })

    it('GET /current returns 401 with invalid token', () => {
      return request
        .get('/api/users/current')
        .set('authorisation', 'UN-authorised-token')
        .expect(response => {
          const statusCode = response.body.status
          if (statusCode !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${statusCode}`)
        })
    })

    it.only('POST / creates user', () => {
      const data = {
        firstName: 'Gina',
        lastName: 'winas',
        username: 'ginwin',
        email: 'ginwin@test.com',
        password: '12345678'
      }

      return request 
        .post('/api/users/')
        .send(data)
        .expect(res => {
          console.log('result',res.body)
        })
    })
  })

  describe('when a user is logged in', () => {
    let userToken

    beforeEach(() => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: userZeroPass })
        .then(response => {
          userToken = response.body.user.token
        })
    })
 
    it('GET /current returns 200 with valid token', () => {
      return request
        .get('/api/users/current')
        .set({ 'authorisation': userToken })
        .expect(response => {
          const statusCode = response.statusCode
          if (statusCode !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${statusCode}`)
        })
    })

    it('GET /current returns 401 tith invalid token', () => {
      return request
        .get('/api/users/current')
        .set({ 'authorisation': 'invalid userToken' })
        .expect(response => {
          const statusCode = response.body.status
          if (statusCode !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${statusCode}`)
        })
    })
  })
})
