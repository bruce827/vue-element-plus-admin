<script lang="ts" setup="setup">
import { log } from "console";
import {
  ref,
  defineProps,
  getCurrentInstance,
  onMounted,
  nextTick,
  PropType,
  computed,
  watchPostEffect,
} from "vue";
import tempOption from "./option.js";
//获取this
// let {proxy} = getCurrentInstance()
const params = ref({});
const loading = ref<Boolean>(false);
const form = ref({});
// 卡片类型
const cardTypeMapper = new Map([
  [
    "cyj",
    {
      id: "cyj",
      text: "抽油机",
      class: "-cyj",
    },
  ],
  [
    "db",
    {
      id: "db",
      text: "电泵",
      class: "-db",
    },
  ],
  [
    "lgb",
    {
      id: "lgb",
      text: "螺杆泵",
      class: "-lgb",
    },
  ],
]);
const emit = defineEmits<{
  // (e:'getList',params:any):void
  (e: "rowUpdate", row: any): void;
  (e: "rowSave", row: any): void;
  (e: "rowDel", row): void;
  (e: "refreshChange"): void;
  (e: "searchChange", params): void;
}>();

const props = defineProps({
  data: {
    type: Array as never,
    default: () => [],
  },
  option: {
    type: Object,
    default: () => tempOption,
  },
  page: {
    type: Object,
    required: true,
  },
});

const data = computed(() => {
  // debugger
  // 当数据改变时刷新card的type,vue组件会自动刷新之前的node
  // addRibbon('cyj')
  return props.data;
});
const option = computed(() => {
  debugger;
  console.log(props.option);

  return props.option;
});
const page = computed(() => props.page);

/**
 * @description 新增数据保存后触发
 * @param row
 * @param done
 * @param loading
 */
function rowSave(row, done, loading) {
  emit("rowSave", row);
}

/**
 * @description 更新数据数据后触发
 * @param row
 * @param index
 * @param done
 * @param loading
 */
function rowUpdate(row, index, done, loading) {
  emit("rowUpdate", row);
}
/**
 * @description 行数据删除触发
 * @param row
 */
function rowDel(row) {
  emit("rowDel", row);
}
/**
 * @description 点击搜索后触发该事件
 * (由于page分页信息和search搜索信息，可以直接通过this.page和this.search拿到)
 * @param params
 * @param done
 */
function searchChange(params, done) {
  if (done) done();
  emit("searchChange", params);
}
/**
 * @description 清空搜索回调方法
 */
function refreshChange() {
  emit("refreshChange");
}
/**
 * @description 添加卡片类型
 * @param {*} text 文案
 * @param {*} type 类型,支持抽油机（cyj），电泵（db），螺杆泵（lgb）三个类型
 */
function addRibbon(data) {
  let cards = document.querySelectorAll(".avue-crud__grid__content");
  debugger;
  if (cards && cards.length !== 0) {
    cards.forEach((card, i) => {
      console.log(data[i]);
      // TODO：这里根据接口返回的格式改
      // debugger
      const cardType = cardTypeMapper.get("db")!;
      // 如果已经有状态了需要重置状态
      if (card.querySelectorAll(".ribbon").length == 0) {
        let ribbonDiv = document.createElement("div");
        ribbonDiv.setAttribute("class", "ribbon" + cardType.class);
        ribbonDiv.innerHTML = cardType.text;
        card.appendChild(ribbonDiv);
      } else {
        let Dom_Div = card.querySelector(".ribbon")!;
        Dom_Div.setAttribute("class", "ribbon" + cardType.class);
        Dom_Div.innerHTML = cardType.text;
      }
    });
  }
}

watchPostEffect(() => {
  debugger;
  if (data.value) {
    debugger;
    nextTick(() => {
      addRibbon(data);
    });
  }
});
onMounted(() => {
  nextTick(() => {
    // addRibbon("抽油机")
  });
});
</script>

<template>
  <avue-crud
    :data="data"
    :option="option"
    :table-loading="loading"
    @on-load="getList"
    @refresh-change="refreshChange"
    @row-del="rowDel"
    @row-save="rowSave"
    @row-update="rowUpdate"
    @search-change="searchChange"
    @search-reset="searchChange"
    ref="crud"
    v-model:page="page"
    v-model="form"
  >
    <template #menu="{}">
      <slot name="menu"> </slot>
    </template>
  </avue-crud>
</template>

<style lang="less" scoped="scoped">
/deep/ .ribbon {
  color: aliceblue;
  --f: 0.5em;
  /* control the folded part */
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  padding-bottom: var(--f);
  border-image: conic-gradient(#0008 0 0) 51% / var(--f);
  clip-path: polygon(
    100% calc(100% - var(--f)),
    100% 100%,
    calc(100% - var(--f)) calc(100% - var(--f)),
    var(--f) calc(100% - var(--f)),
    0 100%,
    0 calc(100% - var(--f)),
    999px calc(100% - var(--f) - 999px),
    calc(100% - 999px) calc(100% - var(--f) - 999px)
  );
  transform: translate(calc((1 - cos(45deg)) * 100%), -100%) rotate(45deg);
  transform-origin: 0 100%;
  background-color: #987f69;
  /* the main color  */
}
/deep/ .ribbon-cyj {
  color: aliceblue;
  --f: 0.5em;
  /* control the folded part */
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  padding-bottom: var(--f);
  border-image: conic-gradient(#0008 0 0) 51% / var(--f);
  clip-path: polygon(
    100% calc(100% - var(--f)),
    100% 100%,
    calc(100% - var(--f)) calc(100% - var(--f)),
    var(--f) calc(100% - var(--f)),
    0 100%,
    0 calc(100% - var(--f)),
    999px calc(100% - var(--f) - 999px),
    calc(100% - 999px) calc(100% - var(--f) - 999px)
  );
  transform: translate(calc((1 - cos(45deg)) * 100%), -100%) rotate(45deg);
  transform-origin: 0 100%;
  background-color: #bd1550;
  /* the main color  */
}
/deep/ .ribbon-db {
  color: aliceblue;
  --f: 0.5em;
  /* control the folded part */
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  padding-bottom: var(--f);
  border-image: conic-gradient(#0008 0 0) 51% / var(--f);
  clip-path: polygon(
    100% calc(100% - var(--f)),
    100% 100%,
    calc(100% - var(--f)) calc(100% - var(--f)),
    var(--f) calc(100% - var(--f)),
    0 100%,
    0 calc(100% - var(--f)),
    999px calc(100% - var(--f) - 999px),
    calc(100% - 999px) calc(100% - var(--f) - 999px)
  );
  transform: translate(calc((1 - cos(45deg)) * 100%), -100%) rotate(45deg);
  transform-origin: 0 100%;
  background-color: #f07818;
  /* the main color  */
}
/deep/ .ribbon-lgb {
  color: aliceblue;
  --f: 0.5em;
  /* control the folded part */
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  padding-bottom: var(--f);
  border-image: conic-gradient(#0008 0 0) 51% / var(--f);
  clip-path: polygon(
    100% calc(100% - var(--f)),
    100% 100%,
    calc(100% - var(--f)) calc(100% - var(--f)),
    var(--f) calc(100% - var(--f)),
    0 100%,
    0 calc(100% - var(--f)),
    999px calc(100% - var(--f) - 999px),
    calc(100% - 999px) calc(100% - var(--f) - 999px)
  );
  transform: translate(calc((1 - cos(45deg)) * 100%), -100%) rotate(45deg);
  transform-origin: 0 100%;
  background-color: #932ae6;
  /* the main color  */
}
</style>
