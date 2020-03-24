'use strict'
import app from '../../src/app'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import mongooseConnect from '../../src/connectMongoose'
import { expect } from 'chai'
import seedDB from '../../db/seed'
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe('/competitions', () => {
  let compDocs
  let teamDocs
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username

  beforeEach(() => {
    return mongooseConnect()
      .then(() => seedDB())
      .then(data => {
        compDocs = data.compDocs
        teamDocs = data.teamDocs
      })
      .catch(console.log)
  })

  afterEach(() => {
    return mongoose.disconnect()
  })
  
  describe('when user is NOT logged in', () => {
    describe('GET /', () => {
      it('/ Returns 401 with invalid JWT', () => {
        return request
          .get('/api/competitions')
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it(':competition_id Returns 401 with invalid JWT', () => {
        return request
          .get(`/api/competitions/${compDocs[0]._id}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it('?name Returns 401 with invalid JWT', () => {
        return request
          .get('/api/competitions?name=World+Cup')
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('POST /', () => {
      it('/ ADDS a competition to DB', () => {
        const data = {
          newCompetition: {
            name: "100m Olympics final",
            teams: ["Usain BOLT", "Justin GATLIN", "Andre DE GRASSE", "Yohan BLAKE", "Akani SIMBINE", "Ben Youssef MEITE", "Jimmy VICAUT", "Trayvon BROMELL"],
            sport: "100m Sprint"
          }
        }
    
        return request
          .post(`/api/competitions`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    
      it('/:competition_id UPDATES competition data', () => {
        const data = {
          competitionUpdate: {
            name: "World Cup 2018",
            teams: ["england", "france", "germany", "argentina"],
            sport: "football"
          }
        }
    
        return request
          .post(`/api/competitions/${compDocs[0]._id}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('DELETE /', () => {
      it(':competition_id DELETES competition data', () => {
        return request
          .del(`/api/competitions/${compDocs[0]._id}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
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
      it('/ Returns all competitions', () => {
        return request
          .get('/api/competitions')
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(competitions => {
            expect(competitions.body.length).to.equal(2)
          })
      })
    
      it(':competition_id Returns single competition', () => {
        return request
          .get(`/api/competitions/${compDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(competition => {
            expect(competition.body.name).to.equal('world cup')
            expect(competition.body.teams.length).to.equal(compDocs[0].teams.length)
          })
      })
    
      it('?name Returns competition by name', () => {
        return request
          .get('/api/competitions?name=world+cup')
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(competition => {
            expect(competition.body.name).to.eql(compDocs[0].name)
          })
      })
    })

    describe('POST /', () => {
      it('/ ADDS a competition to DB', () => {
        const teams = teamDocs  
          .filter(team => team.sport === 'football')
          .map(team => team.name)

        const data = {
          newCompetition: {
            name: 'football cup',
            teams,
            sport: 'football'
          }
        }
    
        return request
          .post(`/api/competitions`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(201)
          .then(competition => {
            expect(competition.body).to.have.all.keys('__v', '_id', 'teams', 'name', 'sport')
            expect(competition.body.teams[0]).to.have.keys('__v', '_id', 'name', 'competitions', 'pastCompetitions', 'sport')
            return request
              .get(`/api/competitions/${competition.body._id}`)
              .set('cookie',`ssTok=${userToken}`)
              .expect(200)
          })
      })
    
      it('/:competition_id UPDATES a teams competitions when a competitions teams array is updated', () => {
        const data = {
          competitionUpdate: {
            teams: ["england", "france", "germany", "argentina"],
            sport: "football"
          }
        }
    
        return request
          .post(`/api/competitions/${compDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(200)
          .then(response => {
            const competition = response.body
            const newTeams = competition.teams.map(team => team.name)
            expect(newTeams).to.eql(data.competitionUpdate.teams)

            return request
              .get(`/api/teams/${competition.teams[0].name}`)
              .set('cookie',`ssTok=${userToken}`)
              .then(res => {
                expect(res.body.competitions.indexOf(compDocs[0].name) !== -1)
              })
          })
      })
    
      it('/:competition_id UPDATES teams competition name when name is comp updated', () => {
        const data = {
          competitionUpdate: {
            name: "world cup 2018",
            teams: ["england", "france", "germany", "argentina"],
            sport: "football"
          }
        }
    
        return request
          .post(`/api/competitions/${compDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(200)
          .then(response => {
            const competition = response.body
            const newTeams = competition.teams.map(team => team.name)
            expect(competition._id).to.equal(compDocs[0]._id.toString())
            expect(newTeams).to.eql(data.competitionUpdate.teams)
          })
      })
    
      it('/:competition_id UPDATES competition without team data', () => {
        const data = {
          competitionUpdate: {
            name: "World Cup 2018",
            sport: "football"
          }
        }
    
        return request
          .post(`/api/competitions/${compDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(data))
          .expect(200)
          .then(response => {
            const competition = response.body
            expect(response.body._id).to.equal(compDocs[0]._id.toString())

            return request.get('/api/competitions?name=world%20cup%202018')
              .set('cookie',`ssTok=${userToken}`)
              .then(response => {
                expect(response.body.teams).to.eql(competition.teams)
              })
          })
      })
    })

    describe('DELETE /', () => {
      it(':competition_id DELETES competition data', () => {
        return request
          .del(`/api/competitions/${compDocs[0]._id}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(401)
      })
    })
  })
})
