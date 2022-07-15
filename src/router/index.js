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
          { path: '/permissionlist', component: () => import('@/views/Main/Privilege/PermissionList') }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
