'use strict';
import { Competition } from '../models';
import { Team } from '../models';

function getCompetitions(req, res, next) {
  if (req.query.name) {
    return getCompetitionByName(req, res, next);
  };

  return Competition.find()
    .lean()
    .populate('teams', 'name')
    .then(Competitions => {
      res.status(200).send(Competitions)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitions'})
    })
};

function getCompetitionById(req, res, next) {
  const competitionId = req.params.competition_id;

  return Competition.findById(competitionId)
    .lean()
    .populate('teams', 'name')
    .then(Competition => {
      res.status(200).send(Competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitionById'})
    })
};

function getCompetitionByName(req, res, next) {
  let competitionName = req.query.name;

  return Competition.findOne({name: competitionName})
    .lean()
    .populate('teams', 'name')
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitionByName'})
    })
};

function addNewCompetition(req, res, next) {
  const {newCompetition} = req.body;

  return Competition.find()
    .then(() => {
      return createTeamsArray(newCompetition);
    })
    .then(newTeams => {
      return new Competition({
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
    .catch(err => {
      next({message: err.message, err, root: 'AddCompetition'})
    })
};

function updateCompetition(req, res, next) {
  const compId = req.params.competition_id;
  let {competitionUpdate} = req.body;

  return Competition.findById(compId)
    .populate('teams')
    .then(currentCompetition => {
      // IF teams supplied assume its a team delet then remove competition from all deleted teams
      // ELSE update all teams competition names if no teams supplied
      const updatedTeams = competitionUpdate.teams
      const currentTeams = currentCompetition.teams

      if (updatedTeams !== undefined && updatedTeams.length > 0) {

        for (let i = 0; i < currentTeams.length; i++) {
          const currentTeam = currentTeams[i]

          // if currentTeam not included in updated teams remove competition from team
          // Update past competitions with current removed one
          if (updatedTeams.indexOf(currentTeam.name) < 0) {
            const currentTeamComps = currentTeam.competitions;
            const index = currentTeamComps.indexOf(currentCompetition.name);

            if (index >= 0) {
              currentTeamComps.splice( index, 1 );
              currentTeam.pastCompetitions.push(currentCompetition.name)
            }

            const teamUpdate = {
              competitions: currentTeam.competitions,
              pastCompetitions: currentTeam.pastCompetitions
            }

            Team.findOneAndUpdate({ _id: currentTeam._id }, {$set: teamUpdate}, { new: true })
              .then(team => console.log('team HERE', team))

          }
        }
      }
      return competitionUpdate
    })
    .then(competitionUpdate => {
      return Competition.findOneAndUpdate({_id: compId}, competitionUpdate).populate('teams', 'name');
    })
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'updateCompetition'})
    })

};

// Maybe need to add headers/ authentication to prevent anybody deleting data
function deleteCompetition(req, res, next) {
  const competitionId = req.params.competition_id;

  return Competition.findByIdAndRemove(competitionId)
    .lean()
    .then(comp => {
      res.status(202).send(comp)
    })
    .catch(err => {
      next({message: err.message, err, root: 'DeleteCompetition'})
    })
};

// Utils 

function createTeamsArray(competitionData) {
  return competitionData.teams.map(team => {
    // should add competition to team!!
    // find competitions and add this new competition or update it
    return new Team({
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
  deleteCompetition
};
