import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userlist from './modules/userlist'
import Roles from './modules/Roles'
import getters from './gettets'
import Vuexpersistence from 'vuex-persist'
const vuexLocal = new Vuexpersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, userlist, Roles
  },
  getters,
  plugins: [vuexLocal.plugin]

})
