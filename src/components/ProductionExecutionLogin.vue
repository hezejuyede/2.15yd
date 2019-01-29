<template>
  <div class="login">
    <header class="login-title">
      <img src="../assets/img/logo.png"/>
      <h1>中二线管加工生产执行系统</h1>
    </header>
    <div class="loginIndex">
      <div class="loginIndex-top"><i class="iconfont icon-mima"></i></div>
      <div class="loginIndex-change">
        <div class="change-left" @click="showLeft" :style="{'color':this.left ? 'red':''}">扫码登陆</div>
        <div class="change-right" @click="showRight" :style="{'color':this.right ? 'red':''}">账户登陆</div>
      </div>
      <div class="loginIndex-content">
        <div class="saoMa" v-show="left === true">
          <div class="loginIndex-grm">
            <i class="iconfont icon-iconset0256"></i>
            <input
              @blur="grmBlur(grm)"
              @focus="grmFocus(grm)"
              v-model="grm"
              type="password"
              placeholder="请扫描工牌条形码"/>
            <div class="grmErrText">
              <span>{{grmErrText}}</span>
            </div>
          </div>
          <div class="loginIndex-gwm">
            <i class="iconfont icon-gongweiguanli"></i>
            <input
              @blur="gwmBlur(gwm)"
              @focus="gwmFocus(gwm)"
              v-model="gwm"
              type="password"
              placeholder="请扫描工位条形码"/>
            <div class="gwmText">
              <span>{{gwmErrText}}</span>
            </div>
          </div>
          <div class="loginIndex-mLogin">
            <button @click="mLogin">登录</button>
          </div>
        </div>
        <div class="account" v-show="right === true">
          <div class="loginIndex-username">
            <i class="iconfont icon-solid-person"></i>
            <input
              @blur="userNameBlur(username)"
              @focus="userNameFocus(username)"
              v-model="username"
              type="text"
              placeholder="请输入用户名"/>
            <div class="userErrText">
              <span>{{userNameErrText}}</span>
            </div>
          </div>
          <div class="loginIndex-password">
            <i class="iconfont icon-mima"></i>
            <input
              @blur="passwordBlur(password)"
              @focus="passwordFocus(password)"
              v-model="password"
              type="password"
              placeholder="请输入密码"/>
            <div class="passwordText">
              <span>{{ passwordErrText}}</span>
            </div>
          </div>
          <div class="loginIndex-selectWorkstation">
            <i class="iconfont icon-youhuiquanguanli-"></i>
            <select
              style="-webkit-appearance: none"
              @blur="selectWorkstationBlur(selectWorkstation)"
              @focus="selectWorkstationFocus(selectWorkstation)"
              v-model="selectWorkstation">
              <option value="" style="display: none;" disabled selected>请选择工位</option>
              <option v-for="(item,index) in selectList" :value="item.id">{{item.name}}</option>
            </select>
            <div class="selectWorkstationText">
              <span>{{ selectWorkstationErrText}}</span>
            </div>
          </div>
          <div class="loginIndex-login">
            <button @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
    <footer class=""> ©2018 南通中远海运川崎船舶工程有限公司</footer>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <prompt-box
      :openPromptBox="openPromptBox"
      :needKnown="needKnown"
      :contentText="contentText">
    </prompt-box>

  </div>

</template>

<script type="text/ecmascript-6">
  import url from '../assets/js/URL'
  import axios from 'axios'
  import Modal from '../common/modal'
  import promptBox from '../common/promptBox'

  import Qs from 'qs'

  export default {
    name: 'indexLogin',
    data() {
      return {
        selectList: [],

        openPromptBox: true,
        needKnown: "",
        contentText: "",

        left: true,
        right: false,


        grm: "",
        gwm: "",
        username: '',
        password: '',
        selectWorkstation: '',

        grmErrText: '',
        gwmErrText: '',
        userNameErrText: '',
        passwordErrText: '',
        selectWorkstationErrText: "",

        grmState: false,
        gwmState: false,
        userNameState: false,
        passwordState: false,
        selectWorkstationState: false,

        message: '',
        HideModal: true
      }
    },
    components: {Modal, promptBox},
    created() {
    },
    methods: {


      grmBlur(grm) {
        if (grm.length === 0) {
          this.grmErrText = "工牌码扫描不能为空";
        }
        else {
          this.grmErrText = "";
          this.grmState = true
        }
      },
      grmFocus(grm) {
        if (grm.length === 0) {
          this.grmErrText = "请填扫描个人工牌";
        }
      },

      gwmBlur(gwm) {
        if (gwm.length === 0) {
          this.gwmErrText = "工位码扫描不能为空";
        }
        else {
          this.gwmErrText = "";
          this.gwmState = true
        }
      },
      gwmFocus(gwm) {
        if (gwm.length === 0) {
          this.gwmErrText = "请填扫描工位码";
        }
      },

      userNameBlur(username) {
        if (username.length === 0) {
          this.userNameErrText = "用户名不能为空";
        }
        else {
          this.userNameErrText = "";
          this.userNameState = true
        }
      },
      userNameFocus(username) {
        if (username.length === 0) {
          this.userNameErrText = "请填写用户名";
        }
      },

      passwordBlur(password) {
        if (password.length === 0) {
          this.passwordErrText = "密码不能为空";
        }
        else {
          this.passwordErrText = "";
          this.passwordState = true
        }
      },
      passwordFocus(password) {
        if (password.length === 0) {
          this.passwordErrText = "请填写密码";
        }
      },

      selectWorkstationBlur(selectWorkstation) {
        {
          if (selectWorkstation.length === 0) {
            this.selectWorkstationErrText = "工位不能为空";
          }
          else {
            this.selectWorkstationErrText = "";
            this.selectWorkstationState = true
          }
        }
      },
      selectWorkstationFocus(selectWorkstation) {
        if (selectWorkstation.length === 0) {
          this.selectWorkstationErrText = "请填选择工位";
        }
      },

      login() {
        if (this.userNameState === true && this.passwordState === true && this.selectWorkstationState === true) {

          var params = new URLSearchParams();
          params.append('username', this.username);
          params.append('password', this.password);
          params.append('stationid', this.selectWorkstation);

          axios({
            method: "post",
            url: " " + url + "/api/stationLogin.html",
            data: params
          })
            .then((res) => {
              if (res.data.state === "1") {

                let userInfo = res.data;
                userInfo = JSON.stringify(userInfo);
                sessionStorage.setItem("userInfo", userInfo);
                this.message = "登录成功";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                function showPromptBox() {
                  that.openPromptBox = false;
                  that.needKnown = res.data.needKnown;
                  that.contentText = res.data.contentText;
                }

                setTimeout(showPromptBox, 3000);
                setTimeout(a, 2000);

              }
              else if (res.data === "2") {
                this.message = "该用户没有注册";
                this.HideModal = false;
                const that = this;

                function b() {
                  that.message = "";
                  that.HideModal = true;
                  that.username = '';
                  that.password = '';
                }

                setTimeout(b, 2000);
              }
              else if (res.data === "-1") {
                this.message = "密码错误";
                this.HideModal = false;
                const that = this;

                function c() {
                  that.message = "";
                  that.HideModal = true;
                  that.password = '';
                }

                setTimeout(c, 2000);
              }
              else if (res.data === "3") {
                this.message = "岗位不合符";
                this.HideModal = false;
                const that = this;

                function d() {
                  that.message = "";
                  that.HideModal = true;
                  that.password = '';
                }

                setTimeout(d, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {
          this.message = "请正确填写信息";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },

      mLogin() {
        if (this.grmState === true && this.gwmState === true) {
          axios.post(" "+url+"/api/MUserLogin", {
            ghm: this.grm,
            gwm: this.gwm
          })
            .then((res) => {
              if (res.data.state === "1") {
                let userInfo = res.data;
                userInfo = JSON.stringify(userInfo);
                sessionStorage.setItem("userInfo", userInfo);
                this.message = "登录成功";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                function showPromptBox() {
                  that.openPromptBox = false;
                  that.needKnown = res.data.needKnown;
                  that.contentText = res.data.contentText;
                }

                setTimeout(showPromptBox, 3000);
                setTimeout(a, 2000);
              }
              else if (res.data === "2") {
                this.message = "该用户没有注册";
                this.HideModal = false;
                const that = this;

                function b() {
                  that.message = "";
                  that.HideModal = true;
                  that.username = '';
                  that.password = '';
                }

                setTimeout(b, 2000);
              }
              else if (res.data === "-1") {
                this.message = "扫码码错误";
                this.HideModal = false;
                const that = this;

                function c() {
                  that.message = "";
                  that.HideModal = true;
                  that.password = '';
                }

                setTimeout(c, 2000);
              }
              else if (res.data === "3") {
                this.message = "岗位不合符";
                this.HideModal = false;
                const that = this;

                function d() {
                  that.message = "";
                  that.HideModal = true;
                  that.password = '';
                }

                setTimeout(d, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {
          this.message = "请正确填写信息";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },
      showLeft() {
        this.left = true;
        this.right = false;
      },
      showRight() {
        this.left = false;
        this.right = true;
        axios.post(" " + url + "/api/getProcessList.html").then((res)=>{
          this.selectList = res.data;
        }).catch()
      }
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .login {
    width: 100%;
    height: 100%;
    background: url("../assets/img/logoin.png") center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    header {
      height: 100px;
      text-align: center;
      margin-bottom: 30px;
      img {
        height: 50px;
      }
      h1 {
        font-size: 30px;
      }

    }
    .loginIndex {
      width: 400px;
      height: 380px;
      border-radius: 5%;
      background-color: rgba(184, 202, 219, 0.6);
      position: relative;
      padding-top: 1px;
      .loginIndex-top {
        width: 50px;
        height: 50px;
        background-color: rgba(19, 179, 210, 1);
        border-radius: 40%;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        position: absolute;
        top: -25px;
        left: 45%;
        .icon-mima {
          font-size: @font-size-large-xx;
        }
      }
      .loginIndex-change {
        margin-top: 30px;
        height: 50px;
        display: flex;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
        }
        .change-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
        }
      }
      .saoMa {
        width: 100%;
        height: 230px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

      }
      .account {

      }
      .loginIndex-grm {
        width: 90%;
        margin: 10px auto 0 auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
        font-size: @font-size-medium-x;
        position: relative;
        input {
          width: 80%;
          height: 50px;
          padding-left: 20px;
          background-color: @color-white;
        }
        .icon-iconset0256 {
          font-size: 200%;
        }
      }
      .loginIndex-gwm {
        width: 90%;
        margin: 25px auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
        position: relative;
        input {
          width: 80%;
          height: 50px;
          padding-left: 20px;
          font-size: @font-size-medium-x;
          background-color: @color-white;
        }
        .icon-gongweiguanli {
          font-size: 200%;
        }
      }
      .loginIndex-mLogin {
        width: 90%;
        margin: 0 auto;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          background-color: rgba(19, 179, 210, 1);
          border: 0;
          width: 100%;
          height: 50px;
          color: #ffffff;
          font-size: @font-size-large;
          border-radius: 5%;

        }
      ;
      }

      .loginIndex-selectWorkstation {
        width: 90%;
        margin: 25px auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
        position: relative;
        select {
          width: 80%;
          height: 50px;
          padding-left: 20px;
          background-color: @color-white;
          border: none;
          outline: none;
          -moz-appearance: none;
          -webkit-appearance: none;
        }
      }
      .loginIndex-username {
        width: 90%;
        margin: 10px auto 0 auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
        font-size: @font-size-medium-x;
        position: relative;
        input {
          width: 80%;
          height: 50px;
          padding-left: 20px;
          background-color: @color-white;
        }
      }
      .loginIndex-password {
        width: 90%;
        margin: 25px auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
        position: relative;
        input {
          width: 80%;
          height: 50px;
          padding-left: 20px;
          font-size: @font-size-medium-x;
          background-color: @color-white;
        }
      }
      .loginIndex-login {
        width: 90%;
        margin: 0 auto;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          background-color: rgba(19, 179, 210, 1);
          border: 0;
          width: 100%;
          height: 50px;
          color: #ffffff;
          font-size: @font-size-large;
          border-radius: 5%;

        }
      ;
      }

      .grmErrText {
        position: absolute;
        bottom: -22px;
        left: 0;
        width: 100%;
        height: 20px;
        color: #d93f30;
        line-height: 20px;
        padding-left: 20px;
      }
      .gwmText {
        position: absolute;
        bottom: -22px;
        left: 0;
        width: 100%;
        height: 20px;
        color: #d93f30;
        line-height: 20px;
        padding-left: 20px;
      }
      .userErrText {
        position: absolute;
        bottom: -22px;
        left: 0;
        width: 100%;
        height: 20px;
        color: #d93f30;
        line-height: 20px;
        padding-left: 20px;
      }
      .passwordText {
        position: absolute;
        bottom: -22px;
        left: 0;
        width: 100%;
        height: 20px;
        color: #d93f30;
        line-height: 20px;
        padding-left: 20px;
      }
      .selectWorkstationText {
        position: absolute;
        bottom: -22px;
        left: 0;
        width: 100%;
        height: 20px;
        color: #d93f30;
        line-height: 20px;
        padding-left: 20px;
      }
    }
    footer {
      text-align: center;
      margin-top: 50px;
      font-size: @font-size-medium-x;
    }

  }

  @media only screen and (max-width: 400px) {
    .login {
      .login-title {
        img {
          height: 40px;
        }
        h1 {
          font-size: @font-size-large-xx;
        }

      }
      .loginIndex {
        width: 250px;
        .loginIndex-top {
          left: 42%;
        }
      }
      footer {
        font-size: @font-size-small;
      }
    }

  }

</style>
