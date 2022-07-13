import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element 引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 公共样式
import '@/style/reset.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
