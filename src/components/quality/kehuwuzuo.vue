<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="检索上报记录" class="handle-input mr10"
                    style="width: 150px"></el-input>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <el-date-picker
            style="width: 240px"
            v-model="examineTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <label style="margin-right: 10px;margin-left: 5px">
          <el-select
            style="width: 120px"
            v-model="line"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeSCX"
            placeholder="请选择生产线">
            <el-option
              v-for="item in lineOptions"
              :key="item.indexno"
              :label="item.name"
              :value="item.indexno">
            </el-option>
          </el-select>
        </label>
        <label style="margin-right: 10px;margin-left: 5px">
          <el-select
            style="width: 120px"
            v-model="workStation"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择工位">
            <el-option
              v-for="item in workStationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="success" class="handle-del mr10" @click="doSearchJl">查询</el-button>
        <el-button type="primary" class="handle-del mr10" @click="showYc">上报</el-button>
      </div>
      <div class="handle-content">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                  border
                  height="500"
                  @select="selectList"
                  @select-all="selectAll"
                  highlight-current-row
                  ref="moviesTable"
                  style="width: 98%;margin: auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>


    <!-- 设备上报 -->
    <el-dialog :visible.sync="sbVisible" width="80%" @close='cancelDelete'>
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="sbVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivTitle" id="sbInput">
          <label style="margin-right: 5px;margin-left: 5px">
            <span style="font-size: 20px;">责任人</span>
            <span>:</span>
            <el-input v-model="wuzuoren" style="width: 160px" placeholder="责任人"></el-input>
          </label>
          <label style="margin-right: 5px;margin-left: 5px">
            <span style="font-size: 20px;">损失材料</span>
            <span>:</span>
            <el-input v-model="sunshicailiao" style="width: 160px" placeholder="损失材料"></el-input>
          </label>
          <label style="margin-right: 5px;margin-left: 5px">
            <span style="font-size: 20px;">损失工时</span>
            <span>:</span>
            <el-input v-model="sunshigongshi" style="width: 160px" placeholder="损失工时"></el-input>
          </label>
        </div>
        <div class="equipmentDivContent">
          <div class="equipmentDivContentLeft">
            <div class="equipmentTitle">
              误做原因
            </div>
            <div class="equipmentInput">
              <textarea placeholder="误做原因" v-model="wuzuoyuanyin"></textarea>
            </div>
          </div>
          <div class="equipmentDivContentRight">
            <div class="equipmentTitle">
              误做原因
            </div>
            <div class="equipmentInput">
              <textarea placeholder="处理对策" v-model="chuliduice"></textarea>
            </div>
          </div>

        </div>
        <div class="equipmentDivBtn">
          <el-button type="success" @click="submitAbnormal">设备故障上报</el-button>
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
  import Modal from '../../common/modal'
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import {getNowTime} from '../../assets/js/api'

  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        message: '',
        HideModal: true,

        cols: [],
        tableData: [],
        listData: [],
        stationid:"",

        select_word: "",
        sbVisible: false,

        examineTime: "",
        workStation: "",
        workStationOptions: [],
        line: '',
        lineOptions: [],

        wuzuoren: "",
        sunshicailiao: "",
        sunshigongshi: "",
        wuzuoyuanyin: "",
        chuliduice: "",


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
      //转圈延迟一秒执行
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

          const userInfo = sessionStorage.getItem("userInfo");
          const info = JSON.parse(userInfo);
          this.userId = info.username;
          this.stationid = info.GH;
          let time = getNowTime();
          let times = [];
          for (let i = 0; i < 2; i++) {
            times.push(time)
          }
          this.examineTime = times;
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
            axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
          ])
            .then(axios.spread(function (line, workStation) {
              that.lineOptions = line.data;
              that.line = line.data[0].indexno;
              that.workStation = workStation.data[0].id;
              that.workStationOptions = workStation.data;
              that.loadingShowData(that.examineTime, that.stationid);
            }));
        }
      },

      //瞬间加载数据
      loadingShowData(data1, data2) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "khfkdwz"}),
          axios.post(" " + url + "/devType/devTypeList", {"times": data1, "stationid": data2})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data;
          }));
      },

      //选择那个一个
      selectList(val) {
        this.val = val;
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;

        }
        else {
          this.listData = [];

        }
      },

      //列表全部选择
      selectAll(val) {
        this.selectList(val)
      },

      //选择改变
      selectionChange(val) {
        this.selectList(val)
      },

      //取消
      cancelDelete() {
        this.sbVisible = false;
        this.listData = [];
        if (this.val.length === 1) {
          for (let i = 0, l = this.val.length; i < l; i++) {
            this.$refs.moviesTable.toggleRowSelection(this.val[i]);
          }
        }

      },

      //更改生产线
      changeSCX() {
        axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
          .then((res) => {
            if (res.data === "-1") {
              this.workStation = "";
              this.workStationOptions = [];
            }
            else {
              this.workStation = res.data[0].id;
              this.workStationOptions = res.data;
            }
          });
      },


      //根据时间查询上报记录
      doSearchJl() {
        if (this.examineTime) {
          this.loadingShowData(this.examineTime, this.stationid, this.equipment);
        }
        else {
          this.$message.warning("请选择查询时间");
        }

      },

      //显示上报异常弹出框
      showYc() {
        if (this.listData.length) {
          if (this.listData.length > 1) {
            this.message = "只能删除一个";
            this.HideModal = false;
            const that = this;

            function a() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(a, 2000);
          }
          else {
            this.sbVisible = true;
            axios.post(" " + url + "/devType/devTypeList", {"times": this.examineTime, "stationid": this.stationid})
              .then((res) => {
                this.wuzuoren = res.data.da;
                this.wuzuoyuanyin = res.data.da;
                this.sunshicailiao = res.data.da;
                this.sunshigongshi = res.data.da;
                this.chuliduice = res.data.da;
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        else {
          this.message = "请勾选要上报内容";
          this.HideModal = false;
          const that = this;

          function b() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(b, 2000);
        }

      },

      //上报设备异常
      submitAbnormal() {
        if (this.wuzuoren && this.wuzuoyuanyin && this.sunshicailiao && this.sunshigongshi  && this.chuliduice) {
          axios.post(" " + url + "/shebei/finderrorAdd", {
            "wuzuoren": this.wuzuoren,
            "shebeiid": this.wuzuoyuanyin,
            "wuzuoyuanyin": this.sunshicailiao,
            "sunshigongshi": this.sunshigongshi,
            "chuliduice": this.chuliduice,
          })
            .then((res) => {
              if (res.data === "1") {
                this.loadingShowData(this.examineTime,this.stationid);
                this.$message.success(`提交成功`);
                this.sbVisible = false;
              }
              else {
                this.$message.warning(`提交失败`);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.$message.warning("请填写完全，不能有空");
        }
      }
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
      height: 500px;
      .closeBtn {
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
      }
      .equipmentDivContent {
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        .equipmentDivContentLeft{
          height: 100%;
          width: 50%;
          .equipmentTitle{
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: @font-size-large;
          }
          .equipmentInput{
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            textarea {
              width: 90%;
              height: 100%;
              border: 1px solid @color-bg-hei;
              border-radius: 2%;
              padding: 5%;
            }
          }

        }
        .equipmentDivContentRight{
          height: 100%;
          width: 50%;
          .equipmentTitle{
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: @font-size-large;
          }
          .equipmentInput{
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            textarea {
              width: 90%;
              height: 100%;
              border: 1px solid @color-bg-hei;
              border-radius: 2%;
              padding: 5%;
            }
          }
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
