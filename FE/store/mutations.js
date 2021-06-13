import { updateField } from 'vuex-map-fields'

export default {
  UPDATE_ALLWD(state, payload) {
    state.allwd = payload
  },
  UPDATE_LOGIN_ERROR(state, payload) {
    state.loginError = payload
  },
  UPDATE_CURRENT_GROUPS(state, payload) {
    state.currentGroups = payload
  },
  UPDATE_USER(state, payload) {
    state.user = { ...state.user, ...payload}
  },
  updateField
}
