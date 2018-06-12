const apiRouter = require('express').Router();

apiRouter.get('/', (req, res) => {
  res.send({
    message: 'hello routerssss'
  })
})

module.exports = apiRouter;