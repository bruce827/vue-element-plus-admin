<script lang="ts" setup="setup">
import { ref, unref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElSkeleton, ElSkeletonItem } from 'element-plus'

const currentRoute = useRoute()
const frameRef = ref<HTMLFrameElement | null>(null)
const loading = ref<boolean>(true)
const frameSrc = ref<string>('www.baidu.com')
const userStore = useUserStore()

const username = computed(() => userStore.getUserName)
const currentOrg = computed(() => userStore.getCurrentOrg)

if (unref(currentRoute.meta)?.frameSrc) {
  //   页面传参
  frameSrc.value = (unref(currentRoute.meta)?.frameSrc +
    '?userName=' +
    username.value +
    '&currentOrg=' +
    currentOrg.value) as string
}

const hideLoading = () => {
  loading.value = false
}

const init = () => {
  nextTick(() => {
    const iframe = unref(frameRef)
    if (!iframe) return
    const _frame = iframe as any
    if (_frame.attachEvent) {
      // 兼容ie
      _frame.attachEvent('onload', () => {
        hideLoading()
      })
    } else {
      // 兼容已有onload事件的
      iframe.onload = function () {
        hideLoading()
      }
    }
  })
}

onMounted(() => {
  loading.value = true
  init()
})
</script>
<template>
  <ElSkeleton :loading="loading" :throttle="500" animated>
    <template #template>
      <ElSkeletonItem variant="caption" style="width: 100%">
        <h3> <span>当前地址：</span> {{ frameSrc }}</h3>
      </ElSkeletonItem>
    </template>
    <template #default>
      <div class="frame">
        <iframe ref="frameRef" :onload="hideLoading()" :src="frameSrc"></iframe>
      </div>
    </template>
  </ElSkeleton>
</template>
<style lang="less" scoped="scoped">
.frame {
  width: 100%;
  height: 100vh;

  & iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
