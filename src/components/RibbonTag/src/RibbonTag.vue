<script setup lang="ts">
import { ref, watch, computed, onMounted, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'

import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

defineProps({
  card: propTypes.bool.def(false),
  tag: propTypes.string.def('ribbon'),
})

onMounted(() => {
//   if (unref(collapse)) show.value = false
})


</script>

<template>
  <div :class="tag" >
        <slot>

        </slot>
  </div>
</template>

<style scoped lang="less">
@import "./ribbon.less";
.card {
    margin: 2rem;
    position: relative;
    background: #e1e1e1;
    place-self: initial;
}

.ribbon {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.ribbon {
  --d: .8em; /* the depth */
  
  position: absolute;
  top: 20px;
  inset-inline: calc(-1*var(--d));
  border-bottom: var(--d) solid #0008;
  line-height: 1.8;
  clip-path: polygon(0 0,100% 0,100% calc(100% - var(--d)),calc(100% - var(--d)) 100%,calc(100% - var(--d)) calc(100% - var(--d)),var(--d) calc(100% - var(--d)),var(--d) 100%,0 calc(100% - var(--d)));
  background-color: #3FB8AF; /* the main color */
}
</style>
