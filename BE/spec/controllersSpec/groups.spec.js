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
      it('/ Returns all groups', () => {
        return request
          .get('/api/groups')
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it(':group_id returns group by id', () => {
        return request
          .get(`/api/groups/${groupDocs[0]._id}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it('?group_name Returns group by name', () => {
        return request
          .get(`/api/groups?name=${groupDocs[0].name}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
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
          .set({ 'authorisation': 'INVALIDuserToken' })
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
          .set({ 'authorisation': 'INVALIDuserToken' })
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
      it('/ Returns all groups', () => {
        return request
          .get('/api/groups')
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(groups => {
            expect(groups.body.length).to.equal(groupDocs.length)
          })
      })
    
      it(':group_id returns group by id', () => {
        return request
          .get(`/api/groups/${groupDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(group => {
            expect(group.body._id).to.equal(groupDocs[0]._id.toString())
          })
      })
    
      it('?group_name Returns group by name', () => {
        return request
          .get(`/api/groups?name=${groupDocs[0].name}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(group => {
            expect(group.body.name).to.equal(groupDocs[0].name)
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
            expect(group.body).to.have.all.keys(
              '__v',
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
    
      it('name/:group_name EDITS group by name', () => {
        const data = {
          updatedGroupData: {
            name: 'daves pals'
          },
          id: user._id
        }
    
        return request
          .post(`/api/groups/${groupDocs[0].name}`)
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
