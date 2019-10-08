<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>故障处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="点检跟踪" class="handle-input mr10" style="width: 200px"></el-input>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <span>时间</span>
          <span>:</span>
          <el-date-picker
            style="width: 250px"
            v-model="examineTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <el-button type="success" class="handle-del mr10" @click="doSearchJl">查询</el-button>
      </div>
      <div class="handle-content">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                  border
                  :height="tableHeight"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <el-table-column
            align="center"
            prop="intime"
            label="时间">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="设备">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bujianname"
            label="明细">
            <template scope="scope">
              <el-button
                type="success"
                style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                @click="showMx(scope.row.id)">
                明细
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--点检明细 -->
    <el-dialog  :visible.sync="mxVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="mxVisible = false">关闭窗口</el-button>
      </div>
      <div class="djDiv">
        <el-table class="tb-edit"
                  :data="mxData"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                  border
                  height="600"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <template v-for="(col ,index) in mxCols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </el-dialog>


    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import url from '../../assets/js/URL'
  import  Modal from '../../common/modal'
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import {getNowTime,getLestWeekTime} from '../../assets/js/api'
  export default {
    name: 'quality',
    data() {
      return {
        img: "",

        mxVisible:false,
        mxData:[],
        mxCols:[],

        examineTime:"",
        select_word:"",
        tableHeight:Number, //根据页面加载显示table的高度
        cols: [],
        tableData: [],

        message: '',
        HideModal: true
      }
    },
    components: {Loading, Modal, footerNav, headerNav},
    computed: {
      //模糊检索
      tables: function () {
        var search = this.select_word;
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
    mounted() {
    },
    created() {
      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      this.getAdminState();

      //转圈延迟一秒执行
      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        const info = JSON.parse(userInfo);
        if (info === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          let nowTime = getNowTime();
          let lestWeekTime= getLestWeekTime();
          let times = [];
          times.push(lestWeekTime);
          times .push(nowTime);
          this.examineTime = times;

          this.setTableHeight();
          this.loadingShowData(this.examineTime)
        }
      },

      //根据屏幕分辨率设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          this.tableHeight = H - 300 + "px";
        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight = h - 300 + "px";
        }
      },

      //瞬间加载数据
      loadingShowData(data) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdsbdjjlcx"}),
          axios.post(" " + url + "/shebei/getDianjianErrorList", {"times":data})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data;
          }));
      },

      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },

      //根据时间查询上报记录
      doSearchJl(){
        if(this.examineTime){
          this.loadingShowData(this.examineTime)
        }
        else {
          this.$message.warning(`必须选择设备和时间`);
        }
      },

      //查看明细
      showMx(id) {
        this.mxVisible = true;
        this.id = id;
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdsbdjjlcx"}),
          axios.post(" " + url + "/shebei/getShebeiRecordDetail", {"id": this.id})
        ])
          .then(axios.spread(function (title, table) {
            that.mxCols = title.data;
            that.mxData = table.data.data;
          }));
      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";
  .equipment {
    width: 100%;
    height: 100%;
    .equipmentTable{
      width: 100%;
      height: 85%;
      .crumbs {
        height: 50px;
        padding-top: 20px;
        padding-left: 20px;
        border-bottom: 1px solid@color-F0;
      }
      .handle-box {
        line-height:100px;
        padding-left: 20px;
        .handle-input {
          width: 300px;
          display: inline-block;
        }
        .el-button {
          width:120px;
          height: 40px;
          font-size: @font-size-large;
        }
      }
    }

    .equipmentDiv {
      width: 100%;
      height:350px;
      .closeBtn{
        width: 100%;
        height: 15%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30%;
          height: 50px;
        }
      }
      .equipmentDivTitle {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 5%;
      }
      .equipmentDivContent {
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        textarea {
          width: 90%;
          height: 90%;
          border: 1px solid @color-bg-hei;
          border-radius: 2%;
          padding: 5%;
        }
      }
      .equipmentDivBtn {
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40%;
          height: 80px;
          margin-right: 10%;
          margin-left: 10%;
          font-size: @font-size-large-xxxxxx;
        }
      }
    }
  }

  .djDiv{
    width: 100%;
    height: 100%;
    .djDivTop{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        width:100px;
        height: 40px;
        font-size: @font-size-medium;
      }
    }
    .closeBottom{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        width:100px;
        height: 40px;
        font-size: @font-size-medium;
      }
    }
  }

  .closeBtn {
    width: 100%;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -8px;
    left: 0;
    z-index: 999;
    .el-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 50px;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
