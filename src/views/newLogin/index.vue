<script setup lang="tsx">
import { onMounted, nextTick, ref, reactive, watch } from 'vue'
import { Form, FormSchema } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { useStorage } from '@/hooks/web/useStorage'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { UserType } from '@/api/login/types'
import { useValidator } from '@/hooks/web/useValidator'
import { Icon } from '@/components/Icon'
import { useIcon } from '@/hooks/web/useIcon'

// import { ElButton, ElForm } from 'element-plus'

const icon_User = useIcon({ icon: 'ph:user' })

const isAdmin = ref(false)
const userName = ref('')

const signForm = reactive({
  userName: ''
})

// 切换登陆方式
const handleToAdmin = () => {
  isAdmin.value = false
}

// 登陆
const handleLogin = async () => {
  nextTick(() => {
    console.log(userName)
    debugger
  })
}
const { required } = useValidator()

const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { setStorage } = useStorage()

const { t } = useI18n()

const rules = {
  username: [required()],
  password: [required()]
}

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return <h2 class="text-2xl font-bold text-center w-[100%]">{t('login.login')}</h2>
        }
      }
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder')
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: t('login.passwordPlaceholder')
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex justify-between items-center w-[100%]">
                <ElCheckbox v-model={remember.value} label={t('login.remember')} size="small" />
                <ElLink type="primary" underline={false}>
                  {t('login.forgetPassword')}
                </ElLink>
              </div>
            </>
          )
        }
      }
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        // default: () => {
        //   return (
        //     <>
        //       <div class="w-[100%]">
        //         <ElButton loading={loading.value} type="primary" class="w-[100%]" onClick={signIn}>
        //           {t('login.login')}
        //         </ElButton>
        //       </div>
        //       <div class="w-[100%] mt-15px">
        //         <ElButton class="w-[100%]" onClick={toRegister}>
        //           {t('login.register')}
        //         </ElButton>
        //       </div>
        //     </>
        //   )
        // }
      }
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex justify-between w-[100%]">
                <Icon
                  icon="ant-design:github-filled"
                  size={iconSize}
                  class="cursor-pointer ant-icon"
                  color={iconColor}
                  hoverColor={hoverColor}
                />
                <Icon
                  icon="ant-design:wechat-filled"
                  size={iconSize}
                  class="cursor-pointer ant-icon"
                  color={iconColor}
                  hoverColor={hoverColor}
                />
                <Icon
                  icon="ant-design:alipay-circle-filled"
                  size={iconSize}
                  color={iconColor}
                  hoverColor={hoverColor}
                  class="cursor-pointer ant-icon"
                />
                <Icon
                  icon="ant-design:weibo-circle-filled"
                  size={iconSize}
                  color={iconColor}
                  hoverColor={hoverColor}
                  class="cursor-pointer ant-icon"
                />
              </div>
            </>
          )
        }
      }
    }
  }
])

const iconSize = 30

const remember = ref(false)

const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose } = formMethods

const loading = ref(false)

const iconColor = '#999'

const hoverColor = 'var(--el-color-primary)'

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)
// 登录
const signIn = async () => {
  debugger
  const formRef = await getElFormExpose()
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const formData = await getFormData<UserType>()

      try {
        const res = await loginApi(formData)

        if (res) {
          setStorage(appStore.getUserInfo, res.data)
          // 是否使用动态路由
          if (appStore.getDynamicRouter) {
            getRole()
          } else {
            await permissionStore.generateRoutes('static').catch(() => {})
            permissionStore.getAddRouters.forEach((route) => {
              addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
            })
            permissionStore.setIsAddRouters(true)
            push({ path: redirect.value || permissionStore.addRouters[0].path })
          }
        }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
const getRole = async () => {
  const formData = await getFormData<UserType>()
  const params = {
    roleName: formData.username
  }
  const res =
    appStore.getDynamicRouter && appStore.getServerDynamicRouter
      ? await getAdminRoleApi(params)
      : await getTestRoleApi(params)
  if (res) {
    const routers = res.data || []
    setStorage('roleRouters', routers)
    appStore.getDynamicRouter && appStore.getServerDynamicRouter
      ? await permissionStore.generateRoutes('server', routers).catch(() => {})
      : await permissionStore.generateRoutes('frontEnd', routers).catch(() => {})

    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}
onMounted(() => {
  debugger
  // 自动登陆
  signIn()
})
</script>

<template>
  <div class="login-container">
    <div class="form-container">
      <el-form ref="signForm" :model="signForm" class="form signup" v-if="!isAdmin">
        <!-- <el-form ref="signForm" :model="signForm"> -->
        <h2>登陆</h2>
        <div class="input-box">
          <input type="text" required="true" v-model="userName" />
          <Icon icon="ph:user" class="icon" />
          <span>用户名</span>
        </div>

        <!-- <el-form-item class="input-box">
            <el-input v-model="signForm.userName" :prefix-icon="icon_User" />
            <span>用户名：</span>
          </el-form-item> -->

        <!-- <div class="input-box">
          <input type="text" required="true" />
          <Icon icon="mi:email" />
          <span>邮箱：</span>
        </div> -->
        <div class="input-box">
          <input type="text" required="true" />
          <Icon icon="mdi:password-outline" />
          <span>密码：</span>
        </div>
        <!-- <div class="input-box">
          <input type="text" required="true" />
          <Icon icon="mdi:password" />
          <span>确认密码：</span>
        </div> -->
        <div class="input-box">
          <!-- <input type="submit" valve="Create Account" /> -->
          <el-button class="submit" @click="handleLogin"> 登 陆 </el-button>
        </div>
        <p
          >如果您是管理员用户，请使用
          <el-button type="text" @click="handleToAdmin">管理员登陆</el-button></p
        >
        <!-- </el-form> -->
      </el-form>
    </div>
    <Form
      :schema="schema"
      :rules="rules"
      label-position="top"
      hide-required-asterisk
      size="large"
      class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
      @register="formRegister"
      style="display: none"
    />
  </div>
</template>

<style lang="less" scoped>
@import './style.less';
.aa {
  visibility: hidden;
}
</style>
