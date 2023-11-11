import request from '@/config/axios'

export const getApiLogApi = (params: any) => {
  return request.get({ url: '/log/apiloglist', params })
}
