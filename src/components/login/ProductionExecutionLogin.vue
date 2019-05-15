<template>
  <div class="login">
    <header class="login-title">
      <img src="../../assets/img/logo.png"/>
      <h1>中二线管加工生产执行系统</h1>
    </header>
    <div class="loginIndex">
      <div class="loginIndex-change">
        <div class="change-left"
             @click="showLeft"
             ref="changeLeft"
             :style="{
             'background-color':this.left ? '#2A437B':'',
             'color':this.left ? '#ffffff':''}">
          扫码登陆
        </div>
        <div class="change-right"
             @click="showRight"
             :style="{
             'background-color':this.right ? '#2A437B':'',
             'color':this.right  ? '#ffffff':''}">
          账户登陆
        </div>
      </div>
      <div class="loginIndex-content">
        <div class="saoMa" v-show="left === true">
          <div class="saoMaDiv">
            <div class="loginIndex-grm">
              <i class="iconfont icon-iconset0256"></i>
              <input
                @blur="grmBlur(grm)"
                @focus="grmFocus(grm)"
                @keyup.enter="nextSubmit"
                ref="leftInput"
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
                ref="Input3"
                type="password"
                @keyup.enter="smSubmit"
                placeholder="请扫描工位条形码"/>
              <div class="gwmText">
                <span>{{gwmErrText}}</span>
              </div>
            </div>
            <div class="loginIndex-mLogin">
              <button @click="mLogin">登录</button>
            </div>
          </div>
        </div>
        <div class="account" v-show="right === true">
          <div class="loginIndex-username">
            <i class="iconfont icon-solid-person"></i>
            <input
              @blur="userNameBlur(username)"
              @focus="userNameFocus(username)"
              @keyup.enter="nextSubmit"
              ref="rightInput"
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
              @keyup.enter="enterSubmit"
              ref="Input2"
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
              <option value="" style="display: none;" disabled selected>{{selectWorkstationName}}</option>
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
    <div class="" style="margin-top: 10px">
      <a href="Go://D:/Program Files/nodejs/node.exe">启动PDAWIFI</a>
    </div>
    <footer class=""> ©2019 南通中远海运川崎船舶工程有限公司</footer>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <prompt-box
      :openPromptBox="openPromptBox"
      :needKnown="needKnown"
      :contentText="contentText"
      :username="username">
    </prompt-box>

  </div>

</template>

<script type="text/ecmascript-6">
  import url from '../../assets/js/URL'
  import axios from 'axios'
  import Modal from '../../common/modal'
  import promptBox from '../../common/promptBox'
  import screenfull from 'screenfull'

  import Qs from 'qs'

  export default {
    name: 'indexLogin',
    data() {
      return {
        isFullscreen: true,
        selectList: [],

        openPromptBox: true,
        needKnown: "",
        contentText: "",

        left: false,
        right: true,


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
        selectWorkstationName: "请选择工位",
        selectWorkstationId: "",
        message: '',
        HideModal: true
      }
    },
    components: {Modal, promptBox},
    created() {

    },
    mounted() {
      this.getState();


    },
    methods: {

      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        }
        else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }
        else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
        else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      },

      //监控回车按钮事件
      nextSubmit(e) {
        if (e.keyCode == 13) {
          this.$nextTick(function(){
            this.$refs['Input2'].focus();
            this.$refs['Input3'].focus();
          })

        }
      },

      getState() {
        let changeLeft = this.$refs.changeLeft;
        changeLeft.style.borderTopRightRadius = "20px";
        this.$nextTick(function(){
          this.$refs['rightInput'].focus();
        })
      },

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
        this.handleFullScreen();
        if (username.length === 0) {
          this.userNameErrText = "用户名不能为空";
        }
        else {
          this.userNameErrText = "";
          this.userNameState = true;
          axios.post(" " + url + "/api/getPersonProcessList", {"name": this.username})
            .then((res) => {
              this.selectList = res.data;
              this.selectWorkstationName = this.selectList[0].name;
              this.selectWorkstationId = this.selectList[0].id;
              this.selectWorkstationState = true;
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      userNameFocus(username) {
        this.handleFullScreen();
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


      enterSubmit(e){
        if(e.keyCode == 13){
          this.passwordErrText = "";
          this.passwordState = true;
          if (this.userNameState === true && this.passwordState === true && this.selectWorkstationState === true) {
            var params = new URLSearchParams();
            if (this.selectWorkstation) {
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
              params.append('username', this.username);
              params.append('password', this.password);
              params.append('stationid', this.selectWorkstationId);

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
          if (this.selectWorkstation) {
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
            params.append('username', this.username);
            params.append('password', this.password);
            params.append('stationid', this.selectWorkstationId);

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
          axios.post(" " + url + "/api/MUserLogin", {
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

      //监控回车按钮事件
      smSubmit(e){
        if (e.keyCode == 13) {
          this.gwmState = true;
          this.gwmErrText="";
          if (this.grmState === true && this.gwmState === true) {
            axios.post(" " + url + "/api/MUserLogin", {
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
        }
      },



      showLeft() {
        this.left = true;
        this.right = false;
        this.$nextTick(function(){
          this.$refs['leftInput'].focus();
        })

      },
      showRight() {
        this.left = false;
        this.right = true;
        let changeLeft = this.$refs.changeLeft;
        changeLeft.style.borderTopRightRadius = "20px";
        this.$nextTick(function(){
          this.$refs['rightInput'].focus();
        })
      }
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .login {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/Winlogon-bg.png") center center;
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
      border-radius: 20px;
      background-color: #E7EBEE;
      position: relative;
      padding-top: 1px;
      .loginIndex-change {
        height: 60px;
        display: flex;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #2A437B;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          background-color: @color-white;
          border-top-left-radius: 20px;
        }
        .change-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          background-color: @color-white;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
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
      .saoMaDiv {
        margin-top: 80px;
        width: 100%;
        .loginIndex-grm {
          width: 90%;
          margin: 0 auto 0 auto;
          height: 50px;
          background-color: @color-white;
          padding-left: 2%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
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
          border-radius: 10px;
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
            background-color: #2A437B;
            border: 0;
            width: 100%;
            height: 50px;
            color: #ffffff;
            font-size: @font-size-large;
            border-radius: 10px;

          }
        }
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
        border-radius: 10px;
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
        margin: 25px auto 0 auto;
        height: 50px;
        background-color: @color-white;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-medium-x;
        position: relative;
        border-radius: 10px;
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
        border-radius: 10px;
        padding-left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
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
          background-color: #2A437B;
          border: 0;
          width: 100%;
          height: 50px;
          color: #ffffff;
          font-size: @font-size-large;
          border-radius: 10px;
        }
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
      color: #ffffff;
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
