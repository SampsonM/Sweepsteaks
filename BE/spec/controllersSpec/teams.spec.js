'use strict'
import app from '../../src/app'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import mongooseConnect from '../../src/connectMongoose'
import { expect } from 'chai'
import seedDB from '../../db/seed'
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app)

describe('/teams', () => {
  let teamDocs
  let teamZeroId
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username

  beforeEach(() => {
    return mongooseConnect()
    .then(() => {
      return seedDB()
    })
    .then(data => {
      teamDocs = data.teamDocs

      teamZeroId = teamDocs[0]._id
    })
    .catch(console.log)
  })

  afterEach(() => {
    return mongoose.disconnect()
  })

  describe('when user is not logged in', () => {
    describe('GET /', () => {
      it('/ returns 401 with invalid JWT', () => {
        return request
          .get('/api/teams')
          .set('cookie',`ssTok=INVALIDuserToken`)
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })

      it(':team_name returns 401 with invalid JWT', () => {
        return request
          .get(`/api/teams/${teamDocs[0].name}`)
          .set('cookie',`ssTok=INVALIDuserToken`)
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('PUT /', () => {
      it(':team_ID returns 401 with invalid JWT', () => {
        const updatedTeamInfo = { 
          updatedTeamData: {
            name: 'Finland',
            sport: teamDocs[0].sport,
            competitions: teamDocs[0].competition
          },
          id: teamDocs[0]._id
        }
  
        return request
          .put(`/api/teams/${teamDocs[0].id}`)
          .set('cookie',`ssTok=INVALIDuserToken`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(updatedTeamInfo))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('POST /', () => {
      it('/create returns 401 with invalid jwt', () => {
        const teamData = {
          'name': 'Manchester United',
          'sport': 'Football',
          'competitions': ['Premier League']
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=INVALIDuserToken`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })

    describe('DELETE /', () => {
      it(':team_ID returns 401 with invalid JWT', () => {
        return request
          .delete(`/api/teams/${teamZeroId}`)
          .set('cookie',`ssTok=INVALIDuserToken`)
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      })
    })
  })
  
  describe('when user is logged in', () => {
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
      it('Returns all teams', () => {
        return request
          .get('/api/teams')
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(teams => {
            expect(teams.body.length).to.equal(teamDocs.length)
          })
      })
    
      it(':team_name returns team by name', () => {
        return request
          .get(`/api/teams/${teamDocs[0].name}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(team => {
            expect(team.body.name).to.equal(teamDocs[0].name)
          })
      })
    })

    describe('PUT /', () => {
      it(':team_ID updates team by id', () => {
        const updatedTeamInfo = { 
          updatedTeamData: {
            name: 'Finland',
            sport: teamDocs[0].sport,
            competitions: teamDocs[0].competitions
          },
          id: teamDocs[0]._id
        }
  
        return request
          .put(`/api/teams/${teamDocs[0].id}`)
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(updatedTeamInfo))
          .expect(200)
          .then(team => {
            expect(team.body.name).to.not.equal(teamDocs[0].name)
            expect(team.body.sport).to.equal(teamDocs[0].sport)
          })
      })
    })

    describe('POST /', () => {
      it('/create creates team valid data structure', () => {
        const teamData = {
          'name': 'Manchester United',
          'sport': 'Football',
          'competitions': ['Premier League']
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(team => {
            expect(team.body).to.have.keys('_id', 'name', 'sport', 'competitions', 'pastCompetitions', '__v')
          })
      })
      
      it('/create fails to create team with INVALID data structure', () => {
        const teamData = {
          'name': 'script',
          'sport': 'Football',
          'competitions': ['Premier League']
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(400)
          .expect(res => {
            expect(res.text).to.equal('Team name must only have letters and and be 2 - 25 characters')
          })
      })
      
      it('/create fails to create team with INVALID data structure', () => {
        const teamData = {
          'name': 'Manchester United',
          'sport': '1234hello',
          'competitions': ['Premier League']
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(400)
          .expect(res => {
            expect(res.text).to.equal('Team sport must only have letters and and be 2 - 15 characters')
          })
      })
      
      it('/create fails to create team with INVALID data structure', () => {
        const teamData = {
          'name': 'Manchester United',
          'sport': 'Football'
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(400)
          .expect(res => {
            expect(res.text).to.equal('Team must be supplied with competitions')
          })
      })
      
      it('/create fails to create team with INVALID data structure', () => {
        const teamData = {
          'name': 'Manchester United',
          'sport': 'Football',
          'competitions': ['s']
        }

        return request
          .post('/api/teams/create')
          .set('cookie',`ssTok=${userToken}`)
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(teamData))
          .expect(400)
          .expect(res => {
            expect(res.text).to.equal('Team competition name must only have letters and and be 2 - 25 characters')
          })
      })
    })

    describe('DELETE /', () => {
      it(':team_ID deletes team by id', () => {
        return request
          .delete(`/api/teams/${teamZeroId}`)
          .set('cookie',`ssTok=${userToken}`)
          .expect(200)
          .then(team => {
            return Promise.all([team, request.get('/api/teams')])
          })
          .then(([team, teams]) => {
            expect(teams.body).to.not.include(team.body)
          })
      })
    })
  })
})
