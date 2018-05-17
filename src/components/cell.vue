<template>
  <div class="vc-cell" @click="linkTo">
    <div class="vc-cell-wrapper">
      <div class="vc-cell-title">
        <slot name="icon">
          <span v-if="icon" class="vc-cell-icon" :class="icon"></span>
        </slot>
        <slot name="title">
          <span class="vc-cell-text" v-text="title"></span>
        </slot>
      </div>
      <div class="vc-cell-value">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="showLink" class="mint-cell-allow-right"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      icon: String,
      value: {},
      showLink: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      linkTo() {
        this.$emit('link');
      }
    }
  };
</script>

<style lang="less" >
  .vc-cell {
      background-color: #383940;
      box-sizing: content-box;
      color: inherit;
      // height: 96px;
      display: block;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      &-wrapper {
          align-items: center;
          box-sizing: content-box;
          display: flex;
          font-size: 32px;
          padding: 25px 0;
          // height: 96px;
          overflow: hidden;
          text-indent: 35px;
          width: 100%;
      }

      &-title {
          flex: 1;
          // height: 96px;
          // line-height: 96px;
          text-align: left;
          color: #dddddd;
          display: flex;
          font-size: 16px; /*no*/
          .vc-cell-icon {
              margin-left: 20px;
              width: 51px;
              // height: 95px;
              background-size: 51px 51px;
              background-position: center center;
          }
      }
      &-value {
          display: flex;
          align-items: center;
          margin-right: 60px;
          color: #aeaeae;
          font-size: 15px; /*no*/
      }
      .mint-cell-allow-right::after {
          width: 16px;
          height: 16px;
          right: 35px;
      }
  }
</style>

