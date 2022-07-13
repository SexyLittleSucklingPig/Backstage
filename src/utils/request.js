import axios from 'axios'
import store from '@/store' // 因为获取数据需要传请求头
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
})
// 拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) { // 先判断
    config.headers = { // 请求的请求头
      Authorization: store.state.user.token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
