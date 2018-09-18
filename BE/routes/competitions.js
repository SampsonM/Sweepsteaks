const competitionRouter = require('express').Router();
import * as compCtlr  from '../controllers/competitions.js';

competitionRouter.delete('/:competition_id', compCtlr.deleteCompetition);

competitionRouter.post('/:competition_id', compCtlr.updateCompetition);
competitionRouter.post('/', compCtlr.addNewCompetition);

competitionRouter.get('/name', compCtlr.getCompetitionByName);
competitionRouter.get('/', compCtlr.getCompetitions);
competitionRouter.get('/:competition_id', compCtlr.getCompetitionById);

module.exports = competitionRouter;
