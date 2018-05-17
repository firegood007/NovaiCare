<template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
    <!-- <vx-takebtn></vx-takebtn> -->
  </div>
</template>

<script>
  export default {
    name: 'vx-view',
    data() {
      return {
        transitionName: '',
        title: ''
      };
    },
    methods: {
      isParent(to, from) {
        return from.path.indexOf(to.path) !== -1;
      }
    },
    watch: {
      $route(to, from) {
        let isParent = this.isParent(to, from);
        this.transitionName = isParent ? 'slide-right' : 'slide-left';
      }
    }
  };
</script>

<style lang="less">
  @import 'mint-ui/lib/style.css'; /*no*/
  @import './less/main.less';
  .slide-left-enter,
  .slide-right-leave-active {
    transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    transform: translate(-100%, 0);
  }
</style>

