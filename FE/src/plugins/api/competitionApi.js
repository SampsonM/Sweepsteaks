const compBase = '/competitions'

export default function(api) {
  return {
    getAllCompetitions() {
      return api.get(`${compBase}/`)
    },

    getCopetitionById(id) {
      return api.get(`${compBase}/${id}`)
    },

    createCompetition(competition) {
      return api.post(`${compBase}/`, competition)
    },

    updateCompetition(competitionId, competitionData) {
      return api.post(`${compBase}/${competitionId}`, competitionData)
    },

    deleteCompetition(competitionId) {
      return api.delete(`${compBase}/${competitionId}`)
    }
  }
}
