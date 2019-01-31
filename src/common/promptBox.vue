<template>
  <div class="promptBox" v-bind:class="{hidePromptBox:openPromptBox}">
    <div class="promptBoxDiv">
      <div class="promptBoxDivTitle">
        {{needKnown}}
      </div>
      <div class="promptBoxDivContent">
        <div class="" v-for="(item,index) in contentText ">
          <div class="">
            {{item.notice}}
          </div>
        </div>
      </div>
      <div class="promptBoxDivBottom">
        <div class="CountDown">
          <div class="">剩余</div>
          <div class="">{{time}}</div>
          <div class="">秒</div>
        </div>
        <div class="readEnd">
          <button disabled @click="readText" id="readEnd">阅读完成</button>
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
        time: 1,
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
        this.$router.push({path: "/"})
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
    props: ['openPromptBox', 'needKnown', 'contentText']
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
      border-radius: 10px;
      .promptBoxDivTitle {
        height: 15%;
        background-color: @color-bg-lan;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-large-xxx;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        color: @color-white;
      }
      .promptBoxDivContent {
        height: 70%;
        overflow-y: auto;
        padding: 5%;

      }
      .promptBoxDivBottom {
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
            width: 120px;
            height: 30px;
            border: 0;
            background-color: @color-bg-anLv;
            color: @color-white;
            font-size: @font-size-medium-x;
            border-radius: 10%;
            cursor: pointer;
          }
        }
      }

    }
  }

  .hidePromptBox {
    display: none;
  }

</style>
