const apiRouter = require('express').Router();

apiRouter.post('/', (req, res) => {
  res.send({
    message: `hello, ${req.body.email} registered`
  })
})

module.exports = apiRouter;