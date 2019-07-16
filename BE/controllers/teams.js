'use strict';
import { Team } from '../models/index';

function getTeams(req, res, next) {
  if (req.query.team_name) {
    return getTeamByName(req, res, next);
  };

  return Team.find()
    .lean()
    .then(teams => {
      res.status(200).send(teams)
    })
    .catch(err => {
      next({error: err.message, err, root: 'getTeams'})
    });
};

function getTeamByName(req, res, next) {
  const teamName = req.params.team_name;

  return Team.findOne({ name: teamName })
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

  return Team.findByIdAndUpdate(id, {$set: updatedTeamData}, {new: true})
    .lean()
    .then(team => {
      res.status(200).send(team);
    })
    .catch(err => {
      next({ err: err.message, err, root: 'updateTeam' })
    })
}

function deleteTeam(req, res, next) {
  const teamId = req.params.team_ID;

  return Team.findByIdAndDelete(teamId)
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
