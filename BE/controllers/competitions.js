const app = require('../src/app.js');
const {Competitions} = require('../models');

function getCompetitions(req, res, next) {
  return Competitions.find().lean()
    .populate('teams', 'name')
    .then(comps => {
      res.status(200).send(comps)
    });
};

module.exports = {
  getCompetitions
};
