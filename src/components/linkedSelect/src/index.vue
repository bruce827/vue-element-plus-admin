<script setup lang="ts">
// import { valueEquals } from 'element-plus'
import { ref, watch, defineEmits } from 'vue'
// 全国省市县数据
import allAreas from '../lib/pcas-code.json'

import type { AreaItem } from './types'

// export interface AreaItem {
//   name: string
//   code: string
//   children?: AreaItem[]
// }
// export interface selectData {
//   name: string
//   code: string
// }
let emits = defineEmits(['change'])

let areas = ref(allAreas)
let province = ref<string>('')
let city = ref<string>('')
let country = ref<string>('')
let street = ref<string>('')
// 市，下拉框数据
let cityOptions = ref<AreaItem[]>([])
// 区县，下拉数据
let countryOptions = ref<AreaItem[]>([])
// 街道，下拉数据
let streetOptions = ref<AreaItem[]>([])

// 市
watch(
  () => province.value,
  (val) => {
    city.value = ''
    country.value = ''
    street.value = ''
    if (val) {
      cityOptions.value = areas.value.find((item) => item.code === province.value)!.children
    }
  }
)
// 区县
watch(
  () => city.value,
  (val) => {
    country.value = ''
    street.value = ''
    if (val) {
      countryOptions.value = cityOptions.value.find(
        (item: any) => item.code === city.value
      )!.children!
    }
  }
)
// 街道
watch(
  () => country.value,
  (val) => {
    street.value = ''
    if (val) {
      streetOptions.value = countryOptions.value.find(
        (item: any) => item.code === country.value
      )!.children!
    }
  }
)
// 监听最后一级的选择
watch(
  () => street.value,
  (val) => {
    // 清空操作不需要触发
    if (!val) return
    const obj = {
      province: {
        code: province.value,
        name: allAreas.find((item) => item.code === province.value)!.name
      },
      city: {
        code: city.value,
        name: city.value && cityOptions.value.find((item) => item.code === city.value)!.name
      },
      country: {
        code: country.value,
        name:
          country.value && countryOptions.value.find((item) => item.code === country.value)!.name
      },
      street: {
        code: val,
        name: val && streetOptions.value.find((item) => item.code === val)!.name
      }
    }
    emits('change', obj)
  }
)
</script>
<template>
  <div>
    <el-select clearable v-model="province" class="m-2" placeholder="请选择省">
      <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name" />
    </el-select>
    <el-select :disabled="!province" v-model="city" class="m-2" placeholder="请选择市">
      <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      :disabled="!province || !city"
      v-model="country"
      class="m-2"
      placeholder="请选择区县"
    >
      <el-option
        v-for="item in countryOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      :disabled="!province || !city || !country"
      v-model="street"
      class="m-2"
      placeholder="请选择街道"
    >
      <el-option
        v-for="item in streetOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<style scoped></style>
