import axios from 'axios'
import baseUrl from '../../config/constants'

const base = '/competitions';

export default {
	getAllCompetitions() {
		return axios.get(`${baseUrl}/${base}/`)
  },

	getCopetitionById(id) {
	  return axios.get(`${baseUrl}/${base}/${id}`)
	},
  
	createCompetition(competition) {
	  return axios.post(`${baseUrl}/${base}/`, competition)
	},
  
	updateUser(competitionId, competitionData) {
	  return axios.post(`${baseUrl}/${base}/${competitionId}`, competitionData)
	},
  
	deleteCompetition(competitionId) {
	  return axios.delete(`${baseUrl}/${base}/${competitionId}`)
	}
}