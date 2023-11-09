import request from '@/config/axios'
import type { TableData } from './types'

export const getTableListApi = (params: any) => {
  return request.get({ url: '/inspectionManager/list', params })
}

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/inspectionManager/treeList', params })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  return request.post({ url: '/inspectionManager/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  return request.get({ url: '/inspectionManager/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/inspectionManager/delete', data: { ids } })
}
