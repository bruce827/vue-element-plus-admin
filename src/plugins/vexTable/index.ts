import type { App } from 'vue'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

export const setupVexTable = async (app: App<Element>) => {
  await app.use(VXETable)
  await VXETable.use(VXETablePluginElement)
}
