const usersBase = '/users'

export default function(api, $cookie, store) {
  return {
    getUserData() {
      return api.get(`${usersBase}/`)
    },

    isUserNameUnique(username) {
      return api.get(`${usersBase}/unique/${username}`)
    },

    async getUserLoginState() {
      if ($cookie.get('ssTok')) {
        try {
          const { data } = await api.get(`${usersBase}/status/`)
          store.commit('UPDATE_ALLWD', data.user.authenticated)
          $cookie.set('ssTok', data.user.token, '1d', '/', 'localhost', true, 'None')
          return data.user
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

    logIn(loginData) {
      return api.post(`${usersBase}/status/login`, loginData)
    },

    logOut() {
      return api.patch(`${usersBase}/status/logout`, null, {
        headers: {
          authorisation: $cookie.get('ssTok')
        }
      })
    },

    updateUser(userId, userData) {
      return api.put(`${usersBase}/${userId}`, userData)
    },

    deleteUser(userId) {
      return api.delete(`${usersBase}/${userId}`)
    }
  }
}
