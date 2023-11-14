<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { isString, isArray } from '@/utils/is'
import type { SvgMapType, PointType } from './type.d.ts'

const props = withDefaults(defineProps<SvgMapType>(), {
  src: '@/assets/svgs/404.svg',
  width: '100%',
  height: '500px',
  points: () => [] as PointType[] as never,
  defaultValue: '#.##',
  config: () => [] as never
})

const dataSrc = computed(() => props.src)

const defaultValue = computed(() => props.defaultValue)

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height
  }
})

const config = computed(() => props.config)

// 点位格式化
const pointsFormat = (newPoints: PointType[]) => {
  let arr: PointType[] = [] as never
  if (newPoints.length !== 0) {
    arr = newPoints.map((v) => {
      const { id, desc, value } = v
      debugger
      let point: PointType = {
        desc,
        // 自动赋默认值
        value: value ? value : defaultValue.value,
        // 自动添加#号
        id: id.startsWith('#') ? id : '#' + id
      }
      return point
    })
  }
  return arr
}

// 插入点位数据
const setPoints = (points: PointType[]) => {
  const dom_svg: HTMLIFrameElement | Document =
    //@ts-ignore
    document.querySelector('#svg_map')?.contentDocument ||
    document.querySelector('#svg_map')?.ownerDocument
  if (isArray(points) && points.length !== 0) {
    points.forEach((item) => {
      if (dom_svg?.querySelector(item.id)?.textContent) {
        dom_svg!.querySelector(item.id)!.textContent = item.value + ''
      }
    })
  }
}

watch(
  () => props.points,
  (val) => {
    // 赋默认值,动态数据可能不是全量数据，所以先讲所有值变为默认
    // setPoints(config.value)
    // debugger
    // 动态数据赋值,
    const formatPoints = pointsFormat(val)
    setPoints(formatPoints)
  },
  {
    // immediate: true
  }
)

onMounted(() => {
  setTimeout(() => {
    // 默认值
    setPoints(config.value)
  }, 100)
})
</script>

<template>
  <object id="svg_map" :data="dataSrc" type="image/svg+xml" :style="styles"></object>
</template>
<style lang="less" scoped></style>
