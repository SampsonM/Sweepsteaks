import { axiosInstance } from './api'
import Vue from 'vue'
import store from '@/store'
import router from '@/router.js'

const baseUrl = '/users';

export default {
	getUserByUserName(username) {
    return axiosInstance.get(`${baseUrl}/${username}`)
	},
	
	isUserNameUnique(username) {
    return axiosInstance.get(`${baseUrl}/unique/${username}`)
	},

	async getUserLoginState() {
		if (Vue.$cookies.get('ssTok')) {
			try {
				const { data } = await axiosInstance.get(`${baseUrl}/status/`)
				store.commit('UPDATE_ALLWD', data.user.authenticated)
				return data.user.authenticated
			} catch(err) {
				return false
			}
		} else {
			return false
		}
	},

	createUser(userData) {
    const jsonData = JSON.stringify(userData)
    return axiosInstance.post(`${baseUrl}/`, jsonData)
	},

	logUserIn(loginData) {
		const jsonData = JSON.stringify(loginData)
    return axiosInstance.post(`${baseUrl}/status/login`, jsonData)
	},

	logUserOut() {
		return axiosInstance.patch(`${baseUrl}/status/logout`, null, {
			headers: {
				authorisation: Vue.$cookies.get('ssTok')
			}
		})
	},

	updateUser(userId, userData) {
    return axiosInstance.post(`${baseUrl}/${userId}`, userData)
	},

	deleteUser(userId) {
    return axiosInstance.delete(`${baseUrl}/${userId}`)
	}
}
