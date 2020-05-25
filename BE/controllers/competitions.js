'use strict'
import { Competition } from '../models'
import { Team } from '../models'
import fs from 'fs'
import path from 'path'

function getCompetitions(req, res, next) {
  if (req.query.name) {
    return getCompetitionByName(req, res, next)
  }

  return Competition.find()
    .lean()
    .populate('teams', 'name')
    .then(Competitions => {
      res.status(200).send(Competitions)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitions'})
    })
}

function getCompetitionById(req, res, next) {
  const competitionId = req.params.competition_id

  return Competition.findById(competitionId)
    .lean()
    .populate('teams', 'name')
    .then(Competition => {
      res.status(200).send(Competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitionById'})
    })
}

function getCompetitionByName(req, res, next) {
  let competitionName = req.query.name

  return Competition.findOne({name: competitionName})
    .lean()
    .populate('teams', 'name')
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'getCompetitionByName'})
    })
}

function addNewCompetition(req, res, next) {
  const {newCompetition} = req.body

  // TODO - add owner auth check

  return Competition.find()
    .then(() => {
      return createTeamsArray(newCompetition)
    })
    .then(newTeams => {
      return new Competition({
        "name": newCompetition.name,
        "teams": newTeams,
        "sport": newCompetition.sport
      })
    })
    .then(newCompetition => {
      return newCompetition.save()
    })
    .then(returnedCompetition => {
      res.status(201).send(returnedCompetition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'AddCompetition'})
    })
}

function updateCompetition(req, res, next) {
  const compId = req.params.competition_id
  let {competitionUpdate} = req.body

  // TODO - add owner auth check

  return Competition.findById(compId)
    .populate('teams')
    .then(currentCompetition => {
      return Promise.all([
        currentCompetition,
        createMissingTeams(competitionUpdate, currentCompetition),
        updateTeamsCompetitions(competitionUpdate, currentCompetition)
      ])
    })
    .then(([ currentcomp ]) => {
      return Team.find({ competitions: competitionUpdate.name || currentcomp.name })
    })
    .then(teams => {
      competitionUpdate.teams = teams
      if (competitionUpdate.name) competitionUpdate.name = competitionUpdate.name.toLowerCase()
      return Competition.findOneAndUpdate({_id: compId}, competitionUpdate, { new: true }).populate('teams', 'name')
    })
    .then(competition => {
      res.status(200).send(competition)
    })
    .catch(err => {
      next({message: err.message, err, root: 'updateCompetition'})
    })
}

function deleteCompetition(req, res, next) {
  const competitionId = req.params.competition_id
  const authOwnerHeader = req.get('ownerAuth')
  const authOwnerToken = process.env.OWNER_AUTH_KEY || fs.readFileSync(path.resolve(__dirname, '../config/certs/ownerAuthKey.txt'), 'utf8')

  if (authOwnerHeader === authOwnerToken) {
    return Competition.deleteOne({ _id: competitionId })
      .lean()
      .then(() => {
        return Competition.find().populate()
      })
      .then(comp => {
        res.status(202).send(comp)
      })
      .catch(err => {
        next({message: err.message, err, root: 'DeleteCompetition'})
      })
  } else {
    return res.status(401).json('fail')
  }
}

// Utils

function createTeamsArray(competitionData) {
  return Promise.all(competitionData.teams.map(async team => {
    return await Team.findOne({ name: team })
      .then(team => {
        return team
          ? team // update yeams competitions here too
          : new Team({
              "name": team,
              "competition": competitionData.name,
              "sport": competitionData.sport
            })
      })
    })
  )
}

async function updateTeamsCompetitions(compUpdate, currentComp) {
  const teamsToUpdate = compUpdate.teams
  const currentTeams = currentComp.teams
  const competitionNameUpdated = Boolean(compUpdate.name && currentComp.name !== compUpdate.name)
  const updatedTeams = []

  for (let i = 0; i < currentTeams.length; i++) {
    const team = currentTeams[i]
    const teamComps = team.competitions
    const teamRmvdFromCompetition = Boolean(teamsToUpdate && teamsToUpdate.indexOf(team.name) < 0)

    const teamData = {}

    if (teamRmvdFromCompetition) {
      teamComps.splice( teamComps.indexOf(currentComp.name), 1 )

      competitionNameUpdated
        ? team.pastCompetitions.push(compUpdate.name.toLowerCase())
        : team.pastCompetitions.push(currentComp.name.toLowerCase())

      teamData.competitions = team.competitions
      teamData.pastCompetitions = team.pastCompetitions
    }
    
    if (competitionNameUpdated && teamComps.indexOf(currentComp.name) >= 0) {
      teamComps.splice( teamComps.indexOf(currentComp.name), 1, compUpdate.name )
      teamData.competitions = team.competitions
    }
    const updatedTeam = await Team.findOneAndUpdate({_id: team._id}, {$set: teamData}, {new: true})
    updatedTeams.push(updatedTeam)
  }
  return updatedTeams
}

async function createMissingTeams(compUpdate, currentComp) {
  const updatedTeams = compUpdate.teams
  const newTeams = []
  const currentTeamsNames = currentComp.teams.map(team => team.name)

  if (updatedTeams && updatedTeams.length > 0) {
    for (let i = 0; i < updatedTeams.length; i++) {
      const team = updatedTeams[i]
      
      if (currentTeamsNames.indexOf(team) < 0) {
        const newTeam = await new Team({
          name: team,
          sport: currentComp.sport,
          competitions: [compUpdate.name || currentComp.name]
        }).save()
        newTeams.push(newTeam)
      }
    }
  }
  return newTeams
}

module.exports = {
  getCompetitions,
  getCompetitionById,
  addNewCompetition,
  updateCompetition,
  deleteCompetition
}
