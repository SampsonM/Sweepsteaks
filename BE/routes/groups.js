'use strict';
const groupsRouter = require('express').Router();
import * as groupCtrl from '../controllers/groups';

groupsRouter.post('/name/:group_name', groupCtrl.editGroupData);
groupsRouter.post('/', groupCtrl.addGroup);

groupsRouter.get('/name/:group_name', groupCtrl.getGroupByName);
groupsRouter.get('/:group_id', groupCtrl.getGroupById);
groupsRouter.get('/', groupCtrl.getGroups);

module.exports = groupsRouter;
