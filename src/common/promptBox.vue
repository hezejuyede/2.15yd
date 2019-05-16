<template>
  <div class="promptBox" v-bind:class="{hidePromptBox:openPromptBox}">
    <div class="promptBoxDiv">
      <div class="promptBoxDivTitle">
        <div class="promptBoxDivTitleLeft fl">
          <div class="leftAvatar"><img src="../assets/img/avatar.png" alt="" class=""></div>
          <div class="leftUsername">{{username}}</div>
        </div>
        <div class="promptBoxDivTitleRight fr">
          {{needKnown}}
        </div>
      </div>
      <div class="promptBoxDivContent">
        <div class="" v-if="contentText.length>0">
          <div class="" v-html="contentText[0].contexthtml"></div>
        </div>
      </div>
      <div class="promptBoxDivBottom">
       <!-- <div class="CountDown">
          <div class="">剩余</div>
          <div class="">{{time}}</div>
          <div class="">秒</div>
        </div>-->
        <div class="readEnd">
          <button disabled @click="readText" id="readEnd"> <i class="iconfont icon-duihao"></i><span>阅读完成</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'promptBox',
    data() {
      return {
        time:0,
        stopTimer: true
      }
    },
    mounted() {

    },
    created() {

    },

    watch: {
      openPromptBox: {
        handler(newValue, oldValue) {
          if (newValue === false) {
            setInterval(this.timer, 1000);
          }
        },
        deep: true
      }

    },
    methods: {
      readText() {
        localStorage.setItem("IndexUrl", 0);
        this.stopTimer = false;
        this.$router.push({path: "/"});
      },
      timer() {
        if (this.stopTimer) {
          let n = this.time;
          if (n > 0) {
            n--;
            this.time = n;
          }
          else if (n === 0) {
            const btn = document.getElementById("readEnd");
            var disabled = btn.getAttribute("disabled");
            if (disabled !== null) {
              btn.removeAttribute("disabled");
            }
          }
        }
      }

    },
    props: ['openPromptBox', 'needKnown', 'contentText','username']
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .promptBox {
    width: 100%;
    height: 100%;
    background-color: @color-background-dd;
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .promptBoxDiv {
      width: 80%;
      height: 80%;
      background-color: @color-white;
      border-radius: 20px;
      .promptBoxDivTitle {
        height: 15%;
        background-color: #2A437B;
        padding-left: 2%;
        padding-right: 5%;
        .promptBoxDivTitleLeft{
          height: 100%;
          color: @color-white;
          display: flex;
          align-items: center;
          justify-content: center;
          .leftAvatar {
            img {
              height: 50px;
              border-radius: 50%;
            }
          }
          .leftUsername {
            font-size: @font-size-large;
            margin-left: 5%;
          }
        }
        .promptBoxDivTitleRight {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large-x;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          color: @color-white;
        }
      }
      .promptBoxDivContent {
        height: 70%;
        overflow-y: auto;
        padding: 5%;
        background-color: #EEF3F9;

      }
      .promptBoxDivBottom {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15%;
        background-color: @color-bg-hui;
        cursor: pointer;
        font-size: @font-size-large-xxx;
        .CountDown {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            margin-right: 2%;
          }
        }
        .readEnd {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            width: 200px;
            height: 50px;
            border: 0;
            background-color: #2A437B;
            color: @color-white;
            font-size: @font-size-medium-x;
            border-radius: 10px;
            cursor: pointer;
            line-height: 50px;
            padding-left: 1%;
            padding-right: 3%;
            .icon-duihao {
              font-size: @font-size-large-xxxx;
              float: left;
            }
            span {
              font-size: @font-size-large-xx;
              float: right;
            }
          }
        }
      }

    }
  }

  .hidePromptBox {
    display: none;
  }

</style>
