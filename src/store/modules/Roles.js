import { getRoles, allPrivilege, changerole, delrole, addrole, rolerights, delrolerights } from '@/api/roles'
import { Message } from 'element-ui'
const state = {
  RoleList: [],
  privilege: [],
  taglist: []
}
const mutations = {
  setRoleList (state, payload) {
    state.RoleList = payload
  },
  // 存储树状数据
  setprivilege (state, payload) {
    state.privilege = payload
  },
  // 存储list tag数据
  settaglist (state, payload) {
    state.taglist = payload
  }
}
const actions = {
  async getRoles (context, data) {
    try {
      const res = await getRoles()
      context.commit('setRoleList', res.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  // 所有权限 树状
  async allPrivilege (context, data) {
    try {
      const res = await allPrivilege(data)
      console.log(res)
      context.commit('setprivilege', res.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  // list数据
  async taglist (context, data) {
    try {
      const res = await allPrivilege(data)
      console.log(res)
      context.commit('settaglist', res.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  // 编辑用户
  async changerole (context, data) {
    try {
      const res = await changerole(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success('修改成功')
      } else {
        Message.success('修改失败')
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 删除用户
  async delrole (context, data) {
    try {
      const res = await delrole(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success('删除成功')
      } else {
        Message.error(res.data.meta.msg)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 添加用户、
  async addend (context, data) {
    try {
      const res = await addrole(data)
      console.log(res)
      if (res.data.meta.status === 201) {
        Message.success(res.data.meta.msg)
      } else {
        Message.error(res.data.meta.msg)
      }
    } catch (error) {
      Message.success(error.message)
      console.log(error)
    }
  },
  // 分配权限
  async rolerights (context, data) {
    try {
      const res = await rolerights(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success(res.data.meta.msg)
      } else {
        Message.error(res.data.meta.msg)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 删除权限
  async delrolerights (context, params) {
    try {
      const res = await delrolerights(params)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success(res.data.meta.msg)
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
