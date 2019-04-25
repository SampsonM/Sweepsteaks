'use strict'
const usersRouter = require('express').Router();
import auth from '../auth';
import * as usersCtrl from '../../controllers/users';

//GET User by name
usersRouter.get('/:user_name', usersCtrl.getUserByName);

//GET current route (required, only authenticated users have access)
usersRouter.get('/current', auth.required, usersCtrl.userLoggedIn);

//POST new user route (optional, everyone has access)
usersRouter.post('/', auth.optional, usersCtrl.createUser);

//POST login route (optional, everyone has access)
usersRouter.post('/login', auth.optional, usersCtrl.logUserIn);

//POST to update user
usersRouter.post('/:user_id', usersCtrl.updateUser);

//DELETE USER
usersRouter.delete('/:user_id', usersCtrl.deleteUser);

module.exports = usersRouter;
