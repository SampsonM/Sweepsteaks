'use strict'
const path = process.env.NODE_ENV
const mongoose = require('mongoose')
mongoose.Promise = Promise
const { User, Group, Team, Competition } = require('../models')
const {
  competitionData,
  groupData,
  teamData,
  userData
} = require(`./${path}-data`)
import { createHashSalt } from '../utils'

function seedGroups(userIds) {
  let newGroups = groupData.map(group => {
    let { name, creator, wager } = group

    const createdBy = userIds[creator]
    let userObject = Object.entries(userIds)
    let users = []

    for (let i = 0; i < 3; i++) {
      let rand = Number(Math.floor(Math.random() * userObject.length))
      users[i] = userObject.splice(rand, 1)[0][1]
    }

    return { name, creator, createdBy, users, wager }
  })

  return Group.insertMany(newGroups)
}

function seedCompetitions(teamDocs) {
  let newCompData = competitionData.map(comp => {
    let { name, sport } = comp

    let teams = teamDocs.reduce((acc, team) => {
      if (team.competitions.indexOf(comp.name) > -1) acc.push(team)
      return acc
    }, [])

    return { name, sport, teams }
  })

  return Competition.insertMany(newCompData)
}

function generateIds(data, docs) {
  return data.reduce((acc, item, ind) => {
    acc[`${item.firstName} ${item.lastName}`] = docs[ind]._id
    return acc
  }, {})
}

function seedUsers(users) {
  const newUserData = users.map(user => {
    const newUser = Object.assign({}, user)
    const passwordData = createHashSalt(newUser.password)
    
    newUser.hash = passwordData.hash
    newUser.salt = passwordData.salt
    newUser.password = null

    return newUser
  })
  return User.insertMany(newUserData)
}

async function seedDB() {
  try {
    let teamDocs

    await mongoose.connection.dropDatabase()
    
    if (path === 'production') {
      let data = await teamData.default()
      teamDocs = await Team.insertMany(data)
    } else {
      teamDocs = await Team.insertMany(teamData)
    }

    const compDocs = await seedCompetitions(teamDocs)
    const userDocs = await seedUsers(userData)

    const userIds = generateIds(userData, userDocs)
    const groupDocs = await seedGroups(userIds)
  
    return {
      compDocs,
      userDocs,
      teamDocs,
      groupDocs
    }

  } catch (err) {
    console.log(`${err} oh no! 🧟`)
  }
}

module.exports = seedDB
