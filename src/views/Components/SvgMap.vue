<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElCard, ElText, ElAlert } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { SvgMap, SvgMapType } from '@/components/SvgMap'
import { getPointsApi } from '@/api/points'
import { sleep } from '@/utils'

import zt from '@/assets/svgs/zt.svg'

function radomValue() {
  return Math.random().toFixed(2)
}

const testConfig = [
  {
    id: '#tspan_pressure_in',
    desc: '进口压力',
    value: 0.23
  },
  {
    id: '#tspan_pressure_out',
    desc: '出口压力',
    value: radomValue()
  },
  {
    id: '#tspan_gas_flow_meter',
    desc: '气体流量计',
    value: radomValue()
  },
  {
    // sscyl
    id: '#tspan_Instantaneous_liquid',
    desc: '瞬时液量',
    value: radomValue()
  },
  {
    id: '#tspan_Instantaneous_water',
    desc: '瞬时含水',
    value: radomValue()
  },
  {
    id: '#tspan_Instantaneous_temperture',
    desc: '瞬时温度',
    value: radomValue()
  }
]
const testPoints = [
  {
    id: '#tspan_pressure_in',
    desc: '进口压力',
    value: 11.23
  }
]

const points = ref(testPoints)

const mapData = reactive<SvgMapType>({
  src: zt,
  width: '',
  height: '',
  config: testConfig
})

const fetchPoints = async () => {
  const { code, data } = await getPointsApi({})
  if (code == '0') {
    points.value = data
    fetchPoints
    await sleep(30)
    await fetchPoints()
  }
}

onMounted(() => {
  fetchPoints()
})
</script>

<template>
  <ContentWrap title="svg组态图打点">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-alert title="svg组态图需要按照以下步骤开发" type="warning" />
        </div>
      </template>
      <el-text>
        <p>
          <span>第一步：</span>
          通过照片或者设计图纸用<code>illustrator</code>画出svg图片,如果有专门的svg组件图则需要使用专门的组件样式。
        </p>
        <p>
          <span>第二步：</span>
          于业务人员确认哪些点是需要动态传值的组件,并使用<code>inksnkape</code>绘制动态的标签,使用此软件的目的是为了在svg标签上添加id,方便第三步传值。
        </p>
        <p>
          <span>第三步：</span>
          在页面中引入<code>SvgMap</code>组件,并绑定第二步设定的id。
        </p>
        <p>
          <span>注意：</span>
          svg图片必须以组件形式引入,且组件中并没有做socket和轮巡,需要按照业务逻辑在页面中实现
        </p>
      </el-text>
    </el-card>
    <el-card>
      <SvgMap :src="mapData.src" :config="mapData.config" :points="points" />
    </el-card>
  </ContentWrap>
</template>
