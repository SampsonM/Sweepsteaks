'use strict';
const apiRouter = require('express').Router();
import * as route from '../index.js';

apiRouter.use('/competitions', route.competitionRouter);
apiRouter.use('/groups', route.groupRouter);
apiRouter.use('/teams', route.teamsRouter);
apiRouter.use('/users', route.usersRouter);

module.exports = apiRouter;
