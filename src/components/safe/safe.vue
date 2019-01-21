<template>
    <div class="safe">
        <header-nav></header-nav>
        <div class="ProductionExecutionDiv">
          <div class="search-Box">
            <el-input   placeholder="请输入关键字" icon="search"  class="search"  v-model="search"></el-input>
          </div>
          <el-table  :data="tables" border style="width: 100%">
            <el-table-column  prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column   prop="address"  label="地址"></el-table-column>
          </el-table>
        </div>
        <div class="loading-container" v-show="!img.length">
            <loading></loading>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import timer from '../../common/timer'
    import headerNav from '../../common/header'
    import footerNav from '../../common/footer'
    import Loading from '../../common/loading'

    export default {
        name: 'safe',
        data() {
          return {
            img: "",
            search: '',  //搜索
            tableData: [
              {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
              {date: '2016-05-04', name: '章小虎', address: '上海市普陀区金沙江路 1517 弄'},
              {date: '2016-05-01', name: '李小虎', address: '上海市普陀区金沙江路 1519 弄'},
            ]
          }

        },
        components: {Loading, footerNav,headerNav},
        mounted() {



        },
      computed: {
        tables: function () {
          var search = this.search;
          if (search) {
            return this.tableData.filter(function (dataNews) {
              return Object.keys(dataNews).some(function (key) {
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.tableData
        }
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
            goToPage(){

            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .safe {
        width: 100%;
        height: 100%;
        .ProductionExecutionDiv {
            width: 100%;
            height: 60%;
            margin-top: 2%;
        }
        .IconTemplate {
            float: left;
            width: 30%;
            height: 40%;
            margin-bottom: 5%;
            margin-left: 3%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;

            .icon-kaishi {
                display: block;
                background-color: #F56C6C;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-zhilianganquan {
                display: block;
                background-color: @color-bg-lan;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-tuihui {
                display: block;
                background-color: @color-bg-cs;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-zanting {
                display: block;
                background-color: #409EFF;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-wancheng {
                display: block;
                background-color: #67C23A;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            span {
                margin-top: 5%;
                color: #909399
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
