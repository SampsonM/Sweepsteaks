import competitionApi from './competitionApi'
import userApi from './userApi'
import groupApi from './groupApi'

export default function({ app, $axios, store }, inject) {
  const api = $axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://sweep-steaks.herokuapp.com/api'
        : 'https://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

  // Inject to context as $compApi
  inject('CompApi', competitionApi(api))

  // Inject to context as $usersApi
  inject('UserApi', userApi(api, app.$cookie, store))

  // Inject to context as $usersApi
  inject('GroupApi', groupApi(api, app.$cookie, store))
}
