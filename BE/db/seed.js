let path = process.env.NODE_ENV;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {
  Users,
  Groups,
  Teams,
  Competitions
} = require('../models');
const {
  competitionData,
  groupData,
  teamData,
  userData
} = require(`./${path}-data`);

function seedDB () {
  return mongoose.connection.dropDatabase()
    .then(() => {
      console.log('Dropped database!');
      return Team.insertMany(teamData)
    })
    .then(teamDocs => {
      console.log(teamDocs)
      return Promise.all([
        Competitions.insertMany(CompetitionData),
        teamDocs
      ])
    })
    .then (([compDocs, teamDocs]) => {
      console.log('*********************')
      console.log(compDocs)
    })
}

module.exports = seedDB;
