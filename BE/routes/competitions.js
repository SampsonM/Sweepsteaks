const competitionRouter = require('express').Router();
const {
  getCompetitions,
  getCompetitionById,
  addNewCompetition,
  updateCompetition,
  deleteCompetition
} = require('../controllers/competitions.js');

competitionRouter.delete('/:competition_id', deleteCompetition);

competitionRouter.post('/:competition_id', updateCompetition);
competitionRouter.post('/', addNewCompetition);

competitionRouter.get('/', getCompetitions);
competitionRouter.get('/:competition_id', getCompetitionById);

module.exports = competitionRouter;
