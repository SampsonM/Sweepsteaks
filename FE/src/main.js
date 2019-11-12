import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      console.log(redirect)
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
}).$mount('#app')
