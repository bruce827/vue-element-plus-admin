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
  ElSkeleton,
  ElTable,
  ElTableColumn,
  ElImage
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
import mapImg from '@/assets/demo/map.png'
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

const tableData = [
  {
    date: '2016-05-03 19:22:11',
    name: '阈值报警',
    level: '1级',
    obj: '读表',
    address: '24.8,高报。'
  },
  {
    date: '2016-05-02 19:22:11',
    name: '阈值报警',
    level: '1级',
    obj: '读表',
    address: '24.8,高报。'
  },
  {
    date: '2016-05-04 19:22:11',
    name: '阈值报警',
    level: '1级',
    obj: '普通拍照',
    address: '24.8,高报。'
  },
  {
    date: '2016-05-01 19:22:11',
    name: '阈值报警',
    level: '1级',
    obj: '读表',
    address: '24.8,高报。'
  }
]

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
        <div class="video-container">
          <div class="monitor-video"></div>
          <div class="monitor-video"></div>
          <div class="monitor-video"></div>
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
            </div></div
          >
        </div>
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
      <ElCard shadow="hover" class="mb-20px" header="巡检地图">
        <ElSkeleton :loading="loading" animated :rows="4">
          <ElImage :src="mapImg" fit="fill" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="12">
      <ElCard shadow="hover" class="mb-20px" header="巡检告警通知">
        <ElSkeleton :loading="loading" animated :rows="4">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="告警时间" width="180" />
            <el-table-column prop="name" label="判断类型" width="180" />
            <el-table-column prop="level" label="等级" />
            <el-table-column prop="obj" label="采集项" />
            <el-table-column prop="address" label="告警内容" />
          </el-table>
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="12">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :options="lineOptionsData" height="260px" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<style lang="less" scoped>
.video-container {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
.monitor-video {
  position: relative;
  display: flex;
  height: 200px;
  // width: 45%;
  background-image: url('@/assets/imgs/robot.png');
  background-size: cover;
}
.desc {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: transparent;
  opacity: 0.65;
}
</style>
