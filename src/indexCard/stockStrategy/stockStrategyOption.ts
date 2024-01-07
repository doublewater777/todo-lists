export default {
  data: [
    {
      originData: [],
      gradientMin: false,
    },
  ],
  grid: [
    {
      top: 1,
      left: 22,//图标开始划线的位置，左侧需要加文本，设计稿预留给文本的空间是22px
      right: 1,
      bottom: 1,
      background: {
        style: {
          fill: '#f9f9f9',//图标的背景色
        },
      },
    },
  ],
  axis: [
    {
      position: 'bottom',
      dataKey: 'x',
      line: {
        show: false,
      },
    },
    {
      position: 'left',
      dataKey: 'y1',
      line: {
        show: false,
      },
      tickValues: [0],
      labelLine: {
        show: true,//展示Y轴标签
        style: {
          fontSize: 8,//Y轴字体大小
          color: '#999999',//字体颜色
          lineHeight: 10,//字体行高
        },
        nums: 3,//标签的个数
      },
    },
  ],
  series: [
    {
      type: 'line',
      dataKey: 'y1',
      line: {
        style: {
          normal: {
            stroke: '#FF2436',
            lineWidth: 1,
          },
        },
      },
      area: {
        color: 'linear-gradient(180deg #FF243600 #ff243632)',
      },
      addPoint:true
    },
    {
      type: 'line',
      dataKey: 'y2',
      line: {
        style: {
          normal: {
            stroke: '#FF9500',
            lineWidth: 1,
          },
        },
      },
      area: {
        color: '',
      },
      addPoint:true
    },
  ],
};
