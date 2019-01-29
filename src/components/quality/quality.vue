<template>
  <div class="quality">
    <header-nav></header-nav>

    <div class="qualityDiv">
      <div class="currentTaskTitle">
        <div class="titleDiv fl"  v-for="(item,index) in titleData">
          <div class="titleDivLeft">
            {{item.name}}
          </div>
          <div class="titleDivRight">
            {{item.text}}
          </div>
        </div>
      </div>
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
        <button  @click="submitAbnormal">提交异常原因</button>
      </div>
    </div>
    <div class="loading-container" v-show="!options.length">
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

  export default {
    name: 'quality',
    data() {
      return {
        itleData: "",
        img: "",
        id:"",
        options: [],
        indexno: '',
        remarks: "",
        message: '',
        HideModal: true,
        titleData: []
      }

    },
    components: {Loading, Modal, footerNav, headerNav},
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
          const id = localStorage.getItem("pipeId");
          this.id = id;
          if (id === null) {
            localStorage.setItem("IndexUrl", 0);
            this.$router.push("/")
          }
          else {
            axios.post(" " + url + "/shengchan/getCurShengchanguan", {"id": id})
              .then((res) => {
                this.titleData = res.data.baseItem;
              })
              .catch((err) => {
                console.log(err)
              });
            setTimeout(() => {
              axios.post(" " + url + "/sys/dictionaryList", {"id": "1"})
                .then((res) => {
                  this.options = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
        }
      },
      submitAbnormal() {
        if (this.indexno && this.remarks) {
          const userInfo = sessionStorage.getItem("userInfo");
          const id = localStorage.getItem("pipeId");
          const info = JSON.parse(userInfo);
          const userId =info.username;
          axios.post(" " + url + "/shengchanError/errorEvent",
            {"userId": userId,
              "errorId":this.indexno,
              "context":this.remarks,
              "id":id
            })
            .then((res) => {
              if (res.data === "1") {
                this.message = "提交成功";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                setTimeout(a, 2000);
              }
              else {
                this.message = "提交失败因";
                this.HideModal = false;
                const that = this;

                function b() {
                  that.message = "";
                  that.HideModal = true;
                }

                setTimeout(b, 2000);
              }
            })
            .catch((err) => {

            })
        }
        else if (!this.indexno) {
          this.message = "请选择异常原因";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
        else if (!this.remarks) {
          this.message = "请输入异常备注";
          this.HideModal = false;
          const that = this;

          function b() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(b, 2000);
        }
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .quality {
    width: 100%;
    height: 85%;
    .qualityDiv {
      width: 100%;
      height: 100%;
      .currentTaskTitle {
        height: 15%;
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
      .qualityDivTitle {
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .qualityDivContent {
        width: 80%;
        margin: 0 auto;
        height: 35%;
        display: flex;
        align-items: center;
        justify-content: center;

      }
      .qualityDivBtn {
        height: 20%;
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
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and (max-width: 1200px) {
    .quality {
      .qualityDiv {
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
      }

    }

  }

  @media only screen and (max-width: 720px) {
    .quality {
      .qualityDiv {
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
      }
    }

  }

  @media only screen and (max-width: 480px) {
    .quality {
      .qualityDiv {
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

  }
</style>
