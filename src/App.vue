<template>
  <div id="app">
    <!--<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <router-view ></router-view>
  </div>
</template>
<script>
  import "./assets/icon/iconfont.css";
  export default {

    name: 'App'
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "./assets/less/base";


</style>
