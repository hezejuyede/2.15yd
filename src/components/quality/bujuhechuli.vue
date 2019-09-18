<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="检索不具合" class="handle-input mr10"
                    style="width: 150px"></el-input>
        </label>
        <label style="margin-right: 5px;margin-left: 5px">
          <span>批次</span>
          <span>:</span>
          <el-select
            v-model="pc"
            style="width: 200px;"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="批次">
            <el-option
              v-for="item in pcOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="success"     @click="doSearchJl">查询</el-button>
        <el-button type="primary"     @click="showYc">处理</el-button>
      </div>
      <div class="handle-content">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'11px'}"
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
          <el-table-column
            prop="pici"
            label="批次"
            align="center"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="stationname"
            label="工序名"
            align="center"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="type"
            label="异常类型"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="zhuangtai"
            label="管子状态"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="yichangxinxi"
            label="录入原因"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="chulibumen"
            label="处理部门"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="zerenren"
            label="责任人"
            align="center"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="chuliduiche"
            label="处理对策"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="shunshigongsi"
            label="损失工时"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="cailiaoqingkuang"
            label="损失材料"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="chulijieguo"
            label="处理结果"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="chulishijian"
            label="处理时间"
            align="center"
            min-width="20%">
          </el-table-column>
        </el-table>
      </div>
    </div>


    <!-- 设备上报 -->
    <el-dialog :visible.sync="sbVisible" width="80%" @close='cancelDelete'>
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="sbVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivSelect" id="sbInput">
          <el-select
            v-model="chuLiType"
            style="width: 500px"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="处理状态">
            <el-option
              style="width: 500px"
              v-for="item in chuLiTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="equipmentDivBtn">
          <el-button type="success" @click="submitAbnormal">进行上报</el-button>
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

  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        message: '',
        HideModal: true,

        listData: [],
        id: "",
        tableData: [],

        select_word: "",

        sbVisible: false,

        pc:"",
        pcOptions:[],
        chuLiType: "1",
        chuLiTypeOptions: [{"name": "不具合已处理，继续作业", "id": "1"}, {"name": "仍未解决，再报异常", "id": "2"}],


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
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/getPiciList"),
          ])
            .then(axios.spread(function (PC) {
              that.pc=PC.data[0].id;
              that.pcOptions = PC.data;
              that.loadingShowData(that.pc)
            }));


        }
      },

      //瞬间加载数据
      loadingShowData(data) {
        axios.post(" " + url + "/shengchanError/errorEventList", {
          "id":"",
          "errorId": "",
          "chulizhuangtai": "",
          "pici": data
        })
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
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


      //根据时间查询上报记录
      doSearchJl() {
        if (this.pc) {
          this.loadingShowData(this.pc);
        }
        else {
          this.$message.warning("请选择查询批次");
        }

      },

      //显示上报异常弹出框
      showYc() {
        if (this.listData.length) {
          if (this.listData.length > 1) {
            this.$message.warning("只能选择一个");
          }
          else {
            this.sbVisible = true;
          }
        }
        else {
          this.$message.warning("请勾选");
        }

      },

      //上报设备异常
      submitAbnormal() {
        if (this.chuLiType) {
          axios.post(" " + url + "/fankui/updateFankui", {
            "type": this.chuLiType,
          })
            .then((res) => {
              if (res.data.state === "1") {
                this.loadingShowData(this.examineTime,1);
                this.$message.success(res.data.message);
                this.sbVisible = false;
              }
              else {
                this.$message.warning(res.data.message);
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
      .equipmentDivSelect{
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

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
