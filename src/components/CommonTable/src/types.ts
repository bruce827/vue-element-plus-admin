export interface CommonTableType {
  title: string
}

export interface TablePageType {
  total: number
  currentPage: number
  pageSize: number
}

export type SaveParamsType = (T: any) => boolean
export type DeleteRowsParamsType = {}
