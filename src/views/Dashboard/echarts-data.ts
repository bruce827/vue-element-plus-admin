import { EChartsOption } from 'echarts'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const lineOptions: EChartsOption = {
  title: {
    text: '充电房实况',
    left: 'center'
  },
  xAxis: {
    data: [
      '10-28 18:23',
      '10-29 08:11',
      '10-29 10:29',
      '10-29 12:23',
      '10-29 14:23',
      '10-29 16:44',
      '10-29 18:34',
      '10-29 20:19',
      '10-29 22:09',
      '10-30 00:11',
      '10-30 02:23',
      '10-30 04:23',
      '10-30 06:23'
    ],
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  yAxis: [
    {
      name: '电流(A)',
      axisTick: {
        show: false
      }
    },
    {
      name: '电压(v)',

      axisTick: {
        show: false
      }
    }
  ],
  legend: {
    data: [t('analysis.estimate'), t('analysis.actual')],
    top: 50
  },
  series: [
    {
      name: '电流',
      smooth: true,
      type: 'line',
      data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      yAxisIndex: 1,
      name: '电压',
      smooth: true,
      type: 'line',
      itemStyle: {},
      data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ]
}

export const pieOptions: EChartsOption = {
  title: {
    text: t('analysis.userAccessSource'),
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  color: ['#FB9A0E', '#30A46C'],
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [
      t('analysis.directAccess'),
      t('analysis.mailMarketing'),
      t('analysis.allianceAdvertising'),
      t('analysis.videoAdvertising'),
      t('analysis.searchEngines')
    ]
  },
  series: [
    {
      name: t('analysis.userAccessSource'),
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: t('analysis.directAccess') },
        { value: 310, name: t('analysis.mailMarketing') },
        { value: 234, name: t('analysis.allianceAdvertising') },
        { value: 135, name: t('analysis.videoAdvertising') },
        { value: 1548, name: t('analysis.searchEngines') }
      ]
    }
  ]
}

export const barOptions: EChartsOption = {
  title: {
    text: '机器人运行时间统计',
    subtext: '周期(7天)',
    left: 'center'
  },
  color: ['#FB9A0E', '#30A46C'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    data: [
      t('analysis.monday'),
      t('analysis.tuesday'),
      t('analysis.wednesday'),
      t('analysis.thursday'),
      t('analysis.friday'),
      t('analysis.saturday'),
      t('analysis.sunday')
    ],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value',
    name: 'min'
  },
  series: [
    {
      name: '充电时间',
      data: [13253, 34235, 26321, 12340, 24643, 1322, 1324],
      type: 'bar'
    },
    {
      name: '运行时间',
      data: [253, 235, 321, 2340, 2464, 22, 13],
      type: 'bar'
    }
  ]
}

export const radarOption: EChartsOption = {
  legend: {
    data: [t('workplace.personal'), t('workplace.team')]
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: t('workplace.quote'), max: 65 },
      { name: t('workplace.contribution'), max: 160 },
      { name: t('workplace.hot'), max: 300 },
      { name: t('workplace.yield'), max: 130 },
      { name: t('workplace.follow'), max: 100 }
    ]
  },
  series: [
    {
      name: `xxx${t('workplace.index')}`,
      type: 'radar',
      data: [
        {
          value: [42, 30, 20, 35, 80],
          name: t('workplace.personal')
        },
        {
          value: [50, 140, 290, 100, 90],
          name: t('workplace.team')
        }
      ]
    }
  ]
}

export const wordOptions = {
  series: [
    {
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: 'pentagon',
      width: 600,
      height: 400,
      drawOutOfBound: true,
      textStyle: {
        color: function () {
          return (
            'rgb(' +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') +
            ')'
          )
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [
        {
          name: 'Sam S Club',
          value: 10000,
          textStyle: {
            color: 'black'
          },
          emphasis: {
            textStyle: {
              color: 'red'
            }
          }
        },
        {
          name: 'Macys',
          value: 6181
        },
        {
          name: 'Amy Schumer',
          value: 4386
        },
        {
          name: 'Jurassic World',
          value: 4055
        },
        {
          name: 'Charter Communications',
          value: 2467
        },
        {
          name: 'Chick Fil A',
          value: 2244
        },
        {
          name: 'Planet Fitness',
          value: 1898
        },
        {
          name: 'Pitch Perfect',
          value: 1484
        },
        {
          name: 'Express',
          value: 1112
        },
        {
          name: 'Home',
          value: 965
        },
        {
          name: 'Johnny Depp',
          value: 847
        },
        {
          name: 'Lena Dunham',
          value: 582
        },
        {
          name: 'Lewis Hamilton',
          value: 555
        },
        {
          name: 'KXAN',
          value: 550
        },
        {
          name: 'Mary Ellen Mark',
          value: 462
        },
        {
          name: 'Farrah Abraham',
          value: 366
        },
        {
          name: 'Rita Ora',
          value: 360
        },
        {
          name: 'Serena Williams',
          value: 282
        },
        {
          name: 'NCAA baseball tournament',
          value: 273
        },
        {
          name: 'Point Break',
          value: 265
        }
      ]
    }
  ]
}
