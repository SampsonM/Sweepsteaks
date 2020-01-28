/* Teams currently used
  Premier league
  German bundesliga
  Formula 1
  Rugby Union world cup
  Spanish la liga
  FIFA World cup
  FIFA Womens World cup
  Cricket world cup
  MotoGP */

import { teamEndpoints } from './constants'
import axios from 'axios'

export default async function() {
  let teams = []

  for (let i = 0; i < teamEndpoints.length; i++) {
    let ep = teamEndpoints[i]
    let { data } = await axios.get(ep)

    for (let j = 0; j < data.teams.length; j++) {
      let team = data.teams[j]

      teams.push({
        name: team.strTeam,
        sport: team.strSport,
        competitions: [team.strLeague]
      })
    }
  }

  return teams
}
