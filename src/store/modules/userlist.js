import { UserList, adduser, Changestatus, edituser, deleuser, setuser } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  userlist: {}
}
const mutations = {
  setuserlist (state, payload) {
    state.userlist = payload
  }
}
const actions = {
  // 获取用户列表
  async UserList (context, params) {
    try {
      const res = await UserList(params)
      console.log(res)
      context.commit('setuserlist', res.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  // 添加用户·
  async adduser (context, data) {
    try {
      const res = await adduser(data)
      console.log(res)
      if (res.data.data === null) {
        Message.error(res.data.meta.msg) // 引入了element-ui 直接使用 提示出接口返回信息（this只存在组件 所以直接按需引入）
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 修改用户状态
  async Changestatus (context, data) {
    try {
      const res = await Changestatus(data)
      console.log(res)
      Message.success('修改用户状态成功')
    } catch (error) {
      console.log(error)
    }
  },
  // 查询
  async searchuser (context, params) {
    try {
      const res = await UserList(params)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  // 编辑
  async edituser (context, data) {
    try {
      const res = await edituser(data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  // 删除
  async deleuser (context, data) {
    try {
      const res = await deleuser(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success('删除成功')
      } else {
        Message.error('删除失败')
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 设置
  async setuser (context, data) {
    try {
      const res = await setuser(data)
      console.log(res)
      if (res.data.data === null) {
        Message.error(res.data.meta.msg)
      } else {
        Message.error(res.data.meta.msg)
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
