<template>
  <div>
    <div class="message-box">
      <div class="title">{{title}}</div>
      <div class="message">
        <input type="text" v-model="message" value="message">
      </div>
      <div class='commit'>
        <div @click='cancel'>{{$t('scenarist.cancel')}}</div>
        <div @click='sure'>{{$t('scenarist.ok')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: this.$t('common1.note'),
        message: ''
      };
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      sure() {
        this.$emit('sure', this.message);
      }
    }
  };
</script>
<style lang="less" scoped>
  .message-box {
      width: 622px;
      height: 300px;
      background: #fff;
      z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      border-radius: 16px;
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
  }
  .title {
      font-size: 34px;
  }
  .message {
      width: 541px;
      height: 59px;
      border-radius: 16px;
  }
  .message > input {
      width: 100%;
      height: 100%;
      display: block;
      outline: none;
      border: 1px solid #ccc; /*no*/
      border-radius: 16px;
  }
  .commit {
      width: 100%;
      height: 94px;
      border-radius: 0 0 16px 16px;
      background-attachment: #eef0f1;
      display: flex;
      justify-content: space-between;
      border: 1px solid #babbbc;
      div {
          display: flex;
          align-items: center;
          justify-content: center;
      }
      div:nth-child(1) {
          flex: 1;
          height: 100%;
          background: #eef0f1;
          border-radius: 0 0 0 16px;
          border-right: 1px solid #babbbc;
      }
      div:nth-child(2) {
          flex: 1;
          height: 100%;
          background: #eef0f1;
          border-radius: 0 0 16px 0;
          border-left: 1px solid #babbbc;
          color: #f56800;
      }
  }
</style>