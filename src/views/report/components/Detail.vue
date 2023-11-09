<script setup lang="ts">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { ElCard, ElTable, ElTableColumn } from 'element-plus'

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  },
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => []
  }
})

const data = reactive({
  场站名称: 'chenkl',
  报表周期: '2023-11-12 19:23:22 ~ 2023-11-13 19:23:22',
  报表生成时间: '2023-11-13 19:23:22',
  功能区: 23,
  巡检目标: 12,
  巡检要求: 11,
  采集类型: 12,
  自动巡检: 3,
  自动巡检结果: 3,
  巡检结果正常: 23,
  巡检结果异常: 2,
  轻度异常: 1,
  中都异常: 2,
  紧急异常: 0,
  全部未处理: 12,
  轻度异常未处理: 2,
  中度异常未处理: 0,
  紧急异常未处理: 0,
  轻度异常已处理: 1,
  中度异常已处理: 10,
  紧急异常已处理: 3
})

const tableData = [
  {
    任务名称: '20160503-1',
    功能区: '污水池区',
    目标: '一号污水回抽泵-压力表',
    采集项: '读表',
    时间: '2023-11-01 12:12:11 ',
    巡检结果: 23.11
  },
  {
    任务名称: '20160503-1',
    功能区: '污水池区',
    目标: '一号污水回抽泵-变送器',
    采集项: '读表',
    时间: '2023-11-01 12:12:11 ',
    巡检结果: 9.55
  },
  {
    任务名称: '20160503-1',
    功能区: '污水池区',
    目标: '一号污水回抽泵流量计',
    采集项: '读表',
    时间: '2023-11-01 12:12:11 ',
    巡检结果: 0.11
  }
]

const schema1 = reactive<DescriptionsSchema[]>([
  {
    field: '场站名称',
    label: '场站名称'
  },
  {
    field: '报表周期',
    label: '报表周期'
  },
  {
    field: '报表生成时间',
    label: '报表生成时间'
  }
])

const schema2 = reactive<DescriptionsSchema[]>([
  {
    field: '功能区',
    label: '功能区(个)'
  },
  {
    field: '巡检目标',
    label: '巡检目标(个)'
  },
  {
    field: '巡检要求',
    label: '巡检要求(个)'
  },
  {
    field: '采集类型',
    label: '采集类型(个)'
  },
  {
    field: '自动巡检',
    label: '自动巡检(次)'
  },
  {
    field: '自动巡检结果',
    label: '自动巡检结果(个)'
  }
])
const schema3 = reactive<DescriptionsSchema[]>([
  {
    field: '巡检结果正常',
    label: '巡检结果正常(次)'
  },
  {
    field: '巡检结果异常',
    label: '巡检结果异常(次)'
  },
  {
    field: '轻度异常',
    label: '轻度异常(次)'
  },
  {
    field: '中都异常',
    label: '中都异常(次)'
  },
  {
    field: '紧急异常',
    label: '紧急异常(次)'
  }
])

const schema4 = reactive<DescriptionsSchema[]>([
  {
    field: '全部未处理',
    label: '全部未处理'
  },
  {
    field: '轻度异常未处理',
    label: '轻度异常未处理'
  },
  {
    field: '中度异常未处理',
    label: '中度异常未处理'
  },
  {
    field: '紧急异常未处理',
    label: '紧急异常未处理'
  },
  {
    field: '轻度异常已处理',
    label: '轻度异常已处理'
  },
  {
    field: '中度异常已处理',
    label: '中度异常已处理'
  },
  {
    field: '紧急异常已处理',
    label: '紧急异常已处理'
  }
])
</script>

<template>
  <!-- <Descriptions :schema="detailSchema" :data="currentRow || {}" /> -->

  <Descriptions title="基本信息" :data="data" :schema="schema1" />
  <Descriptions title="自动巡检统计" :data="data" :schema="schema2" />
  <Descriptions title="告警信息-报表周期内" :data="data" :schema="schema3" />
  <Descriptions title="异常处理情况-报表周期内" :data="data" :schema="schema4" />
  <ElCard>
    <template #header>
      <div class="card-header">
        <span>巡检明细</span>
      </div>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="任务名称" label="任务名称" />
      <el-table-column prop="功能区" label="功能区" />
      <el-table-column prop="目标" label="目标" />
      <el-table-column prop="采集项" label="采集项" />
      <el-table-column prop="时间" label="时间" />
      <el-table-column prop="巡检结果" label="巡检结果" />
    </el-table>
  </ElCard>
</template>
