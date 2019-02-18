'use strict';
const teamsRouter = require('express').Router();
import * as teamCtrl from '../controllers/teams';

teamsRouter.post('/:team_name', teamCtrl.updateTeam);

teamsRouter.get('/', teamCtrl.getTeams);
teamsRouter.get('/:team_ID', teamCtrl.getTeamByName);

teamsRouter.delete('/:team_ID', teamCtrl.deleteTeam);

module.exports = teamsRouter;
