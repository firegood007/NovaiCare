<template>
  <div>
    <div class="modal">
      <div class="modal_header">
        <slot name="header"></slot>
      </div>
      <div class="modal_content">
        <slot name="content"></slot>
      </div>
      <div class="modal_footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="topaz" @click="close"></div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style lang="less" scoped>
  .topaz {
      z-index: 9999;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      position: fixed;
  }
  .modal {
      z-index: 10000;
      background: #fff;
      border-radius: 10px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
  }
</style>
