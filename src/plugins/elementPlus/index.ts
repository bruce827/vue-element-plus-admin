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

  // 为了开发环境启动更快，一次性引入所有样式
  if (import.meta.env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'true') {
    import('element-plus/dist/index.css')
    return
  }

  components.forEach((component) => {
    app.component(component.name!, component)
  })
}
