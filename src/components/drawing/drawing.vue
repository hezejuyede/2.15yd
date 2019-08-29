<template>
  <div class="drawing">
    <header-nav></header-nav>
    <div class="drawingTop">
      <div class="drawingTitle">
        一品图查看
      </div>
      <div class="drawingSearchYpt">
        <div class="drawingSearchYptYpt">
          <el-input
            style="width: 200px"
            v-model="searchWord"
            ref="siteInput"
            autofocus
            placeholder="扫码或手工输入管子编号"
            @keyup.enter.native="searchYpt(searchWord)"></el-input>
        </div>
        <div class="drawingConditionDiv">
          <el-select
            v-model="batch"
            style="width: 200px;"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="批次">
            <el-option
              v-for="item in batchOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-input v-model="yiguanhao" placeholder="输入一贯号" ></el-input>
        </div>
        <div class="drawingConditionDiv">
          <el-input v-model="code" placeholder="输入Code号" style="width: 200px"></el-input>
        </div>
        <div class="drawingSearchButton">
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="drawingBottom" ref="drawingBottom">
      <viewer :images="imgs">
        <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
      </viewer>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
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
  import Modal from '../../common/modal'

  export default {
    name: 'drawing',
    data() {
      return {
        img: "",
        message: '',
        HideModal: true,

        searchWord: "",

        gzbh: "",
        batch: "",
        batchOptions: [],
        yiguanhao:"",
        code:"",

        imgUrl: "",

        imgs: []
      }

    },
    components: {Loading, timer, footerNav, headerNav, Modal},
    mounted() {
      this.setInputFocus();
      this.setTableHeight();
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
            axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
            axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
          ]).then(axios.spread(function (batch, jgx, gw) {
            that.batchOptions = batch.data;
            that.jgxOptions = jgx.data;
            that.gwOptions = gw.data;
          }))


        }


      },

      //自动聚焦输入框
      setInputFocus() {
        this.$nextTick(() => {
          this.$refs['siteInput'].focus();
        })
      },

      //扫码搜索一品图
      searchYpt(searchWord) {

        if (searchWord) {
          axios.post(" " + url + "/shengchan/getShaomaDataYpy", {"shaomacode": searchWord})
            .then((res) => {
              if (res.data.imgurl) {
                let imgUrl = url + res.data.imgurl;
                this.imgs = [{"url": imgUrl}];
                this.searchWord="";
              }
              else {
                this.message = "没有查到一品图";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                  that.searchWord = "";
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.message = "信息不全无法查询";
          this.HideModal = false;
          const that = this;

          function b() {
            that.message = "";
            that.HideModal = true;
            that.searchWord="";
          }

          setTimeout(b, 2000);
        }
      },

      //条件搜索一品图
      search() {
        if (this.batch && this.code && this.yiguanhao) {
          axios.post(" " + url + "/yipintu/getYipintuImg.html",
            {
              "pici": this.batch,
              "yiguanhao": this.yiguanhao,
              "code": this.code
            })
            .then((res) => {
              if (res.data.imgurl) {
                this.imgUrl = url + res.data.imgurl;
                this.imgs = [{"url": this.imgUrl}];
              }
              else {
                this.message = "没有查到一品图";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.$message.warning("批次，一贯号，code号不能有空");
        }

      },


      //设置Div高度
      setTableHeight() {
        let div = this.$refs.drawingBottom;
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          div.style.height = H - 300 + "px";
        }
        else {
          var h = document.body.clientHeight;
          div.style.height = h - 300 + "px";
        }

      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .drawing {
    width: 100%;
    height: 100%;
    .drawingTop {
      height: 150px;
      border-bottom: 1px solid @color-F0;
      .drawingTitle {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-large-x;
        border-bottom: 1px solid @color-F0;
      }
      .drawingSearchYpt {
        height: 60%;
        width: 99%;
        margin: 0 auto;
        display: flex;
        .drawingSearchYptYpt{
          flex: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .drawingConditionDiv {
          flex: 1;
          margin-top: 2px;
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 1%;
        }
        .drawingSearchButton {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 35px;
          }
        }
      }
    }
    .drawingBottom {
      border-top: 1px solid @color-F0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
      .drawingImg {
        width: 90%;
        height: 90%;
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
