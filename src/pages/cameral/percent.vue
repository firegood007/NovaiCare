<template>
  <div>
    <div class="all">
      <div class="real" :style="width"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['all', 'real'],
    computed: {
      width() {
        return {width: (this.real / this.all * 100).toFixed(2) + '%'};
      }
    }
  };
</script>
<style lang="less" scoped>
  .all {
    width: 100%;
    height: 40px;
    position: relative;
    background: #736f6f;
    border-radius: 5px;
  }
  .real {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    border-radius: 5px;
    background: #2cd823
  }
</style>