import { getField } from 'vuex-map-fields'

export default {
	firstServerError(state) {
		return state.serverErrors[0]
	},
	getField
}
