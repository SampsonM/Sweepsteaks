import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const state = {
  hasSeenAnimation: false
}

const getters = {
  getField
}

const actions = {}

const mutations = {
  updateField
}

export default function createStore() {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}
