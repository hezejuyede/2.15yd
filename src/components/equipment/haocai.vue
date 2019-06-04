<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentTable">
      <div class="handle-box">
        <label style="margin-right: 10px">
          <el-input v-model="select_word" placeholder="智能检索耗材" class="handle-input mr10" style="width: 200px"></el-input>
        </label>
        <label style="margin-right: 10px;margin-left: 5px">
          <span>分类</span>
          <span>:</span>
          <el-select
            v-model="fenlei"
            clearable
            filterable
            allow-create
            default-first-option
            @change="changeFl"
            placeholder="请选择分类">
            <el-option
              v-for="item in fenleiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="showAdd">新增耗材</el-button>
        <el-button type="danger" icon="delete" class="handle-del mr10" @click="showDelete">删除耗材</el-button>
      </div>
      <div class="">
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                  border
                  height="450"
                  @select="selectList"
                  @select-all="selectAll"
                  @selection-change="selectionChange"
                  ref="moviesTable"
                  @row-dblclick="edit"
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
    <el-dialog title="新增耗材" :visible.sync="addVisible" width="40%">
      <el-form ref="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-select
            v-model="fenlei"
            style="width: 120px"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类">
            <el-option
              v-for="item in fenleiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="耗材名字">
          <el-input v-model="hcname" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="库存警戒值">
          <el-input v-model="hcjjz" style="width: 200px" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑耗材" :visible.sync="editVisible" width="40%">
      <el-form ref="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-select
            v-model="fenlei"
            style="width: 120px"
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类">
            <el-option
              v-for="item in fenleiOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="耗材名字">
          <el-input v-model="hcname" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="库存警戒值">
          <el-input v-model="hcjjz" style="width: 200px"  type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="删除耗材" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDelete" style="height:30px;width:80px">取 消</el-button>
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
  import {getNowTime} from '../../assets/js/api'
  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        message: '',
        HideModal: true,

        val:[],


        listData:[],

        id:"",


        cols: [],
        tableData: [],

        select_word: '',

        addVisible: false,
        editVisible: false,
        delVisible: false,

        fenlei:"",
        fenleiOptions:[],
        hcname: "",
        hcjjz:""
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
          let that = this;
          axios.all([
            axios.post(" " + url + "/devType/devTypeList")
          ])
            .then(axios.spread(function (select) {
              that.fenlei=select.data[0].id;
              that.fenleiOptions=select.data;
              that.loadingShowData(that.fenlei);
            }));

        }
      },

      //瞬间加载数据
      loadingShowData(data) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitle", {"name": "dyhcmc"}),
          axios.post(" " + url + "/dev/devList",{"devtypeid":data})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data;
          }));
      },

      //根据工位选择
      changeFl() {
        this.loadingShowData(this.fenlei)
      },

      //选择那个一个
      selectList(val) {
        this.val =val;
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
        this.selectList(val)
      },

      //选择改变
      selectionChange(val) {
        this.selectList(val)
      },

      //显示新增
      showAdd(){
        this.addVisible = true;
        this.hcname = "";
        this.fenlei = "";
        this.hcjjz = "";
      },

      //进行新增
      doAdd() {
        if (this.hcname && this.fenlei && this.hcjjz) {
          axios.post(" " + url + "/dev/devAdd",
            {
              "name": this.hcname,
              "devtypeid": this.fenlei,
              "mincount": this.hcjjz
            }
          )
            .then((res) => {
              if (res.data === "1") {
                this.$message.success(`新增成功`);
                this.addVisible = false;
                this.loadingShowData(this.fenlei)

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

      //双击点击行内编辑
      edit(row, column, cell, event) {
        this.editVisible = true;
        this.id = row.id;
        axios.post(" " + url + "/dev/devDetail", {"id": this.id})
          .then((res) => {
            this.hcname= res.data.name;
            this.fenlei= res.data.devtypeid;
            this.hcjjz= res.data.mincount;
          })
          .catch((err) => {
            console.log(err)
          });
      },

      // 保存编辑
      saveEdit() {
        if (this.hcname && this.fenlei && this.hcjjz){
          axios.post(" " + url + "/dev/devUpdate",
            {
              "id": this.id,
              "name": this.hcname,
              "devtypeid": this.fenlei,
              "mincount": this.hcjjz
            }
          )
            .then((res) => {
              if (res.data === "1") {
                this.editVisible = false;
                this.$message.success("修改成功");
                this.loadingShowData(this.fenlei)
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

      //选择点击显示删除
      showDelete() {
        if (this.listData.length) {
          this.delVisible = true;
        }
        else {
          this.message = "请勾选要删除的分类";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },

      //取消删除
      cancelDelete() {
        this.delVisible = false;
        this.listData = [];
        if (this.val.length === 1) {
          for (let i = 0, l = this.val.length; i < l; i++) {
            this.$refs.moviesTable.toggleRowSelection(this.val[i]);
          }
        }

      },

      // 确定删除
      deleteRow() {
        axios.post(" " + url + "/dev/devDel",
          {
            "ids": this.listData,
          }
        )
          .then((res) => {
            if (res.data === "1") {
              this.$message.success("删除成功");
              this.delVisible = false;
              this.loadingShowData(this.fenlei);
            }
            else {
              this.$message.warning(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err)
          })
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
          width:150px;
          height: 50px;
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



  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
