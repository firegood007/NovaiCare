<template>
  <div class="home">
    <vx-header :showName="1" :showList="showStatus" :showPicture="!showStatus" @list="list" @picture="picture"></vx-header>
    <div class="content">
      <mt-tab-container v-model="selected" :swipeable="true" v-if="showStatus">
        <mt-tab-container-item v-for="(item, index) in tabBar" :key="index" :id="item.id">
          <Screen v-for="(screen, index) in filterScreen(selected)" :key="index" :index="index" v-bind="screen"></Screen>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-tab-container v-model="selected" :swipeable="true" v-if="!showStatus">
        <mt-tab-container-item v-for="(item, index) in tabBar" :key="index" :id="item.id">
          <Picture v-for="(screen, index) in filterScreen(selected)" :key="index" :index="index" v-bind="screen"></Picture>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <div class="footer">
      <mt-tabbar v-model="selected" :fixed="fixed">
        <mt-tab-item v-for="(item, index) in tabBar" :key="index" :id="item.id">
          <span slot="icon" :class="item.name" class="footer-image"></span>
          {{$t('common.' + item.name)}}
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
import http from '@/api/http';
import url from '@/api/apiurl';
import Screen from './screen';
import Picture from './picture';
import {getLoc, setLoc} from '@/utils';
  export default {
    components: {
      Screen,
      Picture
    },
    data() {
      return {
        transitionName: '',
        swipeable: true,
        fixed: true,
        selected: 'all',
        screens:[],
        showStatus: '',
        tabBar: [
          {
            name: 'all',
            id: 'all'
          }, {
            name: 'fault',
            id: 'fault'
          }, {
            name: 'warn',
            id: 'warn'
          }, {
            name: 'offline',
            id: 'offline'
          }
        ]
      };
    },
    created() {
      this.selected = getLoc('moduleName') ? getLoc('moduleName') : 'all';
      this.showStatus = getLoc('showStatus') === '0' ? 0 : 1;
      http.get(url.screen).then(res => {
        this.screens = res.data;
      });
    },
    methods: {
      //点击list， 显示图片
      list() {
        this.showStatus = 0;
        setLoc('showStatus', '0');
      },
      //点击图片， 显示list
      picture() {
        this.showStatus = 1;
        setLoc('showStatus', '1');
      },
      // 过滤 不同状态下的数据。
      filterScreen(name) {
        if (name === 'all') {
          return this.screens;
        }
        return this.screens.filter(item => item.status === name);
      }
    },
    watch: {
      selected(val) {
        setLoc('moduleName', val);
      }
    }
  };
</script>

<style lang="less" scoped>
  .content-container {

  }
  .content {
    height: calc(100% - 100px);
    overflow: auto;
  }
  .content-container {
    height: 100%;
    overflow: auto;
  }
  .mint-tab-item {
    height: 100px;
    line-height: 100px;
  }
  .mint-tab-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .footer-image {
    &.all {
      background: url('../../assets/index/all.png') no-repeat;
      background-size: cover;
    }
    &.fault {
      background: url('../../assets/index/fault.png') no-repeat;
      background-size: cover;
    }
    &.warn {
      background: url('../../assets/index/warn.png') no-repeat;
      background-size: cover;
    }
    &.offline {
      background: url('../../assets/index/offline.png') no-repeat;
      background-size: cover;
    }
  }
</style>