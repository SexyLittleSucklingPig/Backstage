import request from '@/utils/request'
// 获取角色列表
export const getRoles = (data) => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}
