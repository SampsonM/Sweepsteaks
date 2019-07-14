'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../../db/seed';
import mongooseConnect from '../../src/connectMongoose'
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe.only('/users', () => {
  let userDocs
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username
  const userZeroFirstName = userData[0].firstName
  const userZeroLastName = userData[0].lastName
  const userZeroEmail = userData[0].email
  const userZeroAvatar = userData[0].avatarUrl

  beforeEach(() => {
    return mongooseConnect()
      .then(() => {
        return seedDB();
      })
      .then(data => {
        userDocs = data.userDocs;
      })
      .catch(console.log)
  })

  afterEach(() => {
    return mongoose.disconnect()
  })

  describe('when user is not logged in', () => {

    describe('GET /', () => {

      describe('/:user_name', () => {
        it('returns user by name', () => {
          return request
            .get(`/api/users/${userDocs[0].username}`)
            .expect(200)
            .then(user => {
              expect(user.body.lastName).to.equal('davidson')
            })
        })
      })

      describe('/current', () => {
        it('returns 401 with invalid token', () => {
          return request
            .get('/api/users/current')
            .set('authorisation', 'UN-authorised-token')
            .expect(response => {
              const status = response.body.status
              if (status !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${status}`)
            })
        })
      })
    })

    describe('POST /', () => {
      let userData

      beforeEach(() => {
        userData = {
          firstName: 'sampo',
          lastName: 'sampo',
          username: 'sampo',
          email: 'sampo@test.com',
          password: 'sampo18@'
        }
      })

      it('returns 400 when no userData is attached', () => {
        return request
          .post('/api/users/')
          .expect(404)
          .expect(response => {
            if (response.error.text !== 'No userData attached to body') throw new Error(`Incorrect status code returned, expected 404 received: ${response.status}`)
          })
      })
      
      it('returns 400 and error message when firstName is not provided', () => {
        userData.firstName = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when firstName is invalid length', () => {
        userData.firstName = 'i'
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when firstName includes numbers', () => {
        userData.firstName = '12'
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${rresponse.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when lastName is not provided', () => {
        userData.lastName = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'Last name must be at least 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when username is not provided', () => {
        userData.username = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'Username must be between 3 and 12 characters') throw new Error(`Incorrect error msg returned, recieved: ${response.body}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when email is not provided', () => {
        userData.email = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'Email must be a valid format') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when password is not provided', () => {
        userData.password = undefined
  
        return request
          .post('/api/users/')
          .send(userData)
          .expect(response => {
            if (response.error.text !== 'Password must contain atleast 1 lower & uppercase letter, number, special character and be between 6-20 characters') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })

      it('creates user with valid credentials', () => {
        const data = {
          firstName: 'Gina',
          lastName: 'winas',
          username: 'ginwin2',
          email: 'ginwin@test.com',
          password: 'Gin@123'
        }
  
        return request
          .post('/api/users/')
          .send(data)
          .expect(201)
          .expect(res => {
            if (!res.body.user._id) throw new Error(`Expected createUser to return new user with id, but received: ${res.body.user}`)
          })
      })
      
      describe('/login', () => {
        it('returns 404 with invalid username', () => {
          return request
            .post('/api/users/login')
            .send({ username: 'noneExistentUsername', password: userZeroPass })
            .expect(404)
            .expect(response => {
              if (response.error.text !== 'Username not found, please enter valid username') throw new Error(`Incorrect error returned, expected user does not exist`)
            })
        })
        
        it('returns 404 with invalid password', () => {
          return request
            .post('/api/users/login')
            .send({ username: userZeroUsername, password: 'invaliduserZeroPass' })
            .expect(404)
            .expect(response => {
              if (response.error.text !== 'Password invalid, please enter valid password or reset password') throw new Error(`Incorrect error returned, expected password invalid`)
            })
        })

        it('returns 200 with valid username and password', () => {
          return request
            .post('/api/users/login')
            .send({ username: userZeroUsername, password: userZeroPass })
            .expect(response => {
              if (response.status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${response.status}`)
            })
        })
        
        it('returns username data with valid username and password', () => {
          return request
            .post('/api/users/login')
            .send({ username: userZeroUsername, password: userZeroPass })
            .expect(response => {
              if (response.body.user.username !== userZeroUsername) throw new Error(`Incorrect data returned, expected ${userData.username} received: ${response.body.user.username}`)
            })
        })
      })
    })

    describe('PUT /', () => {
      let userData
      beforeEach(() => {
        userData = {
          firstName: 'Mark'
        }
      })

      it('/:user_id returns 401 when trying to update user data when not signed in', () => {
        return request
          .put(`/api/users/12344567`)
          .set({ 'authorisation': 'invalid userToken' })
          .send(userData)
          .expect(response => {
            if (response.body.status !== 401) throw new Error(`Incorrect statucode returned, expected 401, recieved: ${response.body.status}`)
            if (response.body.message !== 'jwt malformed') throw new Error(`Incorrect error message returned, expected jwt malformed, recieved: ${response.body.message}`)
          })
      })
    })
   
    describe('DELETE /', () => {
      let userData
      beforeEach(() => {
        userData = {
          firstName: 'Mark'
        }
      })

      it('/:user_id returns 401 when trying to update user data when not signed in', () => {
        return request
          .delete(`/api/users/12344567`)
          .set({ 'authorisation': 'invalid userToken' })
          .send(userData)
          .expect(response => {
            if (response.body.status !== 401) throw new Error(`Incorrect statucode returned, expected 401, recieved: ${response.body.status}`)
            if (response.body.message !== 'jwt malformed') throw new Error(`Incorrect error message returned, expected jwt malformed, recieved: ${response.body.message}`)
          })
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

    describe('GET /', () => {
      describe('/:user_name', () => {
        describe('with valid username', () => {
          let userData
  
          beforeEach('', () => {
            return request
              .get(`/api/users/${userZeroUsername}`)
              .set({ 'authorisation': userToken })
              .expect(200)
              .expect(response => {
                userData = response.body
              })
          })
  
          it('returns username with valid username', () => {
            expect(userData.username).to.equal(userZeroUsername)
          })
          
          it('returns firstName with valid username', () => {
            expect(userData.firstName).to.equal(userZeroFirstName)
          })
          
          it('returns laststName with valid username', () => {
            expect(userData.lastName).to.equal(userZeroLastName)
          })
          
          it('returns email with valid username', () => {
            expect(userData.email).to.equal(userZeroEmail)
          })
          
          it('returns avatarUrl with valid username', () => {
            expect(userData.avatarUrl).to.equal(userZeroAvatar)
          })
          
          it('returns sweepsWon with valid username', () => {
            expect(userData.sweepsWon).to.eql([])
          })
          
          it('DOES NOT return HASH with valid username', () => {
            expect(userData.hash).to.equal(undefined)
          })
          
          it('DOES NOT return SALT with valid username', () => {
            expect(userData.salt).to.equal(undefined)
          })
        })

        describe('with INVALID username',  () => {
          let userData

          beforeEach('', () => {
            return request
              .get(`/api/users/totallyMadeUpIllegalUsername`)
              .set({ 'authorisation': userToken })
              .expect(200)
              .expect(response => {
                userData = response.body
              })
          })

          it('returns nothing when username is INVALID', () => {
            expect(userData).to.eql({})
          })
        })
      })

      describe('/current', () => {
        it('returns 200 with valid token', () => {
          return request
            .get('/api/users/current')
            .set({ 'authorisation': userToken })
            .expect(response => {
              const status = response.status
              if (status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${status}`)
            })
        })
      })
    })

    describe('POST /', () => {
      it('rejects request and tells user to sign in', () => {
        return request
          .post(`/api/users/`)
          .set({ 'authorisation': userToken })
          .expect(409)
          .expect(response => {
            if (response.error.text !== `Please sign out to continue creating account.`) throw new Error(`Expected error message telling user to sign out: recieved: ${response.error.text}`)
          })
      })

      describe('/login', () => {
        it('returns 200 and message saying user is already logged in', () => {
          return request
            .post('/api/users/login')
            .set({ 'authorisation': userToken })
            .expect(200)
            .expect(response => {
              if (response.text !== `User already logged in!`) throw new Error(`Expected error message telling user to sign out: recieved: ${response.text || response.error}`)
            })
        })
      })
    })

    // TESTING FOR UPDATES AND DELETES TDD

    describe('PUT /', () => {
      
    })
    
    describe('DELETE /', () => {

    })
  })
})
