const groupsRouter = require('express').Router();
import * as groupCtrl from '../controllers/groups';

groupsRouter.post('/name/:group_name', groupCtrl.editGroupData);
groupsRouter.post('/', groupCtrl.addGroup);

groupsRouter.get('/', groupCtrl.getGroups);
groupsRouter.get('/name', groupCtrl.getGroupByName);

module.exports = groupsRouter;
