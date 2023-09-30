<script setup lang="ts">
import LinkedSelect from '@/components/linkedSelect/src/index.vue'
import type { selectData } from '@/components/linkedSelect'

const handleChange = (data: selectData) => {
  console.log(data)
  debugger
}
</script>
<template>
  <div>
    <LinkedSelect @change="handleChange" />
  </div>
</template>

<style scoped></style>
