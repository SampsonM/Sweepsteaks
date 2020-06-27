import competitionApi from './competitionApi'
import userApi from './userApi'

export default function({ app, $axios, store }, inject) {
  const api = $axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://sweep-steaks.herokuapp.com/api'
        : 'https://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: process.env.NODE_ENV !== 'development'
  })

  // Inject to context as $compApi
  inject('CompApi', competitionApi(api))

  // Inject to context as $usersApi
  inject('UserApi', userApi(api, app.$cookie, store))
}
