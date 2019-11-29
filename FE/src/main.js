import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store/index.js'
import './registerServiceWorker'
import './assets/icons/fontAwesome'
import Vuelidate from 'vuelidate'
import featureFlagService from './services/featureFlageService'

Vue.use(Vuelidate)
featureFlagService.enableFeatureFlags()
Vue.config.productionTip = false

const router = createRouter()
const store = createStore()

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
