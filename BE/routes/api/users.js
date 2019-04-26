'use strict'
const usersRouter = require('express').Router();
import auth from '../auth';
import * as usersCtrl from '../../controllers/users';

//GET current route (required, only authenticated users have access)
usersRouter.get('/current', auth.required, usersCtrl.userLoggedIn);

//GET User by name (publicalyl available)
usersRouter.get('/:user_name', usersCtrl.getUserByName);

//POST new user route (optional, everyone has access)
usersRouter.post('/', auth.optional, usersCtrl.createUser);

//POST login route (optional, everyone has access)
usersRouter.post('/login', auth.optional, usersCtrl.logUserIn);

//POST to update user (required, only user should access this)
usersRouter.post('/:user_id', auth.required, usersCtrl.updateUser);

//DELETE USER (required, only user should have access)
usersRouter.delete('/:user_id', auth.required, usersCtrl.deleteUser);

module.exports = usersRouter;
