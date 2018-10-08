'use strict';
const teamsRouter = require('express').Router();
import * as teamCtrl from '../controllers/teams';

teamsRouter.get('/', teamCtrl.getTeams);

module.exports = teamsRouter;
