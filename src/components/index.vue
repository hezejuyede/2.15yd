<template>
  <div class="ProductionExecution">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="searchInput">
          <div class="topDiv">
            <div class="topInput">
              <el-input v-model="inputWord" @input="goToPipePage(inputWord)" placeholder="请扫码或手工输入"></el-input>
            </div>
            <div class="topButton">
              <el-button type="primary" icon="search" @click="workStart">加工开始</el-button>
              <el-button type="success" icon="search" @click="workEnd">加工完成</el-button>
            </div>
          </div>
        </div>
        <div class="listSearch">
          <div class="listSearchInput">
            <el-input v-model="searchWord" placeholder="检索管子"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="primary" icon="search" @click="materialSummary">物料汇总</el-button>
            <el-button type="success" icon="search" @click="taskList">任务清单</el-button>
          </div>
        </div>
      </div>
      <!--公共管-->
      <div class="publicPage" v-if="this.listType ==1">
        <el-table
          :data="tables"
          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          border
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="goToCurrentTask"
          style="width: 95%;margin: 0 auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            prop="shipcode"
            label="船号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="yiguanno"
            label="一贯号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="xitong"
            label="Code号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="hou"
            label="PIENO"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="jiagongxilie"
            label="加工系列"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="levelStr"
            label="优先级"
            align="center"
            min-width="20%">
          </el-table-column>
        </el-table>
      </div>
      <!--小组立-->
      <div class="xzlDiv" v-if="this.listType ==2">
        <div class="xzl-change">
          <div class="change-left" @click="showLeft" :style="{'color':this.left ? 'red':''}">中二小组立表</div>
          <div class="change-right" @click="showRight" :style="{'color':this.right ? 'red':''}">中二片付表</div>
        </div>
        <div class="xzl-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              @row-click="goToCurrentTask"
              @select="selectList"
              @select-all="selectAll"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto;overflow: auto">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                prop="chuanhao"
                label="船番"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="yiguanhao"
                label="一贯号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="daihao"
                label="代号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pno"
                label="pNo"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guige"
                label="规格"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="hujing"
                label="呼径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="houdu"
                label="厚度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="qieduanchang"
                label="切断长"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guanduan"
                label="管端"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="jiaodu"
                label="角度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="lianjiexinxi"
                label="连接"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pinming"
                label="金物"
                align="center"
                width="200">
              </el-table-column>
              <el-table-column
                prop="guanduan"
                label="管端"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              @select="selectList"
              @select-all="selectAll"
              :row-class-name="tableRowClassName"
              @row-click="goToCurrentTask"
              style="width: 95%;margin: 0 auto">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                prop="chuanhao"
                label="船番"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="yiguanhao"
                label="一贯号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="xuhao2"
                label="序号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jinwuzhu"
                label="注番"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jinwu"
                label="金物"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="juaodu"
                label="角度"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!--弯头切断-->
      <div class="" v-if="this.listType ==3">
        <el-table
          :data="tables"
          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          border
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="goToCurrentTask"
          style="width: 95%;margin: 0 auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            prop="koujing"
            label="口径"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="guige"
            label="规格"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="jiaodu"
            label="角度"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="guanliqufen"
            label="管理区分"
            align="center"
            min-width="30%">
          </el-table-column>
          <el-table-column
            prop="shuliang"
            label="数量"
            align="center"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="levelStr"
            label="优先级"
            align="center"
            min-width="10%">
          </el-table-column>
        </el-table>
      </div>
      <!-- 枝管切断-->
      <div class="zgDiv" v-if="this.listType ==4">
        <el-table
          :data="tables"
          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          border
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="goToCurrentTask"
          style="width: 95%;margin: 0 auto;">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="chuanfan"
            label="船番"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jiagongxilie"
            label="加工系列"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fanhao"
            label="一贯号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="daihao"
            label="代号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="pno"
            label="pNo"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="guige"
            label="规格"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="waijing"
            label="外径"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="bihou"
            label="壁厚"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="neijing"
            label="内径"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="changdu"
            label="长度"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="pianxinliang"
            label="偏心量"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="muguanwaijing"
            label="母管外径"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="quanchang"
            label="全长"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="denglizi"
            label="等离子"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="qieduan"
            label="切断"
            align="center"
            width="400">
          </el-table-column>
          <el-table-column
            prop="jiancha"
            label="检查"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="jinwu"
            label="金物"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="zuox"
            label="左X°"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="wjuhao"
            label="ω°"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="atext"
            label="A"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="btext"
            label="B"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ktext"
            label="K"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="beizhu"
            label="备注"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="levelStr"
            label="优先级"
            align="center"
            width="100">
          </el-table-column>
        </el-table>
      </div>


    </div>
    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <div class="loading-container" v-show="!img">
      <loading></loading>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import url from '../assets/js/URL'
  import headerNav from '../common/header'
  import footerNav from '../common/footer'
  import Loading from '../common/loading'
  import Modal from '../common/modal'

  export default {
    name: 'ProductionExecution',
    data() {
      return {
        img: "",


        listData: [],

        listType: "",


        tableData: [],

        inputWord: '',

        searchWord: '',
        is_search: false,

        message: '',
        HideModal: true,


        left: true,
        right: false,

      }

    },
    components: {Loading, footerNav, Modal, headerNav},
    mounted() {
      this.showUp();
      this.showSearch();
      this.bianse();

    },
    computed: {
      //模糊检索
      tables: function () {
        var search = this.searchWord;
        if (search) {
          return this.tableData.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    created() {
      //检索用户状态
      this.getAdminState();

      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      getLoading() {
        this.img = ["1"]
      },

      selectList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
      },
      selectAll(val){
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }

      },

      //颜色
      tableRowClassName({row, rowIndex}) {
        if (row.level === 2) {
          return 'warning-row';
        }
        else if (row.level === 1) {
          return 'success-row';
        }
      },


      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          const info = JSON.parse(userInfo);
          if (info.GW === "小组立") {
            this.listType = "2";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showXiaozuliExcel", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else if (info.GW === "弯头切断") {
            this.listType = "3";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showWtqieduanExcel", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else if (info.GW === "枝管切断") {
            this.listType = "4";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showOtherZgbExcel", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else {
            this.listType = "1";
            setTimeout(() => {
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
        }
      },

      //扫码直接前往任务页面
      goToPipePage(inputWord) {
        var n = Number(inputWord.length);
        if (n = 13) {
          localStorage.setItem("pipeId", "653");
          localStorage.setItem("IndexUrl", 2);
          this.$router.push("/CurrentTask");
        }
      },

      //通过手工输入前往任务页面
      workStart() {
        if (this.inputWord) {
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": info.GW})
            .then((res) => {
              if (res.data === "1") {
                localStorage.setItem("pipeId", 95);
                localStorage.setItem("IndexUrl", 2);
                this.$router.push("/CurrentTask");
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.message = "请输入管子号";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }

      },
      //加工完成
      workEnd() {
        if (this.listData.length) {
          axios.post(" " + url + "/shengchan/updateStatusBatch", {"ids": this.listData})
            .then((res) => {
              if (res.data === "1") {
                this.message = "已经完成";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                  window.location.reload();
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.message = "请勾选完成的管子";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },
      //物料汇总
      materialSummary() {
        if (this.inputWord) {

        }
        else {
          this.message = "请勾选要查看的管子";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },
      //任务清单
      taskList() {
        this.$router.push("/taskList");
        localStorage.setItem("IndexUrl", 1);

      },

      //点击列表前往任务页面
      goToCurrentTask(row, event, column) {
        if (row.id) {
          localStorage.setItem("pipeId", row.id);
          localStorage.setItem("IndexUrl", 2);
          this.$router.push("/CurrentTask");
        }
      },


      //小组立显示左边
      showLeft() {
        this.left = true;
        this.right = false;
        axios.post(" " + url + "/importother/showXiaozuliExcel", {"gongxu": "小组立"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //小组立显示右边
      showRight() {
        this.left = false;
        this.right = true;
        axios.post(" " + url + "/importother/showOtherPfbExcel", {"gongxu": "小组立"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },



      showSearch() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.width = "100%";
            search.style.position = "fixed";
            search.style.top = 0;
            search.style.zIndex = 999;
          } else if (top <= searchHight) {
            search.style.position = "";
          }
        })
      },
      bianse() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.background = "rgba(240,240,240,1)"
          } else {
            let op = (top / searchHight) * 0.85;
            search.style.background = "rgba(240,240,240," + op + ")";
          }
        })

      },




      //显示向上按钮
      showUp() {
        let height = this.$refs.contentTop.offsetHeight;
        let upTop = this.$refs.upTop;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top >= height) {
            upTop.style.display = "block"
          }
          else if (top < height) {
            upTop.style.display = "none"
          }
        });

      },

      //点击向上
      upToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .ProductionExecutionDiv {
    margin-bottom: 80px;
    .contentTop {
      margin-bottom: 10px;
      border-bottom: 1px solid @color-bg-hei;
      .searchInput {
        width: 100%;
        border-bottom: 1px solid @color-bg-hei;
        .topDiv {
          width: 80%;
          margin: 20px auto;
          display: flex;
          .topInput {
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .topButton {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 45%;
              height: 35px;
            }

          }
        }
      }
      .listSearch {
        width: 80%;
        margin: 20px auto;
        display: flex;
        .listSearchInput {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .listSearchBtn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45%;
            height: 35px;
          }
        }

      }
    }
    .publicPage {

    }
    .xzlDiv {
      .xzl-change {
        height: 50px;
        display: flex;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
        }
        .change-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
        }
      }

    }


  }
  .upTop {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 999;
    background-color: @color-background-d;
    cursor: pointer;
    color: @color-white;
    i {
      font-size: @font-size-large-xxx;
    }

  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and (max-width: 800px) {
    .ProductionExecutionDiv {
      .contentTop {
        .topButton {
          margin-left: 2%;
          font-size: @font-size-small-s;
        }
      }
      .listSearch {
        .listSearchBtn {
          margin-left: 2%;
          font-size: @font-size-small-s;
        }

      }
    }
  }

</style>
