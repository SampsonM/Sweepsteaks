'use strict';
const competitionRouter = require('express').Router();
import auth from '../auth';
import * as compCtlr  from '../../controllers/competitions.js';

// GET all competitions (required, only authenticated users have access)
competitionRouter.get('/', auth.required, compCtlr.getCompetitions);

// GET competitions by user provided (required, only authenticated users have access)
competitionRouter.get('/:competition_id', auth.required, compCtlr.getCompetitionById);

// POST Add a new competition (required, only authenticated users have access)
competitionRouter.post('/', auth.required, compCtlr.addNewCompetition);

// POST Update competition by id (required, only authenticated users have access)
competitionRouter.post('/:competition_id', auth.required, compCtlr.updateCompetition);

// DELETE Competition by id (required, only authenticated users have access)
competitionRouter.delete('/:competition_id', auth.required, compCtlr.deleteCompetition);

module.exports = competitionRouter;
