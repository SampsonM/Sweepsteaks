import { updateField } from 'vuex-map-fields'

export default {
	UPDATE_ALLWD(state, payload) {
		state.allwd = payload
	},
	UPDATE_SERVER_ERR(state, payload) {
		state.serverErrors = payload
	},
	updateField
}
