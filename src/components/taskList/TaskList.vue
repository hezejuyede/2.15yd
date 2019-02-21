<template>
  <div class="TaskList">
    <header-nav></header-nav>
    <div class="TaskList" ref="TaskList">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <el-select
          v-model="batch"
          clearable
          filterable
          allow-create
          default-first-option
          placeholder="批次">
          <el-option
            v-for="item in batchOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" icon="search" @click="doSearch">查询</el-button>
      </div>

      <!--公共管-->
      <div class="publicPage" v-if="this.listType ==1">
        <el-table
          :data="tables"
          :header-cell-style="{background:'#f7f7f7',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
          border
          :row-class-name="tableRowClassName"
          style="width: 95%;margin: 0 auto">
          <el-table-column
            prop="pici"
            label="批次"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="shipcode"
            label="船号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="yiguanno"
            label="一贯号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="xitong"
            label="Code号"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="hou"
            label="PIENO"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="curstationname"
            label="当前工位"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="jiagongxian"
            label="加工线"
            align="center"
            min-width="20%">
          </el-table-column>

          <el-table-column
          prop="jiagongxilie"
          label="加工系列"
          align="center"
          min-width="20%">
        </el-table-column>
          <el-table-column
            prop="statusStr"
            label="当前状态"
            align="center"
            min-width="20%">
          </el-table-column>
        </el-table>
      </div>
      <!--小组立-->
      <div class="xzlDiv" v-if="this.listType ==2">
        <div class="xzl-change">
          <div class="change-left" @click="showLeft" :style="{'color':this.left ? 'red':''}">中二小组立表</div>
          <div class="change-right" @click="showRight" :style="{'color':this.right ? 'red':''}">中二片付表</div>
        </div>
        <div class="xzl-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                prop="jiagongxian"
                label="加工线"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="pici"
                label="批次"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="shipcode"
                label="船号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="yiguanno"
                label="一贯号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="xitong"
                label="Code号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="hou"
                label="PIENO"
                align="center"
                min-width="20%">
              </el-table-column>


              <el-table-column
                prop="pregongweiname"
                label="上道工位"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="prepersonname"
                label="前作业者"
                align="center"
                min-width="20%">
              </el-table-column>




              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jiagongxian"
                label="加工线"
                align="center"
                min-width="20%">
              </el-table-column>

              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="当前状态"
                align="center"
                min-width="20%">
              </el-table-column>
            </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                prop="chuanhao"
                label="船番"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="yiguanhao"
                label="一贯号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="xuhao2"
                label="序号"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jinwuzhu"
                label="注番"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jinwu"
                label="金物"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="juaodu"
                label="角度"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="jiagongxian"
                label="加工线"
                align="center"
                min-width="20%">
              </el-table-column>

              <el-table-column
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="当前状态"
                align="center"
                min-width="20%">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!--弯头切断-->
      <div class="" v-if="this.listType ==3">
        <el-table
          :data="tables"
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          border
          :row-class-name="tableRowClassName"
          style="width: 95%;margin: 0 auto">
          <el-table-column
            prop="koujing"
            label="口径"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="guige"
            label="规格"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="jiaodu"
            label="角度"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="guanliqufen"
            label="管理区分"
            align="center"
            min-width="30%">
          </el-table-column>
          <el-table-column
            prop="shuliang"
            label="数量"
            align="center"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="pici"
            label="批次"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="statusStr"
            label="当前状态"
            align="center"
            min-width="10%">
          </el-table-column>
        </el-table>
      </div>
      <!-- 枝管切断-->
      <div class="zgDiv" v-if="this.listType ==4">
        <div class="zg-change">
          <div class="change-left" @click="zgShowLeft" :style="{'color':this.left ? 'red':''}">中二正枝</div>
          <div class="change-center" @click="zgShowCenter" :style="{'color':this.zgCenter ? 'red':''}">中二斜枝</div>
          <div class="change-right" @click="zgShowRight" :style="{'color':this.right ? 'red':''}">直枝偏心</div>
        </div>
        <div class="zg-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              height="430"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto;">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                fixed
                prop="type"
                label="类型"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="chuanfan"
                label="船番"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="fanhao"
                label="一贯号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="daihao"
                label="代号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pno"
                label="pNo"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guige"
                label="规格"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="waijing"
                label="外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="bihou"
                label="壁厚"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="neijing"
                label="内径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="changdu"
                label="长度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pianxinliang"
                label="偏心量"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="muguanwaijing"
                label="母管外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="quanchang"
                label="全长"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="denglizi"
                label="等离子"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="qieduan"
                label="切断"
                align="center"
                width="400">
              </el-table-column>
              <el-table-column
                prop="jiancha"
                label="检查"
                align="center"
                width="150">
              </el-table-column>
              <el-table-column
                prop="jinwu"
                label="金物"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="zuox"
                label="左X°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="wjuhao"
                label="ω°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="atext"
                label="A"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="btext"
                label="B"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="ktext"
                label="K"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pici"
                label="批次"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="当前状态"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
          <div class="account" v-if="zgCenter === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              height="430"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto;">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                fixed
                prop="type"
                label="类型"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="chuanfan"
                label="船番"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="fanhao"
                label="一贯号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="daihao"
                label="代号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pno"
                label="pNo"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guige"
                label="规格"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="waijing"
                label="外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="bihou"
                label="壁厚"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="neijing"
                label="内径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="changdu"
                label="长度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pianxinliang"
                label="偏心量"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="muguanwaijing"
                label="母管外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="quanchang"
                label="全长"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="denglizi"
                label="等离子"
                align="center"
                width="500">
              </el-table-column>
              <el-table-column
                prop="qieduan"
                label="切断"
                align="center"
                width="400">
              </el-table-column>
              <el-table-column
                prop="jiancha"
                label="检查"
                align="center"
                width="150">
              </el-table-column>
              <el-table-column
                prop="jinwu"
                label="金物"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="zuox"
                label="左X°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="wjuhao"
                label="ω°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="atext"
                label="A"
                align="center"
                width="1500">
              </el-table-column>
              <el-table-column
                prop="btext"
                label="B"
                align="center"
                width="300">
              </el-table-column>
              <el-table-column
                prop="ktext"
                label="K"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pici"
                label="批次"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="当前状态"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              height="430"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto;">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                fixed
                prop="type"
                label="类型"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="chuanfan"
                label="船番"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="jiagongxilie"
                label="加工系列"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="fanhao"
                label="一贯号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="daihao"
                label="代号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pno"
                label="pNo"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guige"
                label="规格"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="waijing"
                label="外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="bihou"
                label="壁厚"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="neijing"
                label="内径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="changdu"
                label="长度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pianxinliang"
                label="偏心量"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="muguanwaijing"
                label="母管外径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="quanchang"
                label="全长"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="denglizi"
                label="等离子"
                align="center"
                width="500">
              </el-table-column>
              <el-table-column
                prop="qieduan"
                label="切断"
                align="center"
                width="400">
              </el-table-column>
              <el-table-column
                prop="jiancha"
                label="检查"
                align="center"
                width="150">
              </el-table-column>
              <el-table-column
                prop="jinwu"
                label="金物"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="zuox"
                label="左X°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="wjuhao"
                label="ω°"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="atext"
                label="A"
                align="center"
                width="1500">
              </el-table-column>
              <el-table-column
                prop="btext"
                label="B"
                align="center"
                width="500">
              </el-table-column>
              <el-table-column
                prop="ktext"
                label="K"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="beizhu"
                label="备注"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="levelStr"
                label="优先级"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pici"
                label="批次"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="当前状态"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>
    <div class="loading-container" v-show="!img">
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
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import Modal from '../../common/modal'


  export default {
    name: 'ProductionExecution',
    data() {
      return {
        message: '',
        HideModal: true,


        img: "",
        listType: "",

        tableData: [],
        left: true,
        zgCenter:false,
        right: false,

        batch: "",
        batchOptions: [],

      }

    },
    components: {Loading, footerNav,Modal, headerNav},
    mounted() {
      this.showUp();
      this.showSearch();
      this.bianse();
    },
    computed: {
      //模糊检索
      tables: function () {
        var search = this.searchWord;
        if (search) {
          return this.tableData.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    created() {
      //检索用户状态
      this.getAdminState();

      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      getLoading() {
        this.img = ["1"]
      },

      //选择哪一个
      selectList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          axios.post(" " + url + "/sys/getPiciList")
            .then((res) => {
              this.batchOptions = res.data;
            })
            .catch((err) => {
              console.log(err)
            });


          const info = JSON.parse(userInfo);
          if (info.GW === "小组立") {
            this.listType = "2";
            setTimeout(() => {
              axios.post(" " + url + "/shengchan/shengchanListAll.html", {"gongxu": "小组立","type":"1"})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else if (info.GW === "弯头切断") {
            this.listType = "3";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showWtqieduanExcelAll", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else if (info.GW === "枝管切断") {
            this.listType = "4";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": info.GW,"type":"3"})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else {
            this.listType = "1";
            setTimeout(() => {
              axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": info.GW})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
        }
      },

      //小组立显示左边
      showLeft() {
        this.left = true;
        this.right = false;
        axios.post(" " + url + "/shengchan/shengchanListAll.html", {"gongxu": "小组立","type":"1"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //小组立显示右边
      showRight() {
        this.left = false;
        this.right = true;
        axios.post(" " + url + "/shengchan/shengchanListAll.html", {"gongxu": "小组立","type":"2"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },



      //支管显示中二正枝左边
      zgShowLeft() {
        this.left = true;
        this.right = false;
        this.zgCenter = false;
        axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断","type":"3"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //支管显示中二斜枝中间
      zgShowCenter() {
        this.left = false;
        this.right = false;
        this.zgCenter = true;
        axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断","type":"4"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //支管显示直枝偏心中间
      zgShowRight() {
        this.left = false;
        this.zgCenter = false;
        this.right = true;
        axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断","type":"5"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },



      //颜色
      tableRowClassName({row, rowIndex}) {
        if (row.status === 3) {
          return 'warning-row';
        }
        else if (row.status === 2) {
          return 'success-row';
        }
        else if (row.status  === 0) {
          return 'info-row';
        }
        else if (row.statusStr === "已完成") {
          return 'success-row';
        }
        else if (row.statusStr === "未开时") {
          return 'warning-row';
        }
      },

      //移动显示搜索框
      showSearch() {
        let search = this.$refs.contentTop;
        let searchHeight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHeight) {
            search.style.width = "100%";
            search.style.position = "fixed";
            search.style.top = 0;
            search.style.zIndex = 999;
          }
          else if (top <= searchHeight) {
            search.style.position = "";
          }
        })
      },
      //搜索框变色
      bianse() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.background = "rgba(240,240,240,1)"
          } else {
            let op = (top / searchHight) * 0.85;
            search.style.background = "rgba(240,240,240," + op + ")";
          }
        })

      },

      //显示向上按钮
      showUp() {
        let height = this.$refs.TaskList.offsetHeight;
        let upTop = this.$refs.upTop;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top >= height) {
            upTop.style.display = "block"
          }
          else if (top < height) {
            upTop.style.display = "none"
          }
        });

      },

      //点击向上
      upToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },


      //查询
      doSearch() {
        if (this.batch) {
          const userInfo = sessionStorage.getItem("userInfo");
          if (userInfo === null) {
            this.$router.push("/ProductionExecutionLogin")
          }
          else {
            const info = JSON.parse(userInfo);
            if (info.GW === "小组立") {
              this.listType = "2";
              setTimeout(() => {
                axios.post(" " + url + "/importother/showXiaozuliExcel", {"gongxu": info.GW, "pici": this.batch})
                  .then((res) => {
                    this.tableData = res.data;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }, 1000);
            }
            else if (info.GW === "弯头切断") {
              this.listType = "3";
              setTimeout(() => {
                axios.post(" " + url + "/importother/showWtqieduanExcel", {"gongxu": info.GW, "pici": this.batch})
                  .then((res) => {
                    this.tableData = res.data;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }, 1000);
            }
            else if (info.GW === "枝管切断") {
              this.listType = "4";
              setTimeout(() => {
                axios.post(" " + url + "/importother/showOtherZgbExcel", {"gongxu": info.GW, "pici": this.batch})
                  .then((res) => {
                    this.tableData = res.data;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }, 1000);
            }
            else {
              this.listType = "1";
              setTimeout(() => {
                axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": info.GW, "pici": this.batch})
                  .then((res) => {
                    this.tableData = res.data;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }, 1000);
            }
          }
        }
        else {
          this.message = "请选择批次";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .TaskList {
    margin-bottom: 80px;
    .contentTop {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      border-bottom: 1px solid @color-bg-hei;
      .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
        height: 35px;
        margin-left: 2%;
      }

    }
    .xzlDiv {
      .xzl-change {
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

    }
    .zgDiv{
      .zg-change {
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
        .change-center {
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
    }

  }

  .upTop {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 999;
    background-color: @color-background-d;
    cursor: pointer;
    color: @color-white;
    i {
      font-size: @font-size-large-xxx;
    }

  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and (max-width: 800px) {
    .ProductionExecutionDiv {
      .contentTop {
        .topButton {
          margin-left: 2%;
          font-size: @font-size-small-s;
        }
      }
      .listSearch {
        .listSearchBtn {
          margin-left: 2%;
          font-size: @font-size-small-s;
        }

      }
    }
  }

</style>
