const apiRouter = require('express').Router();
let { competitionRouter, groupRouter, teamsRouter, usersRouter } = require('./index.js');

apiRouter.use('/competitions', competitionRouter);
apiRouter.use('/groups', groupRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
