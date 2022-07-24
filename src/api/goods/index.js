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
export const setgoods = (data) => {
  return request({
    method: 'PUT',
    url: `goods/${data.id}`,
    data
  })
}

// 商品分类数据列表
export const getClassificationlist = () => {
  return request({
    method: 'GET',
    url: 'categories'
  })
}

// 商品分类参数(动态)
export const parameterlist = (id, sel) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}

// 添加参数
export const addaddparameter = (data) => {
  return request({
    method: 'POST',
    url: `categories/${data.id}/attributes`,
    data
  })
}

// 编辑属性
export const modify = (data) => {
  return request({
    method: 'PUT',
    url: `categories/${data.id}/attributes/${data.attrId}`,
    data
  })
}

// 删除参数
export const remove = (params) => {
  return request({
    method: 'DELETE',
    url: `categories/${params.id}/attributes/${params.attrid}`,
    params
  })
}

/// /////////////////////////商品分类
// 获取商品分类列表
export const classificationgoods = ({ pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'categories',
    params: {
      pagenum, pagesize
    }
  })
}
