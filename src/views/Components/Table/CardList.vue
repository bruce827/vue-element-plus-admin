<script lang="js" setup="setup">
    import {ref, getCurrentInstance,onMounted,nextTick} from 'vue'
    import {CardList} from '@/components/CardList'
    //获取this
    let {proxy} = getCurrentInstance()
    const option = ref(null)
    const data = ref(null)
    const page = ref(null)
    const form = ref({})
    option.value = {
      grid: true,
        gridSpan: 12,
        gridBackgroundColor: 'linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,0,0,0.2))',
        index: true,
        align: 'center',
        headerAlign: 'center',
        border: true,
        stripe: true,
        column: [
            {
                label: '姓名',
                prop: 'name'
            }, {
                label: '性别',
                prop: 'sex',
                gridRow: true
            }, {
                label: '年龄',
                prop: 'age'
            }, {
                label: '省份',
                prop: 'province',
                type: 'select',
                props: {
                    label: 'name',
                    value: 'code'
                },
                // dicUrl: `${baseUrl}/getProvince`
            }
        ],
        viewBtn:true,
        viewBtnText:'2324344'
      }
    data.value = [{
        name: '张三',
        sex: '男',
        age: 18,
        province: '110000'
      }, {
        name: '李四',
        sex: '女',
        age: 18,
        province: '130000'
      }]
    page.value =   {
        total: 1000,
        currentPage: 1,
        pageSize: 10
      },
    function rowSave(row, done, loading) {
        done(row)
    }
    function rowDel(row, index, done) {
        done(row)
    }
    function rowUpdate(row, index, done, loading) {
        done(row)
    }
    /**
     * 
     * @param {*} text 文案
     * @param {*} type 类型
     */
    function addRibbon(text,type) {
      var ribbonDiv = document.createElement("div");
      ribbonDiv.setAttribute("class","ribbon")
      ribbonDiv.innerHTML = text;

      var cards = document.querySelectorAll(".avue-crud__grid__content");
      if(cards && cards.length !== 0){
        cards.forEach((card)=>{
            let ribbonDiv = document.createElement("div");
            ribbonDiv.setAttribute("class","ribbon")
            ribbonDiv.innerHTML = text;
            card.appendChild(ribbonDiv)
        })
      }
    }

    /**
     * 
     */
    function showModal(){
      debugger
    }

    onMounted(()=>{
        nextTick(()=>{
            // addRibbon("抽油机")
        })
    })
</script>

<template>
    <div>
            <CardList
              :data="data"
              :option="option"
              :page="page"
            >
            <template #menu>
              <el-button 
                 type="primary" @click="showModal">自定义操作</el-button>
            </template> 
            </CardList>
    </div>

</template>

<style lang="less" scoped>
/deep/ .ribbon {
    color: aliceblue;
    --f: .5em; /* control the folded part */
  
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  padding-bottom: var(--f);
  border-image: conic-gradient(#0008 0 0) 51%/var(--f);
  clip-path: polygon(
    100% calc(100% - var(--f)),100% 100%,calc(100% - var(--f)) calc(100% - var(--f)),var(--f) calc(100% - var(--f)), 0 100%,0 calc(100% - var(--f)),999px calc(100% - var(--f) - 999px),calc(100% - 999px) calc(100% - var(--f) - 999px));
  transform: translate(calc((1 - cos(45deg))*100%), -100%) rotate(45deg);
  transform-origin: 0% 100%;
  background-color: #BD1550; /* the main color  */
}
</style>