<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 5px">
          <el-input v-model="select_word" placeholder="检索出库记录" class="handle-input mr10"
                    style="width: 150px"></el-input>
        </label>
        <label style="margin-right: 10px;margin-left: 5px">
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
        <label style="margin-right: 10px;margin-left: 5px">
          <span>分类</span>
          <span>:</span>
          <el-select
            v-model="fenlei"
            style="width: 120px"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeFenlei"
            placeholder="请选择分类">
            <el-option
              v-for="item in fenleiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <label style="margin-right: 10px;margin-left: 5px">
          <span>耗材</span>
          <span>:</span>
          <el-select
            style="width: 120px"
            v-model="haocai"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeSelect"
            placeholder="请选择耗材">
            <el-option
              v-for="item in haocaiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="success" icon="delete" class="handle-del mr10" @click="doSearchCKJV">查询</el-button>

        <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">出库</el-button>

      </div>
      <div class="">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                  border
                  height="450"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <!--入库弹出框 -->
    <el-dialog title="出库" :visible.sync="addVisible" width="40%">
      <el-form ref="form" label-width="100px">
        <el-form-item label="分类">
          <el-select
            v-model="fenlei"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeFenlei"
            placeholder="请选择分类">
            <el-option
              v-for="item in fenleiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="耗材">
          <el-select
            v-model="haocai"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择耗材">
            <el-option
              v-for="item in haocaiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库数量">
          <el-input v-model="cksl" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
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
  import {getYTime} from '../../assets/js/api'
  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        message: '',
        HideModal: true,
        listData: [],
        id: "",


        cols: [],
        tableData: [],
        ckjvData: [],

        select_word: '',

        addVisible: false,


        haocai: "",
        haocaiOptions: [],
        fenlei: '',
        fenleiOptions: [],

        cksl: "",
        examineTime: ""
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
          let time = getYTime();
          let times = [];
          for (let i = 0; i < 2; i++) {
            times.push(time)
          }
          this.examineTime = times;

          let that = this;
          axios.all([
            axios.post(" " + url + "/devType/devTypeList"),
          ])
            .then(axios.spread(function (fenlei) {
              that.fenleiOptions = fenlei.data;
              that.fenlei = fenlei.data[0].id;
              axios.all([
                axios.post(" " + url + "/dev/devList", {"devtypeid": that.fenlei}),
              ])
                .then(axios.spread(function (haocai) {
                  that.haocaiOptions = haocai.data;
                  that.haocai = haocai.data[0].id;
                  that.loadingShowData(2, that.haocai, that.examineTime);
                }));
            }));
        }
      },

      //瞬间加载数据
      loadingShowData(data1, data2, data3) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "ckjlcx"}),
          axios.post(" " + url + "/devrecord/devRecordList", {"type": data1, "devid": data2, "times": data3})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data.data;
          }));
      },

      //出库记录查询
      doSearchCKJV() {
        this.loadingShowData(2, this.haocai, this.examineTime);
      },

      //更改分类更新耗材
      changeFenlei() {
        axios.post(" " + url + "/dev/devList", {"devtypeid": this.fenlei})
          .then((res) => {
            if (res.data.length > 0) {
              this.haocai = res.data[0].id;
              this.haocaiOptions = res.data;
              this.loadingShowData(2, this.haocai, this.examineTime);
            }
            else {
              this.haocai="";
              this.haocaiOptions=[];
            }
          });
      },

      //根据耗材查询
      changeSelect() {
        this.loadingShowData(2, this.haocai, this.examineTime);
      },

      //显示出库
      showAdd() {
        this.addVisible = true;
        this.haocai = "";
        this.fenlei = "";
        this.cksl = "";
        this.haocaiOptions=[];
      },

      //进行出库
      doAdd() {
        if (this.haocai && this.fenlei && this.cksl) {
          axios.post(" " + url + "/padShow/buttonAdd",
            {

              "inouttype":2,
              "devid": this.haocai,
              "devcount": this.cksl,
            }
          )
            .then((res) => {
              if (res.data.state === "1") {
                this.$message.success(`出库成功`);
                this.addVisible = false;
                this.loadingShowData(2, this.haocai, this.examineTime);
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
          this.$message.warning(`输入不能为空`);
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



  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
