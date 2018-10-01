'use strict';
const groupsRouter = require('express').Router();
import * as groupCtrl from '../controllers/groups';

groupsRouter.post('/:group_name', groupCtrl.editGroupData);
groupsRouter.post('/', groupCtrl.addGroup);

groupsRouter.get('/', groupCtrl.getGroups);
groupsRouter.get('/:group_id', groupCtrl.getGroupById);

module.exports = groupsRouter;
