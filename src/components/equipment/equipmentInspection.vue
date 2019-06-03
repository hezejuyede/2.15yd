<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 5px">
          <span>检索点检记录</span>
          <span>:</span>
          <el-input v-model="select_word" placeholder="检索点检记录" class="handle-input mr10" style="width: 200px"></el-input>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <span>设备</span>
          <span>:</span>
          <el-select
            style="width: 150px"
            v-model="shebei"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择设备">
            <el-option
              v-for="item in shebeiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
        <el-button type="success" class="handle-del mr10" @click="doSearchJl">查询</el-button>
        <el-button type="primary" class="handle-del mr10" @click="addDJ">新增点检</el-button>
      </div>
      <div class="handle-content">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                  border
                  height="500"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>

    <!--新增点检 -->
    <el-dialog  :visible.sync="jlVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="jlVisible = false">关闭窗口</el-button>
      </div>
      <div class="djDiv">
        <div class="djDivTop" id="tjdjSelect">
          <label>
            <span style="font-size: 30px">设备</span>
            <span>:</span>
            <el-select
              style="width: 250px"
              v-model="shebei"
              clearable
              filterable
              allow-create
              default-first-option
              @change="changeSB"
              placeholder="请选择设备">
              <el-option
                v-for="item in shebeiOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </label>
        </div>
        <div class="djDivCenter">
          <el-table class="tb-edit"
                    :data="djData"
                    :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'12px'}"
                    border
                    height="500"
                    highlight-current-row
                    :cell-style="{fontSize:'11px'}"
                    style="width: 98%;margin: auto">
            <el-table-column
              align="center"
              prop="bujianname"
              label="检查部位"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              prop="no"
              label="No"
              width="40">
            </el-table-column>
            <el-table-column
              align="center"
              prop="xiangmu"
              label="检查项目"
              width="150">
            </el-table-column>
            <el-table-column
              align="center"
              prop="neirong"
              width="200"
              label="检查内容">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fangfa"
              label="检查方法"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="caozuo"
              label="点检操作">
              <template scope="scope">
                <div>
                  <el-radio v-model="scope.row.jieguo" label="1" border>OK</el-radio>
                  <el-radio v-model="scope.row.jieguo" label="2" border>不良</el-radio>
                  <el-radio v-model="scope.row.jieguo" label="3" border>维修中</el-radio>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="closeBottom">
          <el-button type="primary" @click="addDJjL">提交点检</el-button>
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
  import {getNowTime} from '../../assets/js/api'
  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        userId:"",
        radio1:"3",

        jlVisible:false,

        examineTime:"",
        select_word:"",

        cols: [],
        tableData: [],

        djData:[],
        djCols:[],

        shebei:"",
        shebeiOptions:"",
        qbdj:false,

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
          let time = getNowTime();
          let times = [];
          for (let i = 0; i < 2; i++) {
            times.push(time)
          }
          this.examineTime = times;

          let that = this;
          axios.all([
            axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": "","stationid":that.workStation})
          ])
            .then(axios.spread(function (shebei) {
              that.shebei =shebei.data[0].id;
              that.shebeiOptions = shebei.data;
              that.loadingShowData(that.shebei)
            }));



        }
      },

      //瞬间加载数据
      loadingShowData(data) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "zxdsbdjjlcx"}),
          axios.post(" " + url + "/shebei/contentListByShebei", {"shebeid": data})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data.data;
          }));
      },

      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },

      //根据时间查询上报记录
      doSearchJl(){
        axios.post(" " + url + "/shebei/insertRecord", {
          "userId": this.userId,
          "errorId":this.equipment,
          "context":this.remarks,
          "id":id
        })
          .then((res) => {
            if (res.data === "1") {
              this.$message.success(`提交成功`);
            }
            else {
              this.$message.warning(`提交失败`);
            }
          })
          .catch((err) => {
          })
      },

      addDJ() {
        this.jlVisible = true;
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "zxddjbt"}),
          axios.post(" " + url + "/shebei/contentListByShebei", {"shebeid": this.shebei})
        ])
          .then(axios.spread(function (title, table) {
            that.djCols = title.data;
            that.djData = table.data.data;
          }));

      },
      addDJjL(){
        for (let i = 0; i < this.djData.length; i++) {
          if (this.djData[i].jieguo === null) {
            this.qbdj = false;
          }
          else {
            this.qbdj = true;
          }
        }
        if(this.qbdj === true){
          axios.post(" " + url + "/shebei/insertRecord", {
            "shebeid": this.shebei,
            "list":this.djData,
          })
            .then((res) => {
              if (res.data === "1") {
                this.$message.success(`提交成功`);
              }
              else {
                this.$message.warning(`提交失败`);
              }
            })
            .catch((err) => {
            })
        }
        else {
          this.$message.warning(`请全部点检才能提交`);
        }
      },

      changeSB(){
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "zxddjbt"}),
          axios.post(" " + url + "/shebei/contentListByShebei", {"shebeid": this.shebei})
        ])
          .then(axios.spread(function (title, table) {
            that.djCols = title.data;
            that.djData = table.data.data;
          }));

      }
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
      .handle-box {
        line-height:100px;
        padding-left: 20px;
        .handle-input {
          width: 300px;
          display: inline-block;
        }
        .el-button {
          width:80px;
          height: 40px;
          font-size: @font-size-medium;
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
