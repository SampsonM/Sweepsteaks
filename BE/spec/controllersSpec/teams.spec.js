'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import mongooseConnect from '../../src/connectMongoose'
import { expect } from 'chai';
import seedDB from '../../db/seed';
import userData from '../../db/test-data/User.json'
const request = require('supertest')(app);

describe('/teams', () => {
  let teamDocs
  let teamZeroId
  const userZeroPass = userData[0].password
  const userZeroUsername = userData[0].username

  beforeEach(() => {
    return mongooseConnect()
    .then(() => {
      return seedDB();
    })
    .then(data => {
      teamDocs = data.teamDocs;

      teamZeroId = teamDocs[0]._id
    })
    .catch(console.log)
  });

  afterEach(() => {
    return mongoose.disconnect()
  })

  describe('when user is not logged in', () => {
    describe('GET /', () => {
      it('/ returns 401 with invalid JWT', () => {
        return request
          .get('/api/teams')
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      });

      it(':team_name returns 401 with invalid JWT', () => {
        return request
          .get(`/api/teams/${teamDocs[0].name}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      });
    })

    describe('PUT /', () => {
      it(':team_ID returns 401 with invalid JWT', () => {
        const updatedTeamInfo = { 
          updatedTeamData: {
            name: 'Finland',
            sport: teamDocs[0].sport,
            competition: teamDocs[0].competition
          },
          id: teamDocs[0]._id
        };
  
        return request
          .put(`/api/teams/${teamDocs[0].id}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(updatedTeamInfo))
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      });
    })

    describe('DELETE /', () => {
      it(':team_ID returns 401 with invalid JWT', () => {
        return request
          .delete(`/api/teams/${teamZeroId}`)
          .set({ 'authorisation': 'INVALIDuserToken' })
          .expect(res => {
            if (res.body.status !== 401) throw new Error(`Expected 401 recieved: ${res.error}`)
          })
      });
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
          .set({ 'authorisation': userToken })
          .expect(200)
          .then(teams => {
            expect(teams.body.length).to.equal(teamDocs.length);
          });
      });
    
      it(':team_name returns team by name', () => {
        return request
          .get(`/api/teams/${teamDocs[0].name}`)
          .set({ 'authorisation': userToken })
          .expect(200)
          .then(team => {
            expect(team.body.name).to.equal(teamDocs[0].name);
          });
      });
    })

    describe('PUT /', () => {
      it(':team_ID updates team by id', () => {
        const updatedTeamInfo = { 
          updatedTeamData: {
            name: 'Finland',
            sport: teamDocs[0].sport,
            competition: teamDocs[0].competition
          },
          id: teamDocs[0]._id
        };
  
        return request
          .put(`/api/teams/${teamDocs[0].id}`)
          .set({ 'authorisation': userToken })
          .set({'Content-Type':'application/json'})
          .send(JSON.stringify(updatedTeamInfo))
          .expect(200)
          .then(team => {
            expect(team.body.name).to.not.equal(teamDocs[0].name);
            expect(team.body.sport).to.equal(teamDocs[0].sport);
          })
      });
    })

    describe('DELETE /', () => {
      it(':team_ID deletes team by id', () => {
        return request
          .delete(`/api/teams/${teamZeroId}`)
          .set({ 'authorisation': userToken })
          .expect(200)
          .then(team => {
            return Promise.all([team, request.get('/api/teams')]);
          })
          .then(([team, teams]) => {
            expect(teams.body).to.not.include(team.body)
          })
      });
    })
  })
});
