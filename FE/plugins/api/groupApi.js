const groupBase = '/groups'

export default function(api, $cookie, store) {
  return {
    getAllGroups() {
      return api.get(`${groupBase}/`)
    },

    getGroupById(id) {
      return api.get(`${groupBase}/${id}`)
    },

    createGroup(groupData) {
      return api.post(`${groupBase}/`, groupData)
    },

    updateGroup(groupId, GroupData) {
      return api.post(`${groupBase}/${groupId}`, GroupData)
    }
  }
}
