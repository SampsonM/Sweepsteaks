'use strict';
const competitionRouter = require('express').Router();
import * as compCtlr  from '../../controllers/competitions.js';

// GET all competitions
competitionRouter.get('/', compCtlr.getCompetitions);

// GET competitions by user provided
competitionRouter.get('/:competition_id', compCtlr.getCompetitionById);

// POST Add a new competition
competitionRouter.post('/', compCtlr.addNewCompetition);

// POST Update competition by id
competitionRouter.post('/:competition_id', compCtlr.updateCompetition);

// DELETE Competition by id
competitionRouter.delete('/:competition_id', compCtlr.deleteCompetition);

module.exports = competitionRouter;
