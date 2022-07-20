import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element 引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 公共样式
import '@/style/reset.less'
// 过滤
import * as obj from './fiters' // 时间过滤器
import dayjs from 'dayjs'
Object.keys(obj).forEach((key) => { // 通过遍历把时间过滤器文件里所有的过滤器注册全局
  Vue.filter(key, obj[key])
})
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
