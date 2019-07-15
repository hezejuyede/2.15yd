<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="检索提醒" style="width:120px"></el-input>
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
          <span>查看状态</span>
          <span>:</span>
          <el-select
            style="width: 120px"
            v-model="learn"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择查看状态">
            <el-option
              v-for="item in learnOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="success" class="handle-del mr10" @click="doSearch">查询</el-button>
        <el-button type="primary" class="handle-del mr10" @click="showDetails">详情</el-button>
        <el-button type="danger"  class="handle-del mr10" @click="doLearn">查看</el-button>
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


    <!-- 学习详情 -->
    <el-dialog :visible.sync="sbVisible" width="80%" @close='cancel'>
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="sbVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivContent">
          <div class="containerDivTop2" style="width:100%;height:50px;display: flex;align-items: center;justify-items: center">
            <div style="width: 600px;height: 40px;margin: 0 auto">
              <span>标题</span>
              <span>:</span>
              <el-input v-model="titilename" style="width:500px"   :disabled="true"   placeholder="标题"></el-input>
            </div>
          </div>
          <div class="" v-html="htmlData"></div>
        </div>
        <div class="equipmentDivBtn">
          <el-button type="success" @click="doLearn">查看</el-button>
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
        userId:"",

        cols: [],
        tableData: [],
        listData: [],
        glData:[],
        id: "",
        stationid: "",

        select_word: "",
        sbVisible: false,

        examineTime: "",
        learn: "1",
        learnOptions: [{"name": "未学习", "id": "1"}, {"name": "已学习", "id": "2"}],
        htmlData:'',
        titilename:"",

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
          this.loadingShowData(this.examineTime, this.stationid,this.learn);
        }
      },

      //瞬间加载数据
      loadingShowData(data1, data2, data3) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "xuexibaogaotongji"}),
          axios.post(" " + url + "/anquan/tuisongForPadList", {"times": data1, "stationid": data2, "status": data3})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data.data;
          }));
      },

      //选择那个一个
      selectList(val) {
        this.val = val;
        if (val.length) {
          let data = [];
          let gl = []
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            let b = val[i].relaid;
            data.push(a);
            gl.push(b)
          }
          this.listData = data;
          this.glData = gl;

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
      cancel() {
        this.sbVisible = false;
        this.listData = [];
        if (this.val.length === 1) {
          for (let i = 0, l = this.val.length; i < l; i++) {
            this.$refs.moviesTable.toggleRowSelection(this.val[i]);
          }
        }

      },

      //查看详情
      showDetails() {
        if (this.listData.length) {
          if (this.listData.length > 1) {
            this.message = "只能查看一个";
            this.HideModal = false;
            const that = this;

            function a() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(a, 2000);
          }
          else {
            axios.post(" " + url + "/xuexi/xuexiDetail", {"id": this.listData[0]})
              .then((res) => {
                if (res.data.state === "1") {
                  if (JSON.stringify(res.data.data) !== "{}") {
                    this.sbVisible = true;
                    this.titilename = res.data.data.titilename;
                    this.htmlData = res.data.data.context;
                  }
                  else {
                    this.message = "暂无数据";
                    this.HideModal = false;
                    const that = this;

                    function b() {
                      that.message = "";
                      that.HideModal = true;
                    }

                    setTimeout(b, 2000);
                  }
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
        }
        else {
          this.message = "请勾选要学习的内容";
          this.HideModal = false;
          const that = this;

          function b() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(b, 2000);
        }
      },

      //根据时间查询上报记录
      doSearch() {
        if (this.examineTime) {
          this.loadingShowData(this.examineTime, this.stationid, this.learn);
        }
        else {
          this.$message.warning("请选择查询时间");
        }

      },

      //上报学习
      doLearn() {
        if (this.listData.length) {
          if (this.listData.length > 1) {
            this.message = "只能查看一个";
            this.HideModal = false;
            const that = this;

            function a() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(a, 2000);
          }
          else {
            axios.post(" " + url + "/xuexi/updateStatus", {"id": this.glData[0], "xuexiuser": this.userId})
              .then((res) => {
                if (res.data.state === "1") {
                  this.$message.success("上报学习成功");
                  this.loadingShowData(this.examineTime, this.stationid, this.learn);
                  this.sbVisible = false;
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        else {
          this.$message.warning("请勾选要学习的内容");
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
        top: -10px;
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
        height: 400px;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: auto;
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
