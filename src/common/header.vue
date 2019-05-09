<template>
    <div class="headerCommon clearfix">
      <div class="header-left fl">
        <div class="collapse-btn" @click="handleFullScreen">
          <i class="el-icon-menu"></i>
        </div>
        <div class="logo">中二线管加工生产执行系统</div>
      </div>
      <div class="header-right fl" >
        <div class="headerOut fr" @click="LeavePost">
          <i class="iconfont icon-ligang"></i>
          <span>离岗</span>
        </div>
        <div class="headerChange fr" @click="showChangePost">
          <i class="iconfont icon-qiehuanjiaose"></i>
          <span>换岗</span>
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
          <img src="../assets/img/avatar.png" alt="">
        </div>
      </div>

      <!--换岗 -->
      <el-dialog title="更换岗位" :visible.sync="changeVisible" width="40%">
        <div class="container">
          <div class="containerDiv">
            <div class="containerDivTop">
              <div class="select">
                <el-select
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

    </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import url from '../assets/js/URL'

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
        changeVisible:false,

        workstation:"",
        workstationOptions:[]

      }
    },
    components: {timer},
    mounted() {


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
            axios.post("  " + url + "/api/LeavePost", {"username": this.userName})
              .then((res) => {
                if (res.data === "1") {
                  this.$message({
                    type: 'success',
                    message: '离岗成功!'
                  });
                  setTimeout(() => {
                    localStorage.setItem("IndexUrl", 0);
                    sessionStorage.removeItem("userInfo");
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
            this.workstation=res.data[0].id;
            this.changeVisible=true;
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //进行换岗
      doChangePost() {
        if (this.workstation) {
          axios.post("  " + url + "/api/changePost", {"username": this.userName, "gongwei": this.workstation})
            .then((res) => {
              if (res.data.state === "1") {
                let userInfo = res.data;
                userInfo = JSON.stringify(userInfo);
                sessionStorage.setItem("userInfo", userInfo);
                this.$message({
                  type: 'success',
                  message: '换岗成功!'
                });
                setTimeout(() => {
                  this.changeVisible=false;
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
      width: 50%;
      height: 70px;
      padding-left: 5%;
      display: flex;
      align-items: center;
      font-size: @font-size-large-xx;
      color: @color-white;
    }
    .header-right {
      width: 50%;
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
      .headerOut {
        width: 20%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: start;
        cursor: pointer;
        font-size: @font-size-large;
        .icon-ligang{
          font-size: @font-size-large;
          margin-right: 5px;
        }
      }
      .headerChange{
        width: 20%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: start;
        cursor: pointer;
        font-size: @font-size-large;
        .icon-qiehuanjiaose{
          font-size: @font-size-large;
          margin-right: 5px;
        }
      }

    }
    .container{
      height: 300px;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      .containerDiv{
        width: 250px;
        height: 250px;
        .containerDivTop{
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .containerBtn{
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 50px;
        }
      }

    }

  }

  @media only screen and (max-width: 1250px) {
    .headerCommon {

      .header-right {

        .headerUserInfo {
          width:20%;

        }
        .headerOut {
          width: 20%;

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
          width: 20%;
        }
        .headerUserInfo {
          width: 25%;

        }
        .headerOut {
          width: 20%;

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

  @media only screen and (max-width:540px) {
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

  @media only screen and (max-width:410px) {
    .headerCommon {
      .header-left {
        font-size: @font-size-small-s

      }
      .header-right {
        .headerAvatar {
         img{
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
