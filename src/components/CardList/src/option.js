export default() => {
    return {
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
        ]
        //   column: [{
        //     label: "名称(name)",
        //     prop: "name",
        //     search: true,
        //     rules: [{
        //       required: true,
        //       message: "请输入名称(name)",
        //       trigger: "blur"
        //     }]
        //   }, {
        //     label: "值(value)",
        //     prop: "value",
        //     search: true,
        //     rules: [{
        //       required: true,
        //       message: "请输入值(value)",
        //       trigger: "blur"
        //     }]
        //   }, {
        //     label: "参数(code)",
        //     prop: "code",
        //     search: true,
        //     rules: [{
        //       required: true,
        //       message: "请输入参数(code)",
        //       trigger: "blur"
        //     }]
        //   }, {
        //     label: '备注',
        //     prop: 'note'
        //   }],
    }
}



