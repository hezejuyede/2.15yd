<template>
  <div class="headerCommon clearfix">
    <div class="header-left fl">
      <div class="collapse-btn" @click="handleFullScreen">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">管加工车间中二线生产管理系统</div>
    </div>
    <div class="header-right fl">
      <div class="headerOut fr" @click="LeavePost">
        <i class="iconfont icon-ligang"></i>
        <span>离岗</span>
      </div>
      <div class="headerChange fr" @click="showChangePost">
        <i class="iconfont icon-qiehuanjiaose"></i>
        <span>换岗</span>
      </div>
      <div class="headerMessage fr">
        <i class="iconfont icon-xiaoxi"></i>
        <span>消息</span>
        <div class="messageNumber" @click="showMessage" v-if="this.messageNumber>=1">
          {{messageNumber}}
        </div>
      </div>
      <div class="headerUserInfo fr">
        <div class="">
          <span class="">{{GW}}</span>
          <span class="">:</span>
          <span class="">{{userName}}</span>
        </div>
        <div class="">
          <span>工时</span>
          <span>:</span>
          <span>{{cumulativeLoginTime}}</span>
        </div>
      </div>
      <div class="headerAvatar fr">
        <img src="../assets/img/avatar.png" alt="" @click="startWifi">
      </div>
    </div>

    <!--换岗 -->
    <el-dialog title="更换岗位" :visible.sync="changeVisible" width="40%">
      <div class="container">
        <div class="containerDiv">
          <div class="containerDivTop">
            <div class="select" id="gwSelect">
              <el-select
                style="height: 90px;width: 350px"
                v-model="workstation"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="工位">
                <el-option
                  v-for="item in workstationOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="containerBtn">
            <el-button type="success" @click="doChangePost">确认换岗</el-button>
          </div>
        </div>

      </div>
    </el-dialog>


    <!--消息选择框 -->
    <el-dialog title="消息提醒框" :visible.sync="messageVisible" width="50%">
      <div class="messageDiv">
        <div class="wdDiv" v-if="this.aqwdMessage>0">
          <div class="">{{aqwdMessage}}</div>
          <div class="">条未读安全提醒</div>
          <div class="">
            <el-button type="success" @click="goToAQ">前往查看</el-button>
          </div>
        </div>
        <div class="wdDiv" v-if="this.zlwdMessage>0">
          <div class="">{{zlwdMessage}}</div>
          <div class="">条未读质量提醒</div>
          <div class="">
            <el-button type="success" @click="goToZl">前往查看</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="紧急质量通知" :visible.sync="zlMessageVisible" :fullscreen="true" :center="true" :show-close="false">
      <div class="zlMessageDiv">
        <div style="height:70px;display:flex;align-items: center;justify-content: center;font-size: 24px">
          {{titilename}}
        </div>
        <div style="height: 530px;overflow: auto">
          <quill-editor ref="myTextEditor" v-model="htmlData" :options="editorOption" height="530" :disabled="true"></quill-editor>
        </div>
        <div style="height:50px;display:flex;align-items: center;justify-content: center">
          <el-button type="success" style="width: 200px;height: 40px;font-size: 30px" @click="readZL">进行学习</el-button>
        </div>
      </div>

    </el-dialog>


    <el-dialog title="紧急安全通知" :visible.sync="aqMessageVisible" :fullscreen="true" :center="true" :show-close="false">
      <div class="aqMessageDiv">
        <div style="height:70px;display:flex;align-items: center;justify-content: center;font-size: 24px">
          {{titilename}}
        </div>
        <div style="height: 530px;overflow: auto">
          <quill-editor ref="myTextEditor" v-model="htmlData" :options="editorOption" height="530" :disabled="true"></quill-editor>
        </div>
        <div style="height:50px;display: flex;align-items: center;justify-content: center">
          <el-button type="success" style="width: 200px;height: 40px;font-size: 30px" @click="readAQ">进行学习</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import url from '../assets/js/URL'

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  import timer from './timer'

  export default {
    name: 'headerCommon',
    data() {
      return {
        startTime: false,
        userName: "",
        GH: "",
        GW: "",
        a: "",
        LastLoginTime: "",
        cumulativeLoginTime: "",
        tableData: [],
        changeVisible: false,
        messageVisible: false,
        zlMessageVisible: false,
        aqMessageVisible: false,

        workstation: "",
        workstationOptions: [],
        messageNumber:1,
        aqwdMessage: 1,
        aqState:false,
        zlwdMessage: 1,

        titilename: "",
        htmlData: "",
        editorOption: {
          placeholder: '',
          modules: {
            toolbar: '',
          },
        },
        relationid:"",

      }
    },
    components: {timer,quillEditor},
    mounted() {
      //切断工位每隔5分钟刷新一下数据
      setInterval(() => {
        this.getZLMessage();
        this.getQAMessage();
        this.getAQPMessage();
      }, 1000*60*10);

    },
    created() {
      this.getAdminState();

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
          this.startTime = true;
          this.userName = info.username;
          this.GH = info.GH;
          this.GW = info.GW;
          this.LastLoginTime = info.LastLoginTime;
        }
      },

      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },

      //离开岗位
      LeavePost() {
        this.$confirm('是否确认离开岗位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            axios.post("  " + url + "/api/LeavePost", {"username": this.userName,"stationid":this.GH})
              .then((res) => {
                if (res.data === "1") {
                  this.$message({
                    type: 'success',
                    message: '离岗成功!'
                  });
                  setTimeout(() => {
                    localStorage.setItem("IndexUrl", 0);
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.removeItem("screeningConditions");
                    window.location.reload();
                    this.$router.push("/ProductionExecutionLogin");
                  }, 3000);
                }
                else {
                  this.$message({
                    type: 'warning',
                    message: '离岗失败!'
                  });
                }
              })
              .catch(() => {
                console.log(err)
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消离岗'
            });
          });
      },

      //显示换岗位弹框
      showChangePost() {
        axios.post(" " + url + "/api/getPersonProcessList", {"name": this.username})
          .then((res) => {
            this.workstationOptions = res.data;
            this.workstation = res.data[0].id;
            this.changeVisible = true;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //进行换岗
      doChangePost() {
        if (this.workstation) {
          axios.post("  " + url + "/api/changePost", {"username": this.userName, "stationid": this.workstation})
            .then((res) => {
              if (res.data.state === "1") {
                sessionStorage.removeItem("screeningConditions");
                let userInfo = res.data;
                userInfo = JSON.stringify(userInfo);
                sessionStorage.setItem("userInfo", userInfo);
                this.$message({
                  type: 'success',
                  message: '换岗成功!'
                });
                setTimeout(() => {
                  this.changeVisible = false;
                  window.location.reload()
                }, 3000);
              }
              else {
                this.$message({
                  type: 'warning',
                  message: '换岗失败!'
                });
              }
            })
            .catch(() => {
              console.log(err)
            });
        }
        else {
          this.$message.warning(`工位不能为空`);
        }
      },

      //显示消息弹出框
      showMessage() {
        this.messageVisible = true;
      },

      //查看安全提醒
      goToAQ() {
        localStorage.setItem("IndexUrl", 2);
        this.$router.push("/aqtixiangxuexi")
      },

      //查看质量
      goToZl() {
        localStorage.setItem("IndexUrl", 3);
        this.$router.push("/tixiangxuexi")
      },

      //定时请求质量消息
      getZLMessage() {

      },

      //定时请求紧急安全消息
      getQAMessage() {
        if (this.aqState === false) {
          axios.post("  " + url + "/anquan/getTuisongJinji", {"stationid": this.GH})
            .then((res) => {
              if (res.data.state === "1") {
                if (JSON.stringify(res.data.data) !== "{}") {
                  this.aqState = true;
                  this.aqMessageVisible = true;
                  this.titilename = res.data.data.title;
                  this.htmlData = res.data.data.neirong;
                  this.relationid = res.data.data.relationid
                }
                else {

                }
              }
              else {
              }
            })
            .catch(() => {
              console.log(err)
            });
        }
        else {

        }
      },


      //定时请求普通消息
      getAQPMessage(){

      },


      //阅读质量
      readZL() {
        axios.post(" " + url + "/anquan/updateLevel", {"name": this.username})
          .then((res) => {
            this.workstationOptions = res.data;
            this.workstation = res.data[0].id;
            this.changeVisible = true;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //阅读安全
      readAQ() {
        axios.post(" " + url + "/anquan/updateLevel", {"id": this.relationid})
          .then((res) => {
            if (res.data.state === "1") {
              this.$message.success("阅读成功");
              this.aqState = false;
              this.aqMessageVisible = false;
            }
            else {
              this.$message.warning(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //点击头像启动wifi
      startWifi() {
        window.open('file:///C:/Windows/System32/notepad.exe');
      }
    },

  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .headerCommon {
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(56, 65, 87, 1);
    .header-left {
      width: 40%;
      height: 70px;
      padding-left: 5%;
      display: flex;
      align-items: center;
      font-size: @font-size-large-xx;
      color: @color-white;
    }

    .header-right {
      width: 60%;
      height: 70px;
      color: @color-white;
      .headerAvatar {
        width: 10%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          height: 50px;
          border-radius: 50%;
        }
      }
      .headerUserInfo {
        width: 15%;
        height: 70px;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding-left: 1%;

      }
      .headerMessage {
        height: 70px;
        width: 15%;
        display: flex;
        align-items: center;
        justify-items: start;
        position: relative;
        font-size: @font-size-large;
        .icon-xiaoxi {
          font-size: @font-size-large-xx;
          margin-right: 5px;
        }
        .messageNumber {
          width: 30px;
          height:30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #d93f30;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: -17px;
          font-size: @font-size-large;
          -webkit-animation: bounce-down 1.5s linear infinite;
          animation: bounce-down 1.5s linear infinite;
        }
        @-webkit-keyframes bounce-down {
          25% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateX(2px);
          }
          75% {
            transform: translateY(2px);
          }
          100% {
            transform: translateX(-2px);
          }
        }
        @keyframes bounce-down {

          25% {
            transform: translateY(-2px);
          }

          50% {
            transform: translateX(2px);
          }

          75% {
            transform: translateY(2px);
          }

          100% {
            transform: translateX(-2px);
          }
        }
      }
      .headerOut {
        width: 10%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: start;
        cursor: pointer;
        font-size: @font-size-large;
        .icon-ligang {
          font-size: @font-size-large;
          margin-right: 5px;
        }
      }
      .headerChange {
        width: 15%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: start;
        cursor: pointer;
        font-size: @font-size-large;
        .icon-qiehuanjiaose {
          font-size: @font-size-large;
          margin-right: 5px;
        }
      }
    }

    .container {
      height: 300px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .containerDiv {
        width: 250px;
        height: 250px;
        .containerDivTop {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .containerBtn {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 100px;
          font-size: @font-size-large-xxxxxx;
        }
      }

    }

    .messageDiv {
      height: 300px;
      width: 100%;
      .wdDiv {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-large-xx;
        div {
          margin-right: 10px;
        }
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 40px;
        }
      }
    }

    .zlMessageDiv {
      height: 650px;

    }

    .aqMessageDiv {
      height: 650px;

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
  }

  @-webkit-keyframes messageNumber {
    25% {
      -webkit-transform: translateY(-10px);
    }
    50%, 100% {
      -webkit-transform: translateY(0);
    }
    75% {
      -webkit-transform: translateY(10px);
    }
  }

  @keyframes messageNumber {
    25% {
      transform: translateY(-10px);
    }
    50%, 100% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(10px);
    }
  }

  @media only screen and (max-width: 1400px) {
    .headerCommon {

      .header-right {
        .headerAvatar {
          width: 10%;
        }
        .headerUserInfo {
          width: 25%;

        }
        .headerOut {
          width: 15%;

        }
        .headerChange{
          width: 15%;
        }
        .headerMessage{
          width: 15%;
        }

      }

    }

  }

  @media only screen and (max-width: 1150px) {
    .headerCommon {
      .header-left {
        font-size: @font-size-large;

      }
      .header-right {
        .headerAvatar {
          width: 10%;
        }
        .headerUserInfo {
          width: 25%;

        }
        .headerOut {
          width: 15%;

        }
        .headerChange{
          width: 15%;
        }
        .headerMessage{
          width: 15%;
        }

      }

    }

  }

  @media only screen and (max-width: 700px) {
    .headerCommon {
      .header-left {
        font-size: @font-size-medium-x;

      }
      .header-right {
        .headerAvatar {
          width: 30%;
        }
        .headerUserInfo {
          width: 40%;

        }
        .headerOut {
          width: 20%;
          font-size: @font-size-small-ss;
        }

      }

    }

  }

  @media only screen and (max-width: 540px) {
    .headerCommon {
      .header-left {
        font-size: @font-size-small;

      }
      .header-right {
        .headerUserInfo {
          width: 50%;
          font-size: @font-size-small-s;

        }

      }

    }

  }

  @media only screen and (max-width: 410px) {
    .headerCommon {
      .header-left {
        font-size: @font-size-small-s

      }
      .header-right {
        .headerAvatar {
          img {
            height: 40px;
          }
        }
        .headerUserInfo {
          width: 50%;

        }

      }

    }

  }
</style>
