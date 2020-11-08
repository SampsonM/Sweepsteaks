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
      'wager': newGroup.wager,
      'verifiedUsers': newGroup.verifiedUsers
    })
  
    newGroup = await newGroup.save()
    let groupOwner = await User.findById(newGroup.createdBy).lean()

    let returnedGroup = {
      createdBy: groupOwner.username,
      name: newGroup.name,
      users: newGroup.users,
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
  // TODO:
  // Add logic to add singe user to group if they are verified
}

module.exports = {
  getGroups,
  getGroupById,
  getGroupByName,
  addGroup,
  editGroupData
}
