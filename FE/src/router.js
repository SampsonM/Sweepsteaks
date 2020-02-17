import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
import userApi from './services/api/userApi'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: to => {
    if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        return window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
      }
    } else {
      return window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (Vue.prototype.$sweepAccessAllowed) {
    if (to.path === '/login') {
      if (store.state.allwd) {
        return next('/dashboard')
      } else {
        const loggedIn = await userApi.getUserLoginState()
        if (loggedIn) {
          return next('/dashboard')
        }
        return next()
      }
    } else if (to.path === '/dashboard') {
      if (store.state.allwd) {
        next()
      } else {
        const userLoggedIn = await userApi.getUserLoginState()
        if (userLoggedIn) {
          return next()
        }
        return next('/')
      }
    } else {
      return next()
    }
  } else if (to.path === '/') {
    return next()
  } else {
    return next('/')
  }
})

export default router
