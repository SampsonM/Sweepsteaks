import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store/index.js'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import featureFlagService from './services/featureFlageService'
import { injectInitialState } from './utils'

export default function createApp() {

  // https://baconipsum.com/api/?type=meat-and-filler

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
  
  // During pre-rendering the initial state is
  // injected into the global scope, here we
  // fill the store with the initial state.
  if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__);
  
  router.beforeResolve(async (to, from, next) => {
    try {
      const components = router.getMatchedComponents(to);
  
      // By using `await` we make sure to wait
      // for the API request made by the `fetch()`
      // method to resolve before rendering the view.
      await Promise.all(components.map(x => x.fetch && x.fetch({ store })));
  
      // The `injectInitialState()` function injects
      // the current state as a global variable
      // `__INITIAL_STATE__` if the page is currently
      // pre-rendered.
      if (window.__PRERENDER_INJECTED) injectInitialState(store.state);
    } catch (error) {
      console.log(error);
    }
  
    return next();
  });
  
  app.$mount('#app')

  return { app, router, store }
}


