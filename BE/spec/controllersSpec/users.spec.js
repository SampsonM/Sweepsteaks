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

    it('GET /current returns 401 with invalid token', () => {
      return request
        .get('/api/users/current')
        .set('authorisation', 'UN-authorised-token')
        .expect(response => {
          const status = response.body.status
          if (status !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${status}`)
        })
    })

    describe.only('POST /', () => {
      let userData

      beforeEach(() => {
        userData = {
          firstName: 'sampo',
          lastName: 'sampo',
          username: 'sampo',
          email: 'sampo@test.com',
          password: 'sampo'
        }
      })

      it('returns 400 when no userData is attached', () => {
        return request
          .post('/api/users/')
          .expect(response => {
            if (response.body.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
      
      it('returns 400 and error message when firstName is not provided', () => {
        userData.firstName = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.firstName.message !== 'Path `firstName` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
     
      it.only('returns 400 and error message when firstName is invalid length', () => {
        userData.firstName = 'i'
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.firstName.message !== 'Path `firstName` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
      
      it.only('returns 400 and error message when firstName includes numbers', () => {
        userData.firstName = '12'
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.firstName.message !== 'Path `firstName` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
     
      it('returns 400 and error message when lastName is not provided', () => {
        userData.lastName = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.lastName.message !== 'Path `lastName` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
     
      it('returns 400 and error message when username is not provided', () => {
        userData.username = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.username.message !== 'Path `username` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
      
      it('returns 400 and error message when email is not provided', () => {
        userData.email = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.email.message !== 'Path `email` is required.') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
      
      it('returns 400 and error message when password is not provided', () => {
        userData.password = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.body.errors.password.message !== 'Password is required') throw new Error(`Incorrect error msg returned, recieved: ${response.body.errors}`)
            if (response.status !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.body.status}`)
          })
      })
    })


    it('POST /login returns 404 with invalid username', () => {
      return request
        .post('/api/users/login')
        .send({ username: 'noneExistentUsername', password: userZeroPass })
        .expect(response => {
          if (response.body.status !== 404) throw new Error(`Incorrect status code returned, expected 401 recieved: ${response.body.status}`)
        })
    })
    
    it('POST /login returns 404 with invalid password', () => {
      return request
        .post('/api/users/login')
        .send({ username: userZeroUsername, password: 'invaliduserZeroPass' })
        .expect(response => {
          if (response.body.status !== 404) throw new Error(`Incorrect status code returned, expected 401 recieved: ${response.body.status}`)
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

    it('POST / creates user', () => {
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
        .expect(201)
        .expect(res => {
          if (!res.body.user._id) throw new Error(`Expected createUser to return new user with id, but received: ${res.body.user}`)
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
          const status = response.status
          if (status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${status}`)
        })
    })

    it('GET /current returns 401 tith invalid token', () => {
      return request
        .get('/api/users/current')
        .set({ 'authorisation': 'invalid userToken' })
        .expect(response => {
          const status = response.body.status
          if (status !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${status}`)
        })
    })
  })
})
