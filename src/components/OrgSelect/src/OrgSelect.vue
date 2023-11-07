<script setup lang="ts">
import { computed, unref } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ComponentSize, ElCascader } from 'element-plus'
// import { useAppStore } from '@/store/modules/app'
// import { useI18n } from '@/hooks/web/useI18n'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('size-dropdown')

defineProps({
  color: propTypes.string.def('')
})

// const { t } = useI18n()

// const appStore = useAppStore()

// const sizeMap = computed(() => appStore.sizeMap)

// const setCurrentSize = (size: ComponentSize) => {
//   appStore.setCurrentSize(size)
// }
const currentOrg = unref<Array<string>>(['大港油田', '第五采油厂', '西二联合站'])
const props1 = {
  checkStrictly: true
}
const options = [
  {
    value: '大港油田',
    label: '大港油田',
    children: [
      {
        value: '天津储气库分公司',
        label: '天津储气库分公司',
        children: [
          {
            value: '驴驹河储气库',
            label: '驴驹河储气库'
          }
        ]
      },
      {
        value: '原油运销公司',
        label: '原油运销公司',
        children: [
          {
            value: '油泥沙处理站',
            label: '油泥沙处理站'
          }
        ]
      },
      {
        value: '第一采油厂',
        label: '第一采油厂',
        children: [
          {
            value: '港东联合站',
            label: '港东联合站'
          },
          {
            value: '马西联合站',
            label: '马西联合站'
          }
        ]
      },
      {
        value: '第二采油厂',
        label: '第二采油厂',
        children: [
          {
            value: '庄一联合站',
            label: '庄一联合站'
          },
          {
            value: '南一联合站',
            label: '南一联合站'
          }
        ]
      },
      {
        value: '第三采油厂',
        label: '第三采油厂',
        children: [
          {
            value: '女一联合站',
            label: '女一联合站'
          },
          {
            value: '官一联合站',
            label: '官一联合站'
          },
          {
            value: '官二联合站',
            label: '官二联合站'
          },
          {
            value: '段一联合站',
            label: '段一联合站'
          },
          {
            value: '小一联合站',
            label: '小一联合站'
          },
          {
            value: '枣一联合站',
            label: '枣一联合站'
          },
          {
            value: '枣二联合站',
            label: '枣二联合站'
          }
        ]
      },
      {
        value: '第四采油厂',
        label: '第四采油厂',
        children: [
          {
            value: '板一联合站',
            label: '板一联合站'
          }
        ]
      },
      {
        value: '第五采油厂',
        label: '第五采油厂',
        children: [
          {
            value: '西一联合站',
            label: '西一联合站'
          },
          {
            value: '西二联合站',
            label: '西二联合站'
          }
        ]
      },
      {
        value: '第六采油厂',
        label: '第六采油厂',
        children: [
          {
            value: '孔店联合站',
            label: '孔店联合站'
          },
          {
            value: '羊中心站',
            label: '羊中心站'
          }
        ]
      }
    ]
  }
]
</script>

<template>
  <!-- <ElDropdown :class="prefixCls" trigger="click" @command="setCurrentSize">
    <Icon :size="18" icon="mdi:format-size" :color="color" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ t(`size.${item}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown> -->
  <div class="org-container">
    <ElCascader
      :class="prefixCls"
      :options="options"
      :props="props1"
      placeholder="请选择管理组"
      v-model="currentOrg"
      fit-input-width
    />
  </div>
</template>
<style lang="less" scoped>
.org-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;

  & /deep/ .el-cascader {
    width: 100%;
  }
}
</style>
