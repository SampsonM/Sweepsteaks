'use strict'
const usersRouter = require('express').Router();
import auth from '../auth';
import * as usersCtrl from '../../controllers/users';

// GET User by name (publically accessible)
usersRouter.get('/:user_name', usersCtrl.getUserByName);

// GET current route (required, only authenticated users have access)
usersRouter.get('/current', auth.required, usersCtrl.getUserLoginState);

// POST new user route (optional, publically accessible)
usersRouter.post('/', auth.optional, usersCtrl.createUser);

// POST login route (optional, publically accessible)
usersRouter.post('/login', auth.optional, usersCtrl.logUserIn);

// POST to update user (required, only user should have access)
usersRouter.put('/', auth.required, usersCtrl.updateUser);
usersRouter.put('/:user_id', auth.required, usersCtrl.updateUser);

// DELETE USER (required, only user should have access)
usersRouter.delete('/:user_id', auth.required, usersCtrl.deleteUser);

module.exports = usersRouter;
