import { defineStore } from 'pinia'
import { store } from '../index'
import { setCssVar, humpToUnderline } from '@/utils'
import { is } from '@/utils/is'
import { ElMessage, ComponentSize } from 'element-plus'
import { useStorage } from '@/hooks/web/useStorage'
import { UserType } from '@/api/login/types'
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { string } from 'vue-types'
import { set } from 'nprogress'

import { useAppStore } from '@/store/modules/app'
import { throwError } from 'element-plus/es/utils'

const { getStorage, setStorage } = useStorage('localStorage')

const appStore = useAppStore()

interface UserState {
  userInfo: UserType
  orgTree: []
  token: ''
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: {
        username: '',
        // 当前组织机构
        currentOrg: '',
        avatar: '',
        // 角色
        role: ''
      },
      token: '',
      orgTree: []
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    },
    getServerDynamicRouter(): boolean {
      return this.serverDynamicRouter
    },
    getFixedMenu(): boolean {
      return this.fixedMenu
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ComponentSize {
      return this.currentSize
    },
    getSizeMap(): ComponentSize[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): ThemeTypes {
      return this.theme
    },
    getFooter(): boolean {
      return this.footer
    },
    getOrgSelect(): boolean {
      return this.orgSelect
    }
  },
  actions: {
    // 登陆
    async login(formData: UserType) {
      const { username } = formData
      const { code, data: token, message } = await loginApi(formData)
      if (code && code == 0) {
        // 获取用户信息
        await this.getUserInfo()
        // 获取组织机构树
        await this.getOrgTree()
        this.setUserToken(token, username)
        // 动态路由
        await this.getRoutes()
      } else {
        throw '登陆出错:' + message
        // ElMessage.error('登陆出错:' + message)
      }
    },
    // 获取用户信息
    async getUserInfo() {},
    // 获取组织机构
    async getOrgTree() {},
    // 动态获取路由
    async getRoutes() {
      // 是否使用动态路由
      // if (appStore.getDynamicRouter) {
      //   getRole()
      // } else {
      //   await permissionStore.generateRoutes('static').catch(() => {})
      //   permissionStore.getAddRouters.forEach((route) => {
      //     addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
      //   })
      //   permissionStore.setIsAddRouters(true)
      //   push({ path: redirect.value || permissionStore.addRouters[0].path })
      // }
    },

    // 保存用户信息用于header
    setUserToken(data, username) {
      if (is(data, 'string') && data !== '') {
        setStorage('token', data)
        setStorage('username', username)
      } else {
        throw 'token出错,请联系系统管理员。'
        // ElMessage.error('token出错,请联系系统管理员。')
      }
    },
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setLocale(locale: boolean) {
      this.locale = locale
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setDynamicRouter(dynamicRouter: boolean) {
      setStorage('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
    setServerDynamicRouter(serverDynamicRouter: boolean) {
      setStorage('serverDynamicRouter', serverDynamicRouter)
      this.serverDynamicRouter = serverDynamicRouter
    },
    setFixedMenu(fixedMenu: boolean) {
      setStorage('fixedMenu', fixedMenu)
      this.fixedMenu = fixedMenu
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其它布局')
        return
      }
      this.layout = layout
      setStorage('layout', this.layout)
    },
    setTitle(title: string) {
      this.title = title
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      setStorage('isDark', this.isDark)
    },
    setCurrentSize(currentSize: ComponentSize) {
      this.currentSize = currentSize
      setStorage('currentSize', this.currentSize)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setTheme(theme: ThemeTypes) {
      this.theme = Object.assign(this.theme, theme)
      setStorage('theme', this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer: boolean) {
      this.footer = footer
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
