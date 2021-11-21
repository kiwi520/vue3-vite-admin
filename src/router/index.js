import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import storage from '../utils/storage'

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
        path: '/system/department',
        meta: {
          title: '部门管理'
        },
        component: () => import('../views/Department/Department.vue')
      },
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/Users/User.vue')
      },
      {
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/Menu/Menu.vue')
      },
      // {
      //   name: 'role',
      //   path: '/system/role',
      //   meta: {
      //     title: '角色管理'
      //   },
      //   component: () => import('../views/Role/Role.vue')
      // },
      {
        name: 'appManger',
        path: '/system/appManger',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/AppManger/AppManger.vue')
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

const notFoundRoute = {
  path: '/notFound',
  name: 'notFound',
  component: () => import('../views/NotFound/NotFound.vue')
}
const roleRoute = {
  name: 'role',
  path: '/system/role',
  meta: {
    title: '角色管理'
  },
  component: () => import('../views/Role/Role.vue')
}
const categoryRoute = {
  name: 'category',
  path: '/system/category',
  meta: {
    title: 'app文章分类管理'
  },
  component: () => import('../views/Category/Category.vue')
}
const articleRoute = {
  name: 'article',
  path: '/system/article',
  meta: {
    title: 'app文章管理'
  },
  component: () => import('../views/Article/Article.vue')
}
// 添加一级路由
router.addRoute(notFoundRoute)

// 添加二级路由
router.addRoute('home', roleRoute)
router.addRoute('home', categoryRoute)
router.addRoute('home', articleRoute)

// 路由守卫
router.beforeEach((to, from) => {
  // this.$store.dispatch('user/GetProfile')
  console.log('跳转过来了')
  console.log(from)
  console.log('跳转过来了')
  if (to.path !== '/login') {
    if (!storage.getItem('_token')) {
      return '/login'
    }
  }
})

export default router
