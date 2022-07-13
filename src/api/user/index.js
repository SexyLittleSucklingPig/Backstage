import request from '@/utils/request'

/**
 * 登录
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
// 用户数据列表
export const UserList = (params) => {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}

// 添加用户
export const adduser = ({
  username,
  password,
  email,
  mobile
}) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

/**
 * 修改用用户状态
 */
export const Changestatus = ({ uld, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uld}/state/${type}`,
    data: {
      uld,
      type
    }
  })
}
// 编辑用户
export const edituser = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      id,
      email,
      mobile
    }
  })
}
