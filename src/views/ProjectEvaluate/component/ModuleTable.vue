<script setup lang="tsx">
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTreeTableListApi } from '@/api/table'
import { reactive, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'

import { useProjectTableStore } from '@/store/modules/projectTable'

const projectTableStore = useProjectTableStore()

const { tableRegister, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const dd = projectTableStore.getTableRes
    const res = (await projectTableStore.getTableList()) as any
    return {
      list: res?.list,
      total: res?.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState

const { t } = useI18n()

const columns = reactive<TableColumn[]>([
  // {
  //   field: 'selection',
  //   type: 'selection'
  // },
  {
    field: 'index',
    label: '序号',
    type: 'index'
  },
  {
    field: 'cate',
    label: '类别'
  },
  {
    field: 'module',
    label: '模块设计',
    children: [
      {
        field: 'moduleOne',
        label: '一级模块'
      },
      {
        field: 'moduleTwo',
        label: '二级模块'
      }
    ]
  },
  {
    field: 'interface',
    label: '接口评估(个)',
    children: [
      {
        field: 'crud',
        label: 'CRUD(套)'
      },
      {
        field: 'import',
        label: '导入'
      },
      {
        field: 'export',
        label: '导出'
      },
      {
        field: 'other',
        label: '其它接口'
      }
    ]
  },
  {
    field: 'importance',
    label: '重要性'
  },
  {
    field: 'cost',
    label: '一口价(w)'
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    slots: {
      default: (data) => {
        return (
          <ElButton type="primary" onClick={() => actionFn(data)}>
            {t('tableDemo.action')}
          </ElButton>
        )
      }
    }
  }
])

const actionFn = (data) => {
  console.log(data)
}
</script>

<template>
  <Table
    v-model:pageSize="pageSize"
    v-model:currentPage="currentPage"
    :columns="columns"
    :data="dataList"
    row-key="id"
    :loading="loading"
    sortable
    :pagination="{
      total: total
    }"
    @register="tableRegister"
  />
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
