const usersBase = '/users'

export default function(api, $cookie, store) {
  return {
    getUserByUserName(username) {
      return api.get(`${usersBase}/${username}`)
    },

    isUserNameUnique(username) {
      return api.get(`${usersBase}/unique/${username}`)
    },

    async getUserLoginState() {
      if ($cookie.get('ssTok')) {
        try {
          const { data } = await api.get(`${usersBase}/status/`)
          store.commit('UPDATE_ALLWD', data.user.authenticated)
          $cookie.set('ssTok', data.user.token, 60 * 60 * 12)
          return data.user.authenticated
        } catch (err) {
          return false
        }
      } else {
        return false
      }
    },

    createUser(userData) {
      return api.post(`${usersBase}/`, { userData: JSON.stringify(userData) })
    },

    logUserIn(loginData) {
      return api.post(`${usersBase}/status/login`, loginData)
    },

    logUserOut() {
      return api.patch(`${usersBase}/status/logout`, null, {
        headers: {
          authorisation: $cookie.get('ssTok')
        }
      })
    },

    updateUser(userId, userData) {
      return api.post(`${usersBase}/${userId}`, userData)
    },

    deleteUser(userId) {
      return api.delete(`${usersBase}/${userId}`)
    }
  }
}
