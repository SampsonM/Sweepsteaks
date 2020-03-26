'use strict'
const usersRouter = require('express').Router()
import userStatusRouter from './userStatus'
import auth from '../../auth'
import * as usersCtrl from '../../../controllers/users'

// User status, returns and alters status of user
usersRouter.use('/status', userStatusRouter)

// GET User by name (required, only authenticated users have access)
usersRouter.get('/:user_name', auth.required, usersCtrl.getUserByUsername)

// GET Username unique (publically accessible)
usersRouter.get('/unique/:user_name', usersCtrl.isUserNameUnique)

// POST new user route (optional, publically accessible)
usersRouter.post('/', usersCtrl.createUser)

// POST to update user (required, only user should have access)
usersRouter.put('/', auth.required, usersCtrl.updateUser)
usersRouter.put('/:user_id', auth.required, usersCtrl.updateUser)

// DELETE USER (required, only user should have access)
usersRouter.delete('/:user_id', auth.required, usersCtrl.deleteUser)

module.exports = usersRouter
