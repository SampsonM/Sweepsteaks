'use strict';
import {Teams} from '../models/index';

function getTeams(req, res, next) {
  return Teams.find()
    .lean()
    .then(teams => {
      res.status(200).send(teams)
    })
    .catch(err => {
      next({error: err.message, err, root: 'getTeams'})
    });
};

module.exports = {
  getTeams
}
