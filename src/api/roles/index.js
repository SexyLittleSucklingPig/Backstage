import request from '@/utils/request'
// 获取角色列表
export const getRoles = (params) => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}

// 所有权限
export const allPrivilege = (type) => {
  return request({
    url: `rights/${type}`
  })
}

// 编辑用户
export const changerole = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName,
      roleDesc
    }
  })
}

// 删除用户
export const delrole = ({ id }) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}

// 添加用户
export const addrole = ({ roleName, roleDesc }) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName,
      roleDesc
    }
  })
}

// 分配权限
export const rolerights = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: { roleId, rids }
  })
}
// 删除权限
export const delrolerights = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`,
    params: {
      roleId,
      rightId
    }
  })
}
