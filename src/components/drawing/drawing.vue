<template>
  <div class="drawing">
    <header-nav></header-nav>
    <div class="drawingTop">
      <div class="drawingTitle">
        一品图查看
      </div>
      <div class="drawingCondition">
        <div class="drawingConditionDiv">
          <el-select v-model="value1" clearable placeholder="批次">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select v-model="value2" clearable placeholder="加工线">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select v-model="value3" clearable placeholder="工位">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="drawingConditionDiv">
          <el-select v-model="value4" clearable placeholder="船号">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="drawingSearch">
        <div class="drawingSearchInput">
          <div class="">
            <el-input v-model="select_word" placeholder="管子编号"></el-input>
          </div>
        </div>
        <div class="drawingSearchButton">
          <button @click="search">搜索</button>
        </div>
      </div>
    </div>
    <div class="drawingBottom">
      <div class="drawingImg">
        <img src="../../assets/img/ypt.jpg" alt="">
      </div>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import headerNav from '../../common/header'
  import timer from '../../common/timer'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'

  export default {
    name: 'drawing',
    data() {
      return {
        img: "",
        select_cate: "",
        select_word: "",

        options1: [
          {
            value: '选项1',
            label: '第一批次'
          },
          {
            value: '选项2',
            label: '第二批次'
          },
          {
            value: '选项3',
            label: '第三批次'
          },
          {
            value: '选项4',
            label: '第四批次'
          },
          {
            value: '选项5',
            label: '第五批次'
          }
        ],
        options2: [
          {
            value: '选项1',
            label: '小一'
          },
          {
            value: '选项2',
            label: '小二'
          },
          {
            value: '选项3',
            label: '小三'
          },
          {
            value: '选项4',
            label: '中一'
          },
          {
            value: '选项5',
            label: '中二'
          }
        ],
        options3: [
          {
            value: '选项1',
            label: '切断表'
          },
          {
            value: '选项2',
            label: '一品图'
          },
          {
            value: '选项3',
            label: '支管表'
          },
          {
            value: '选项4',
            label: '小组立表'
          },
          {
            value: '选项5',
            label: '片付表'
          }
          ,
          {
            value: '选项6',
            label: '弯头表'
          }
        ],
        options4: [
          {
            value: '选项1',
            label: '货轮'
          },
          {
            value: '选项2',
            label: '钓鱼船'
          },
          {
            value: '选项3',
            label: '帆船'
          },
          {
            value: '选项4',
            label: '铁皮船'
          },
          {
            value: '选项5',
            label: '艇艇'
          }
        ],

        value1: '',
        value2: '',
        value3: '',
        value4: '',

        imgUrl: ""
      }

    },
    components: {Loading, timer, footerNav,headerNav},
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
        this.$router.replace;
        const userInfo = sessionStorage.getItem("userInfo");
        const info = JSON.parse(userInfo);
        if (info === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
      },
      search() {

      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .drawing {
    width: 100%;
    height: 100%;
    .drawingTop {
      height: 25%;
      .drawingTitle {
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: @font-size-medium-x;
      }
      .drawingCondition {
        width: 100%;
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        .drawingConditionDiv {
          width: 25%;
          margin-top: 2px;
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .drawingSearch {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30%;
        .drawingSearchInput {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            width: 80%;
          }
        }
        .drawingSearchButton {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            width: 60%;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: @color-white;
            background-color: @color-bg-lan;
            border: 0;
            border-radius: 10%;
          }
        }

      }
    }
    .drawingBottom {
      height: 50%;
      border-top: 1px solid @color-F0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .drawingImg {
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 100%;
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
