'use strict'
const usersRouter = require('express').Router()
import * as usersCtrl from '../controllers/users'

usersRouter.get('/:user_name', usersCtrl.getUserByName)

module.exports = usersRouter;
