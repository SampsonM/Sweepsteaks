'use strict'
import { Group, User } from '../models/index'

function getGroups(req, res, next) {
  if (req.query.name) {
    return getGroupByName(req, res, next)
  } else {
    return next(req, res, next)
  }

  // return Group.find()
  //   .lean()
  //   .populate('createdBy', 'username')
  //   .populate('users', 'username')
  //   .then(groups => {
  //     res.status(200).send(groups)
  //   })
  //   .catch(err => {
  //     next({message: err.message, err, root: 'getGroups'})
  //   })
}

function getGroupById(req, res, next) {
  const groupId = req.params.group_id

  return Group.findById(groupId)
    .lean()
    .populate('createdBy', {_id: 0, username: 1, avatarUrl: 1})
    .populate('users', {_id: 0, username: 1, avatarUrl: 1})
    .then(group => {
      res.status(200).send(group)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getGroupByID'})
    })
}

function getGroupByName(req, res, next) {
  const groupName = req.query.name

  return Group.findOne({ name: groupName }, {_id: 0, name: 1, createdBy: 1, users: 1, wager: 1 })
    .lean()
    .populate('createdBy', {_id: 0, username: 1, avatarUrl: 1})
    .populate('users', {_id: 0, username: 1, avatarUrl: 1})
    .then(group => {
      res.status(200).send(group)
    })
    .catch(err => {
      next({message: err.message, err, root: 'GetGroupByName'})
    })
}

async function addGroup(req, res, next) {
  // TODO:
  // Validate this data
  // Check creator has less than 5 groups created

  let { newGroup } = req.body

  try {
    newGroup = new Group({
      'name': newGroup.name,
      'createdBy': newGroup.createdBy,
      'users': [newGroup.createdBy],
      'verifiedUsers': newGroup.verifiedUsers
    })
  
    newGroup = await newGroup.save()
    
    // update users groups
    const newUser = await User.findById(req.user.id)
    newUser.groups = [...newUser.groups, newGroup]
    await newUser.save()

    newGroup = await Group.populate(newGroup, 'users')
    const users = newGroup.users.map(u => u.username)

    let returnedGroup = {
      createdBy: newGroup.createdBy.username,
      name: newGroup.name,
      users,
      wager: newGroup.wager,
      _id: newGroup.id
    }

    return res.status(201).send({ group: returnedGroup })

  } catch (err) {
    return next({message: err.message, err, root: 'AddGroup'})
  }
}

async function editGroupData(req, res, next) {
  // TODO:
  // Only allow creator to edit data
  // Validate this data here

  const { updatedGroupData } = req.body
  const groupId = req.params.group_id

  try {
    let group = await Group
      .findOneAndUpdate({_id: groupId}, {$set: updatedGroupData}, {new:true})
      .populate('users', 'username')
      .populate('createdBy', 'username')

    return res.status(200).send(group)

  } catch (err) {
    return next({message: err.message, err, root: 'editGroupData'})
  }
}

async function addUserToGroup(req, res, next) {
  try {
    const groupId = req.params.group_id
    let group = await Group.findById(groupId)

    // Check if user is already in group?
    if (group.users.indexOf(req.user.id) !== -1) { 
      group = await Group.populate(group, 'users')
      group = await Group.populate(group, 'createdBy')
      const users = group.users.map(u => u.username)

      const groupData = {
        createdBy: group.createdBy.username,
        name: group.name,
        users,
        _id: group.id
      }
      
      return res.status(200).send({group: groupData})
    }
    
    // check if user is verified by owner
    if (group.verifiedUsers.indexOf(req.user.email) !== -1) {
      // update users groups
      const newUser = await User.findById(req.user.id)
      newUser.groups = [...newUser.groups, group]
      await newUser.save()

      // update groups user list
      const groupsUsers = [...group.users, newUser]
      group = await Group.findOneAndUpdate({_id: groupId}, { users: groupsUsers }, { new: true }).populate('users').populate('createdBy')
      
      const users = group.users.map(u => u.username)

      const groupData = {
        createdBy: group.createdBy.username,
        name: group.name,
        users,
        _id: group.id
      }

      return res.status(200).send({ group: groupData })
    } else {
      return res.status(500).send('User not verified by group owner')
    }

  } catch (err) {
    return next({message: err.message, err, root: 'editGroupData'})
  }
}

module.exports = {
  getGroups,
  getGroupById,
  getGroupByName,
  addGroup,
  editGroupData,
  addUserToGroup
}
