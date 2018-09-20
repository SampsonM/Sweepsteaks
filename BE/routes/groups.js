const groupsRouter = require('express').Router();
import * as groupCtrl from '../controllers/groups';

groupsRouter.get('/', groupCtrl.getGroups);
groupsRouter.get('/name', groupCtrl.getGroupByName);

module.exports = groupsRouter;
