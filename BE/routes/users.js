'use strict'
const usersRouter = require('express').Router()
import * as usersCtrl from '../controllers/users'

usersRouter.get('/:user_name', usersCtrl.getUserByName)

usersRouter.post('/', usersCtrl.createUser)
usersRouter.post('/:user_id', usersCtrl.updateUSer)

usersRouter.delete('/:user_id', usersCtrl.deleteUser)

module.exports = usersRouter;
