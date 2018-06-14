let path = process.env.NODE_ENV;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {
  Users,
  Groups,
  Teams,
  Competitions,
  Sports
} = require('../models');
const {
  CompetitionData,
  groupData,
  sportData,
  teamData,
  userData
} = require(`./${path}-data`);

function seedDB () {
  return mongoose.connection.dropDatabase()
    .then(() => {
      console.log('Dropped database!');
      return Sports.insertMany(sportData)
    })
    .then(sportDocs => {
      console.log(sportDocs)
      return Promise.all([
        Competitions.insertMany(CompetitionData),
        sportDocs
      ])
    })
    .then (([compDocs, sportDocs]) => {
      console.log('*********************')
      console.log(compDocs)
    })
}

module.exports = seedDB;
