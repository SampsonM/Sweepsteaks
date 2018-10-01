'use strict';
import {Groups} from '../models/index';

function getGroups(req, res, next) {
  if (req.query.name) {
    return getGroupByName(req, res, next);
  };

  return Groups.find()
    .lean()
    .populate('createdBy', 'username')
    .populate('users', 'username')
    .then(groups => {
      res.status(200).send(groups)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getGroups'})
    })
};

function getGroupById(req, res, next) {
  const groupId = req.params.group_id;

  return Groups.findById(groupId)
    .lean()
    .populate('createdBy', 'name')
    .then(group => {
      res.status(200).send(group)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getGroupByID'})
    })
}

function getGroupByName(req, res, next) {
  const groupName = req.query.name;

  return Groups.findOne({ name: groupName })
    .lean()
    .populate('createdBy', 'name')
    .then(group => {
      res.status(200).send(group)
    })
    .catch(err => {
      next({message: err.message, err, root: 'GetGroupByName'})
    })
}

function addGroup(req, res, next) {
  const {newGroup} = req.body;

  return Groups.find()
    .then(() => {
      return new Groups({
        "name": newGroup.name,
        "createdBy": newGroup.createdBy,
        "wager": newGroup.wager
      })
    })
    .then(newGroup => {
      return newGroup.save()
    })
    .then(returnedGroup => {
      res.status(201).send(returnedGroup)
    })
    .catch(err => {
      next({message: err.message, err, root: 'AddGroup'})
    })
};

// ADD SECURITY TO SOMEHOW ONLY ALLOW GROUP OWNER TO EDIT
function editGroupData(req, res, next) {
  const {updatedGroupData} = req.body;
  const groupName = req.params.group_name;

  return Groups.findOneAndUpdate({name: groupName}, {$set: updatedGroupData}, {new:true})
    .populate('users', 'username')
    .populate('createdBy', 'username')
    .then(group => {
      res.status(200).send(group)
    })
    .catch(err => {
      next({message: err.message, err, root: 'editGroupData'})
    })
}

module.exports = {
  getGroups,
  getGroupById,
  getGroupByName,
  addGroup,
  editGroupData
};
