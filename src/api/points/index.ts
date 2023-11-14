import request from '@/config/axios'

export const getPointsApi = (params: any) => {
  return request.get({ url: '/points/pointList', params })
}
