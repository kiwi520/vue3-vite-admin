import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('../views/Welcome/Welcome.vue')
      },
      {
        name: 'dept',
        path: '/dept',
        meta: {
          title: '部门管理'
        },
        component: () => import('../views/Dept/Dept.vue')
      },
      {
        name: 'user',
        path: '/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/Users/User.vue')
      }

    ]
    // component: () => import('../views/Home/Home.vue')
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
