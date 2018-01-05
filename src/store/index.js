import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import ceshi from './ceshi'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ceshi
  },
  state,
  actions,
  mutations
})
