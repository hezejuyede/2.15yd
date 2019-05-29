
<template>
  <div class="equipment">
    <header-nav></header-nav>
    <div class="equipmentDiv">
      <div class="equipmentDivTitle" id="sbSelect">
        <el-select
          style="height: 100px;width: 350px"
          v-model="equipment"
          clearable
          filterable
          allow-create
          default-first-option
          placeholder="请选择设备名称">
          <el-option
            v-for="item in equipmentOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="equipmentDivContent">
        <textarea placeholder="请描述设备什么故障" v-model="remarks"></textarea>
      </div>
      <div class="equipmentDivBtn">
        <el-button type="primary" icon="search" @click="submitAbnormal">设备故障上报</el-button>
      </div>
    </div>
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
  export default {
    name: 'quality',
    data() {
      return {
        img: "",
        equipment:"",
        equipmentOptions: [],

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

      //转圈延迟一秒执行
      setTimeout(() => {
        this.getLoading();
      }, 100);
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
      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },

      //上报设备异常
      submitAbnormal() {
        if (this.equipment && this.remarks) {
          const userInfo = sessionStorage.getItem("userInfo");
          const id = localStorage.getItem("pipeId");
          const info = JSON.parse(userInfo);
          const userId =info.username;
          axios.post(" " + url + "/shengchanError/errorEvent", {
            "userId": userId, "errorId":this.equipment,
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
        else if (!this.equipment) {
          this.message = "请选择异常设备";
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
  .equipment {
    width: 100%;
    height: 100%;
    .equipmentDiv {
      width: 100%;
      height: 100%;
      .equipmentDivTitle {
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 20px;
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
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
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
