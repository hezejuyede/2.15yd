<template>
  <div class="drawing">
    <header-nav></header-nav>
    <div class="drawingTop">
      <div class="drawingTitle">
        一品图查看
      </div>
      <div class="drawingCondition">
        <div class="drawingConditionDiv">
          <el-select
            v-model="batch"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请输入或者选择批次">
            <el-option
              v-for="item in batchOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select
            v-model="jgx"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请输入或者选择加工线">
            <el-option
              v-for="item in jgxOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select
            v-model="gw"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请输入或者选择工位">
            <el-option
              v-for="item in gwOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select
            v-model="ch"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请输入或者选择船号">
            <el-option
              v-for="item in chOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="drawingSearch">
          <div class="drawingSearchInput">
            <div class="">
              <el-input v-model="select_word" placeholder="管子编号"></el-input>
            </div>
          </div>
          <div class="drawingSearchButton">
            <button @click="search">搜索</button>
          </div>
        </div>
      </div>
    </div>
    <div class="drawingBottom">
      <div class="drawingImg">
        <img src="../../assets/img/ypt.jpg" alt="">
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
  import headerNav from '../../common/header'
  import timer from '../../common/timer'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import url from '../../assets/js/URL'

  export default {
    name: 'drawing',
    data() {
      return {
        img: "",

        select_word: "",

        batch: "",
        batchOptions: [],

        jgx: "",
        jgxOptions: [],

        gw: "",
        gwOptions: [],

        ch: "",
        chOptions: [],

        imgUrl: ""
      }

    },
    components: {Loading, timer, footerNav, headerNav},
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
        else {
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/getPiciList"),
            axios.post(" " + url + "/sys/getPiciList"),
            axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
            axios.post(" " + url + "/sys/getPiciList"),
          ]).then(axios.spread(function (batch, jgx, gw, ch) {
            that.batchOptions = batch.data;
            that.jgxOptions = jgx.data;
            that.gwOptions = gw.data;
            that.chOptions = ch.data;
          }))


        }


      },

      search() {
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .drawing {
    width: 100%;
    height: 100%;
    .drawingTop {
      height: 20%;
      .drawingTitle {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-large-x;
      }
      .drawingCondition {
        width: 100%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        .drawingConditionDiv {
          flex: 1;
          margin-top: 2px;
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 1%;
        }
        .drawingSearch {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30%;
          .drawingSearchInput {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
              width: 70%;
            }
          }
          .drawingSearchButton {
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            button {
              width: 95%;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: @color-white;
              background-color: @color-bg-lan;
              border: 0;
              border-radius: 10%;
            }
          }

        }
      }

    }
    .drawingBottom {
      height: 50%;
      border-top: 1px solid @color-F0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .drawingImg {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 100%;
        }
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
