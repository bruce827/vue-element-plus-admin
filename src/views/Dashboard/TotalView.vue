<script setup lang="tsx">
import { computed } from 'vue'
import { ElImage } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import sunriseImg from '@/assets/demo/total-sunrise.png'
import sunsetImg from '@/assets/demo/total-sunset.png'

const appStore = useAppStore()

const isDark = computed(() => appStore.getIsDark)
</script>
<template>
  <div>
    <ElImage
      :src="isDark ? sunsetImg : sunriseImg"
      fit="contain"
      style="height: 100%; width: 100%"
    />
  </div>
</template>

<style lang="less" scoped></style>
