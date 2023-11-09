<script setup lang="tsx">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
// import * as dayjs from 'dayjs'
import { ElButton, ElTag, ElCalendar, ElAlert, ElButtonGroup } from 'element-plus'
import type { CalendarInstance, CalendarDateType } from 'element-plus'

const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
// const currentDate = ref(dayjs().format('YYYY-MM-DD'))
</script>

<template>
  <ContentWrap>
    <!-- style="height: calc(100vh - 200px)" -->
    <ElCalendar ref="calendar">
      <template #header="{ date }">
        <span>机器人巡检日历</span>
        <span>{{ date }}</span>
        <ElButtonGroup>
          <ElButton size="small" @click="selectDate('prev-year')"> 上一年 </ElButton>
          <ElButton size="small" @click="selectDate('prev-month')"> 上一月 </ElButton>
          <ElButton size="small" @click="selectDate('today')">今天</ElButton>
          <ElButton size="small" @click="selectDate('next-month')"> 下一月 </ElButton>
          <ElButton size="small" @click="selectDate('next-year')"> 下一年 </ElButton>
        </ElButtonGroup>
      </template>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
        <ElAlert title="机器人1,巡检任务完成" type="success" />
        <!-- <ElAlert v-if="data.day == currentDate" title="机器人2,任务进行中" type="info" /> -->
        <ElAlert title="机器人3,巡检告警" type="warning" />
        <ElAlert title="机器人4,故障" type="error" />
      </template>
    </ElCalendar>
  </ContentWrap>
</template>
<style lang="less" scoped>
/deep/ .el-calendar-day {
  height: 200px;
}
</style>
