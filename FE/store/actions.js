export default {
  async signup({ commit }, userData) {
    try {
      const res = await this.$UserApi.createUser(userData)
      const user = res.data.user

      this.$cookie.set('ssTok', user.token)

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
      
      commit('UPDATE_LOGIN_ERROR', null)
      commit('UPDATE_ALLWD', user.authenticated)
      
      this.$cookie.remove('ssTok')
      this.$cookie.remove('uid')
      this.$cookie.set('ssTok', user.token)
      this.$cookie.set('uid', user._id)

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

  updateCurrentGroups({ commit }, group) {
    commit('UPDATE_CURRENT_GROUPS', group)
  }
}
