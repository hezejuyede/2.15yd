<template>
  <div class="quality">
    <header-nav></header-nav>
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
        <textarea placeholder="请出入异常备注" v-model="remarks"></textarea>
      </div>
      <div class="qualityDivBtn">
        <el-button type="primary" icon="search" @click="submitAbnormal">提交异常原因</el-button>
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
        img: "",
        options: [],
        indexno: '',
        remarks:"",
        message: '',
        HideModal: true
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
    height: 100%;
    .qualityDiv {
      width: 100%;
      height: 100%;
      .qualityDivTitle {
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .qualityDivContent {
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
      .qualityDivBtn {
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          width: 150px;
          height: 40px;
          text-align: center;
          line-height: 40px;
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
