import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'

import Mock from 'mockjs'

const { code } = config

const timeout = 1000

// const dictObj: Recordable = {
//   importance: [
//     {
//       value: 0,
//       label: 'tableDemo.commonly'
//     },
//     {
//       value: 1,
//       label: 'tableDemo.good'
//     },
//     {
//       value: 2,
//       label: 'tableDemo.important'
//     }
//   ]
// }
const count = 100

const List: ListProps[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(5, 10)',
      importance: '@integer(1, 3)',
      display_time: '@datetime',
      pageviews: '@integer(100, 500)',
      image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)'),

      调用日期: '@datetime',
      '接口名称|1': ['实时数据', '巡检管理', '设备管理', '维修保养'],
      调用系统: '系统@ctitle(3, 6)',
      交换数据量: '@integer(1, 100)',
      '调用结果|1': ['成功', '失败', '失败回滚']
    })
  )
}

export default [
  // api日志
  {
    url: '/log/apiloglist',
    method: 'get',
    timeout,
    response: ({ query }) => {
      console.log(111111)

      const { title, pageIndex, pageSize } = query
      const mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
] as MockMethod[]
