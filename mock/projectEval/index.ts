import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'

import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 100

interface TreeListProps {
  id: string
  //   类别
  cate: string
  // 模块设计
  moduleOne: string
  moduleTwo: string | null
  // 接口评估
  crud: number
  import: number
  export: number
  other: number
  // 重要性
  importance: number | null
  // 一口价
  cost: number
  children: TreeListProps[]
}

const treeList: TreeListProps[] = [
  {
    id: toAnyString(),
    cate: 'PC端',
    moduleOne: '填写模块名称',
    moduleTwo: '填写模块名称',
    crud: 2,
    import: 1,
    export: 1,
    other: 0,
    importance: null,
    cost: 2.6,
    children: [
      {
        id: toAnyString(),
        cate: 'PC端',
        moduleOne: '填写模块名称',
        moduleTwo: '填写模块名称',
        crud: 2,
        import: 1,
        export: 1,
        other: 0,
        importance: null,
        cost: 2.6
      }
    ]
  }
]

// for (let i = 0; i < count; i++) {
//   treeList.push(
//     Mock.mock({
//       id: toAnyString(),
//       // timestamp: +Mock.Random.date('T'),
//       author: '@first',
//       title: '@title(5, 10)',
//       content: baseContent,
//       importance: '@integer(1, 3)',
//       display_time: '@datetime',
//       pageviews: '@integer(300, 5000)',
//       children: [
//         {
//           id: toAnyString(),
//           // timestamp: +Mock.Random.date('T'),
//           author: '@first',
//           title: '@title(5, 10)',
//           content: baseContent,
//           importance: '@integer(1, 3)',
//           display_time: '@datetime',
//           pageviews: '@integer(300, 5000)',
//           children: [
//             {
//               id: toAnyString(),
//               // timestamp: +Mock.Random.date('T'),
//               author: '@first',
//               title: '@title(5, 10)',
//               content: baseContent,
//               importance: '@integer(1, 3)',
//               display_time: '@datetime',
//               pageviews: '@integer(300, 5000)'
//             },
//             {
//               id: toAnyString(),
//               // timestamp: +Mock.Random.date('T'),
//               author: '@first',
//               title: '@title(5, 10)',
//               content: baseContent,
//               importance: '@integer(1, 3)',
//               display_time: '@datetime',
//               pageviews: '@integer(300, 5000)'
//             }
//           ]
//         },
//         {
//           id: toAnyString(),
//           // timestamp: +Mock.Random.date('T'),
//           author: '@first',
//           title: '@title(5, 10)',
//           content: baseContent,
//           importance: '@integer(1, 3)',
//           display_time: '@datetime',
//           pageviews: '@integer(300, 5000)'
//         },
//         {
//           id: toAnyString(),
//           // timestamp: +Mock.Random.date('T'),
//           author: '@first',
//           title: '@title(5, 10)',
//           content: baseContent,
//           importance: '@integer(1, 3)',
//           display_time: '@datetime',
//           pageviews: '@integer(300, 5000)'
//         },
//         {
//           id: toAnyString(),
//           // timestamp: +Mock.Random.date('T'),
//           author: '@first',
//           title: '@title(5, 10)',
//           content: baseContent,
//           importance: '@integer(1, 3)',
//           display_time: '@datetime',
//           pageviews: '@integer(300, 5000)'
//         }
//       ]
//       // image_uri
//     })
//   )
// }

export default [
  // api日志
  {
    url: '/projectEval/getList',
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
