<script lang="tsx" setup="setup">
import { reactive, ref, onMounted, computed } from 'vue'
import { ElAlert, ElCollapse, ElCollapseItem, ElCard } from 'element-plus'
import type { FormItemProp } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { useValidator } from '@/hooks/web/useValidator'
import { ContentWrap } from '@/components/ContentWrap'
import { Form } from '@/components/Form'
import type { FormSchema } from '@/components/Form'
import StatisticCard from './component/Statistic.vue'
import ModuleTable from './component/ModuleTable.vue'
import { useProjectEvaluateStore } from '@/store/modules/projectEvaluate'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { formRegister, formMethods } = useForm()
const { required } = useValidator()

const {
  setProps,
  // delSchema,
  // addSchema,
  // setValues,
  // setSchema,
  // getComponentExpose,
  getElFormExpose,
  getFormData
} = formMethods

const {
  getProjectPhaseOptions,
  getProDuringOptions,
  getUserGroupOptions,
  getPreSalesOptions,
  getAcceptanceCheckOptions,
  getBusinessProblemOptions,
  getPlanOptions,
  getDataSourceOptions,
  getMainDataOptions,
  getIotDataOptions,
  getBackendOptions,
  getFrontendOptions,
  getProjectDeployOptions,
  getAppOptions,
  getExperienceOptions,
  getCloseLoopOptions,
  getLeaderImportanceOptions,
  getDocumentOptions,
  getPmOptions,
  getOtherServeOptions,
  getOrgSourceOptions
} = useProjectEvaluateStore()

const isMobile = computed(() => appStore.getMobile)

const restaurants = ref<Recordable[]>([])

const hiddenList = ref<string[]>([])

const activePanel = ref<string>('eval')
const schema = reactive<FormSchema[]>([
  {
    field: 'desc',
    formItemProps: {
      slots: {
        default: () => (
          <ElAlert
            type="info"
            show-icon="show-icon"
            closable={false}
            style={{
              margin: 0
            }}
          >
            <h3>
              预期项目额在40万及以上的项目,可以执行标准项目管理流程及人员配备,建议使用excel版来进行评估。
            </h3>
          </ElAlert>
        )
      }
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'baseInfo',
    label: '基本信息',
    component: 'Divider'
  },
  {
    field: 'proName',
    label: '项目名称',
    component: 'Input',
    componentProps: {
      formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ''),
      parser: (value) => value.replace(/\$\s?|(,*)/g, ''),
      size: 'large'
    }
  },
  {
    field: 'proCost',
    label: '纯软项目额（万元）',
    component: 'InputNumber',
    value: 40,
    componentProps: {
      size: 'large',
      // class: 'mx-18',
      precision: 2,
      max: 50,
      min: 5,
      width: '100px'
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'projectPhase',
    label: '项目类型',
    component: 'Select',
    componentProps: {
      options: getProjectPhaseOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'userGroup',
    label: '项目用户群体',
    component: 'Select',
    componentProps: {
      options: getUserGroupOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'proDuring',
    label: '预计工期(工作日)',
    component: 'Select',
    componentProps: {
      options: getProDuringOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'deadLine',
    label: '项目节点',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange'
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'preSales',
    label: '参与售前阶段',
    component: 'Select',
    componentProps: {
      options: getPreSalesOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'plan',
    label: '项目计划',
    component: 'Select',
    componentProps: {
      options: getPlanOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'acceptanceCheck',
    label: '额外验收方式',
    component: 'CheckboxGroup',
    componentProps: {
      options: getAcceptanceCheckOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'businessProblem',
    label: '商务遗留问题',
    component: 'CheckboxGroup',
    componentProps: {
      options: getBusinessProblemOptions
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'technologyInfo',
    label: '技术信息',
    component: 'Divider'
  },
  {
    field: 'dataSource',
    label: '外部数据来源',
    component: 'CheckboxGroup',
    componentProps: {
      options: getDataSourceOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    hidden: hiddenList.value.includes('mainData'),
    field: 'mainData',
    label: '主数据来源',
    component: 'CheckboxGroup',
    componentProps: {
      options: getMainDataOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    hidden: hiddenList.value.includes('iotData'),
    field: 'iotData',
    label: '物联网数据',
    component: 'CheckboxGroup',
    componentProps: {
      options: getIotDataOptions
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'backend',
    label: '后端框架',
    component: 'Select',
    componentProps: {
      options: getBackendOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'backend',
    label: '前端框架',
    component: 'Select',
    componentProps: {
      options: getFrontendOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'app',
    label: '移动端',
    component: 'Select',
    componentProps: {
      options: getAppOptions
    },
    colProps: {
      span: 12
    }
  },
  {
    field: 'projectDeploy',
    label: '集成方式',
    component: 'Select',
    componentProps: {
      options: getProjectDeployOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'communication',
    label: '管理于沟通',
    component: 'Divider'
  },
  {
    field: 'closeLoop',
    label: '业务逻辑在自己系统闭环',
    component: 'Select',
    componentProps: {
      options: getCloseLoopOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'closeLoop',
    label: '业务逻辑在自己系统闭环',
    component: 'Select',
    componentProps: {
      options: getCloseLoopOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'leaderImportance',
    label: '公司领导是否重视',
    component: 'Select',
    componentProps: {
      options: getLeaderImportanceOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'pm',
    label: '专职项目经理(项目周期内)',
    component: 'Select',
    componentProps: {
      options: getPmOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'document',
    label: '文档或参考资料',
    component: 'CheckboxGroup',
    componentProps: {
      options: getDocumentOptions
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'logic',
    label: '业务问题',
    component: 'Divider'
  },
  {
    field: 'experience',
    label: '业务经验',
    component: 'Select',
    componentProps: {
      options: getExperienceOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'orgSource',
    label: '组织架构来源',
    component: 'Select',
    componentProps: {
      options: getOrgSourceOptions
    },
    colProps: {
      span: 6
    }
  },
  {
    field: 'otherServe',
    label: '需要其它服务',
    component: 'CheckboxGroup',
    componentProps: {
      options: getOtherServeOptions
    },
    colProps: {
      span: 24
    }
  }
])

const data = reactive({
  formData: {
    proName: ''
  }
})

/**
 * 以下是关于表单的方法
 */

// 表单校验
const formValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  debugger
  console.log(prop, isValid, message)
}
// 切换禁用
const changeDisabled = (bool: boolean) => {
  setProps({
    disabled: bool
  })
}
// 是否全部必填
const changeAllRequired = () => {
  setProps({
    required: true
  })
}
// 重置表单
const resetForm = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
}
// 保存
const save = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    data.formData = await getFormData()
  }
}

// 加载所有码表
const loadAll = () => {
  return [
    {
      value: 'vue',
      link: 'https://github.com/vuejs/vue'
    },
    {
      value: 'element',
      link: 'https://github.com/ElemeFE/element'
    },
    {
      value: 'cooking',
      link: 'https://github.com/ElemeFE/cooking'
    },
    {
      value: 'mint-ui',
      link: 'https://github.com/ElemeFE/mint-ui'
    },
    {
      value: 'vuex',
      link: 'https://github.com/vuejs/vuex'
    },
    {
      value: 'vue-router',
      link: 'https://github.com/vuejs/vue-router'
    },
    {
      value: 'babel',
      link: 'https://github.com/babel/babel'
    }
  ]
}

onMounted(() => {
  changeAllRequired()
  restaurants.value = loadAll()
})
</script>
<template>
  <ContentWrap message="项目启动前项目可行性预估" :title="`${data.formData.proName}项目实施评估`">
    <el-card>
      <StatisticCard />
    </el-card>
    <el-collapse accordion v-model="activePanel">
      <el-collapse-item name="eval" title="项目评估">
        <Form
          :label-position="isMobile ? 'top' : 'right'"
          :schema="schema"
          :model="data.formData"
          label-width="auto"
          @register="formRegister"
          @validate="formValidate"
        />
        <div class="form-submit">
          <ElButton @click="resetForm"> 重置 </ElButton>
          <ElButton type="primary" :loading="loading" @click="save"> 生成 </ElButton>
        </div>
      </el-collapse-item>
      <el-collapse-item title="模块设计" :disabled="true" name="modules">
        <ModuleTable />
      </el-collapse-item>
    </el-collapse>
  </ContentWrap>
</template>
<style lang="less" scoped="scoped">
.form-submit {
  display: flex;
}
</style>
