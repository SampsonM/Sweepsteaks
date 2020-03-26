import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
import './assets/icons/fontAwesome'
import Vuelidate from 'vuelidate'
import featureFlagService from './services/featureFlageService'
import VueCookie from 'vue-cookies'

Vue.use(VueCookie)
Vue.use(Vuelidate)

const url = process.env.NODE_ENV === 'development' ? 'localhost' : 'sweepsteaks.co.uk'

Vue.$cookies.config(null, null, url, true)

featureFlagService.enableFeatureFlags()
Vue.config.productionTip = false

new Vue({
  el: '#sweep-steaks',
  router,
  store,
  render: h => h(App)
})
