import type { App } from 'vue'

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import { ElLoading, ElScrollbar } from 'element-plus'

// 为满足vxe-table插件,需要将可能使用到的表单组件全局引入
import {
  ElInput,
  ElAutocomplete,
  ElInputNumber,
  ElSelect,
  ElCascader,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker,
  ElSwitch,
  ElRate,
  ElSlider,
  ElButton,
  ElButtons
} from 'element-plus'

const plugins = [ElLoading]

const components = [
  ElScrollbar,
  ElInput,
  // ElAutocomplete,
  ElInputNumber,
  ElSelect,
  ElCascader,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker
  // ElSwitch,
  // ElRate,
  // ElSlider,
  // ElButton,
  // ElButtons
]

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
