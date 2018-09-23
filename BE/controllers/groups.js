'use strict';
import {Groups} from '../models/index';

function getGroups(req, res, next) {
  return Groups.find()
    .lean()
    .populate('createdBy', 'username')
    .populate('users', 'username')
    .then(groups => {
      res.status(200).send(groups)
    })
    .catch(next);
};

function getGroupByName(req, res, next) {
  const groupName = req.query.group_name;

  return Groups.findOne({ name: groupName })
    .lean()
    .populate('createdBy', 'name')
    .then(group => {
      res.status(200).send(group)
    })
    .catch(next)
}

function addGroup(req, res, next) {
  const groupData = req.body;

  return Groups.find()
    .then(() => {
      return new Groups({
        "name": groupData.name,
        "createdBy": groupData.createdBy,
        "wager": groupData.wager
      })
    })
    .then(newGroup => {
      return newGroup.save()
    })
    .then(returnedGroup => {
      res.status(201).send(returnedGroup)
    })
    .catch(next)
};

// ADD SECURITY TO SOMEHOW ONLY ALLOW GROUP OWNER TO EDIT
function editGroupData(req, res, next) {
  const groupData = req.body;
  const groupName = req.params.group_name;

  return Groups.findOneAndUpdate({name: groupName}, {$set: groupData}, {new:true})
    .populate('users', 'username')
    .populate('createdBy', 'username')
    .then(group => {
      res.status(200).send(group)
    })
    .catch(next)
}

module.exports = {
  getGroups,
  getGroupByName,
  addGroup,
  editGroupData
};
