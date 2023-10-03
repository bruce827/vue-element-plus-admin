<script setup lang="ts">
import { onMounted, nextTick, ref, reactive } from 'vue'
import { useIcon } from '@/hooks/web/useIcon'

import {
  ElButton,
  ElForm
  // ElFormItem,
  // ElInput,
  // ElRow,
  // ElCol,
  // FormRules,
  // ComponentSize
  // FormItemProp
} from 'element-plus'

// const icon_User = useIcon({ icon: 'ph:user' })

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

onMounted(() => {})
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
  </div>
</template>

<style lang="less" scoped>
@import './style.less';
</style>
