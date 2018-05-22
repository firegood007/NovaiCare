<template>
  <div class="screen" @click="openCameral">
    <div class="screen-img" :class="status"></div>
    <div class="screen-content">
      <h3>{{index}}.{{screenName}}</h3>
      <p>
        <i></i>
        {{discription}}
      </p>
      <p>
        <i></i>
        {{edit}}
      </p>
      <p class="info">
        <i></i>
        显示屏({{percenter}}) 环境({{enver}})
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['status', 'index', 'screenName', 'discription', 'edit', 'percenter', 'enver', 'id'],
    data() {
      return {};
    },
    methods: {
      openCameral() {
        console.log(this.id);
        this.$router.push({name: 'cameral', params: {id: this.id}});
      }
    }
  };
</script>
<style lang="less" scoped>
  .screen {
    width: 100%;
    height: 200px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    p, h3{
      margin: 0;
    }
    p {
      color: #999;
      font-size: 25px;
      margin-bottom: 5px;
      &.info {
        margin-top: 10px;
      }
    }
    h3 {
      color: #09c;
      margin-bottom: 30px;
      font-size: 30px;
    }
    padding: 15px 0;
  }
  .screen-img {
    width: 200px;
    height: 100%;
    float:left;
    &.nomal {
      background: url('../../assets/index/normal.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.fault {
      background: url('../../assets/index/fault.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.warn {
      background: url('../../assets/index/warn.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.offline {
      background: url('../../assets/index/offline.png') no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .screen-content {
    float: left;
    width: calc(~"100% - 200px");
  }
</style>