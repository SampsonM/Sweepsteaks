let path = process.env.NODE_ENV;
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const { Users, Groups, Teams, Competitions } = require("../models");
const {
  competitionData,
  groupData,
  teamData,
  userData
} = require(`./${path}-data`);

function seedGroups(userIds) {
  let newGroups = groupData.map(group => {
    let { name, creator, wager } = group;

    const createdBy = userIds[creator];
    let userObject = Object.entries(userIds);
    let users = [];

    for (let i = 0; i < 3; i++) {
      let rand = Number(Math.floor(Math.random() * userObject.length));
      users[i] = userObject.splice(rand, 1)[0][1];
    }

    return { name, creator, createdBy, users, wager };
  });

  return Groups.insertMany(newGroups);
}

function seedCompetitions(teamDocs) {
  let newCompData = competitionData.map(comp => {
    let { name, sport } = comp;

    let teams = teamDocs.reduce((acc, team) => {
      if (team.competition === comp.name) acc.push(team._id);
      return acc;
    }, [])
    
    return { name, sport, teams };
  })

  return Competitions.insertMany(newCompData);
}

function generateIds(data, docs) {
  return data.reduce((acc, item, ind) => {
    acc[`${item.firstName} ${item.lastName}`] = docs[ind]._id;
    return acc;
  }, {});
}

function seedDB() {
  return mongoose.connection.dropDatabase()
    .then(() => {
      return Teams.insertMany(teamData);
    })
    .then(teamDocs => {
      return Promise.all([
        seedCompetitions(teamDocs),
        Users.insertMany(userData),
        teamDocs
      ]);
    })
    .then(([compDocs, userDocs, teamDocs]) => {
      let userIds = generateIds(userData, userDocs);
      return Promise.all([compDocs, userDocs, teamDocs, seedGroups(userIds)]);
    })
    .then(([compDocs, userDocs, teamDocs, groupDocs]) => {
      return [compDocs, userDocs, teamDocs, groupDocs];
    })
   .catch(err => console.log(`${{err}} oh no! 🧟`))
}

module.exports = seedDB;
