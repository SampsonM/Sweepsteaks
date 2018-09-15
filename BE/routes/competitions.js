const competitionRouter = require('express').Router();
const {
  getCompetitions,
  getCompetitionById,
  addNewCompetition,
  updateCompetition
} = require('../controllers/competitions.js');

competitionRouter.post('/:competition_id', updateCompetition)

competitionRouter.post('/', addNewCompetition)

competitionRouter.get('/', getCompetitions);
competitionRouter.get('/:competition_id', getCompetitionById);

module.exports = competitionRouter;
