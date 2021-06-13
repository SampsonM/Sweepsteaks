export default {
  async signup({ commit }, userData) {
    try {
      const res = await this.$UserApi.createUser(userData)
      const user = res.data.user

      this.$cookie.remove('ssTok')
      this.$cookie.remove('uid')

      this.$cookie.set('ssTok', user.token, '1d', '/', 'localhost', true, 'None')
      this.$cookie.set('uid', user._id, '1d', '/', 'localhost', true, 'None')

      commit('UPDATE_ALLWD', user.authenticated)

      window.$nuxt.$router.push('/dashboard')
    } catch (err) {
      const errors = err.response.data
      const serverErrs = []

      for (const key in errors) {
        serverErrs.push(errors[key].message)
      }

      // commit('UPDATE_SERVER_ERR', serverErrs)
    }
  },

  async logUserIn({ commit }, payload) {
    try {
      const res = await this.$UserApi.logIn(payload)
      const user = res.data.user
      const groups = user.groups
      
      commit('UPDATE_LOGIN_ERROR', null)
      commit('UPDATE_ALLWD', user.authenticated)
      commit('UPDATE_CURRENT_GROUPS', groups.map(g => ({...g})))
      
      user.groups = undefined
      commit('UPDATE_USER', user)
      
      this.$cookie.remove('ssTok')
      this.$cookie.remove('uid')
      this.$cookie.set('ssTok', user.token, '1d', '/', 'localhost', true, 'None')
      this.$cookie.set('uid', user._id, '1d', '/', 'localhost', true, 'None')

      window.$nuxt.$router.push('/dashboard')
    } catch (err) {
      commit('UPDATE_LOGIN_ERROR', err.response.data)
    }
  },

  async logout({ commit }) {
    try {
      await this.$UserApi.logOut()
    } catch (err) {
      // error
    }
    
    commit('UPDATE_ALLWD', false)
    this.$cookie.remove('ssTok')
    this.$cookie.remove('uid')

    window.$nuxt.$router.push('/')
  },

  async getUserData({ commit }) {
    try {
      const res = await this.$UserApi.getUserData()
      const groups = res.data.user.groups

      commit('UPDATE_CURRENT_GROUPS', groups.map(g => ({...g})))

    } catch (err) {
      // TODO: handle no user data case
    }
  },

  updateCurrentGroups({ commit }, group) {
    commit('UPDATE_CURRENT_GROUPS', group)
  }
}
