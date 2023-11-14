export interface SvgMapType {
  // svg图片路径,默认404.svg
  src: string
  width?: string | number
  height?: string | number
  // 配置全部点位id,如果没有值则会自动赋治defaultValue
  config: PointType[]
  // 点位数据
  points?: PointType[]
  // 点位的默认值
  defaultValue?: string
  // 轮询间隔时间
  // interval: number | null
}

export type PointType = {
  id: string
  desc?: string
  value: number | string | null
}
