import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/', redirect: '/first' },
      {
        path: '/main',
        component: () => import('@/views/Main'),
        children: [
          { path: '/first', component: () => import('@/views/Main/First') },
          { path: '/userlist', component: () => import('@/views/Main/UserList') },
          { path: '/rolelist', component: () => import('@/views/Main/Privilege/RoleList') },
          { path: '/permissionlist', component: () => import('@/views/Main/Privilege/PermissionList') },
          { path: '/goods', component: () => import('@/views/Main/Goods/Goodslist') },
          { path: '/params', component: () => import('@/views/Main/Goods/Params') },
          { path: '/cateories', component: () => import('@/views/Main/Goods/Categories') },
          { path: 'goods/add', component: () => import('@/views/Main/Goods/Goodslist/Add') }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
