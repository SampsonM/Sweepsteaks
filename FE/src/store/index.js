import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}

const getters = {}

const actions = {
  signUp() {
    
  }
}

const mutations = {}

export default function createStore() {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}
