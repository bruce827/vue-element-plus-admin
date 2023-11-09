import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/homeMonitoring',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    // component: () => import('@/views/Login/Login.vue'),
    component: () => import('@/views/newLogin/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/homeMonitoring',
    name: 'Dashboard',
    meta: {
      title: '数据看板',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'homeMonitoring',
        component: () => import('@/views/Dashboard/HomeMonitoring.vue'),
        name: 'Analysis',
        meta: {
          title: '实时状态',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/inspection-manager',
    component: Layout,
    meta: {
      title: '巡检管理',
      icon: 'material-symbols:frame-inspect',
      alwaysShow: true
    },
    name: 'InspectionManager',
    children: [
      {
        path: 'auto-inspection',
        component: () => import('@/views/InspectionManager/AutoInspection.vue'),
        name: 'AutoInspection',
        meta: {
          title: '自动巡检管理'
        }
      },
      // {
      //   path: 'inspection-calendar',
      //   component: () => import('@/views/InspectionManager/InspectionCalendarNew.vue'),
      //   name: 'InspectionCalendar',
      //   meta: {
      //     title: '巡检日历'
      //   }
      // },
      {
        path: 'inspection-log',
        component: () => import('@/views/InspectionManager/InspectionLog.vue'),
        name: 'InspectionLog',
        meta: {
          title: '巡检日志'
        }
      },
      {
        path: 'inspection-result',
        component: () => import('@/views/InspectionManager/InspectionResult.vue'),
        name: 'InspectionResult',
        meta: {
          title: '巡检结果'
        }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    meta: {
      title: '智能报表',
      icon: 'tabler:report',
      alwaysShow: true
    },
    name: 'Report',
    children: [
      {
        path: 'mission-report',
        component: () => import('@/views/Report/MissionReport.vue'),
        name: 'MissionReport',
        meta: {
          title: '巡检任务统计'
        }
      },
      {
        path: 'result-report',
        component: () => import('@/views/Report/ResultReport.vue'),
        name: 'ResultReport',
        meta: {
          title: '巡检结果统计'
        }
      },
      {
        path: 'dally-report',
        component: () => import('@/views/Report/DallyReport.vue'),
        name: 'DallyReport',
        meta: {
          title: '巡检日报'
        }
      }
    ]
  },
  {
    path: '/equipment-manager',
    component: Layout,
    meta: {
      title: '设备台账管理',
      icon: 'carbon:book',
      alwaysShow: true
    },
    name: 'EquipmentManager',
    children: [
      {
        path: 'charging-room',
        component: () => import('@/views/EquipmentManager/ChargingRoom/index.vue'),
        name: 'ChargingRoom',
        meta: {
          title: '充电房管理'
        }
      },
      {
        path: 'robot',
        component: () => import('@/views/EquipmentManager/Robot/index.vue'),
        name: 'Robot',
        meta: {
          title: '机器人管理'
        }
      }
    ]
  },
  {
    path: '/repair',
    component: Layout,
    meta: {
      title: '维修保养',
      icon: 'game-icons:auto-repair',
      alwaysShow: true
    },
    name: 'Repair',
    children: [
      {
        path: 'records',
        component: () => import('@/views/Repair/Records.vue'),
        name: 'Records',
        meta: {
          title: '保养记录'
        }
      }
    ]
  },
  {
    path: '/authorization',
    component: Layout,
    redirect: '/authorization/user',
    name: 'Authorization',
    meta: {
      title: t('router.authorization'),
      icon: 'eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/Authorization/Department/Department.vue'),
        name: 'Department',
        meta: {
          title: t('router.department')
        }
      },
      {
        path: 'user',
        component: () => import('@/views/Authorization/User/User.vue'),
        name: 'User',
        meta: {
          title: t('router.user')
        }
      },
      {
        path: 'role',
        component: () => import('@/views/Authorization/Role/Role.vue'),
        name: 'Role',
        meta: {
          title: t('router.role')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
