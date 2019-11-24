import Vue from 'vue'
import VueCookie from 'vue-cookies'

Vue.use(VueCookie)

export default class fetureFlagService {
	static enableFeatureFlags() {
		const cookies = Vue.cookies.keys()

		const testRegex = new RegExp(/sweep/)

		cookies.forEach(cook => {
			let cookieMatches = cook.match(testRegex)

			if (cookieMatches) {
				Vue.prototype[`$${cook}`] = true
			}
		})
	}
}
