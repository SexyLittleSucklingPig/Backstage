import request from '@/utils/request'

// 获取商品列表
export const getProductList = ({
  query,
  pagenum,
  pagesize
}) => {
  return request({
    method: 'GET',
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
// 删除
export const delegoods = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}
// 编辑
export const goodsId = (id) => {
  return request({
    method: 'GET',
    url: `goods/${id}`
  })
}
// 编辑提交
export const setgoods = (id, form2) => {
  return request({
    method: 'PUT',
    url: `goods/${id}`,
    data: {
      id,
      form2
    }
  })
}
