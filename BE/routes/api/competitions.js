'use strict';
const competitionRouter = require('express').Router();
import * as compCtlr  from '../../controllers/competitions.js';

competitionRouter.post('/:competition_id', compCtlr.updateCompetition);
competitionRouter.post('/', compCtlr.addNewCompetition);

competitionRouter.get('/', compCtlr.getCompetitions);
competitionRouter.get('/:competition_id', compCtlr.getCompetitionById);

competitionRouter.delete('/:competition_id', compCtlr.deleteCompetition);

module.exports = competitionRouter;
