import { getClassificationlist } from '@/api/goods'
const state = {
  Classificationlist: []
}
const mutations = {
  // 商品分类列表
  setClassificationlist (state, payload) {
    state.Classificationlist = payload
  }
}
const actions = {
  // 获取商品分类
  async getClassificationlist (context, params) {
    try {
      const res = await getClassificationlist(params)
      console.log(res)
      context.commit('setClassificationlist', res.data.data)
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
