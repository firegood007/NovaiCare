<template>
  <div class="vx-progress">
    <div class="title-box">
      <span class="title">{{title}}</span>
      <div class="plusminus">
        <span class="minus" @click="minus"><img src="../assets/common/minus.png" /></span>
        <span class="plus" @click="plus"><img src="../assets/common/plus.png" /></span>
      </div>
      <span class="number">{{nums}}</span>
    </div>
    <div class="progress-box">
      <mt-range v-model="nums" :min="range.start" :max="range.end" :step="step" :bar-height="2">
      </mt-range>
    </div>
  </div>
</template>

<script>

  export default {
    /**
     * @param title 标题
     * @param num 当前大小
     * @param range 取值范围
     * @text <vx-progress :title="'全部'" :num="5" :range="range"></vx-progress>
     */
    props: ['title', 'num', 'range', 'step', 'index'],
    data: function() {
      return {
        nums: ''
      };
    },
    created() {
      this.nums = this.num;
    },
    methods: {
      minus() {
        if(this.nums > this.range.start) {
          this.nums = this.nums - 1;
        }
      },
      plus() {
        if(this.nums < this.range.end) {
          this.nums = this.nums + 1;
        }
      }
    },
    watch: {
      nums: function(newVal) {
        this.$emit('update', newVal, this.index);
      },
      num: function(newVal) {
        this.nums = newVal;
      }
    }
  };
</script>

<style lang="less" scoped>
  /*progress*/
  .mt-range {
      width: 100%;
      height: 50px;
      line-height: 50px;
      .mt-range-thumb {
          width: 50px;
          height: 50px;
      }
  }

  .vx-progress {
      color: #fff;
      border-bottom: 1px #4f5054 solid; /*no*/
      height: 160px;
      .title-box {
          height: 50px;
          position: relative;
          .title {
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              height: inherit;
          }
          .number {
              display: block;
              position: absolute;
              top: 0;
              right: 250px;
          }
          .title,
          .number {
              color: #fff;
              height: 50px;
              line-height: 50px;
              font-size: 15px; /* no*/
          }
          .plusminus {
              position: absolute;
              top: 0;
              height: inherit;
              width: 190px;
              border: 1px solid #aaaaaa; /* no*/
              display: flex;
              border-radius: 5px;
              width: 190px;
              right: 35px;
              .plus,
              .minus {
                  display: block;
                  flex: 1;
                  img {
                      width: 28px;
                      height: 28px;
                  }
              }
              .plus {
                  border-left: 1px solid #aaaaaa; /* no*/
              }
          }
      }
      .progress-box {
          padding: 10px 35px;
      }
  }
</style>
