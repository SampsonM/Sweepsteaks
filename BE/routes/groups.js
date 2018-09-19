const groupsRouter = require('express').Router();
import * as groupCtrl from '../controllers/groups';

groupsRouter.get('/', groupCtrl.getGroups);

module.exports = groupsRouter;
