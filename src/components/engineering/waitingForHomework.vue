<template>
  <div class="ProductionExecution">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="listSearch">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" icon="search" @click="showScreening">条件筛选</el-button>
            <el-button type="primary" icon="search" @click="goGeneralListOfProcessing">总清单</el-button>
            <el-button type="warning" icon="search" @click="workEnd">加工完成</el-button>
          </div>
        </div>
      </div>

      <!--切断，直管焊，大阻焊-->
      <div class="publicPage" v-if="this.listType ==1">
        <el-table class="tb-edit"
                  :data="tableData"
                  height="500"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                  :row-class-name="tableRowClassName"
                  @select="selectList"
                  @select-all="selectAll"
                  @row-click="doSelect"
                  @selection-change="selectChange"
                  ref="moviesTable"
                  style="width: 99%;margin: 0 auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <template v-for="(col ,index) in cols">
            <el-table-column
              align="center"
              v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='qieduanbiao' && col.prop !=='yipintu'"
              :prop="col.prop"
              :label="col.label">
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='yiguanno'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 30px"
                  @click="goToCurrentTask(scope.row.id)">
                  {{ scope.row.yiguanno }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='codeno'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 30px"
                  @click="goToCurrentTask(scope.row.id)">
                  {{ scope.row.codeno }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='qieduanbiao'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button type="success" style="width: 100%;height: 30px">{{ scope.row.qieduanbiao }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='yipintu'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button type="success" style="width: 100%;height: 30px">{{ scope.row.levelStr }}</el-button>
              </template>
            </el-table-column>
          </template>
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
              @select="selectList"
              @select-all="selectAll"
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
                <template slot-scope="scope">
                  <div @click="goToCurrentTask(scope.row.id)">
                    {{scope.row.yiguanno}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="xitong"
                label="Code号"
                align="center"
                min-width="20%">
                <template slot-scope="scope">
                  <div @click="goToCurrentTask(scope.row.id)">
                    {{scope.row.yiguanno}}
                  </div>
                </template>
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
            </el-table>
          <!--  <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              height="350"
              @row-click="goToCurrentTask"
              @select="selectList"
              @select-all="selectAll"
              :row-class-name="tableRowClassName"
              style="width: 95%;margin: 0 auto;overflow: auto">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                fixed
                prop="chuanhao"
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
                prop="yiguanhao"
                label="一贯号"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="pno"
                label="pNo"
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
                prop="guige"
                label="规格"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="hujing"
                label="呼径"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="houdu"
                label="厚度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="qieduanchang"
                label="切断长"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="guanduan"
                label="管端"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="jiaodu"
                label="角度"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="lianjiexinxi"
                label="连接"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pinming"
                label="金物"
                align="center"
                width="200">
              </el-table-column>
              <el-table-column
                prop="guanduan"
                label="管端"
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
            </el-table>-->
          </div>
          <div class="account" v-if="right === true">
            <el-table
              :data="tables"
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
              border
              @select="selectList"
              @select-all="selectAll"
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
          @select="selectList"
          @select-all="selectAll"
          @row-click="goToCurrentTask"
          style="width: 95%;margin: 0 auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
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
            prop="levelStr"
            label="优先级"
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
                     @select="selectList"
                     @select-all="selectAll"
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
                       <template slot-scope="scope">
                         <div @click="goToCurrentTask(scope.row.id)">
                           {{scope.row.fanhao}}
                         </div>
                       </template>
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
                   </el-table>
          </div>
          <div class="account" v-if="zgCenter === true">
            <el-table
                     :data="tables"
                     :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                     border
                     height="430"
                     :row-class-name="tableRowClassName"
                     @select="selectList"
                     @select-all="selectAll"
                     @row-click="goToCurrentTask"
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
                       <template slot-scope="scope">
                         <div @click="goToCurrentTask(scope.row.id)">
                           {{scope.row.fanhao}}
                         </div>
                       </template>
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
                   </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table
                     :data="tables"
                     :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                     border
                     height="430"
                     :row-class-name="tableRowClassName"
                     @select="selectList"
                     @select-all="selectAll"
                     @row-click="goToCurrentTask"
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
                       <template slot-scope="scope">
                         <div @click="goToCurrentTask(scope.row.id)">
                           {{scope.row.fanhao}}
                         </div>
                       </template>
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
                   </el-table>
          </div>
        </div>
      </div>









    </div>

    <!--筛选条件 -->
    <el-dialog title="筛选条件" :visible.sync="screenVisible" width="90%">
      <div class="container" style="height:400px;overflow:auto">
        <div class="containerDiv">
          <div class="select fl" v-if=" this.a==1">
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
          </div>
          <div class="select fl" v-if=" this.b==1">
            <el-select
              v-model="ch"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="船号">
              <el-option
                v-for="item in chOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.c==1">
            <el-select
              v-model="gw"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="工位">
              <el-option
                v-for="item in gwOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.d==1">
            <el-select
              v-model="xl"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="一贯号">
              <el-option
                v-for="item in xlOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.e==1">
            <el-select
              v-model="scx"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="Code">
              <el-option
                v-for="item in scxOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.f==1">
            <el-select
              v-model="xl"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="PNO">
              <el-option
                v-for="item in xlOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.g==1">
            <el-select
              v-model="xl"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="加工系列">
              <el-option
                v-for="item in xlOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.h==1">
            <el-select
              v-model="scx"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="类型">
              <el-option
                v-for="item in scxOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.i==1">
            <el-select
              v-model="zyz"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder=" 优先级">
              <el-option
                v-for="item in zyzOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.j==1">
            <el-select
              v-model="zyz"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="口径">
              <el-option
                v-for="item in zyzOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="containerBtn">
          <el-button type="success" icon="search" @click="validationScreening">确认筛选</el-button>
        </div>
      </div>
    </el-dialog>


    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <div class="loading-container" v-show="!img">
      <loading></loading>
    </div>
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
        img: "",
        k:"200",


        listData: [],

        listType: "",


        tableData: [],
        cols: [],




        inputWord: '',

        searchWord: '',
        is_search: false,

        message: '',
        HideModal: true,


        left: true,
        zgCenter:false,
        right: false,

        screenVisible:false,


        ooooo: [{"a":0},{"b":0},{"c":0},{"d":0},{"e":0},{"f":1},{"g":0},{"h":1},{"i":1},{"j":1}],

        a:0,
        b:0,
        c:0,
        d:0,
        e:0,
        f:0,
        g:0,
        h:0,
        i:0,
        j:0,



















        batch: "",
        batchOptions: [],

        xl: "",
        xlOptions: [],

        scx: "",
        scxOptions: [],

        gw: "",
        gwOptions: [],

        zyz: "",
        zyzOptions: [],

        ch: "",
        chOptions: [],
        kj:"",






        zuoyezhe:"",
        dqgw:"",

        gwListType:0,
        stationId:""



      }

    },
    components: {Loading, footerNav, Modal, headerNav},
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

      //公共方法显示根据不同工位显示不同的表头和表数据
      showTableData(id,name){
        let that = this;
        axios.all([
          axios.post(" "+ url +"/sys/showTableTitle",{"name":id}),
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu":name})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data;
          }));
      },

      //延迟一名隐藏旋转图
      getLoading() {
        this.img = ["1"]
      },


      //数组的ID的增加

      //列表单独选择
      selectList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
        else {
          this.listData = [];
        }
      },

      //列表全部选择
      selectAll(val){
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
        else {
          this.listData = [];
        }
      },

      //点击每行进行select的选择
      doSelect(val, column, event) {
        this.$refs.moviesTable.toggleRowSelection(val);
      },

      //当点击列表选择改变时对数组的增加和删除
      selectChange(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
        else {
          this.listData = [];
        }
      },


      //根据状态显示不同颜色
      tableRowClassName({row, rowIndex}) {
        if (row.level === 2) {
          return 'warning-row';
        }
        else if (row.level === 1) {
          return 'success-row';
        }
      },



      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          const info = JSON.parse(userInfo);
          this.zuoyezhe = info.username;
          this.dqgw = info.GW;
          this.stationId=info.GH;
          if (info.GW === "小组立") {
            this.listType = "2";
            this.gwListType ="1";
            setTimeout(() => {
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": info.GW, "type": "1"})
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
              axios.post(" " + url + "/importother/showWtqieduanExcel", {"gongxu": info.GW})
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
            this.gwListType ="3";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": info.GW,"type":"3"})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }
          else if (info.GW === "切断" || info.GW === "短管焊" || info.GW === "直管焊") {
            this.listType = "1";
            setTimeout(() => {
              this.showTableData('zxqieduan', this.dqgw)
            }, 1000);
          }
          else {

          }
        }
      },

      //扫码直接前往任务页面
      goToPipePage(searchWord) {
        if(searchWord){
          localStorage.setItem("pipeId", "653");
          localStorage.setItem("IndexUrl", 2);
          this.$router.push("/CurrentTask");
        }
        else {

        }

      },

      //加工完成
      workEnd() {
        if (this.listData.length) {
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": this.listData,
              "zuoyezhe": this.zuoyezhe,
              "gongwei": this.dqgw,
              "type": this.gwListType,
              "stationid":this.stationId
            })
            .then((res) => {
              if (res.data === "1") {
                this.message = "已经完成";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                  that.showTableData('zxqieduan', this.dqgw)
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.message = "请勾选完成的管子";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },

      //前往总清单
      goGeneralListOfProcessing() {
        this.$router.push("/taskList")
      },

      //显示条件筛选
      showScreening() {
       /* this.screenVisible= true;
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/getPiciList"),
          axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
          axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
          axios.post(" " + url + "/sys/dictionaryList", {"id": "11"}),
        ])
          .then(axios.spread(function (pici, scx, gw,xl) {
            that.batchOptions = pici.data;
            that.scxOptions = scx.data;
            that.gwOptions = gw.data;
            that.xlOptions = xl.data;
          }));*/

        let data = this.ooooo;
        for (let i = 0; i < data.length; i++) {
          if (data[i].a == 1) {
            this.a = 1;
          }
          if (data[i].b == 1) {
            this.b = 1;
          }
          if (data[i].c == 1) {
            this.c = 1;
          }
          if (data[i].d == 1) {
            this.d = 1;
          }
          if (data[i].e == 1) {
            this.e = 1;
          }
          if (data[i].f == 1) {
            this.f = 1;
          }
          if (data[i].g == 1) {
            this.g = 1;
          }
          if (data[i].h == 1) {
            this.h = 1;
          }
          if (data[i].i == 1) {
            this.i = 1;
          }
          if (data[i].j == 1) {
            this.j = 1;
          }
        }
        this.screenVisible = true;
      },

      //进行筛选查询
      validationScreening() {
        axios.post(" " + url + "/shengchan/shengchanList.html",
          {
            "gongxu": this.dqgw,
            "jiagongxian": this.scx,
            "pici": this.batch,
            "preGongxu": this.gw,
            "jiagongxilie": this.xl,
            "chuanhao": this.ch,
            "zuoyezhe": this.zyz
          })
          .then((res) => {
            this.screenVisible = false;
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },


      //点击一贯号,Code号，前往前往任务页面
      goToCurrentTask(id) {
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          if (id) {
            localStorage.setItem("pipeId", id);
            this.$router.push("/CurrentTask");
          }
        }
        else {
          //IE取消冒泡事件
          window.event.cancelBubble = true;
          if (id) {
            localStorage.setItem("pipeId", id);
            this.$router.push("/CurrentTask");
          }
        }
      },





      //小组立显示左边
      showLeft() {
        this.left = true;
        this.right = false;
        axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": "小组立","type":"1"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //小组立显示右边
      showRight() {
        this.gwListType = "2";
        axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": "小组立", "type": "2"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          });
        this.left = false;
        setTimeout(() => {
          this.right = true;
        }, 200);

      },

      //支管显示中二正枝左边
      zgShowLeft() {
        this.left = true;
        this.right = false;
        this.zgCenter = false;
        this.gwListType ="3";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断","type":"3"})
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
        this.gwListType ="4";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断","type":"4"})
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
        this.gwListType ="5";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断","type":"5"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },




      //移动显示搜索框
      showSearch() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.width = "100%";
            search.style.position = "fixed";
            search.style.top = 0;
            search.style.zIndex = 999;
          } else if (top <= searchHight) {
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
            search.style.background = "rgba(216, 229, 246,1)"
          }
          else {
            let op = (top / searchHight) * 0.85;
            if(op>0){
              search.style.background = "rgba(216, 229, 246," + op + ")";
            }
            else {
              search.style.background = "rgba(216, 229, 246,1)"
            }
          }
        })

      },

      //显示向上按钮
      showUp() {
        let height = this.$refs.contentTop.offsetHeight;
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


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .ProductionExecutionDiv {
    margin-bottom: 80px;
    .contentTop {
      height: 80px;
      width: 100%;
      background-color: #D8E5F6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .listSearch {
        width: 95%;
        display: flex;
        .listSearchInput {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;

        }
        .listSearchBtn {
          flex: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            height: 35px;
            margin-left: 2%;
          }
        }

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
  .container{
    .containerDiv{
      width: 95%;
      height: 70%;
      margin: 0 auto;
      .select{
        width: 16%;
        height: 50px;
        margin-left: 0.6%;
        .el-select{
          width: 100%;
          font-size: 12px;
        }


      }
    }
    .containerBtn{
      height: 20%;
      width: 95%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        height: 35px;
      }
    }

  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  @media only screen and (max-width: 900px) {
    .container{
      .containerDiv{
        .select{
          width: 30%;
        }
      }
      .containerBtn{
        .el-button {
          width: 35%;
        }
      }

    }
  }

  @media only screen and (max-width:400px) {
    .container{
      .containerDiv{
        height: 80%;
        .select{
          width: 40%;
          margin-left: 0.5%;
        }
      }
      .containerBtn{
        .el-button {
          width: 50%;
        }
      }

    }
  }

  @media only screen and (max-width: 800px) {
    .ProductionExecutionDiv {
      .listSearch {
        .listSearchBtn {
          flex: 2;
          .el-button {
            width: 40%;
            font-size: @font-size-small-s;
          }
        }

      }
    }
  }

</style>
