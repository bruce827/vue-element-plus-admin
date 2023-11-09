<script setup lang="ts">
import { ref, reactive } from "vue";
import type { DataType } from "./type.d";
const defaultData: DataType = {
  title: "泵站机组数据可视化平台",
};
const data = reactive<DataType>(defaultData);

const options = reactive({
  // src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  // src:"https://open.ys7.com/v3/openlive/J21804803_1_2.m3u8?expire=1716263456&id=582536212841172992&t=66d1757eb8f76022575559f2fe38a7118a3432e6fc77bacba7df0e560c19d515&ev=100",
  src:"https://open.ys7.com/v3/openlive/J21804803_2_2.m3u8?expire=1716262536&id=582532355982372864&t=7d41a7d2f324931a04651f0b558e6afce3ebfe0cadf9b0c434f14acc82e14e2a&ev=100",
  type: 'm3u8', //视频类型
})
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
        <div class="video-container">
          <vue3VideoPlay 
            width="100%"
            height="100%"
            title="冰河世纪"
            :src="options.src"
            :type="options.type"
            :autoPlay="true"
          />
        </div>
      </div>
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
