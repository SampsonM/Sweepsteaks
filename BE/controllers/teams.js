'use strict'
import { Team } from '../models/index'

function getTeams(req, res, next) {
  return Team.find()
    .lean()
    .then(teams => {
      res.status(200).send(teams)
    })
    .catch(err => {
      next({error: err.message, err, root: 'getTeams'})
    })
}

function getTeamByName(req, res, next) {
  const teamName = req.params.team_name

  return Team.findOne({ name: teamName })
    .lean()
    .then(team => {
      res.status(200).send(team)
    })
    .catch(err => {
      next({ errMsg: err.message, err, root: 'getTeamByName' })
    })
}

function createTeam(req, res, next) {
  const teamData = req.body

  const err = isTeamDataValid(teamData)
  if (err){
    return res.status(400).send(err)
  } else if (req.user) {

    return Team.findOne({ name: teamData.name })
      .then(team => {
        res.status(400).send(`Team already exists, id: ${team._id}, name: ${team.name}`)
      })
      .catch(() => {
        const team = new Team(teamData)

        return team.save()
          .then(team => res.status(200).send(team))
          .catch(err => console.log(err))
      })
  }
}

function updateTeam(req, res, next) {
  const { updatedTeamData } = req.body
  const id = req.params.team_ID

  return Team.findByIdAndUpdate(id, {$set: updatedTeamData}, {new: true})
    .lean()
    .then(team => {
      res.status(200).send(team)
    })
    .catch(err => {
      next({ err: err.message, err, root: 'updateTeam' })
    })
}

function deleteTeam(req, res, next) {
  const teamId = req.params.team_ID

  return Team.findByIdAndDelete(teamId)
    .then(team => {
      res.status(200).send(team)
    })
    .catch(err => {
      next({ err: err.message, err, root: 'deleteTeam' })
    })
}

function isTeamDataValid({ name, sport, competition }) {
  if (!name || name.match(/[\d<>]|(script)/g) || name.length < 2 || name.length > 25) {
    return 'Team name must only have letters and and be 2 - 25 characters'
  }
  
  if (!sport || sport.match(/[\d<>]|(script)/g) || sport.length < 2 || sport.length > 15) {
    return 'Team sport must only have letters and and be 2 - 15 characters'
  }
 
  if (!competition || competition.match(/(script)/g) || competition.length < 2 || competition.length > 25) {
    return 'Team competition must only have letters and and be 2 - 25 characters'
  }
}

module.exports = {
  getTeams,
  getTeamByName,
  createTeam,
  updateTeam,
  deleteTeam
}
