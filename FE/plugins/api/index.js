import competitionApi from './competitionApi'
import userApi from './userApi'
import groupApi from './groupApi'

export default function({ app, $axios, store }, inject) {
  // Inject to context as $CompApi
  inject('CompApi', competitionApi($axios))

  // Inject to context as $UserApi
  inject('UserApi', userApi($axios, app.$cookie, store))

  // Inject to context as $GroupApi
  inject('GroupApi', groupApi($axios, app.$cookie, store))
}
