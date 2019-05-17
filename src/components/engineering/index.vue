<template>
  <div class="index">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'

  export default {
    name: 'index',
    data() {
      return {
        img: "",
      }

    },
    components: {Loading, footerNav, headerNav},
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

      goToPage() {

      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .index {
    width: 100%;
    height: 100%;
    .ProductionExecutionDiv {
      width: 100%;
      height: 80%;
      background-color: #d93f30;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }


</style>
