import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default function createRouter() {

  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
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
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.path === '/') {
      next()
    } else if (Vue.prototype.$sweepAccessAllowed) {
      next()
    } else {
      next('/')
    }
  })

  return router
}
