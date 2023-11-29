<template>
  <div class="common-table">
    <div class="common-table-top">
      <div class="common-table-top-left">
        <el-button type="primary" size="small" @click="addRow">新增</el-button>
        <el-button type="danger" size="small" @click="deleteRows">删除</el-button>
      </div>
      <div class="common-table-top-right">
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>

    <vxe-table
      ref="tableRef"
      border
      resizable
      show-overflow
      keep-source
      v-bind="$attrs"
      :data="tableData"
      :edit-config="{
        trigger: 'click',
        mode: 'cell',
        showIcon: false
      }"
      :column-config="{ resizable: true }"
      :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
      :checkbox-config="{ labelField: 'id' }"
    >
      <vxe-column
        v-for="col in tableCols"
        :key="col.field || col.type"
        :type="col.type"
        :width="col.width"
        :min-width="col.minWidth"
        :field="col.field"
        :title="col.title || col.field"
        :edit-render="col.editRender"
        :tree-node="col.treeNode"
        :visible="col.visible"
      />
    </vxe-table>
    <vxe-pager
      :layouts="[
        'Sizes',
        'PrevJump',
        'PrevPage',
        'Number',
        'NextPage',
        'NextJump',
        'FullJump',
        'Total'
      ]"
      v-model:current-page="tablePage.currentPage"
      v-model:page-size="tablePage.pageSize"
      :total="tablePage.total"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed } from 'vue'
import { ElMessage, ElButton } from 'element-plus'
import { VxeTableInstance, VxeColumnProps, VxePagerEvents } from 'vxe-table'
import type { TablePageType } from './types'

const emit = defineEmits<{
  (e: 'save', record: any): void
  (e: 'delete', record: any): void
}>()

const tableRef = ref<VxeTableInstance<RowVO>>()

const props = defineProps({
  tableData: {
    type: Array as PropType<Recordable> as never,
    required: true,
    default: () => []
  },
  tableCols: {
    type: Array as PropType<VxeColumnProps[]> as never,
    required: true,
    default: () => []
  },
  tablePage: {
    type: Object as PropType<TablePageType>,
    default: () => {
      return { total: 0, currentPage: 1, pageSize: 10 }
    }
  }
})

const tableData = computed(() => props.tableData)
const tableCols = computed(() => props.tableCols)
const tablePage = computed(() => props.tablePage)
/**
 * 树组件操作
 */
// const toggleExpandEvent = () => {
//   const $table = tableRef.value
//   if ($table) {
//     $table.toggleTreeExpand(tableData.value[1])
//   }
// }

// const setExpandEvent = () => {
//   const $table = tableRef.value
//   if ($table) {
//     $table.setTreeExpand(tableData.value[8], true)
//   }
// }

// const expandAllEvent = () => {
//   const $table = tableRef.value
//   if ($table) {
//     $table.setAllTreeExpand(true)
//   }
// }

// const claseExpandEvent = () => {
//   const $table = tableRef.value
//   if ($table) {
//     $table.clearTreeExpand()
//   }
// }
/**
 * 结束
 */

// 控制表格行是否可点击
// const activeMethod = (params) => {
//   // const { row, rowIndex, column, columnIndex } = params
//   // 根据当前用户时什么角色去判断可不可以编辑
//   // return (column.editRender.canEdit === 'BA')
//   console.log(params)
//   return true
// }

// 新增
const addRow = () => {
  const $table = tableRef.value
  $table && $table.insert({})
}

// 删除选中的数据
const deleteRows = () => {
  const $table = tableRef.value
  if ($table) {
    const selectRecords = $table.getCheckboxRecords()
    if (!selectRecords.length) {
      ElMessage({
        type: 'warning',
        message: '请至少选中一个后再进行操作!'
      })
      return []
    }
    const insertRecords = $table.getInsertRecords()
    const insertSet = new WeakSet(insertRecords)
    const insertSelectRecords: RowVO[] = [] // 选中的新增的数据
    const OriginSelectRecords: RowVO[] = [] // 选中的原有的数据
    for (const record of selectRecords) {
      if (insertSet.has(record)) {
        insertSelectRecords.push(record)
      } else {
        OriginSelectRecords.push(record)
      }
    }
    deleteInsertRows(insertSelectRecords)
    // 触发父组件
    emit('delete', OriginSelectRecords)
    return OriginSelectRecords
  }
}
// 删除
const deleteInsertRows = (selectInsertRecords: RowVO[]) => {
  const $table = tableRef.value
  return $table && $table.remove(selectInsertRecords)
}

// 保存
const save = () => {
  const $table = tableRef.value
  if ($table) {
    const { insertRecords, updateRecords } = $table.getRecordset()
    // 触发父组件
    emit('save', $table.getRecordset())
    return {
      insertRecords,
      updateRecords
    }
  }
}
// 分页
const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
  debugger
  tablePage.value.currentPage = currentPage
  tablePage.value.pageSize = pageSize
  debugger
  // findList()
}
defineExpose({
  save,
  deleteRows
})
</script>

<style lang="less" scoped>
.common-table {
  padding: 24px 18px;
  background: #f7f7f7;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  .common-table-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .vxe-table {
    .vxe-table--main-wrapper table thead .col--group {
      font-size: 20px;
      letter-spacing: 10px;
    }
  }

  .vxe-table .vxe-table--header .vxe-header--row .vxe-header--column .vxe-cell--title {
    // 保留空白符序列，但是正常地进行换行
    white-space: pre-wrap;
    // 将内容在边界内换行
    word-wrap: break-word;
  }

  .vxe-header--column .vxe-cell-help-icon {
    color: blue;
  }
}
</style>
