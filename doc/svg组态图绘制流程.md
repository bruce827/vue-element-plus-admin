# svg组态图绘制流程

## 一、实现步骤
1. 评估样例图片,确定专门组件(入水泵、阀组等)是否在组件库中,确定哪些元素是动态的，哪些是静态的。
2. 通过照片或者设计图纸用<code>illustrator</code>软件画出svg图片,图片中包括所有静态的元素,如底图等，如果有专门的svg组件图则需要使用专门的组件样式。
2. 使用<code>inksnkape</code>软件绘制动态的元素(如数值标签等)，并使用此软件的目的是为了在svg标签上添加id和ref属性,方便第三步传值。
3. 在页面中引入`SvgMap`组件,并在`config`中传入第二步设定的`id`或`ref`，详见下方接口文档。
    > 目前组件的逻辑是`ref`绑定报警，`id`绑定实时信息。

4. 根据业务需求在业务页面编写轮询逻辑。
## 二、组件文档
### 组件位置
``` bash
src/components/SvgMap
```
组件本身是支持在`main.js`中全局引入的，但没有必要。
```javascript
import SvgMap from './src/SvgMap.vue'

export type { SvgMapType } from './src/type.d'

export { SvgMap }

```

### 组件属性

<table>
    <thead>
        <tr>
            <th>属性</th><th>说明</th><th>类型</th><th>必填</th><th>默认值</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>src</td><td>svg图片地址</td><td><code>string</code></td><td>否</td><td>@/assets/svgs/404.svg</td>
    </tr>
    <tr>
        <td>width</td><td>宽度</td><td><code>string</code></td><td>否</td><td>'100%'</td>
    </tr>
    <tr>
        <td>height</td><td>高度</td><td><code>string</code></td><td>否</td><td>'500
        px'</td>
    </tr>
        <tr>
        <td>points</td><td>点位数据</td><td><code>PointType</code></td><td>否</td><td>'500px'</td>
    </tr>
    <tr>
        <td>defaultValue</td><td>点位数据默认值</td><td><code>string</code></td><td>否</td><td>#.##</td>
    </tr>
    <tr>
         <td>config</td><td>点位配置项</td><td><code>PointType</code></td><td>是</td><td>[]</td>
    </tr>
    </tbody>
</table>

### PointType属性
<table>
    <thead>
        <tr>
            <th>属性</th><th>说明</th><th>类型</th><th>必填</th><th>默认值</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>id</td><td>点位id</td><td><code>string</code></td><td>是</td><td>null</td>
    </tr>
    <tr>
        <td>desc</td><td>点位描述</td><td><code>string</code></td><td>否</td><td>''</td>
    </tr>
    <tr>
        <td>value</td><td>点位数值</td><td><code>string | number | null</code></td><td>否</td><td>null</td>
    </tbody>
</table>



## 三、注意事项
1. svg图片必须以组件形式引入,且组件中并没有做socket和轮巡,需要按照业务逻辑在页面中实现。
2. 目前组态图绘制有**svg**和**iframe引入**两种方式，两种方式不能混用。
3. `config`必须具有是所有点位id，方便初始化。

## 四、TODO

1. 组态图组件库还没有，可以UI自己定制。
2. 报警逻辑还没有实现。
3. 暂不支持一个页面中使用两个组态图。
4. **iframe引入**方式需要添加报警图片，后期考虑封装一个组件
