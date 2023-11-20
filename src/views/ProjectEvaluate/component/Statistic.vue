<template>
  <el-row :gutter="16">
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="98500" group-separator="">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              项目跑分
              <el-tooltip
                effect="dark"
                content="根据项目评估所添的信息动态生成,生成的时间也会影响跑分"
                placement="top"
              >
                <Icon icon="mingcute:warning-fill" />
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>项目评估完成度</span>
            <span class="green"> 100% </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="693700" group-separator="">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              二级模块数量
              <el-tooltip
                effect="dark"
                content="Number of users who logged into the product in one month"
                placement="top"
              />
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>模块设计完整度</span>
            <span class="red">
              12%
              <el-icon>
                <!-- <CaretBottom /> -->
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="70" title="实施成本预估(评估值/预期值)" group-separator="">
          <template #suffix> <Icon icon="fluent-mdl2:compare" />{{ 40 }} </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>比预期值</span>
            <span class="green">
              上升12万
              <el-icon>
                <!-- <CaretTop /> -->
              </el-icon>
            </span>
          </div>

          <div class="footer-item">
            <el-icon :size="14">
              <!-- <ArrowRight /> -->
            </el-icon>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-countdown format="DD [天] HH:mm:ss" :value="value2">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              <el-icon style="margin-right: 4px" :size="12">
                <Calendar />
              </el-icon>
              项目工期预估
            </div>
          </template>
        </el-countdown>
        <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTooltip, ElRow, ElCol, ElStatistic, ElCountdown } from 'element-plus'
import dayjs from 'dayjs'
// const props = defineProps({})

// const value = ref(Date.now() + 1000 * 60 * 60 * 7)
// const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2)
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
</script>

<style lang="less" scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
