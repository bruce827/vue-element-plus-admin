import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'

import Mock from 'mockjs'

const { code } = config

const timeout = 1000

function radomValue() {
  return Math.random().toFixed(2)
}

export default [
  // api日志
  {
    url: '/points/pointList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const pointList = [
        {
          id: '#tspan_pressure_in',
          desc: '进口压力',
          value: radomValue()
        },
        {
          id: '#tspan_pressure_out',
          desc: '出口压力',
          value: radomValue()
        },
        {
          id: '#tspan_gas_flow_meter',
          desc: '气体流量计',
          value: radomValue()
        },
        {
          // sscyl
          id: '#tspan_Instantaneous_liquid',
          desc: '瞬时液量',
          value: radomValue()
        },
        {
          id: '#tspan_Instantaneous_water',
          desc: '瞬时含水',
          value: radomValue()
        },
        {
          id: '#tspan_Instantaneous_temperture',
          desc: '瞬时温度',
          value: radomValue()
        }
      ]
      return {
        code: code,
        data: pointList
      }
    }
  }
] as MockMethod[]
