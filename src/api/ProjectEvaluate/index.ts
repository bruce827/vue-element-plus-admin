import request from '@/config/axios'
import type { TableData } from './types'

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/example/treeList', params })
}
