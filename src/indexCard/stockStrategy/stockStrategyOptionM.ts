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
      left: 1,
      right: 1,
      bottom: 1,
      background: {
        style: {
          fill: '#ffffff00',
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
  ],
};
