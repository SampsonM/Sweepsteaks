import { axiosInstance } from './api'

const base = 'users';

export default {
	getUserByUserName(username) {
    return axiosInstance.get(`/${base}/${username}`)
	},
	
	isUserNameUnique(username) {
    return axiosInstance.get(`/${base}/unique/${username}`)
	},

	getUserLoginState() {
    return axiosInstance.get(`/${base}/current`)
	},

	createUser(userData) {
    const jsonData = JSON.stringify(userData)
    return axiosInstance.post(`/${base}/`, jsonData)
	},

	logUserIn(loginData) {
    return axiosInstance.post(`/${base}/login`, loginData)
	},

	updateUser(userId, userData) {
    return axiosInstance.post(`/${base}/${userId}`, userData)
	},

	deleteUser(userId) {
    return axiosInstance.delete(`/${base}/${userId}`)
	}
}