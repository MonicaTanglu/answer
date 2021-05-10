import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { createRouterGuards } from './router-guard'
// import { RouterTransition } from '@/components/transition'
// import { markRaw } from "vue";
import LayOut from '@/layout/index.vue'
// import { createStorage } from '@/utils/storage'
// const Layout = () => import('@v/Home.vue')
export const routes: Array<any> = [
  {
    path: '/',
    name: 'home',
    hidden: true,
    redirect: '/home',
    // meta: { title: '首页' },
    component: LayOut,
    children: [
      {
        path: 'home',
        name: 'homepage',
        hidden: false,
        meta: { title: '首页', icon: 'icon-home' },
        component: () => import('@/views/home.vue')
      },
      {
        path: 'question',
        name: 'question',
        hidden: false,
        meta: { title: '题库管理', icon: 'icon-detail' },
        component: () => import('@/views/question/question.vue')
      },
      // {
      //   path: 'system',
      //   name: 'system',
      //   hidden: false,
      //   component: markRaw(RouterTransition),
      //   meta: {
      //     title: '系统管理',
      //     icon: 'icon-setting'
      //   },
      //   children: [
      //     {
      //       path: 'user',
      //       name: 'user',
      //       hidden: false,
      //       meta: {
      //         title: '用户管理'
      //       },
      //       component: () => import('@/views/system/UserList.vue')
      //     },
      //     {
      //       path: 'role',
      //       name: 'role',
      //       hidden: false,
      //       meta: {
      //         title: '角色管理'
      //       },
      //       component: () => import('@/views/system/RoleList.vue')
      //     },
      //     {
      //       path: 'permission',
      //       name: 'permission',
      //       hidden: false,
      //       meta: {
      //         title: '菜单管理'
      //       },
      //       component: () => import('@/views/system/Permission.vue')
      //     },
      //     {
      //       path: 'department',
      //       name: 'department',
      //       hidden: false,
      //       meta: {
      //         title: '部门管理'
      //       },
      //       component: () => import('@/views/system/DepartList.vue')
      //     },
      //     {
      //       path: 'position',
      //       name: 'position',
      //       hidden: false,
      //       meta: {
      //         title: '职务管理'
      //       },
      //       component: () => import('@/views/system/PositionList.vue')
      //     },
      //     {
      //       path: 'dict',
      //       name: 'dict',
      //       hidden: false,
      //       meta: {
      //         title: '字典管理'
      //       },
      //       component: () => import('@/views/system/dict.vue')
      //     }
      //   ]
      // },
      // {
      //   path: 'flow',
      //   name: 'flow',
      //   hidden: false,
      //   component: markRaw(RouterTransition),
      //   meta: {
      //     title: '流程管理',
      //     icon: 'icon-setting'
      //   },
      //   children: [
      //     {
      //       path: 'index',
      //       name: 'flow-manager',
      //       hidden: false,
      //       meta: {
      //         title: '流程管理'
      //       },
      //       component: () => import('@/views/flow/index.vue')
      //     }
      //   ]
      // },
      // {
      //   path: 'config',
      //   name: 'config',
      //   hidden: false,
      //   component: markRaw(RouterTransition),
      //   meta: {
      //     title: '配置管理',
      //     icon: 'icon-setting'
      //   },
      //   children: [
      //     {
      //       path: 'sign',
      //       name: 'sign',
      //       hidden: false,
      //       meta: {
      //         title: '电子签章管理'
      //       },
      //       component: () => import('@/views/config/sign.vue')
      //     },
      //     {
      //       path: 'template',
      //       name: 'template',
      //       hidden: false,
      //       meta: {
      //         title: '材料模板管理'
      //       },
      //       component: () => import('@/views/config/template.vue')
      //     }
      //   ]
      // },
      // {
      //   path: 'business',
      //   name: 'business',
      //   hidden: false,
      //   meta: {
      //     title: '业务办理',
      //     icon: 'icon-setting'
      //   },
      //   component: markRaw(RouterTransition),
      //   children: [{
      //     path: 'accept',
      //     name: 'business-accept',
      //     hidden: false,
      //     meta: {
      //       title: '业务受理',
      //     },
      //     component: () => import('@/views/business/index.vue')
      //   }, {
      //     path: 'list',
      //     name: 'business-list',
      //     hidden: false,
      //     meta: {
      //       title: '业务列表',
      //     },
      //     component: () => import('@/views/business/list.vue')
      //   }]
      // },
      // {
      //   path: 'daily',
      //   name: 'daily',
      //   hidden: false,
      //   meta: {
      //     title: '日常办公',
      //     icon: 'icon-setting'
      //   },
      //   component: markRaw(RouterTransition),
      //   children: [{
      //     path: 'wait',
      //     name: 'daily-wait',
      //     hidden: false,
      //     meta: {
      //       title: '待办工作',
      //     },
      //     component: () => import('@/views/daily/wait.vue')
      //   }, {
      //     path: 'doing',
      //     name: 'daily-doing',
      //     hidden: false,
      //     meta: {
      //       title: '在办工作',
      //     },
      //     component: () => import('@/views/daily/doing.vue')
      //   }, {
      //     path: 'progress',
      //     name: 'daily-progress',
      //     hidden: false,
      //     meta: {
      //       title: '进度查询',
      //     },
      //     component: () => import('@/views/daily/progress.vue')
      //   }, {
      //     path: 'detail',
      //     name: 'daily-detail',
      //     hidden: true,
      //     meta: {
      //       title: '审核表',
      //     },
      //     component: () => import('@/views/daily/detail.vue')
      //   }]
      // },
      // // 用户中心
      // {
      //   path: '/user',
      //   name: 'User',
      //   hidden: true,
      //   component: () => import('@v/user/userCenter.vue'),
      //   children: [
      //     {
      //       path: '/userCenter',
      //       name: 'userCenter',
      //       hidden: true,
      //       component: () => import('@v/user/userCenter.vue')
      //     },
      //     {
      //       path: '/changePassword',
      //       name: 'ChangePassword',
      //       hidden: true,
      //       component: () => import('@v/user/changePassword.vue')
      //     }
      //   ]
      // },
      {
        path: 'test',
        name: '测试',
        hidden: false,
        meta: {
          title: '测试',
        },
        component: () => import('@/views/test.vue')
      }
    ]
  },
  // login
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@v/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export function setupRouter(app: App) {
  app.use(router)
  createRouterGuards(router)
}

export default router
