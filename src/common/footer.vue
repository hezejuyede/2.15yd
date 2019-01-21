<template>
  <footer id="footer" class="footer">
    <div class="footer-div" v-for="(item,index) in navBar" :class="{'red':index === num}"
         @click="goToNavBar(index,item.url)">
      <i :class="item.icon"></i>
      <span>{{item.text}}</span>
    </div>
  </footer>
</template>
<script type="text/ecmascript-6">export default {
  name: 'ga-footer',
  data() {
    return {
      num: Number,
      navBar: [
        {"icon": "iconfont icon-gongcheng-", "text": "工程", "url": "/"},
        {"icon": "iconfont icon-renwucaiji", "text": "任务", "url": "/CurrentTask"},
        {"icon": "iconfont icon-gongweiguanli", "text": "物料", "url": "/Materiel"},
        {"icon": "iconfont icon-shebeizuhe", "text": "设备", "url": "/Equipment"},
        {"icon": "iconfont icon-anquan", "text": "安全", "url": "/Safe"},
        {"icon": "iconfont icon-zhilianganquan", "text": "质量", "url": "/Quality"},
        {"icon": "iconfont icon-tuzhi", "text": "图纸", "url": "/Drawing"},
      ]
    }
  },
  components: {},
  mounted() {
    this._getIndexUrl()

  },
  created() {

  },
  methods: {
    _getIndexUrl() {
      let Url = localStorage.getItem("IndexUrl");
      if (Url === null) {
        this.num = 0;
      } else {
        this.num = parseInt(Url);
      }

    },
    goToNavBar(index, url) {
      this.num = index;
      localStorage.setItem("IndexUrl", index);
      this.$router.push(url);
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  #footer {
    width: 100%;
    position: fixed;
    z-index: 999;
    left: auto;
    bottom: 0;
    height: 55px;
    display: flex;
    border-top: 5px solid @color-F0;
    background-color: @color-white;
    .footer-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      .icon-shuidian {
        font-size: 20px;
      }
      .icon-shuju {
        font-size: 20px;
      }
      .icon-youjian {
        font-size: 22px;
      }
      .icon-iconfonticonfontwode1 {
        font-size: 20px;
      }
    }
    .red {
      color: @color-blue;
    }
  }

</style>
