'use strict'
const groupsRouter = require('express').Router()
import auth from '../auth'
import * as groupCtrl from '../../controllers/groups'

// GET All groups (required, only authenticated users have access)
groupsRouter.get('/', auth.required, groupCtrl.getGroups)

// GET A group by ID (required, only authenticated users have access)
groupsRouter.get('/:group_id', auth.required, groupCtrl.getGroupById)

// POST Edit a group by ID (required, only authenticated users have access)
groupsRouter.post('/:group_id', auth.required, groupCtrl.editGroupData)

// PUT Join a group by ID (required, only authenticated users have access)
groupsRouter.put('/join/:group_id', auth.required, groupCtrl.addUserToGroup)

// POST Add a new group (required, only authenticated users have access)
groupsRouter.post('/', auth.required, groupCtrl.addGroup)

module.exports = groupsRouter
