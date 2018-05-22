////'status', 'index', 'screenName', 'discription', 'edit', 'percenter', 'enver'
export default {
  data: {
    img: '../../static/image/test1.png',
    screen: {
      temperature: '1',
      receiveVol: '1',
      receiveTemperature: '1',
      monitorVol:'1'
    },
    percenter: {
      cpu: {real: 4, all: 100},
      ram: {real: 1.81, all: 3.25},
      cp: {real: 28.7, all: 80.0},
      dp: {real: 17.17, all: 101.91},
      ep: {real: 75.5, all: 142.2},
      fp: {real: 34.1, all: 141.74}
    }
  },
  errorCode: [],
  status: 10000000
};
