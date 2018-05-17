<template>
  <div class="home">
    <vx-header :showName="1"></vx-header>
    <div class="footer">
      <mt-tabbar v-model="selected">
        <mt-tab-item id="tab1">
          tab1
        </mt-tab-item>
        <mt-tab-item id="tab2">
          tab2
        </mt-tab-item>
        <mt-tab-item id="tab3">
          tab3
        </mt-tab-item>
        <mt-tab-item id="tab4">
          tab4
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
import http from '@/api/http';
import url from '@/api/apiurl';
  export default {
    data() {
      return {
        msg: 'this is test from data',
        test: '',
        selected: 1
      };
    },
    created() {
      http.get(url.test).then(res => {
        this.test = res.data.msg;
      });
    }
  };
</script>

<style lang="less" scoped>
</style>