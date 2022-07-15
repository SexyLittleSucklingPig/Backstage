import { getRoles } from '@/api/roles'
const state = {
  RoleList: []
}
const mutations = {
  setRoleList (state, payload) {
    state.RoleList = payload
  }
}
const actions = {
  async getRoles (context, data) {
    try {
      const res = await getRoles()
      console.log(res)
      context.commit('setRoleList', res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
