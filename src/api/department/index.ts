import request from '@/config/axios'
import {
  DepartmentListResponse,
  DepartmentUserParams,
  DepartmentUserResponse,
  QueryParamsType
} from './types'

/**
 * @description 获取全量部门
 * @param params {QueryParamsType}
 * @returns promise
 */
export const getDepartmentApi = () => {
  return request.post<DepartmentListResponse>({ url: '/department/query' })
}

export const getUserByIdApi = (params: DepartmentUserParams) => {
  return request.get<DepartmentUserResponse>({ url: '/department/users', params })
}

export const deleteUserByIdApi = (ids: string[] | number[]) => {
  return request.post({ url: '/department/user/delete', data: { ids } })
}

export const saveUserApi = (data: any) => {
  return request.post({ url: '/department/user/save', data })
}

export const saveDepartmentApi = (data: any) => {
  console.log(data)
  debugger
  return request.post({ url: '/department/save', data })
}

export const deleteDepartmentApi = (ids: string[] | number[]) => {
  return request.post({ url: '/department/delete', data: { ids } })
}
/**
 * @description 获取部门table
 * @param params {QueryParamsType}
 * @returns promise
 */
export const getDepartmentTableApi = (data: QueryParamsType) => {
  return request.post({ url: '/department/list', data })
}
