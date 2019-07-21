'use strict';
const teamsRouter = require('express').Router();
import auth from '../auth';
import * as teamCtrl from '../../controllers/teams';

// GET all teams (required, only authenticated users have access)
teamsRouter.get('/', auth.required, teamCtrl.getTeams);

// GET team by name (required, only authenticated users have access)
teamsRouter.get('/:team_name', auth.required, teamCtrl.getTeamByName);

// POST Creates a team (required, only authenticated users have access)
teamsRouter.post('/create', auth.required, teamCtrl.createTeam);

// PUT Updates team by ID (required, only authenticated users have access)
teamsRouter.put('/:team_ID', auth.required, teamCtrl.updateTeam);

// DELETE Team by ID (required, only authenticated users have access)
teamsRouter.delete('/:team_ID', auth.required, teamCtrl.deleteTeam);

module.exports = teamsRouter;
