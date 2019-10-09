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
        <label style="margin-right: 5px;margin-left: 2px">
          <span>生产线</span>
          <span>:</span>
          <el-select
            style="width: 110px"
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
        <label style="margin-right: 5px;margin-left:2px">
          <span>工位</span>
          <span>:</span>
          <el-select
            style="width: 110px"
            v-model="workStation"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeSelect"
            placeholder="请选择工位">
            <el-option
              v-for="item in workStationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <label style="margin-right:5px;margin-left:2px">
          <span>设备</span>
          <span>:</span>
          <el-select
            style="width: 110px"
            v-model="shebei"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeSB"
            placeholder="设备">
            <el-option
              v-for="item in shebeiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="primary"  @click="showAdd">处理</el-button>
        <el-button type="danger"   @click="showDelete">删除</el-button>
      </div>
      <div class="">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                  border
                  :height="tableHeight"
                  :row-class-name="tableRowClassName"
                  @select-all="selectAll"
                  @select="selectList"
                  highlight-current-row
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
    <!--新增弹出框 -->
    <el-dialog title="处理故障" :visible.sync="addVisible" width="50%">
      <el-form ref="form"  label-width="100px" style="height: 300px">
        <el-form-item label="处理结果" style="margin-bottom: 20px">
          <el-select
            v-model="cljg"
            clearable
            filterable
            allow-create
            default-first-option
            style="width:80%"
            placeholder="请输入或者选择">
            <el-option
              v-for="item in cljgOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理简况" id="clTextarea">
          <el-input v-model="beizhu"
                    type="textarea"
                    placeholder="处理简况"
                    maxlength="80"
                    rows="5"
                    show-word-limit
                    style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>


    <!-- 删除提示框 -->
    <el-dialog title="删除异常上报记录" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
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
        message: '',
        HideModal: true,
        listData:[],
        userId:"",
        id:"",
        tableHeight:Number, //根据页面加载显示table的高度

        cols: [],
        tableData: [],

        select_word: '',

        addVisible: false,

        delVisible: false,


        examineTime:"",
        workStation:"",
        workStationOptions:[],
        line: '',
        lineOptions: [],

        shebei:"",
        shebeiOptions:[],


        cljg:"故障已处理",
        cljgOptions: [
          {"name": "故障已处理", "id": "1"},
        ],
        beizhu:"",
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
          this.userId =info.username;
          this.stationid =info.GH;

          let nowTime = getNowTime();
          let lestWeekTime= getLestWeekTime();
          let times = [];
          times.push(lestWeekTime);
          times .push(nowTime);
          this.examineTime = times;

          let that = this;
          this.setTableHeight();
          axios.all([
            axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
            axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
          ])
            .then(axios.spread(function (line,workStation) {
              that.lineOptions = line.data;
              that.line = line.data[0].indexno;
              that.workStation = workStation.data[0].id;
              that.workStationOptions = workStation.data;
              axios.all([
                axios.post(" " + url + "/shebei/shebeiList", {"stationid":that.stationid})
              ])
                .then(axios.spread(function (shebei) {
                  that.shebeiOptions = shebei.data;
                  that.shebei=shebei.data[0].id;
                  that.loadingShowData(that.examineTime,that.stationid,that.shebei);
                }));
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

      //更改生产线
      changeSCX(){
        axios.post(" " + url + "/sysconfig/getGongxuList", {"id": this.line})
          .then((res) => {
            if(res.data.length>0){
              this.workStation = res.data[0].id;
              this.workStationOptions = res.data;
            }
            else {
              this.workStation="";
              this.workStationOptions=[];
              this.shebei="";
              this.shebeiOptions=[];
            }
          });
      },

      //更改工位选择
      changeSelect() {
        this.shebei="";
        axios.post(" " + url + "/shebei/shebeiList", {"jiagongxian": this.line,"stationid":this.workStation})
          .then((res)=>{
            if(res.data.length>0){
              this.shebeiOptions = res.data;
              this.loadingShowData(this.examineTime,this.workStation,this.shebei);
            }
            else {
              this.shebei="";
              this.shebeiOptions=[];
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      },

      //更改设备
      changeSB(){
        this.loadingShowData(this.examineTime,this.workStation,this.shebei);
      },


      //选择那个一个
      selectList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
        else {
          this.listData=[];
        }
      },

      //列表全部选择
      selectAll(val) {
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

      //显示新增
      showAdd(){
        if (this.listData.length) {
          if(this.listData.length>1){
            this.message = "只能选择一个";
            this.HideModal = false;
            const that = this;

            function b() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(b, 2000);
          }
          else {
            this.addVisible = true;
            this.beizhu="";
          }

        }
        else {
          this.message = "请勾选要处理的异常";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },

      //进行新增
      doAdd() {
        if (this.cljg) {
          axios.post(" " + url + "/shebei/errorUpdate",
            {
              "id":this.listData[0],
              "dealuserid":this.userId,
              "delresult": this.cljg,
              "beizhu": this.beizhu,
            }
          )
            .then((res) => {
              if (res.data === "1") {
                this.$message.success(`处理成功`);
                this.addVisible = false;
                this.loadingShowData(this.examineTime,this.workStation,this.shebei);

              }
              else {
                this.$message.warning(`处理失败`);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.$message.warning(`输入不能为空`);
        }
      },


      //选择点击显示删除
      showDelete() {
        if (this.listData.length) {
          this.delVisible = true;
        }
        else {
          this.message = "请勾选要删除的上报故障";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },

      // 确定删除
      deleteRow() {
        axios.post(" " + url + "/shebei/errorDel",
          {
            "ids": this.listData,
          }
        )
          .then((res) => {
            if (res.data === "1") {
              this.$message.success('删除成功');
              this.delVisible = false;
              this.loadingShowData(this.examineTime,this.workStation,this.shebei);
            }
            else {
              this.$message.warning(`删除失败`);
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //根据状态显示不同颜色
      tableRowClassName({row, rowIndex}) {
        console.log(row.delresult);
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
        padding-left: 10px;
        .handle-input {
          width: 300px;
          display: inline-block;
        }
        .el-button {
          width:110px;
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



  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
