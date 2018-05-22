<template>
  <div class="picture">
    <img :src="image" alt="" class="picture-screen">
    <div class="picture-info">
      <p>
        <i></i>
        {{screenName}}
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
  props: ['status', 'index', 'screenName', 'discription', 'edit', 'percenter', 'enver', 'image']
};
</script>
<style lang="less" scoped>
  .picture {
    width: calc(~"50% - 4px");
    float: left;
    margin:2px;
    p {
      margin: 0 0 5px;
      &.info {
        margin-bottom: 0;
      }
    }
  }
  .picture-screen, .picture-info {
    float: left;
  }
  .picture-info {
    width: 100%;
    color: #fff;
    background: #000;
    padding: 10px 10px
  }
  .picture-screen {
    width: 100%;
    height: 240px;
  }
</style>