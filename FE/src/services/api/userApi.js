import { axiosInstance } from './api'

const baseUrl = '/users';

export default {
	getUserByUserName(username) {
    return axiosInstance.get(`${baseUrl}/${username}`)
	},
	
	isUserNameUnique(username) {
    return axiosInstance.get(`${baseUrl}/unique/${username}`)
	},

	getUserLoginState() {
    return axiosInstance.get(`${baseUrl}/current`)
	},

	createUser(userData) {
    const jsonData = JSON.stringify(userData)
    return axiosInstance.post(`${baseUrl}/`, jsonData)
	},

	logUserIn(loginData) {
    return axiosInstance.post(`${baseUrl}/login`, loginData)
	},

	updateUser(userId, userData) {
    return axiosInstance.post(`${baseUrl}/${userId}`, userData)
	},

	deleteUser(userId) {
    return axiosInstance.delete(`${baseUrl}/${userId}`)
	}
}