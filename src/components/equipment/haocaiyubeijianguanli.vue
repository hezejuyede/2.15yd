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
          {"icon": "iconfont icon-fenlei", "text": "定义分类", "url": "/fenlei"},
          {"icon": "iconfont icon-suppliesinvoice", "text": "定义耗材", "url": "/haocai"},
          {"icon": "iconfont icon-chuku", "text": "耗材出库", "url": "/haocaichuku"},
          {"icon": "iconfont icon-ruku", "text": "耗材入库", "url": "/haocairuk"},
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

      .icon-jianchafuwu {
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
      .icon-shangbaowenti {
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
      .icon-fenlei {
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
      .icon-suppliesinvoice {
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
      .icon-ruku {
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

      .icon-chuli {
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
