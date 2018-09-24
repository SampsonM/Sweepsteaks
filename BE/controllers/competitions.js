'use strict';
import {Competitions} from '../models';
import {Teams} from '../models';

function getCompetitions(req, res, next) {
  return Competitions.find()
    .lean()
    .populate('teams', 'name')
    .then(Competitions => {
      res.status(200).send(Competitions)
    })
    .catch(next)
};

function getCompetitionById(req, res, next) {
  const competitionId = req.params.competition_id;

  return Competitions.findById(competitionId)
    .lean()
    .populate('teams', 'name')
    .then(Competition => {
      res.status(200).send(Competition)
    })
    .catch(next)
};

function getCompetitionByName(req, res, next) {
  const competitionName = req.query.competition_name;

  return Competitions.findOne({name: competitionName})
    .lean()
    .populate('teams', 'name')
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(next)

};

function addNewCompetition(req, res, next) {
  const {newCompetition} = req.body;

  return Competitions.find()
    .then(() => {
      return createTeamsArray(newCompetition);
    })
    .then(newTeams => {
      return new Competitions({
        "name": newCompetition.name,
        "teams": newTeams,
        "sport": newCompetition.sport
      })
    })
    .then(newCompetition => {
      return newCompetition.save();
    })
    .then(returnedCompetition => {
      res.status(201).send(returnedCompetition)
    })
    .catch(next)
};

function updateCompetition(req, res, next) {
  const compId = req.params.competition_id;
  let {competitionUpdate} = req.body;

  return Competitions.find()
    .then(() => {
      return createTeamsArray(competitionUpdate)
    })
    .then(teams => {
      competitionUpdate.teams = teams;
    })
    .then(() => {
      return Competitions.findOneAndUpdate({_id: compId}, competitionUpdate).populate('teams', 'name');
    })
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(next)

};

// maybe need to add headers/ authoentication to prevent anybody deleting data
function deleteCompetition(req, res, next) {
  const competitionId = req.params.competition_id;

  return Competitions.findByIdAndRemove(competitionId)
    .lean()
    .then(comp => {
      res.status(202).send(comp)
    })
    .catch(next)

};


// utils 

function createTeamsArray(competitionData) {
  return competitionData.teams.map(team => {
    return new Teams({
      "name": team,
      "competition": competitionData.name,
      "sport": competitionData.sport
    })
  })
}

module.exports = {
  getCompetitions,
  getCompetitionById,
  addNewCompetition,
  updateCompetition,
  deleteCompetition,
  getCompetitionByName
};
