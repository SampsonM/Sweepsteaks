import UserAPI from '../services/api/userApi'
import router from '../router'
import Vue from 'vue'

export default {
	async signup({ commit }, userData) {
		try {
			const res = await UserAPI.createUser(userData)
			const user = res.data.user

			Vue.$cookies.set('ssTok', user.token)

			commit('UPDATE_ALLWD', user.authenticated)

			router.push('/dashboard')
			
		} catch (err) {
			const errors = err.response.data
			let serverErrs = []

			for (let key in errors) {
				serverErrs.push(errors[key].message)
			}

			commit('UPDATE_SERVER_ERR', serverErrs)
		}
	},
	async logUserIn({ commit }, payload) {
		try {
			const res = await UserAPI.logUserIn(payload)
			const user = res.data.user

			if (user.authenticated) {
				commit('UPDATE_ALLWD', user.authenticated)
				Vue.$cookies.set('ssTok', user.token, 60 * 60 * 12)
				router.push('/dashboard')
			} else {
				console.log(res)
			}

		} catch (err) {
			console.log(err.response.data)
			// commit error message
			router.push('/')
		}
	},
	async logout({ commit }) {
		try {
			const res = await UserAPI.logUserOut()
			const user = res.data.user

			Vue.$cookies.remove('ssTok')
			commit('UPDATE_ALLWD', user.authenticated)

		} catch(err) {
			Vue.$cookies.remove('ssTok')
			commit('UPDATE_ALLWD', false)
		}
		
		router.push('/')
	}
}
