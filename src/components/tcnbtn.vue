<template>

  <div class="tcnbtn-layout" v-finger:press-move="pressMove" v-finger:tap="startTap" ref="btn">
    <div class="btnBox">
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div v-if="show" class="take" :class="btnShow?'':takeTap" @click="take">
        <span>TAKE</span>
      </div>
      <div v-if="show" class="cut" :class="btnShow?'':cutTap" @click="cut">
        <span>CUT</span>
      </div>
      <div v-if="show" class="switch" :class="btnShow?'':switchTap" @click="swipe">
        <span>SWAPE</span>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        btnShow: true,
        takeTap: "takeTap",
        cutTap: "cutTap",
        switchTap: "switchTap",
        show: true
      };
    },



    props: [],
    methods: {
      pressMove(evt) {
        const $btn = this.$refs['btn'];
        const styles = this.getStyle($btn);
        let winHeight = window.innerHeight - 55;
        let winWidth = window.innerWidth - 75;
        let { top, left } = styles;
        top = parseFloat(top) + evt.deltaY;
        left = parseFloat(left) + evt.deltaX;
        if(left < 15) {
          left = 15;
        }
        if(left > winWidth) {
          left = winWidth;
        }
        if(top < 55) {
          top = 55;
        }
        if(top > winHeight) {
          top = winHeight;
        }
        $btn.style.top = top + 'px';
        $btn.style.left = left + 'px';
        evt.preventDefault();
      },
      startTap(evt) {
        this.btnShow = !this.btnShow;
      },
      getStyle(element) {
        return window.getComputedStyle(element, null);
      },
      take() {
        this.$emit('take');
      },
      cut() {
        this.$emit('cut');
      },
      swipe() {
        this.$emit('swipe');
      }
    }
  };
</script>
<style scoped lang="less">
  .tcnbtn-layout {
      background: #33b882;
      position: fixed;
      z-index: 10;
      border-radius: 50%;
      width: 124px;
      height: 124px;
      bottom: 150px;
      z-index: 1900;
      .btnBox {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          transition: 0.4s;
          > div {
              color: #fff;
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: #33b882;
              font-weight: bold;
              font-size: 25px;
          }
          > div:nth-child(1) {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              z-index: 1;
              > div {
                  background: #fff;
                  border-radius: 50%;
                  width: 16px;
                  height: 16px;
              }
              > div:nth-child(2) {
                  margin: 16px 0;
              }
          }
          .take,
          .cut,
          .switch {
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .takeTap {
              left: 152px;
          }
          .cutTap {
              left: 80px;
              bottom: 140px;
          }
          .switchTap {
              left: 80px;
              top: 140px;
          }
      }
  }
</style>