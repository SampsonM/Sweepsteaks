const competitionRouter = require('express').Router();
const {
  getCompetitions
} = require('../controllers/competitions.js');

competitionRouter.get('/', getCompetitions);

module.exports = competitionRouter;
