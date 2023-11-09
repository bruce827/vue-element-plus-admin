<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { getTableListApi, saveTableApi, delTableListApi } from '@/api/inspectionManager'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

const ids = ref<string[]>([])

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  },
  fetchDelApi: async () => {
    const res = await delTableListApi(unref(ids))
    return !!res
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList, getElTableExpose, delList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'pbmc',
    label: '排班名称',
    search: {
      component: 'Input'
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'rwbh',
    label: '任务编号',
    search: {
      hidden: true
    }
  },
  {
    field: 'bc',
    label: '班次',
    search: {
      hidden: true
    }
  },
  {
    field: 'sscz',
    label: '所属站场',
    search: {
      hidden: true
    }
  },
  {
    field: 'jqrlx',
    label: '机器人类型',
    search: {
      hidden: true
    }
  },
  {
    field: '',
    label: '开始时间',
    align: 'center',
    search: {
      hidden: true
    },
    children: [
      {
        field: 'kssj',
        label: '计划',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      },
      {
        field: 'kssj',
        label: '实际',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    ]
  },
  {
    field: '',
    label: '结束时间',
    align: 'center',
    children: [
      {
        field: 'kssj',
        label: '计划',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      },
      {
        field: 'kssj',
        label: '实际',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    ]
  },
  {
    field: '',
    label: '任务耗时',
    align: 'center',
    children: [
      {
        field: 'mcrwhs',
        label: '计划',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      },
      {
        field: 'mcrwhs',
        label: '实际',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    ]
  },
  {
    field: 'gnqsl',
    label: '功能区数量',
    children: [
      {
        field: 'gnqsl',
        label: '计划',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      },
      {
        field: 'gnqsl',
        label: '实际',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    ]
  },
  {
    field: '',
    label: '巡检目标数量',
    align: 'center',
    children: [
      {
        field: 'xjmbsl',
        label: '计划',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      },
      {
        field: 'xjmbsl',
        label: '实际',
        search: {
          hidden: true
        },
        form: {
          component: 'DatePicker',
          componentProps: {
            type: 'datetime',
            valueFormat: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    ]
  },
  {
    field: 'pbzt',
    label: '任务状态',
    search: {
      hidden: true
    }
  },
  {
    field: 'xjjg',
    label: '巡检结果',
    search: {
      hidden: true
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<TableData | null>(null)
const actionType = ref('')

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = null
  dialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)

const delData = async (row: TableData | null) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: TableData) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: TableData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    const res = await saveTableApi(formData)
      .catch(() => {})
      .finally(() => {
        saveLoading.value = false
      })
    if (res) {
      dialogVisible.value = false
      currentPage.value = 1
      getList()
    }
  }
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      headerAlign="center"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>
</template>
<style lang="less" scoped></style>
