'use strict';
import app from '../../src/app';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { expect } from 'chai';
import seedDB from '../../db/seed';
import { DB_URL } from '../../config/environment';
const request = require('supertest')(app);

describe('/teams', () => {
  let teamDocs;

  beforeEach(() => {
    return mongoose.connect(
      DB_URL,
      { useNewUrlParser: true }
    )
    .then(() => {
      return seedDB();
    })
    .then(data => {
      teamDocs = data.teamDocs;
    })
    .catch(console.log)
  });

  after(() => {
    return mongoose.connection
      .close()
      .then(() => console.log("disconnected... 🧟"));
  });
  
  it('GET / Returns all teams', () => {
    return request
      .get('/api/teams')
      .expect(200)
      .then(teams => {
        expect(teams.body.length).to.equal(teamDocs.length);
      });
  });

  it('GET ?team_name returns team by name', () => {
    return request
      .get(`/api/teams?team_name=${teamDocs[0].name}`)
      .expect(200)
      .then(team => {
        expect(team.body.name).to.equal(teamDocs[0].name);
      });
  });

  it('PUT /:team_ID updates team by id', () => {
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
      .send(updatedTeamInfo)
      .expect(200)
      .then(team => {
        expect(team.body.name).to.not.equal(teamDocs[0].name);
        expect(team.body.sport).to.equal(teamDocs[0].sport);
      })
  });
  
  it('DELETE /:team_ID deletes team by id', () => {
    const teamInfo = {
      id: teamDocs[0]._id
    };

    return request
      .delete(`/api/teams/${teamDocs[0]._id}`)
      .send(teamInfo)
      .expect(200)
      .then(team => {
        return Promise.all([team, request.get('/api/teams')]);
      })
      .then(([team, teams]) => {
        expect(teams.body).to.not.include(team.body)
      })
  });

});
