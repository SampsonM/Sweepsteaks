process.env.NODE_ENV = 'test';
const app = require('../../src/app');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const request = require('supertest')(app);
const { expect } = require('chai');
const seedDB = require('../../db/seed');
const faker = require('faker');

describe('/competitions', () => {
  let compDocs;

  beforeEach(() => {
    return seedDB()
      .then(data => {
        [compDocs] = data;
      })
      .catch(console.log)
  });

  after(() => {
    return mongoose.connection.close()
      .then(() => console.log('disconnected... 🧟'))
  });

  it('connects and disconnects', () => {});

  it('GET / RETURNS all competitions', () => {
    return request
      .get('/api/competitions')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2);
      })
  });

  it('GET /:competition_id RETURNS single competition', () => {
    return request
      .get(`/api/competitions/${compDocs[0]._id}`)
      .expect(200)
      .then(competition => {
        expect(competition.body.name).to.equal('World Cup');
        expect(competition.body.teams.length).to.equal(compDocs[0].teams.length);
      })
  });

  it('POST / ADDS a competition to DB', () => {
    const newCompetition = {
      "name": "100m Olympics final",
      "teams": ["Usain BOLT", "Justin GATLIN", "Andre DE GRASSE", "Yohan BLAKE", "Akani SIMBINE", "Ben Youssef MEITE", "Jimmy VICAUT", "Trayvon BROMELL"],
      "sport": "100m Sprint"
    };

    return request
      .post(`/api/competitions`)
      .send(newCompetition)
      .expect(201)
      .then(competition => {
        expect(competition.body).to.have.all.keys('__v', '_id', 'teams', 'name', 'sport');
        return request
          .get(`/api/competitions/${competition.body._id}`)
          .expect(200)
      })
  })

  it('POST /:competition_id UPDATES competition data', () => {
    const competitionUpdate = {
      "name": "World Cup 2018",
      "teams": ["England", "France", "Germany", "Argentina"],
      "sport": "football"
    }

    return request
      .post(`/api/competitions/${compDocs[0]._id}`)
      .send(competitionUpdate)
      .expect(200)
      .then(updatedCompetition => {
        expect(updatedCompetition.body._id).to.equal(compDocs[0]._id.toString());
        expect(updatedCompetition.body.teams).to.not.eql(compDocs[0].teams);

        return request
          .get(`/api/competitions/${updatedCompetition.body._id}`)
          .expect(200)
          .then(competition => {
            expect(competition.body._id).to.equal(compDocs[0]._id.toString())
          })

      })
  })
})
