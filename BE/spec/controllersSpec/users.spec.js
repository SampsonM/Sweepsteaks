'use strict'
import app from '../../src/app'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import { expect } from 'chai'
import seedDB from '../../db/seed'
import mongooseConnect from '../../src/connectMongoose'
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe('/users', () => {
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
        return seedDB()
      })
      .then(data => {
        userDocs = data.userDocs
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

      describe('/status', () => {
        it('returns 401 with invalid token', () => {
          return request
            .get('/api/users/status')
            .set('authorisation', 'UN-authorised-token')
            .expect(response => {
              const status = response.body.status
              if (status !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${status}`)
            })
        })

        describe('/logout', () => {
          it('returns 401 with invalid token', () => {
            return request
              .get('/api/users/status/logout')
              .set('authorisation', 'UN-authorised-token')
              .expect(response => {
                const status = response.body.status
                if (status !== 401) throw new Error(`Incorrect status code returned, expected 401 received: ${status}`)
              })
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

      it('returns 404 when no userData is attached', () => {
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .expect(404)
          .expect(response => {
            if (response.error.text !== 'No userData attached to body') throw new Error(`Incorrect status code returned, expected 404 received: ${response.status}`)
          })
      })
      
      it('returns 400 and error message when firstName is not provided', () => {
        userData.firstName = undefined

        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when firstName is invalid length', () => {
        userData.firstName = 'i'
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when firstName includes numbers', () => {
        userData.firstName = '12'
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'First name must be atleast 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${rresponse.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when lastName is not provided', () => {
        userData.lastName = undefined
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'Last name must be at least 2 characters and be alphabetical characters only') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
     
      it('returns 400 and error message when username is not provided', () => {
        userData.username = undefined
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'Username must be between 3 and 12 characters') throw new Error(`Incorrect error msg returned, recieved: ${response.body}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when email is not provided', () => {
        userData.email = undefined
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.error.text !== 'Email must be a valid format') throw new Error(`Incorrect error msg returned, recieved: ${response.error.text}`)
            if (response.statusCode !== 400) throw new Error(`Incorrect status code returned, expected 400 received: ${response.statusCode}`)
          })
      })
      
      it('returns 400 and error message when password is not provided', () => {
        userData.password = undefined
  
        return request
          .post('/api/users/')
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(userData))
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
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(201)
          .expect(res => {
            if (!res.body.user._id) throw new Error(`Expected createUser to return new user with id, but received: ${res.body.user}`)
          })
      })
      
      describe('/status/login', () => {
        it('returns 404 with invalid username', () => {
          return request
            .post('/api/users/status/login')
            .set({'Content-Type':'application/json'})
            .send(JSON.stringify({ username: 'noneExistentUsername', password: userZeroPass }))
            .expect(404)
            .expect(response => {
              if (response.error.text !== 'Username not found, please enter valid username') throw new Error(`Incorrect error returned, expected user does not exist`)
            })
        })
        
        it('returns 404 with invalid password', () => {
          return request
            .post('/api/users/status/login')
            .set({'Content-Type':'application/json'})
            .send(JSON.stringify({ username: userZeroUsername, password: 'invaliduserZeroPass' }))
            .expect(404)
            .expect(response => {
              if (response.error.text !== 'Password invalid, please enter valid password or reset password') throw new Error(`Incorrect error returned, expected password invalid`)
            })
        })

        it('returns 200 with valid username and password', () => {
          return request
            .post('/api/users/status/login')
            .set({'Content-Type':'application/json'})
            .send(JSON.stringify({ username: userZeroUsername, password: userZeroPass }))
            .expect(response => {
              if (response.status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${response.status}`)
            })
        })
        
        it('returns username data with valid username and password', () => {
          return request
            .post('/api/users/status/login')
            .set({'Content-Type':'application/json'})
            .send(JSON.stringify({ username: userZeroUsername, password: userZeroPass }))
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
          .send(JSON.stringify(userData))
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
          .send(JSON.stringify(userData))
          .expect(response => {
            if (response.body.status !== 401) throw new Error(`Incorrect statucode returned, expected 401, recieved: ${response.body.status}`)
            if (response.body.message !== 'jwt malformed') throw new Error(`Incorrect error message returned, expected jwt malformed, recieved: ${response.body.message}`)
          })
      })
    })
  })

  describe('when a user is logged in', () => {
    let userToken
    let id

    beforeEach(() => {
      return request
        .post('/api/users/status/login')
        .set({'Content-Type':'application/json'})
        .send(JSON.stringify({ username: userZeroUsername, password: userZeroPass }))
        .then(response => {
          userToken = response.body.user.token
          id = response.body.user._id
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
          
          it('DOES NOT return id with valid username', () => {
            expect(userData._id).to.equal(undefined)
          })
        })

        describe('with INVALID username',  () => {
          let userData

          beforeEach('', () => {
            return request
              .get(`/api/users/totallyMadeUpIllegalUsername`)
              .set({ 'authorisation': userToken })
              .expect(404)
              .expect(response => {
                userData = response.body
              })
          })

          it('returns nothing when username is INVALID', () => {
            expect(userData).to.eql({})
          })
        })
      })

      describe('/status', () => {
        it('returns 200 with valid token', () => {
          return request
            .get('/api/users/status')
            .set({ 'authorisation': userToken })
            .expect(response => {
              const status = response.status
              if (status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${status}`)
            })
        })

        describe('/logout', () => {
          it('returns 200 with valid token and unaithenticates user', () => {
            return request
              .get('/api/users/status/logout')
              .set({ 'authorisation': userToken })
              .expect(response => {
                const status = response.status
                if (status !== 200) throw new Error(`Incorrect status code returned, expected 200 received: ${status}`)
                if (response.body.user.authenticated !== false) throw new Error('User still authenticated')
              })
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

      describe('/status/login', () => {
        it('returns 200 and reauthenticates user', () => {
          return request
            .post('/api/users/status/login')
            .send({ username: userZeroUsername, password: userZeroPass })
            .expect(200)
            .expect(response => {
              if (response.body.user.authenticated !== true) throw new Error('User not authenticated')
            })
        })
      })
    })

    describe('PUT /', () => {
      it('return 400 without user_id', () => {
        return request
          .put(`/api/users/`)
          .set({ 'authorisation': userToken })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify({ firstName: 'markus' }))
          .expect(400)
          .expect(response => {
            if (response.error.text !== 'No userdata found') throw new Error('Expected error text to say No userdata found')
          })
      })

      it ('returns 400 when no userData is supplied', () => {
        return request
          .put(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .expect(400)
          .expect(response => {
            if (response.error.text !== 'No userdata found') throw new Error('Expected error text to say No userdata found')
          })
      })

      it('updates users firstName when passed id and data', () => {
        return request
          .put(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify({ firstName: 'markus' }))
          .expect(200)
          .expect(response => {
            if (response.body.firstName === userZeroFirstName) throw new Error(`Expected name to update to markus but received: ${response.body.firstName}`)
          })
      })
      
      it('updates users lastName when passed id and data', () => {
        return request
          .put(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify({ lastName: 'chariot' }))
          .expect(200)
          .expect(response => {
            if (response.body.lastName === userZeroLastName) throw new Error(`Expected last name to update to chariot but received: ${response.body.lastName}`)
          })
      })
      
      it('updates users lastName and firstName when passed id and multiple data', () => {
        return request
          .put(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify({ lastName: 'chariot', firstName: 'markus' }))
          .expect(200)
          .expect(response => {
            if (response.body.lastName === userZeroLastName) throw new Error(`Expected last name to update to chariot but received: ${response.body.lastName}`)
            if (response.body.firststName === userZeroFirstName) throw new Error(`Expected first name to update to markus but received: ${response.body.firstName}`)
          })
      })
    })
    
    // TEST for DELETE and auth that shit

    describe('DELETE /', () => {
      it('returns 404 with no user_id', () => {
        return request
          .delete(`/api/users/`)
          .set({ 'authorisation': userToken })
          .expect(404)
      })

      it('returns 400 with incorrect user_id', () => {
        return request
          .delete(`/api/users/098ujnm`)
          .set({ 'authorisation': userToken })
          .expect(400)
          .expect(res => {
            if (res.error.text !== 'User not found') throw new Error(`Incorrect error returned, expected user not found recieved: ${res.error}`)
          })
      })
      
      it('returns 200 with correct user_id', () => {
        return request
          .delete(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .expect(200)
      })
      
      it('returns deleted users firstName with correct user_id', () => {
        return request
          .delete(`/api/users/${id}`)
          .set({ 'authorisation': userToken })
          .expect(res => {
            if (res.body.firstName !== userZeroFirstName) throw new Error('First name of deleted user not returned')
          })
      })
    })
  })
})
