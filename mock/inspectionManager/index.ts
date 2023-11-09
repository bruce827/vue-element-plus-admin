import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

interface ListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: string
  pageviews: number
  image_uri: string

  pbmc: string
  pbgl: string
  sscz: string
  jqrmc: string
  jqrlx: string
  kssj: string
  jssj: string
  mcrwhs: number
  gnqsl: number
  dzsl: number
  pbzt: string
}

interface TreeListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: string
  pageviews: number
  children: TreeListProps[]
}

let List: ListProps[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(5, 10)',
      content: baseContent,
      importance: '@integer(1, 3)',
      display_time: '@datetime',
      pageviews: '@integer(100, 500)',
      image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)'),
      // 自动巡检
      pbmc: '班次:@natural(1,5)',
      pbgl: '@cname()',
      sscz: '西二联合站',
      jqrmc: '机器人@integer(1)',
      'jqrlx|1': ['巡检', '维护', '其它'],
      kssj: '@datetime',
      jssj: '@datetime',
      mcrwhs: '@natural(20,50)',
      gnqsl: '@natural(2,60)',
      dzsl: '@natural(5,20)',
      'pbzt|1': ['进行中', '已停止'],
      // 巡检日志
      rwbh: 'AT-2023019911',
      bc: '@natural(1,5)',
      xjmbsl: '@natural(5,20)',
      'xjjg|1': ['完成', '未完成'],
      //   巡检结果
      rwmc: '任务@natural(1,5)',
      'ssgnq|1': ['泵房', '西门', '管线', '其它'],
      'xjmb|1': ['电表', '拍照', '流量', '其它'],
      xjyq: '@csentence( 0, 30 )',
      cjsj: '@float(10, 100, 0, 2)',
      cjx: '读表',
      pdlx: '数值判断',
      yzbz: '@float(10, 50, 0, 2)' + '@float(50, 100, 0, 2)',
      'clzt|1': ['已处理', '未处理'],
      'ycdj|1': ['一', '二', '三'],
      'yctz|1': ['', '已通知'],

      //   日报
      rbmc: 'RB' + '@datetime',
      'fslx|1': ['邮件', '人工']
    })
  )
}

const treeList: TreeListProps[] = []

for (let i = 0; i < count; i++) {
  treeList.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(5, 10)',
      content: baseContent,
      importance: '@integer(1, 3)',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)',
      children: [
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          children: [
            {
              id: toAnyString(),
              // timestamp: +Mock.Random.date('T'),
              author: '@first',
              title: '@title(5, 10)',
              content: baseContent,
              importance: '@integer(1, 3)',
              display_time: '@datetime',
              pageviews: '@integer(300, 5000)'
            },
            {
              id: toAnyString(),
              // timestamp: +Mock.Random.date('T'),
              author: '@first',
              title: '@title(5, 10)',
              content: baseContent,
              importance: '@integer(1, 3)',
              display_time: '@datetime',
              pageviews: '@integer(300, 5000)'
            }
          ]
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)'
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)'
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)'
        }
      ]
      // image_uri
    })
  )
}

export default [
  // 树形列表接口
  {
    url: '/inspectionManager/treeList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = treeList.filter((item) => {
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
  },
  // 列表接口
  {
    url: '/inspectionManager/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pbmc, pageIndex, pageSize } = query
      const mockList = List.filter((item) => {
        if (pbmc && item.pbmc.indexOf(pbmc) < 0) return false
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
  },
  // 保存接口
  {
    url: '/inspectionManager/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      if (!body.id) {
        List = [
          Object.assign(body, {
            id: toAnyString()
          })
        ].concat(List) as any
        return {
          code: code,
          data: 'success'
        }
      } else {
        List.map((item) => {
          if (item.id === body.id) {
            for (const key in item) {
              item[key] = body[key]
            }
          }
        })
        return {
          code: code,
          data: 'success'
        }
      }
    }
  },
  // 详情接口
  {
    url: '/inspectionManager/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of List) {
        if (example.id === id) {
          return {
            code: code,
            data: example
          }
        }
      }
    }
  },
  // 删除接口
  {
    url: '/inspectionManager/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = List.length
        while (i--) {
          if (ids.indexOf(List[i].id) !== -1) {
            List.splice(i, 1)
          }
        }
        return {
          code: code,
          data: 'success'
        }
      }
    }
  }
] as MockMethod[]
