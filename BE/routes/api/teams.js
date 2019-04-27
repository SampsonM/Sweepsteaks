'use strict';
const teamsRouter = require('express').Router();
import * as teamCtrl from '../../controllers/teams';

// create a post create team
// teamsRouter.post('/create', teamCtrl.createTeam);

teamsRouter.put('/:team_ID', teamCtrl.updateTeam);

teamsRouter.get('/', teamCtrl.getTeams);
teamsRouter.get('/:team_name', teamCtrl.getTeamByName);

teamsRouter.delete('/:team_ID', teamCtrl.deleteTeam);

module.exports = teamsRouter;
