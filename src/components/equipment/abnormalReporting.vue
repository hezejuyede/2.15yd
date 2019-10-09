<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备故障上报</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="检索上报记录" class="handle-input mr10" style="width:150px"></el-input>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <span>时间</span>
          <span>:</span>
          <el-date-picker
            style="width: 240px"
            v-model="examineTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <span>设备</span>
          <span>:</span>
          <el-select
            style="width: 200px"
            v-model="equipment"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择设备">
            <el-option
              style="width: 200px;font-size: 16px"
              v-for="item in equipmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="success" class="handle-del mr10" @click="doSearchJl">查询记录</el-button>
        <el-button type="primary" class="handle-del mr10" @click="showYc">上报异常</el-button>
      </div>
      <div class="handle-content">
        <el-table class="tb-edit"
                  :data="tables"
                  :row-class-name="tableRowClassName"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                  border
                  :height="tableHeight"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>


    <!-- 设备上报异常弹出框 -->
    <el-dialog  :visible.sync="sbVisible" width="80%">
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="sbVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivTitle" id="sbSelect">
          <el-select
            style="height: 100px;width:100%;font-size: 20px"
            v-model="equipment"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择设备名称">
            <el-option
              style="width:750px;font-size: 20px"
              v-for="item in equipmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="equipmentDivContent" id="equipmentDivContent">
          <textarea placeholder="故障信息填写" v-model="remarks"></textarea>
        </div>
        <div class="equipmentDivBtn">
          <el-button type="success"  @click="submitAbnormal">设备故障上报</el-button>
        </div>
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
        userId:"",
        stationid:"",
        tableHeight:Number, //根据页面加载显示table的高度
        sbVisible:false,

        examineTime:"",
        select_word:"",
        cols: [],

        tableData: [],


        equipment:"1",
        equipmentOptions: [],

        remarks:"",

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

          const userInfo = sessionStorage.getItem("userInfo");
          const info = JSON.parse(userInfo);
          this.userId =info.username;
          this.stationid =info.GH;
          let nowTime = getNowTime();
          let lestWeekTime= getLestWeekTime();
          let times = [];
          times.push(lestWeekTime);
          times .push(nowTime);
          this.examineTime = times;
          this.setTableHeight();
          let that = this;
          axios.all([
            axios.post(" " + url + "/shebei/shebeiList", {"stationid": this.stationid}),
          ])
            .then(axios.spread(function (shebei) {
              that.equipmentOptions = shebei.data;
              that.equipment=shebei.data[0].id;
              that.loadingShowData(that.examineTime,that.stationid,that.equipment);
            }));
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
      loadingShowData(data1,data2,data3) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "sbgzclgz"}),
          axios.post(" " + url + "/shebei/errorList", {"time":data1,"stationid":data2,"shebeiid": data3})
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
      doSearchJl() {
        if (this.examineTime) {
          this.loadingShowData(this.examineTime,this.stationid,this.equipment);
        }
        else {
          this.$message.warning("请选择查询时间");
        }

      },

      //显示上报异常弹出框
      showYc() {
        this.sbVisible = true;
        this.remarks = "";
      },

      //上报设备异常
      submitAbnormal() {
        if (this.equipment && this.remarks) {
          axios.post(" " + url + "/shebei/finderrorAdd", {
            "finduserid": this.userId,
            "stationid":this.stationid,
            "shebeiid":this.equipment,
            "errorinfo":this.remarks,
          })
            .then((res) => {
              if (res.data === "1") {
                this.$message.success(`提交成功`);
                this.sbVisible = false;
                this.loadingShowData(this.examineTime,this.stationid,this.equipment);
              }
              else {
                this.$message.warning(`提交失败`);
              }
            })
            .catch((err) => {
            })
        }
        else if (!this.equipment) {
          this.$message.warning(`异常设备必须选择`);
        }
        else if (!this.remarks) {
          this.$message.warning(`必须输入设备出现什么故障`);
        }
      },

      //根据状态显示不同颜色
      tableRowClassName({row, rowIndex}) {
        if (row.delresult === null) {
          return 'red';
        }
      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .equipment {
    width: 100%;
    height: 100%;
    .equipmentTable {
      width: 100%;
      height: 85%;
      .crumbs {
        height: 50px;
        padding-top: 20px;
        padding-left: 20px;
        border-bottom: 1px solid@color-F0;
      }
      .handle-box {
        line-height: 100px;
        padding-left: 20px;
        .handle-input {
          width: 300px;
          display: inline-block;
        }
        .el-button {
          width: 120px;
          height: 40px;
          font-size: @font-size-large;
        }
      }
    }

    .equipmentDiv {
      width: 100%;
      height:450px;
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
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
