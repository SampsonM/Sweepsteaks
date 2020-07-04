import competitionApi from './competitionApi'
import userApi from './userApi'
import groupApi from './groupApi'

export default function({ app, $axios, store }, inject) {
  // Inject to context as $compApi
  inject('CompApi', competitionApi($axios))

  // Inject to context as $usersApi
  inject('UserApi', userApi($axios, app.$cookie, store))

  // Inject to context as $usersApi
  inject('GroupApi', groupApi($axios, app.$cookie, store))
}
