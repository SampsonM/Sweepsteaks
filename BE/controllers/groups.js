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
}

module.exports = {
  getGroups,
  getGroupByName
};
