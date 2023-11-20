import { defineStore } from 'pinia'
import { store } from '../index'
import defaultTable from './defaultTable.json'

type moduleOneType = {
  id: string
  //   类别
  cate: string
  // 模块设计
  moduleOne: string
  //   二级模块
  children: moduleTwoType[]
}

type moduleTwoType = {
  id: string
  parentId: string
  moduleTwo: string
  // 接口评估
  crud: number
  import: number
  export: number
  other: number
  // 重要性
  importance: number
  // 一口价
  cost: number
}

interface ProjectTableType {
  tableList: moduleOneType[]
}

export const useProjectTableStore = defineStore('projectTable', {
  state: (): ProjectTableType => {
    return {
      tableList: defaultTable
    }
  },
  getters: {
    getTableRes() {
      return this.tableList
    }
  },
  actions: {
    async getTableList(): moduleOneType[] {
      debugger
      return {
        list: this.tableList,
        total: this.tableList.length
      }
    },
    setTableList(formData: any) {}
  }
})

export const useProjectTableStoreWithOut = () => {
  return useProjectTableStore(store)
}
