'use strict';
import { Teams } from '../models/index';

function getTeams(req, res, next) {
  if (req.query.team_name) {
    return getTeamByName(req, res, next);
  };

  return Teams.find()
    .lean()
    .then(teams => {
      res.status(200).send(teams)
    })
    .catch(err => {
      next({error: err.message, err, root: 'getTeams'})
    });
};

function getTeamByName(req, res, next) {
  const teamName = req.query.team_name;

  return Teams.findOne({ name: teamName })
    .lean()
    .then(team => {
      res.status(200).send(team)
    })
    .catch(err => {
      next({ err: err.message, err, root: 'getTeamByName' })
    })
}

function updateTeam(req, res, next) {
  const { updatedTeamData } = req.body;
  const id = req.params.team_ID;

  return Teams.findByIdAndUpdate(id, {$set: updatedTeamData}, {new: true})
    .lean()
    .then(team => {
      res.status(200).send(team);
    })
    .catch(err => {
      next({ err: err.message, err, root: 'updateTeam' })
    })
}

function deleteTeam(req, res, next) {
  const teamId = req.body.id;

  return Teams.findByIdAndDelete(teamId)
    .then(team => {
      res.status(200).send(team)
    })
    .catch(err => {
      next({ err: err.message, err, root: 'deleteTeam' })
    })
}

module.exports = {
  getTeams,
  getTeamByName,
  updateTeam,
  deleteTeam
};
