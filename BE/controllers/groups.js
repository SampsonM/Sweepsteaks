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

module.exports = {
  getGroups
};
