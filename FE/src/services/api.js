import axios from 'axios'

const baseDomain =
  process.env.NODE_ENV === 'production'
    ? 'https://sweep-steaks.herokuapp.com/'
    : 'https://localhost:3000/'

const baseUrl = `${baseDomain}/api`
const authorisationToken = document.cookie.ssTok || null

const API = axios.create({
  baseUrl,
  timeout: 4000,
  headers: {'authorisation': authorisationToken}
})

export const users = {
  base: '/users',

  getUserByUserName(username) {
    return API.get(`/${this.base}/${username}`)
  },

  getUserLoginState() {
    return API.get(`/${this.base}/current`)
  }
}