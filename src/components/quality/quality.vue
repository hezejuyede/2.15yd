<template>
  <div class="materiel">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <div class="IconTemplate" v-for="(item , index) in iconData" @click="goToPage(index,item.url)">
        <i :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import timer from '../../common/timer'
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'

  export default {
    name: 'materiel',
    data() {
      return {
        img:"",
        iconData: [
          {"icon": "iconfont icon-juhe", "text": "不具合处理", "url": "/bujuhechuli"},
          {"icon": "iconfont icon-customer", "text": "误做处理（客户）", "url": "/kehuwuzuo"},
          {"icon": "iconfont icon-neibufankui", "text": "误做处理（内部）", "url": "/neibuwuzuo"},
          {"icon": "iconfont icon-chuanboyunying", "text": "船东意见反馈", "url": "/chuandongyijian"},
          {"icon": "iconfont icon-chuanbo", "text": "船级意见反馈", "url": "/chuanjiyijian"},
          {"icon": "iconfont icon-xuexi", "text": "基准学习", "url": "/jizhunxuexi"},
          {"icon": "iconfont icon-xuexi1", "text": "质量提醒", "url": "/tixiangxuexi"},
        ]
      }

    },
    components: {Loading, timer,footerNav,headerNav},
    mounted() {



    },
    created() {
      this.getAdminState();

      setTimeout(() => {
        this.getLoading();
      }, 1000);

    },
    methods: {
      getLoading() {
        this.img = ["1"]
      },
      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        const info = JSON.parse(userInfo);
        if (info === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
      },
      goToPage(index, url){
        this.$router.push(url);
      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .materiel {
    width: 100%;
    height: 100%;
    .ProductionExecutionDiv {
      width: 100%;
      height: 70%;
      margin-top: 2%;
    }
    .IconTemplate {
      float: left;
      width: 30%;
      height: 30%;
      margin-bottom: 2%;
      margin-left: 3%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      .icon-customer {
        display: block;
        background-color: #F56C6C;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-neibufankui {
        display: block;
        background-color: @color-bg-lan;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-xuexi {
        display: block;
        background-color: @color-bg-cs;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-xuexi1 {
        display: block;
        background-color: #409EFF;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-chuku {
        display: block;
        background-color: #67C23A;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-chuanbo {
        display: block;
        background-color: #67C23A;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      .icon-juhe {
        display: block;
        background-color: @color-bg-anLv;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }

      .icon-chuanboyunying {
        display: block;
        background-color: @color-red;
        color: @color-white;
        border-radius: 20%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 500%;
        text-align: center;
      }
      span {
        font-size: @font-size-large;
        margin-top: 5%;
        color: #909399
      }
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }


</style>
