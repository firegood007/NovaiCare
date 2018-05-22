<template>
  <div class="vx-header">
    <mt-header>
      <!-- NovaiCare -->
      <mt-button slot="left" v-if="showName">NovaiCare</mt-button>
      <!-- 返回 -->
      <mt-button slot="left" v-if="showback" @click="back"><img src="../assets/common/back.png" slot="icon"></mt-button>
      <!-- 显示列表 -->
      <mt-button slot="right" v-if="showList" @click="list"><img src="../assets/index/list.png" slot="icon"></mt-button>
      <!-- 显示图片 -->
      <mt-button slot="right" v-if="showPicture" @click="picture"><img src="../assets/index/picture.png" slot="icon"></mt-button>
      <!-- 刷新按钮 -->
      <mt-button slot="right" v-if="showRrefreshL" @click="refresh"><img src="../assets/common/refresh.png" slot="icon"></mt-button>
      <!-- Home键 -->
      <!-- <mt-button slot="left" v-if="showHome" @click="home"><img src="../assets/common/btn_menu_home.png" slot="icon"></mt-button>
      返回上一路由
      <mt-button slot="left" v-if="showback" @click="back"><img src="../assets/common/back.png" slot="icon"></mt-button>
      取消
      <mt-button slot="left" v-if="showcancel" @click="cancel">{{$t('common.cancel')}}</mt-button>
      确定
      <mt-button class="save" slot="right" v-if="showsave" @click="save">{{$t('common.confirm')}}</mt-button>
      保存
      <mt-button slot="right" v-if="showsubmit" @click="submit"><img src="../assets/common/save.png" slot="icon"></mt-button>
      上一步
      <mt-button slot="left" v-if="showPrevious" @click="previous">{{$t('common.prevStep')}}</mt-button>
      重置左
      <mt-button slot="left" v-if="showResetL" @click="reset"><img src="../assets/common/reset.png" slot="icon"></mt-button>
      重置右
      <mt-button slot="right" v-if="showReset" @click="reset"><img src="../assets/common/reset.png" slot="icon"></mt-button>
      刷新左
      <mt-button slot="left" v-if="showRrefreshL" @click="refresh"><img src="../assets/common/refresh.png" slot="icon"></mt-button>
      刷新右
      <mt-button slot="right" v-if="showRrefresh" @click="refresh"><img src="../assets/common/refresh.png" slot="icon"></mt-button>
      下一步
      <mt-button slot="right" v-if="showNext" @click="next">{{$t('common.nextStep')}}</mt-button>
      上一页
      <mt-button slot="right" v-if="showPrevPage" @click="prevPage">{{$t('common.prevPage')}}</mt-button>
      下一页
      <mt-button slot="right" v-if="showNextPage" @click="nextPage">{{$t('common.nextPage')}}</mt-button>
      应用
      <mt-button slot="right" v-if="showadhibition" @click="adhibition">{{$t('common.adhibition')}}</mt-button> -->
    </mt-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: [
      'showback', // 返回按钮
      'showName', // 显示NovaiCare.
      'showList', // 显示列表
      'showPicture', //显示图片
      'showRrefreshL' //刷新按钮
    ],
    methods: {
      list() {
        this.$emit('list');
      },
      picture() {
        this.$emit('picture');
      },
      back() {
        this.$router.go(-1);
      },
      refresh() {
        window.location.reload();
      }
    }
  };
</script>

<style scoped lang="less">
  .vx-header {
      position: absolute;
      width: 100%;
      z-index: 2;
      left: 0;
      top: 0;

      .mint-header {
          background-color: #2d2d36;
          height: 80px;
          font-size: 16px; /*no*/
      }
      .is-left {
          button:nth-child(2) {
              margin-left: 52px;
          }
      }
      &_title {
          position: absolute;
          top: 0;
          left: 20%;
          width: 60%;
          height: 80px;
          line-height: 80px;
          text-align: center;
          background: #2d2d36;
          font-size: 19px; /*no*/
          color: #fff;
          z-index: 2;
          .arrow {
              height: 14px;
              width: 24px;
              display: inline-block;
              vertical-align: middle;
          }
      }
      img {
          width: 36px;
          height: 36px;
      }
      .mint-button-text {
          font-size: 28px;
      }
  }
</style>