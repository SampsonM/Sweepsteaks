'use strict'
const usersRouter = require('express').Router()
import * as usersCtrl from '../../controllers/users'

//GET User by name
usersRouter.get('/:user_name', usersCtrl.getUserByName)

//GET current route (required, only authenticated users have access)
usersRouter.get('/current', usersCtrl.userLoggedIn)

//POST new user route (optional, everyone has access)
usersRouter.post('/', usersCtrl.createUser)

//POST login route (optional, everyone has access)
usersRouter.post('/login', usersCtrl.logUserIn)

//POST to update user
usersRouter.post('/:user_id', usersCtrl.updateUser)

//DELETE USER
usersRouter.delete('/:user_id', usersCtrl.deleteUser)

module.exports = usersRouter;
