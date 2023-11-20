import { defineStore } from 'pinia'
import { store } from '../index'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage, ComponentSize } from 'element-plus'
import type { Option } from 'element-plus'
import { useStorage } from '@/hooks/web/useStorage'
import optionData from './data.json'

const {
  projectPhaseOptions,
  proDuringOptions,
  reasonOptions,
  userGroupOptions,
  preSalesOptions,
  projectDeployOptions,
  experienceOptions,
  acceptanceCheckOptions,
  businessProblemOptions,
  dataSourceOptions,
  mainDataOptions,
  iotDataOptions,
  backendOptions,
  frontendOptions,
  appOptions,
  closeLoopOptions,
  leaderImportanceOptions,
  documentOptions,
  pmOptions,
  otherServeOptions,
  roleOptions,
  planOptions,
  orgSourceOptions
} = optionData

type OptionType = {
  disabled: boolean // 是否可选
  label: string
  value: string | number
  num: number // 加权值
}

interface ProjectEvaluateStateType {
  collapseDisabledList: Set<boolean>
  hiddenList: Set<string>
  projectPhaseOptions: OptionType[]
  proDuringOptions: OptionType[]
  userGroupOptions: OptionType[]
  preSalesOptions: OptionType[]
  projectDeployOptions: OptionType[]
  experienceOptions: OptionType[]
  acceptanceCheckOptions: OptionType[]
  businessProblemOptions: OptionType[]
  dataSourceOptions: OptionType[]
  mainDataOptions: OptionType[]
  iotDataOptions: OptionType[]
  backendOptions: OptionType[]
  frontendOptions: OptionType[]
  appOptions: OptionType[]
  closeLoopOptions: OptionType[]
  leaderImportanceOptions: OptionType[]
  documentOptions: OptionType[]
  pmOptions: OptionType[]
  otherServeOptions: OptionType[]
  roleOptions: OptionType[]
  planOptions: OptionType[]
  orgSourceOptions: OptionType[]
}

export const useProjectEvaluateStore = defineStore('projectEvaluate', {
  state: (): ProjectEvaluateStateType => {
    return {
      // 需要隐藏选项
      hiddenList: new Set([]),
      // 当前项目阶段
      projectPhaseOptions: projectPhaseOptions,
      // 项目预计工期
      proDuringOptions: proDuringOptions,
      //   用户群体
      userGroupOptions: userGroupOptions,
      // 参与售前
      preSalesOptions: preSalesOptions,
      // 项目计划
      planOptions: planOptions,
      //   项目部署方式
      projectDeployOptions: projectDeployOptions,
      //   业务参照
      experienceOptions: experienceOptions,
      //   验收方式
      acceptanceCheckOptions: acceptanceCheckOptions,
      // 商务遗留问题
      businessProblemOptions: businessProblemOptions,
      // 外部数据来源
      dataSourceOptions: dataSourceOptions,
      // 主数据来源
      mainDataOptions: mainDataOptions,
      // 物联网数据
      iotDataOptions: iotDataOptions,
      // 后端架构
      backendOptions: backendOptions,
      // 前端架构
      frontendOptions: frontendOptions,
      // 移动端
      appOptions: appOptions,
      // 业务逻辑闭环
      closeLoopOptions: closeLoopOptions,
      // 领导是否重视
      leaderImportanceOptions: leaderImportanceOptions,
      // 文档交接
      documentOptions: documentOptions,
      // 专职项目经理
      pmOptions: pmOptions,
      // 其它服务
      otherServeOptions: otherServeOptions,
      // 需要的角色
      roleOptions: roleOptions,
      // 组织机构来源
      orgSourceOptions: orgSourceOptions,

      // 评估表单
      form: {
        // 项目节点
        deadLine: []
      }
    }
  },
  getters: {
    getProjectPhaseOptions(): OptionType[] {
      return this.projectPhaseOptions
    },
    getDeadLineOptions(): OptionType[] {
      return this.deadLineOptions
    },
    getUserGroupOptions(): OptionType[] {
      return this.userGroupOptions
    },
    getPreSalesOptions(): OptionType[] {
      return this.preSalesOptions
    },
    getProjectDeployOptions(): OptionType[] {
      return this.projectDeployOptions
    },
    getExperienceOptions(): OptionType[] {
      return this.experienceOptions
    },
    getAcceptanceCheckOptions(): OptionType[] {
      return this.acceptanceCheckOptions
    },
    getBusinessProblemOptions(): OptionType[] {
      return this.businessProblemOptions
    },
    getDataSourceOptions(): OptionType[] {
      return this.dataSourceOptions
    },
    getMainDataOptions(): OptionType[] {
      return this.mainDataOptions
    },
    getIotDataOptions(): OptionType[] {
      return this.iotDataOptions
    },
    getBackendOptions(): OptionType[] {
      return this.backendOptions
    },
    getFrontendOptions(): OptionType[] {
      return this.frontendOptions
    },
    getAppOptions(): OptionType[] {
      return this.appOptions
    },
    getCloseLoopOptions(): OptionType[] {
      return this.closeLoopOptions
    },
    getLeaderImportanceOptions(): OptionType[] {
      return this.leaderImportanceOptions
    },
    getDocumentOptions(): OptionType[] {
      return this.documentOptions
    },
    getPmOptions(): OptionType[] {
      return this.pmOptions
    },
    getOtherServeOptions(): OptionType[] {
      return this.otherServeOptions
    },
    getRoleOptions(): OptionType[] {
      return this.roleOptions
    },
    getProDuringOptions(): OptionType[] {
      return this.proDuringOptions
    },
    getPlanOptions(): OptionType[] {
      return this.planOptions
    },
    getReasonOptions(): OptionType[] {
      return this.reasonOptions
    },
    getOrgSourceOptions(): OptionType[] {
      return this.orgSourceOptions
    }
  },
  actions: {
    // 全部码表初始化
    optionsInit() {
      // TODO:从后台获取
    }
  }
})

export const useProjectEvaluateStoreWithOut = () => {
  return useProjectEvaluateStore(store)
}
