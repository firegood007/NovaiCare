<template>
  <div class="">
    <vx-header :showback="1" showRrefreshL="1"></vx-header>
    <div class="content">
      <div v-if="showMonitor" class="content-monitor">
        <div class="monitor-img">
          <img :src="cameral.img" alt="test" v-if="cameral.img">
          <span v-if="!cameral.img" class="nocameral"></span>
        </div>
        <div class="monitor-info">
          <div class="monitor-info_title">
            <div class="title" v-for="(item, index) in titles" :key="index">
              <i :class="item.icon"></i>
              <span class="monitor-info_module">{{item.name}}</span>
            </div>
          </div>
          <div class="info">
            <div class="info-data">
              <div v-for="(item, key, index) in cameral.screen" :key="index" class="info-data_item">
                <span class="info-data_name">{{$t('cameral.' + key)}}</span>
                <span class="info-data_data">{{item}}</span>
              </div>
            </div>
            <div class="info-data">
              <div class="percent">
                <div class="percent-name">CPU</div>
                <div class="percent-show">
                  <Percent v-bind="percenter.cpu"></Percent>
                  <div>{{cpu}}</div>
                </div>
              </div>
              <div class="percent">
                <div class="percent-name">RAM</div>
                <div class="percent-show">
                  <Percent v-bind="percenter.ram"></Percent>
                  <div>{{ram}}</div>
                </div>
              </div>
              <div class="percent">
                <div class="percent-name"><i class="disc"></i></div>
                <div class="percent-show">
                  <Percent v-bind="percenter.cp"></Percent>
                  <div>C:{{cp}}</div>
                </div>
              </div>
              <div class="percent">
                <div class="percent-name"><i class="disc"></i></div>
                <div class="percent-show">
                  <Percent v-bind="percenter.dp"></Percent>
                  <div>D:{{dp}}</div>
                </div>
              </div>
              <div class="percent">
                <div class="percent-name"><i class="disc"></i></div>
                <div class="percent-show">
                  <Percent v-bind="percenter.ep"></Percent>
                  <div>E:{{ep}}</div>
                </div>
              </div>
              <div class="percent">
                <div class="percent-name"><i class="disc"></i></div>
                <div class="percent-show">
                  <Percent v-bind="percenter.fp"></Percent>
                  <div>F:{{fp}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!showMonitor" class="content-detect">
        <div class="detect-title">
          <div class="detect-title_item"><i class="need icon"></i><span>{{$t('cameral.need')}}</span></div>
          <div class="detect-title_item">1(坏点率超过0‰)</div>
        </div>
        <div class="detect-title">
          <div class="detect-title_item"><i class="fullscreen icon"></i><span>{{$t('cameral.fullscreen')}}</span></div>
          <div class="detect-title_item">5.3‰(50/9517)</div>
        </div>
        <div class="detect-title">
          <div class="detect-title_item"><i class="detecttime icon"></i><span>{{$t('cameral.detecttime')}}</span></div>
          <div class="detect-title_item">2017-10-14 16:30:22(UTC)</div>
        </div>
        <div>
          <div class="unitNum">
            单元板总数:10
          </div>
          <div class="echart" ref="chart"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <mt-tabbar v-model="selected" :fixed="fixed">
        <mt-tab-item v-for="(item, index) in tabBar" :key="index" :id="item.id">
          <span slot="icon" :class="item.name" class="footer-image"></span>
          {{$t('cameral.' + item.name)}}
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
  import http from '@/api/http';
  import url from '@/api/apiurl';
  import Percent from './percent';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    components: {
      Percent
    },
    data() {
      return {
        selected: 'monitor',
        showMonitor: 'monitor',
        fixed: true,
        cameral: {},
        percenter: {},
        cpu: '',
        ram: '',
        cp: '',
        dp:'',
        ep: '',
        fp: '',
        tabBar: [
          {
            name: 'monitor',
            id: 'monitor'
          }, {
            name: 'detect',
            id: 'detect'
          }
        ],
        titles: [
          {
            icon: 'warn',
            name: this.$t('cameral.screen')
          }, {
            icon: 'normal',
            name: this.$t('cameral.player')
          }
        ]
      };
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        console.log(this.$refs.chart);
        let myChart = echarts.init(this.$refs['chart']);
         //绘制图表
        myChart.setOption({
          title: { text: 'ECharts示例' },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          grid:{
            x:25,
            y:45,
            x2:5,
            y2:20
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    },
    created() {
      http.get(url.cameral).then(res => {
        this.cameral = res.data;
        let percenter = this.percenter = this.cameral.percenter;
        this.cpu = percenter.cpu.real + '%';
        this.ram = percenter.ram.real + 'GB/' + percenter.ram.all + 'GB';
        this.cp = percenter.cp.real + 'GB/' + percenter.cp.all + 'GB';
        this.dp = percenter.dp.real + 'GB/' + percenter.dp.all + 'GB';
        this.ep = percenter.ep.real + 'GB/' + percenter.ep.all + 'GB';
        this.fp = percenter.fp.real + 'GB/' + percenter.fp.all + 'GB';
      });
    },
    mounted() {
      this.drawLine();
    },
    watch: {
      selected(val) {
        let bo = (val === 'monitor');
        this.showMonitor = bo;
      }
    }
  };
</script>
<style lang="less" scoped>
  .footer-image {
    &.monitor {
      background: url('../../assets/cameral/monitor.png') no-repeat;
    }
    &.detect {
      background: url('../../assets/cameral/detect.png') no-repeat;
    }
  }
  .content {
    height: calc(100% - 100px);
    overflow: auto;
  }
  .content-detect, .content-monitor {
    height: 100%;
  }
  .mint-tab-item {
    height: 100px;
    line-height: 100px;
  }
  .monitor-info_title {
    overflow: auto;
  }
  .monitor-img {
    width: 100%;
    height: 40%;
    img {
      width: 100%;
      height: 100%;
    }
    .nocameral {
      display:inline-block;
      width: 100%;
      height: 100%;
      background: url('../../assets/cameral/noCameral.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .detect-title {
    border-bottom: 1px solid rgba(0,0,0,.1);
    overflow: auto;
    &_item {
      float: left;
      width: 50%;
      padding: 10px;
    }
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .need {
    background: url('../../assets/cameral/point1.png') no-repeat;
    background-size: cover;
    background-position: center;
  }
  .fullscreen {
    background: url('../../assets/cameral/point2.png') no-repeat;
    background-size: cover;
    background-position: center;
  }
  .detecttime {
    background: url('../../assets/cameral/point3.png') no-repeat;
    background-size: cover;
    background-position: center;
  }
  .unitNum {
    padding: 10px;
  }
  .echart {
    width: 400px; /*no*/
    height: 500px; /*no*/
  }
  .monitor-info {
    width: 100%;
    .title {
      padding: 15px 0;
      float: left;
      width: 49%;
      text-align: center;
      margin: 0 0.5%;
      border: 1px solid rgba(0,0,0,.1);
      i {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
      .monitor-info_module {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .normal {
      background: url('../../assets/cameral/normal.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
    .warn {
      background: url('../../assets/cameral/warn.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
    .info {
      overflow: auto;
    }
    .info-data {
      width: 50%;
      float: left;
      padding: 20px 10px 0;
      &_item {
        margin-bottom:10px;
        overflow:auto;
      }
      &_name {
        width: 65%;
        display: inline-block;
        color:#1582e0;
        float:left;
      }
      &_data {
        width: 35%;
        display: inline-block;
        text-align: center;
        color: red;
        float:right;
      }
    }
    .percent {
      width: 100%;
      overflow: auto;
      margin-bottom: 10px;
      &-name {
        width: 20%;
        float: left;
        height: 40px;
        line-height: 40px;
      }
      &-show {
        width: 80%;
        float:left;
      }
      .disc {
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url('../../assets/cameral/disc.png') no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>