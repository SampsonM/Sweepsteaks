'use strict'
import app from '../../src/app'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import mongooseConnect from '../../src/connectMongoose'
import { expect } from 'chai'
import seedDB from '../../db/seed'
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe('/groups', () => {
  let groupDocs
  let user
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username

  beforeEach(() => {
    return mongooseConnect()
      .then(() => {
        return seedDB()
      })
      .then(data => {
        groupDocs = data.groupDocs
        user = data.userDocs[0]
      })
      .catch(console.log)
  })

  afterEach(() => {
    return mongoose.disconnect()
  })

  describe('when user NOT logged in', () => {
    describe('GET /', () => {    
      it(':group_id returns group by id', () => {
        return request
          .get(`/api/groups/${groupDocs[0]._id}`)
          .set('cookie',`ssTok=INVALIDuserToken`)
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it('?group_name Returns group by name', () => {
        return request
          .get(`/api/groups?name=${groupDocs[0].name}`)
          .set('cookie',`ssTok=INVALIDuserToken`)
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('POST /', () => {
      it('ADDS a group', () => {
        const data = {
          newGroup: {
            name: 'ME JULIES NEW GROUP',
            createdBy: user._id,
            wager: 5
          }
        }
    
        return request
          .post('/api/groups')
          .set('cookie',`ssTok=INVALIDuserToken`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it('name/:group_name EDITS group by name', () => {
        const data = {
          updatedGroupData: {
            name: 'daves pals'
          },
          id: user._id
        }
    
        return request
          .post(`/api/groups/${groupDocs[0].name}`)
          .set('cookie',`ssTok=hgcjvk`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })
  })

  describe('when user logged in', () => {
    let userToken
    let group

    beforeEach(() => {
      return request
        .post('/api/users/status/login')
        .set({'Content-Type':'application/json'})
        .send(JSON.stringify({ username: userZeroUsername, password: userZeroPass }))
        .then(response => {
          userToken = response.body.user.token
        })
    })

    describe('GET /', () => {
      describe(':group_id', () => {
        beforeEach(async () => {
          group = await request
            .get(`/api/groups/${groupDocs[0]._id}`)
            .set('cookie',`ssTok=${userToken}`)
            .expect(200)
        })

        it(':group_id returns group by id', () => {
          expect(group.body._id).to.equal(groupDocs[0]._id.toString())
        })

        it('Returns group with createdBy populated with username and avatarUrl', () => {
          const createdByKeys = Object.keys(group.body.createdBy)

          expect(createdByKeys.includes('_id')).to.equal(false)
          expect(createdByKeys.includes('lastName')).to.equal(false)
          expect(createdByKeys.includes('firstName')).to.equal(false)
          expect(createdByKeys.includes('email')).to.equal(false)
          expect(createdByKeys.includes('hash')).to.equal(false)
          expect(createdByKeys.includes('salt')).to.equal(false)
          expect(createdByKeys.includes('sweepsWon')).to.equal(false)
          expect(createdByKeys.includes('avatarUrl')).to.equal(true)
          expect(createdByKeys.includes('username')).to.equal(true)
        })
  
        it('Returns group with users populated with username and avatarUrl', () => {
          const userKeys = Object.keys(group.body.users[0])

          expect(userKeys.includes('_id')).to.equal(false)
          expect(userKeys.includes('lastName')).to.equal(false)
          expect(userKeys.includes('firstName')).to.equal(false)
          expect(userKeys.includes('email')).to.equal(false)
          expect(userKeys.includes('hash')).to.equal(false)
          expect(userKeys.includes('salt')).to.equal(false)
          expect(userKeys.includes('sweepsWon')).to.equal(false)
          expect(userKeys.includes('avatarUrl')).to.equal(true)
          expect(userKeys.includes('username')).to.equal(true)
        })
      })

      describe('?group_name', () => {
        beforeEach(async () => {
          group = await request
            .get(`/api/groups?name=${groupDocs[0].name}`)
            .set('cookie',`ssTok=${userToken}`)
            .expect(200)
        })

        it('Returns group by name', () => {
          expect(group.body.name).to.equal(groupDocs[0].name)
        })
  
        it('Returns group with createdBy populated with username and avatarUrl only', () => {
          const createdByKeys = Object.keys(group.body.createdBy)

          expect(createdByKeys.includes('_id')).to.equal(false)
          expect(createdByKeys.includes('lastName')).to.equal(false)
          expect(createdByKeys.includes('firstName')).to.equal(false)
          expect(createdByKeys.includes('email')).to.equal(false)
          expect(createdByKeys.includes('hash')).to.equal(false)
          expect(createdByKeys.includes('salt')).to.equal(false)
          expect(createdByKeys.includes('sweepsWon')).to.equal(false)
          expect(createdByKeys.includes('avatarUrl')).to.equal(true)
          expect(createdByKeys.includes('username')).to.equal(true)
        })
  
        it('Returns group with users populated with username and avatarUrl only', () => {
          const userKeys = Object.keys(group.body.users[0])

          expect(userKeys.includes('_id')).to.equal(false)
          expect(userKeys.includes('lastName')).to.equal(false)
          expect(userKeys.includes('firstName')).to.equal(false)
          expect(userKeys.includes('email')).to.equal(false)
          expect(userKeys.includes('hash')).to.equal(false)
          expect(userKeys.includes('salt')).to.equal(false)
          expect(userKeys.includes('sweepsWon')).to.equal(false)
          expect(userKeys.includes('avatarUrl')).to.equal(true)
          expect(userKeys.includes('username')).to.equal(true)
        })
      })
    })

    describe('POST /', () => {
      it('/ ADDS a group', () => {
        const data = {
          newGroup: {
            name: 'ME JULIES NEW GROUP',
            createdBy: user._id,
            wager: 5
          }
        }
    
        return request
          .post('/api/groups')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(201)
          .then(group => {
            expect(group.body.group).to.have.all.keys(
              '_id',
              'createdBy',
              'users',
              'wager',
              'name'
            )

            return request
              .get(`/api/groups?name=${group.body.name}`)
              .set('cookie',`ssTok=${userToken}`)
              .expect(200)
          })
      })
    
      it('name/:group_id EDITS group by id', () => {
        const data = {
          updatedGroupData: {
            name: 'daves pals'
          },
          id: user._id
        }
    
        return request
          .post(`/api/groups/${groupDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(200)
          .then(group => {
            expect(group.body.name).to.equal(data.updatedGroupData.name)
          })
      })
    })
  })
})
