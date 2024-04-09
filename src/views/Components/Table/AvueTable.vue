<script lang="js" setup="setup">
    import {ref, getCurrentInstance} from 'vue'
    //获取this
    let {proxy} = getCurrentInstance()
    const option = ref(null)
    const data = ref(null)
    const form = ref({})
    option.value = {
        addBtn: false,
        addRowBtn: true,
        cellBtn: true,
        menuWidth: 250,
        column: [
            {
                label: '姓名',
                prop: 'name',
                cell: true,
                rules: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }
                ]
            }, {
                label: '性别',
                prop: 'sex',
                type: 'select',
                dicData: [
                    {
                        label: '男',
                        value: 0
                    }, {
                        label: '女',
                        value: 1
                    }
                ],
                cell: true
            }, {
                label: '年龄',
                prop: 'age',
                dicData: [
                    {
                        label: '男',
                        value: 0
                    }, {
                        label: '女',
                        value: 1
                    }
                ],
                rules: [
                    {
                        required: true,
                        message: '请输入年龄',
                        trigger: 'blur'
                    }
                ],
                cell: true
            }, {
                label: '开关',
                prop: 'switch',
                type: 'switch',
                cell: true
            }
        ]
    }
    data.value = [
        {
            id: 0,
            sex: 1,
            age: 18,
            $cellEdit: true
        }, {
            id: 1,
            name: '李四',
            age: 18,
            sex: 0
        }
    ]
    function rowSave(row, done, loading) {
        done(row)
    }
    function rowDel(row, index, done) {
        done(row)
    }
    function rowUpdate(row, index, done, loading) {
        done(row)
    }
</script>

<template>
    <!-- <ContentWrap> -->
    <div>
        <avue-crud :data="data" :option="option" ref="crud" v-model="form"></avue-crud>
    </div>
    <!-- <avue-input v-model="form" placeholder="请输入内容" ></avue-input> -->
    <!-- </ContentWrap> -->

</template>