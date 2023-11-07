<script setup lang="ts">
import { ref, reactive } from 'vue'
// import PanelGroup from './components/PanelGroup.vue'
import TotalPanel from './components/TotalPanel.vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElSelect,
  ElOption,
  ElDescriptions,
  ElDescriptionsItem,
  ElSkeleton
} from 'element-plus'
import { Echart } from '@/components/Echart'
import {
  getUserAccessSourceApi,
  getWeeklyUserActivityApi,
  getMonthlySalesApi
} from '@/api/dashboard/analysis'
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import { pieOptions, barOptions, lineOptions } from './echarts-data'

import { useI18n } from '@/hooks/web/useI18n'

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

const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption

// 每月销售总额
const getMonthlySales = async () => {
  const res = await getMonthlySalesApi().catch(() => {})
  if (res) {
    set(
      lineOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(lineOptionsData, 'series', [
      {
        name: '电流',
        smooth: true,
        type: 'line',
        data: res.data.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        yAxisIndex: 1,
        name: '电压',
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.data.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()])
  loading.value = false
}

getAllApi()
</script>
<template>
  <ElRow justify="start" style="padding-left: 0">
    <!-- <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
      <label for="">当前机器人：</label>
    </ElCol> -->
    <!-- <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24"> -->
    <el-select v-model="value" class="m-2" placeholder="Select" size="large" style="margin-left: 0">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- </ElCol> -->
  </ElRow>
  <TotalPanel />
  <ElRow :gutter="20" justify="space-between">
    <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <!-- <ElSkeleton :loading="true" animated> -->
        <!-- <img src="@/assets/imgs/robot.png" alt="" /> -->
        <div class="monitor-video">
          <div class="desc">
            <ElDescriptions title="机器人实况">
              <ElDescriptionsItem label="当前模式">离线</ElDescriptionsItem>
              <ElDescriptionsItem label="当前电量">68%</ElDescriptionsItem>
              <ElDescriptionsItem label="当前状态">巡检中</ElDescriptionsItem>
              <ElDescriptionsItem label="当前任务">
                <el-tag size="small">泵房巡检</el-tag>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="信号强度">强</ElDescriptionsItem>
            </ElDescriptions>
          </div>
        </div>
        <!-- </ElSkeleton> -->
      </ElCard>
    </ElCol>
    <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :options="barOptionsData" :height="400" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :options="lineOptionsData" :height="200" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
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
</style>
