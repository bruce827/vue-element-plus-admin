import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout, Iframe } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { table } from 'console'
import { NO_RESET_WHITE_LIST } from '@/constants'

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
    component: () => import('@/views/Login/Login.vue'),
    // component: () => import('@/views/newLogin/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal-center',
    name: 'Personal',
    meta: {
      title: t('router.personal'),
      hidden: true,
      canTo: true
    },
    children: [
      {
        path: 'personal-center',
        component: () => import('@/views/Personal/PersonalCenter/PersonalCenter.vue'),
        name: 'PersonalCenter',
        meta: {
          title: t('router.personalCenter'),
          hidden: true,
          canTo: true
        }
      }
    ]
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
      },
      {
        path: 'total-view',
        component: () => import('@/views/Dashboard/TotalView.vue'),
        name: 'TotalView',
        meta: {
          title: '数据总览',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    name: 'ComponentsDemo',
    meta: {
      title: t('router.component'),
      icon: 'bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'form',
        component: getParentLayout(),
        redirect: '/components/form/default-form',
        name: 'Form',
        meta: {
          title: t('router.form'),
          alwaysShow: true
        },
        children: [
          {
            path: 'default-form',
            component: () => import('@/views/Components/Form/DefaultForm.vue'),
            name: 'DefaultForm',
            meta: {
              title: t('router.defaultForm')
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/Components/Form/UseFormDemo.vue'),
            name: 'UseForm',
            meta: {
              title: 'UseForm'
            }
          }
        ]
      },
      {
        path: 'table',
        component: getParentLayout(),
        redirect: '/components/table/default-table',
        name: 'TableDemo',
        meta: {
          title: t('router.table'),
          alwaysShow: true
        },
        children: [
          {
            path: 'default-table',
            component: () => import('@/views/Components/Table/DefaultTable.vue'),
            name: 'DefaultTable',
            meta: {
              title: t('router.defaultTable')
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/Components/Table/UseTableDemo.vue'),
            name: 'UseTable',
            meta: {
              title: 'UseTable'
            }
          },
          {
            path: 'tree-table',
            component: () => import('@/views/Components/Table/TreeTable.vue'),
            name: 'TreeTable',
            meta: {
              title: t('router.treeTable')
            }
          },
          {
            path: 'table-image-preview',
            component: () => import('@/views/Components/Table/TableImagePreview.vue'),
            name: 'TableImagePreview',
            meta: {
              title: t('router.PicturePreview')
            }
          },
          {
            path: 'vxe-table',
            component: () => import('@/views/Components/Table/VXETable.vue'),
            name: 'VXETable',
            meta: {
              title: 'vxe-table插件集成'
            path: 'table-video-preview',
            component: () => import('@/views/Components/Table/TableVideoPreview.vue'),
            name: 'TableVideoPreview',
            meta: {
              title: t('router.tableVideoPreview')
            }
          },
          {
            path: 'card-table',
            component: () => import('@/views/Components/Table/CardTable.vue'),
            name: 'CardTable',
            meta: {
              title: t('router.cardTable')
            }
          }
        ]
      },
      {
        path: 'editor-demo',
        component: getParentLayout(),
        redirect: '/components/editor-demo/editor',
        name: 'EditorDemo',
        meta: {
          title: t('router.editor'),
          alwaysShow: true
        },
        children: [
          {
            path: 'editor',
            component: () => import('@/views/Components/Editor/Editor.vue'),
            name: 'Editor',
            meta: {
              title: t('router.richText')
            }
          },
          {
            path: 'json-editor',
            component: () => import('@/views/Components/Editor/JsonEditor.vue'),
            name: 'JsonEditor',
            meta: {
              title: t('router.jsonEditor')
            }
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/Components/Search.vue'),
        name: 'Search',
        meta: {
          title: t('router.search')
        }
      },
      {
        path: 'descriptions',
        component: () => import('@/views/Components/Descriptions.vue'),
        name: 'Descriptions',
        meta: {
          title: t('router.descriptions')
        }
      },
      {
        path: 'image-viewer',
        component: () => import('@/views/Components/ImageViewer.vue'),
        name: 'ImageViewer',
        meta: {
          title: t('router.imageViewer')
        }
      },
      {
        path: 'dialog',
        component: () => import('@/views/Components/Dialog.vue'),
        name: 'Dialog',
        meta: {
          title: t('router.dialog')
        }
      },
      {
        path: 'icon',
        component: () => import('@/views/Components/Icon.vue'),
        name: 'Icon',
        meta: {
          title: t('router.icon')
        }
      },
      {
        path: 'icon-picker',
        component: () => import('@/views/Components/IconPicker.vue'),
        name: 'IconPicker',
        meta: {
          title: t('router.iconPicker')
        }
      },
      {
        path: 'echart',
        component: () => import('@/views/Components/Echart.vue'),
        name: 'Echart',
        meta: {
          title: t('router.echart')
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/Components/CountTo.vue'),
        name: 'CountTo',
        meta: {
          title: t('router.countTo')
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/Components/Qrcode.vue'),
        name: 'Qrcode',
        meta: {
          title: t('router.qrcode')
        }
      },
      {
        path: 'highlight',
        component: () => import('@/views/Components/Highlight.vue'),
        name: 'Highlight',
        meta: {
          title: t('router.highlight')
        }
      },
      {
        path: 'infotip',
        component: () => import('@/views/Components/Infotip.vue'),
        name: 'Infotip',
        meta: {
          title: t('router.infotip')
        }
      },
      {
        path: 'input-password',
        component: () => import('@/views/Components/InputPassword.vue'),
        name: 'InputPassword',
        meta: {
          title: t('router.inputPassword')
        }
      },
      {
        path: 'waterfall',
        component: () => import('@/views/Components/Waterfall.vue'),
        name: 'waterfall',
        meta: {
          title: t('router.waterfall')
        }
      },
      {
        path: 'image-cropping',
        component: () => import('@/views/Components/ImageCropping.vue'),
        name: 'ImageCropping',
        meta: {
          title: t('router.imageCropping')
        }
      },
      {
        path: 'video-player',
        component: () => import('@/views/Components/VideoPlayer.vue'),
        name: 'VideoPlayer',
        meta: {
          title: t('router.videoPlayer')
        }
      },
      {
        path: 'avatars',
        component: () => import('@/views/Components/Avatars.vue'),
        name: 'Avatars',
        meta: {
          title: t('router.avatars')
        }
      },
      {
        path: 'i-agree',
        component: () => import('@/views/Components/IAgree.vue'),
        name: 'IAgree',
        meta: {
          title: t('router.iAgree')
        }
      }
    ]
  },
  {
    path: '/iframe-test',
    component: Layout,
    meta: {
      title: 'frame测试',
      icon: 'material-symbols:frame-inspect',
      alwaysShow: true
    },
    name: 'IframeTest',
    children: [
      {
        path: 'frame1',
        name: 'Frame1',
        component: Iframe,
        meta: {
          title: '测试1',
          frameSrc:
            'https://element-plus.org/zh-CN/component/skeleton.html#skeleton-%E5%B1%9E%E6%80%A7'
        }
      },
      {
        path: 'frame2',
        name: 'Frame2',
        component: Iframe,
        meta: {
          title: '测试2',
          frameSrc: 'https://bruce827.github.io/portfolio/'
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
      alwaysShow: true,
      hidden: true
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
      alwaysShow: true,
      hidden: true
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
      alwaysShow: true,
      hidden: true
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
      alwaysShow: true,
      hidden: true
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
      title: '系统配置',
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
      },
      {
        path: 'api-log',
        component: () => import('@/views/Authorization/ApiLog/ApiLog.vue'),
        name: 'ApiLog',
        meta: {
          title: '接口日志'
        }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo/svg-map',
    meta: {
      title: 'svg图片测试',
      icon: 'teenyicons:svg-outline',
      alwaysShow: true
    },
    children: [
      {
        path: 'svg-map',
        component: () => import('@/views/Components/SvgMap.vue'),
        name: 'SvgMap',
        meta: {
          title: '组态图'
        }
      }
    ]
  },
  {
    path: '/project-evaluate',
    component: Layout,
    redirect: '/project-evaluate/svg-map',
    meta: {
      title: '新项目评估',
      icon: 'file-icons:microsoft-project',
      alwaysShow: true
    },
    children: [
      {
        path: 'new-form',
        component: () => import('@/views/ProjectEvaluate/ProjectEvaluate.vue'),
        name: 'ProjectEvaluate',
        meta: {
          title: '新项目评估'
        }
      },
      {
        path: 'module-info',
        // component: () => import('@/views/Components/SvgMap.vue'),
        name: 'ModuleInfo',
        meta: {
          title: '模块详情',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: t('router.errorPage'),
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: () => import('@/views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '403-demo',
        component: () => import('@/views/Error/403.vue'),
        name: '403Demo',
        meta: {
          title: '403'
        }
      },
      {
        path: '500-demo',
        component: () => import('@/views/Error/500.vue'),
        name: '500Demo',
        meta: {
          title: '500'
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
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
