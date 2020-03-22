const userStatusRouter = require('express').Router()
import auth from '../../auth'
import * as usersCtrl from '../../../controllers/users'

// GET current route (required, only authenticated users have access)
userStatusRouter.get('/', auth.required, usersCtrl.getUserLoginState)

// GET logOut route (required, only authenticated users have access)
userStatusRouter.patch('/logout', auth.required, usersCtrl.logUserOut)

// POST login route (optional, publically accessible)
userStatusRouter.post('/login', usersCtrl.logUserIn)

export default userStatusRouter
