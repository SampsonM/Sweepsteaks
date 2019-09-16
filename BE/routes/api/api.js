'use strict'
const apiRouter = require('express').Router()
import * as route from '../index.js'

apiRouter.use('/competitions', route.competitionRouter)
apiRouter.use('/groups', route.groupRouter)
apiRouter.use('/teams', route.teamsRouter)
apiRouter.use('/users', route.usersRouter)

apiRouter.get('/', (req, res) => {
	return res.status(200).render('index.ejs')
})

module.exports = apiRouter
