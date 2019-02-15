<template>
  <div class="currentTask">
    <header-nav></header-nav>
    <div class="currentTaskTitle">
      <div class="titleDiv fl" v-for="(item,index) in titleData">
        <div class="titleDivLeft">
          {{item.name}}
        </div>
        <div class="titleDivRight">
          {{item.text}}
        </div>
      </div>
    </div>
    <div class="currentTaskTable">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'12px'}"
        border
        style="width: 95%;margin: 0 auto">
        <el-table-column
          prop="PIE"
          label="PIE"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="guanruijin"
          label="管端金"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="neimianV"
          label="内面V"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="guige"
          label="规格"
          align="center"
          min-width="25%">
        </el-table-column>
        <el-table-column
          prop="guanduan"
          label="管端"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="qieduanchang"
          label="切断长"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="quanchang"
          label="全长"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="qu"
          label="曲长"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="songxian"
          label="送先"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="shuliang"
          label="数量"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="guanliqufen"
          label="行番"
          align="center"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="teshu"
          label="特仕"
          align="center"
          min-width="10%">
        </el-table-column>

      </el-table>

    </div>
    <div class="currentTaskDiv">
      <el-card class="box-card">
        <div class="">注意事项</div>
        <div class="" v-for="(item,index) in matterData">
          {{item.context}}
        </div>
      </el-card>
    </div>
    <div class="currentTaskButton" v-if="this.wt == 1">
      <el-button type="primary" @click="startWork" :disabled="startWorkBtn == -1">开始</el-button>
      <el-button type="success" @click="endWord" :disabled="endWorkBtn == -1">完成</el-button>
      <el-button type="warning" @click="curvedPipeState">弯管完成状态</el-button>
      <el-button type="danger" @click="showReportAbnormal">上传异常</el-button>
      <el-button type="success" @click="viewDrawings">查看图纸</el-button>
    </div  >

    <div class="currentTaskButton" v-if="this.wt == -1">
      <el-button type="success" @click="wtEndWord">完成</el-button>
      <el-button type="warning" @click="curvedPipeState">弯管完成状态</el-button>
      <el-button type="danger" @click="showReportAbnormal">上传异常</el-button>
      <el-button type="success" @click="viewDrawings">查看图纸</el-button>
    </div>
    <div class="currentTaskRouter">
      <div class="currentTaskRouterList">
        <el-steps align-center :active="step" finish-status="success">
          <el-step v-for="(item,index) in routerList" :keys="index" :title="item.stationname"></el-step>
        </el-steps>
      </div>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>


    <!--上报异常 -->
    <el-dialog title="上报异常" :visible.sync="abnormalVisible" width="90%">
      <div class="container" style="height:350px;overflow:auto">
        <div class="qualityDiv">
          <div class="qualityDivTitle">
            <el-select v-model="indexno" placeholder="请选择异常原因">
              <el-option
                v-for="item in options"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="qualityDivContent">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              placeholder="请出入异常备注"
              v-model="remarks">
            </el-input>
          </div>
          <div class="qualityDivBtn">
            <button @click="submitAbnormal">提交异常原因</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--查看图纸 -->
    <el-dialog title="一品图查看" :visible.sync="drawingVisible" width="95%">
      <div class="container" style="height:400px;overflow:auto">
        <div class="drawingImg" style="width: 100%;height: 100%">
          <img src="../../assets/img/ypt.jpg" alt="" style="display:block;width: 100%">
        </div>
      </div>
    </el-dialog>



    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import url from '../../assets/js/URL'
  import Modal from '../../common/modal'

  export default {
    name: 'drawing',
    data() {
      return {
        message: '',
        HideModal: true,
        step: 3,
        routerList: [],

        img: "",
        id: "",
        startWorkBtn: "1",
        endWorkBtn: "-1",
        titleData: [],
        tableData: [],
        matterData: [],

        abnormalVisible: false,
        drawingVisible: false,


        options: [],
        indexno: '',
        remarks:"",

        zuoyezhe:"",

        wt:"1"

      }

    },
    components: {Loading, footerNav, headerNav, Modal},
    mounted() {


    },
    created() {
      this.getAdminState();

      setTimeout(() => {
        this.getLoading();
      }, 1000);

    },
    methods: {
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
          this.zuoyezhe = info.username;
          if (info.GW === "弯头切断") {
            this.wt = "-1"
          }
          const id = localStorage.getItem("pipeId");
          this.id = id;
          if (id === null) {
            localStorage.setItem("IndexUrl", 0);
            this.$router.push("/")
          }
          else {
            setTimeout(() => {
              axios.post(" " + url + "/shengchan/getCurShengchanguan", {"id": id})
                .then((res) => {
                  this.titleData = res.data.baseItem;
                  this.tableData = res.data.yipintulist;
                  this.matterData = res.data.contextList;
                  this.step = res.data.maxstep;
                  this.routerList = res.data.nodeLit;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
        }
      },
      //加工开始
      startWork() {
        if (this.id) {
          this.endWorkBtn = "1";
          axios.post(" " + url + "/shengchan/startWork", {"id": this.id})
            .then((res) => {
              if (res.data === "success") {
                this.startWorkBtn = "-1";
                this.message = "已经开始加工";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                setTimeout(a, 2000);

              }
            })
            .catch((err) => {
              console.log(err)
            })
        }

      },

      //加工结束
      endWord() {
        this.startWorkBtn = "1";
        axios.post(" " + url + "/shengchan/updateStatus", {"id": this.id, "zuoyezhe": this.zuoyezhe})
          .then((res) => {
            if (res.data === "success") {
              this.endWorkBtn = "-1";
              this.message = "已经完成加工";
              this.HideModal = false;
              const that = this;

              function a() {
                that.message = "";
                that.HideModal = true;
              }

              setTimeout(a, 2000);

            }

          })
          .catch((err) => {
            console.log(err)
          })
      },

      //弯头结束
      wtEndWord() {
        axios.post(" " + url + "/shengchan/updateStatus", {"id": this.id, "zuoyezhe": this.zuoyezhe})
          .then((res) => {
            if (res.data === "success") {
              this.endWorkBtn = "-1";
              this.message = "已经完成加工";
              this.HideModal = false;
              const that = this;

              function a() {
                that.message = "";
                that.HideModal = true;
              }

              setTimeout(a, 2000);

            }

          })
          .catch((err) => {
            console.log(err)
          })
      },

      curvedPipeState() {

      },

      //显示上报异常
      showReportAbnormal() {
        this.abnormalVisible = true;
        axios.post(" " + url + "/sys/dictionaryList", {"id": "1"})
          .then((res) => {
            this.options = res.data;
          })
          .catch((err) => {
            console.log(err)
          })

      },
      //上报异常
      submitAbnormal() {
        if (this.indexno && this.remarks) {
          const userInfo = sessionStorage.getItem("userInfo");
          const id = localStorage.getItem("pipeId");
          const info = JSON.parse(userInfo);
          const userId = info.username;
          axios.post(" " + url + "/shengchanError/errorEvent",
            {
              "userId": userId,
              "errorId": this.indexno,
              "context": this.remarks,
              "id": id
            })
            .then((res) => {
              if (res.data === "1") {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                let that = this;
                setTimeout(function () {
                  that.abnormalVisible = false;
                }, 2000)
              }
              else {
                this.$message({
                  message: '提交失败因',
                  type: 'warning'
                });
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else if (!this.indexno) {
          this.$message({
            message: '请选择异常原因',
            type: 'warning'
          });
        }
        else if (!this.remarks) {
          this.$message({
            message: '请输入异常备注',
            type: 'warning'
          });
        }
      },

      //显示查看当前图纸
      viewDrawings() {
        this.drawingVisible = true;
        axios.post(" " + url + "/sys/dictionaryList", {"id": "1"})
          .then((res) => {
            this.options = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .currentTask {
    width: 100%;
    margin-bottom: 80px;
    .currentTaskTitle {
      height: 100px;
      border-bottom: 1px solid @color-F0;
      .titleDiv {
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1%;
        .titleDivLeft {
          width: 40%;
          height: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large-xx;
          overflow: hidden;
        }

        .titleDivRight {
          width: 40%;
          height: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 2%;
          background-color: @color-F0;
          border-radius: 5%;
          font-size: @font-size-large-xx;
        }
      }
    }
    .currentTaskDiv {
      width: 95%;
      margin: 30px auto;
      background-color: orange;
      .text {
        font-size: 14px;
      }

      .item {
        padding: 18px 0;
      }

      .box-card {
        width: 100%;
        margin: 0 auto;

      }
    }
    .currentTaskButton {
      width: 95%;
      margin: 20px auto;
      display: flex;
      button {
        width: 15%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .currentTaskRouter {
      margin-top: 50px;
      width: 95%;
      .currentTaskRouterTitle {
        font-size: @font-size-large;
        padding-left: 10%;
      }
    }
  }
  .qualityDiv {
    width: 100%;
    height: 100%;
    .qualityDivTitle {
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qualityDivContent {
      width: 80%;
      margin: 0 auto;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

    }
    .qualityDivBtn {
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 150px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: @color-blue;
        color: @color-white;
        font-size: @font-size-medium-x;
        border-radius: 10%;
        border: none;

      }
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and (max-width: 1200px) {
    .currentTask {

      .currentTaskTitle {

        .titleDiv {
          .titleDivLeft {
            font-size: @font-size-medium-x;

          }
          .titleDivRight {
            font-size: @font-size-medium-x;
            width: 50%;
          }
        }
      }
      .currentTaskButton {
        button {
          width: 15%;
          font-size: @font-size-medium;
        }
      }
    }

  }

  @media only screen and (max-width: 720px) {
    .currentTask {

      .currentTaskTitle {

        .titleDiv {

          .titleDivLeft {
            font-size: @font-size-medium;
          }

          .titleDivRight {
            font-size: @font-size-medium;
          }
        }
      }
      .currentTaskButton {
        width: 95%;
        button {
          width: 25%;
          font-size: @font-size-small-s;

        }
      }

    }

  }

  @media only screen and (max-width: 480px) {
    .currentTask {

      .currentTaskTitle {

        .titleDiv {
          width: 30%;
          .titleDivLeft {
            font-size: @font-size-small-s;
          }

          .titleDivRight {
            font-size: @font-size-small-s;;
          }
        }
      }

    }

  }

</style>
