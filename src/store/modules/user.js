import { login } from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router'
const state = {
  token: ''
}
const mutations = {
  settoken (state, payload) {
    state.token = payload
  }
}
const actions = {
  // 登录
  async login (context, data) {
    try {
      const res = await login(data)
      if (res.data.data != null) {
        context.commit('settoken', res.data.data.token)
        router.push('/home')
      } else {
        Message.error(res.data.meta.msg) // 引入了element-ui 直接使用 提示出接口返回信息（this只存在组件 所以直接按需引入）
        // throw new Error(res.data.meta.msg)
      }
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
