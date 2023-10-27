<script setup lang="ts">
import { ref, reactive } from "vue";
import type { DataType } from "./type.d";
const defaultData: DataType = {
  title: "泵站机组数据可视化平台",
};
const data = reactive<DataType>(defaultData);
</script>
<template>
  <div class="bg">
    <div class="header">
      <div class="title">
        {{ data.title }}
      </div>
    </div>
    <div class="data-body">
      <div class="card">
        <div class="monitor-box">
          <div class="box-content">
            <span>电量：289kw</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped="scoped">
@import url("./style.less");
// 闪光监控卡片效果
@import url("./blingbling.less");
</style>
