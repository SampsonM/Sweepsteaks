const competitionRouter = require('express').Router();
import * as competitionController  from '../controllers/competitions.js';

competitionRouter.delete('/:competition_id', competitionController.deleteCompetition);

competitionRouter.post('/:competition_id', competitionController.updateCompetition);
competitionRouter.post('/', competitionController.addNewCompetition);

competitionRouter.get('/', competitionController.getCompetitions);
competitionRouter.get('/:competition_id', competitionController.getCompetitionById);

module.exports = competitionRouter;
