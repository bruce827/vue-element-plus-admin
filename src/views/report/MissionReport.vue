<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElSelect,
  ElOption,
  ElDescriptions,
  ElDescriptionsItem,
  ElSkeleton,
  ElCheckboxGroup,
  ElCheckboxButton
} from 'element-plus'
import { Echart } from '@/components/Echart'
import {
  getUserAccessSourceApi,
  getWeeklyUserActivityApi,
  getMonthlySalesApi
} from '@/api/dashboard/analysis'
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import {
  pieOptions,
  barOptions,
  lineOptionsNum,
  lineOptionsDuring,
  pieOptions1,
  pieOptions2,
  pieOptions3
} from './echarts-data'

import { useI18n } from '@/hooks/web/useI18n'

import { Search } from '@/components/Search'
// 查询
const schema = reactive<FormSchema[]>([
  {
    field: 'field5',
    component: 'DatePicker',
    label: '任务日期',
    componentProps: {
      type: 'dateRange'
    }
  }
])
const isGrid = ref(false)
const layout = ref('inline')
const buttonPosition = ref('left')
const searchLoading = ref(false)

// 查询结束
const checkboxGroup = ref(['月'])
const cities = ['日', '周', '月']

const value = ref<string>('机器人1')
const options = [
  {
    value: '机器人1',
    label: '机器人1'
  },
  {
    value: '机器人2',
    label: '机器人2'
  },
  {
    value: '机器人3',
    label: '机器人3'
  }
]
const { t } = useI18n()

const loading = ref(true)

const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption

const pieOptionsData1 = reactive<EChartsOption>(pieOptions1) as EChartsOption

const pieOptionsData2 = reactive<EChartsOption>(pieOptions2) as EChartsOption

const pieOptionsData3 = reactive<EChartsOption>(pieOptions3) as EChartsOption

// 用户来源
const getUserAccessSource = async () => {
  const res = await getUserAccessSourceApi().catch(() => {})
  if (res) {
    set(
      pieOptionsData,
      'legend.data',
      res.data.map((v) => t(v.name))
    )
    pieOptionsData!.series![0].data = res.data.map((v) => {
      return {
        name: t(v.name),
        value: v.value
      }
    })
  }
}

const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption

// 周活跃量
const getWeeklyUserActivity = async () => {
  const res = await getWeeklyUserActivityApi().catch(() => {})
  if (res) {
    set(
      barOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(barOptionsData, 'series', [
      {
        name: '充电时间',
        data: res.data.map((v) => v.value),
        type: 'bar'
      },
      {
        name: '运行时间',
        data: res.data.map((v) => v.value * Math.random()),
        type: 'bar'
      }
    ])
  }
}

const lineOptionsDataNum = reactive<EChartsOption>(lineOptionsNum) as EChartsOption

// 任务数量
const getMonthlySales = async () => {
  const res = await getMonthlySalesApi().catch(() => {})
  if (res) {
    set(
      lineOptionsDataNum,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(lineOptionsDataNum, 'series', [
      {
        name: '已完成',
        smooth: true,
        type: 'line',
        data: res.data.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: '已停止',
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.data.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      },
      {
        name: '缺陷任务',
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.data.map((v) => {
          return v.actual * Math.random()
        }),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ])
  }
}

const lineOptionsDataDuring = reactive<EChartsOption>(lineOptionsDuring) as EChartsOption

const getAllApi = async () => {
  await Promise.all([getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()])
  loading.value = false
}

getAllApi()
</script>
<template>
  <ContentWrap :title="t('searchDemo.search')" :message="t('searchDemo.searchDes')">
    <Search
      :schema="schema"
      :is-col="isGrid"
      :layout="layout"
      :button-position="buttonPosition"
      :search-loading="searchLoading"
      :reset-loading="resetLoading"
      expand-field="field6"
      @search="handleSearch"
      @reset="handleSearch"
      @register="searchRegister"
    />
  </ContentWrap>
  <ContentWrap>
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <template #header>
            <div class="card-header">
              <span>巡检任务执行数量统计</span>
              <el-checkbox-group v-model="checkboxGroup" size="small">
                <el-checkbox-button
                  v-for="city in cities"
                  :key="city"
                  :label="city"
                  :disabled="city === 'Beijing'"
                  >{{ city }}</el-checkbox-button
                >
              </el-checkbox-group>
            </div>
          </template>
          <!-- <ElSkeleton :loading="true" animated> -->
          <Echart :options="lineOptionsDataNum" :height="360" />
          <!-- </ElSkeleton> -->
        </ElCard>
      </ElCol>
      <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <template #header>
            <div class="card-header">
              <span>巡检任务耗时统计</span>
              <el-checkbox-group v-model="checkboxGroup" size="small">
                <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{
                  city
                }}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </template>
          <!-- <ElSkeleton :loading="true" animated> -->
          <Echart :options="lineOptionsDataDuring" :height="360" />
          <!-- </ElSkeleton> -->
        </ElCard>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="8" :sm="12" :xs="12">
        <ElCard shadow="hover" class="mb-20px">
          <!-- <div class="card-header">
          <span>任务状态统计</span>
          <span>总计:234</span>
        </div> -->
          <Echart :options="pieOptionsData1" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="8" :sm="12" :xs="12">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="pieOptionsData2" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="8" :sm="12" :xs="12">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="pieOptionsData3" :height="300" />
        </ElCard>
      </ElCol>
      <!-- <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :options="barOptionsData" :height="400" />
        </ElSkeleton>
      </ElCard>
    </ElCol> -->
      <!-- <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :options="lineOptionsData" :height="200" />
        </ElSkeleton>
      </ElCard>
    </ElCol> -->
    </ElRow>
  </ContentWrap>
</template>
<style lang="less" scoped>
.monitor-video {
  position: relative;
  display: flex;
  height: 400px;
  background-image: url('@/assets/imgs/robot.png');
  background-size: cover;

  .desc {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: transparent;
    opacity: 0.65;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
