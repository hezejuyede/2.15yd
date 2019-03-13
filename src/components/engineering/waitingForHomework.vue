<template>
  <div class="ProductionExecution">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="listSearch" v-if="this.listType ==1 || this.listType ==5">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" @click="showScreening">条件筛选</el-button>
            <el-button type="warning" @click="zgMaterialStatistics">直管物料统计</el-button>
            <el-button type="primary" @click="goGeneralListOfProcessing">总清单</el-button>
            <el-button type="danger" @click="workEnd">报完工</el-button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==6 ">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" @click="showScreening">条件筛选</el-button>
            <el-button type="warning" @click="zgMaterialStatistics">短管物料统计</el-button>
            <el-button type="primary" @click="goGeneralListOfProcessing">总清单</el-button>
            <el-button type="danger" @click="workEnd">报完工</el-button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==2 || this.listType ==9">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" @click="showScreening">条件筛选</el-button>
            <el-button type="warning" @click="zgMaterialStatistics">物料统计</el-button>
            <el-button type="primary" @click="goGeneralListOfProcessing">总清单</el-button>
            <el-button type="danger" @click="workEnd">报完工</el-button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==7 || this.listType ==8">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" @click="showScreening">条件筛选</el-button>
            <el-button type="warning" @click="zgMaterialStatistics">一品图预览</el-button>
            <el-button type="primary" @click="goGeneralListOfProcessing">总清单</el-button>
            <el-button type="danger" @click="workEnd">报完工</el-button>
          </div>
        </div>
      </div>

      <!--切断，直管焊，大阻焊-->
      <div class="publicPage" v-if="this.listType ==1 || this.listType ==5 || this.listType ==6">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
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
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
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
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="goToCurrentTask(scope.row.id)">
                  {{ scope.row.codeno }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='yipintu'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeYiPinTu(scope.row.pici,scope.row.yiguanno,scope.row.codeno)">
                  一品图
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='qieduanbiao'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeCutList">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!--小组立-->
      <div class="xzlDiv" v-if="this.listType ==2">
        <div class="xzl-change">
          <div class="change-left" @click="showLeft" >
            <button  :style="{'background-color':this.left ? '#d93f30':''}">
              中二小组立
            </button>
          </div>
          <div class="change-right" @click="showRight" >
            <button  :style="{'background-color':this.right ? '#d93f30':''}">
              中二片付
            </button>
          </div>
        </div>
        <div class="xzl-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tableData"
              height="450"
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='xiaozuli' && col.prop !=='yipintu'"
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
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
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
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="goToCurrentTask(scope.row.id)">
                      {{ scope.row.codeno }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='xiaozuli'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList">小组立表
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='yipintu'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeYiPinTu(scope.row.pici,scope.row.yiguanno,scope.row.codeno)">
                      一品图
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table
              :key="1"
              class="tb-edit"
              :data="tableData"
              height="450"
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='pianfubiao' && col.prop !=='yipintu'"
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
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
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
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="goToCurrentTask(scope.row.id)">
                      {{ scope.row.codeno }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='yipintu'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeYiPinTu(scope.row.pici,scope.row.yiguanno,scope.row.codeno)">
                      一品图
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='pianfubiao'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList">片付表
                    </el-button>
                  </template>
                </el-table-column>
              </template>
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


      <!--43/48装配、45/46装配和大组焊-->
      <div class="publicPage" v-if="this.listType ==7 || this.listType ==8 || this.listType ==9">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="ycb"
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
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table class="tb-edit"
                        :data="scope.row.list"
                        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                        border
                        highlight-current-row
                        style="width: 98%;margin: auto">
                <template v-for="(col ,index) in scope.row.title">
                  <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                </template>
              </el-table>
            </template>
          </el-table-column>
          <template v-for="(col ,index) in yct">
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
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
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
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="goToCurrentTask(scope.row.id)">
                  {{ scope.row.codeno }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='yipintu'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeYiPinTu(scope.row.pici,scope.row.yiguanno,scope.row.codeno)">
                  一品图
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='qieduanbiao'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeCutList">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>

        </el-table>
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
          <div class="select fl" v-if=" this.c==1">
            <el-select
              v-model="gw"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="前工位">
              <el-option
                v-for="item in gwOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.b==1">
            <el-input v-model="ch" placeholder="船号"></el-input>
          </div>
          <div class="select fl" v-if=" this.d==1">
            <el-input v-model="ygh" placeholder="一贯号"></el-input>
          </div>
          <div class="select fl" v-if=" this.e==1">
            <el-input v-model="codeN" placeholder="code号"></el-input>
          </div>
          <div class="select fl" v-if=" this.f==1">
            <el-input v-model="PNO" placeholder="PNO"></el-input>
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
              v-model="typeSelect"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="类型">
              <el-option
                v-for="item in typeSelectOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.i==1">
            <el-select
              v-model="yxj"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder=" 优先级">
              <el-option
                v-for="item in yxjOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.j==1">
            <el-select
              v-model="kj"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="口径">
              <el-option
                v-for="item in kjOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.l==1">
            <el-select
              v-model="scx"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="生产线">
              <el-option
                v-for="item in scxOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.m==1">
            <el-select
              v-model="bihou"
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="壁厚">
              <el-option
                v-for="item in bihouOptions"
                :key="item.indexno"
                :label="item.name"
                :value="item.indexno">
              </el-option>
            </el-select>
          </div>
          <div class="select fl" v-if=" this.n==1">
            <el-input v-model="qianzuoyezhe" placeholder="前作业者"></el-input>
          </div>
        </div>
        <div class="containerBtn">
          <el-button type="danger" @click="screenVisible = false">关闭窗口</el-button>
          <el-button type="warning" icon="search" @click="emptyAllValue">一键清空</el-button>
          <el-button type="success" icon="search" @click="validationScreening">确认筛选</el-button>
        </div>
      </div>
    </el-dialog>

    <!--查看图纸 -->
    <el-dialog title="一品图查看" :visible.sync="drawingVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="drawingVisible = false">关闭窗口</el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <div class="drawingImg" style="width: 100%;height: 100%">
          <img :src="url" alt="" style="display:block;height: 100%;width: 100%">
        </div>
      </div>
    </el-dialog>

    <!--查看切断表 -->
    <el-dialog title="切断表查看" :visible.sync="qdbVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="qdbVisible = false">关闭窗口</el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <div class="drawingImg" style="width: 100%;height: 100%">
          <img :src="url" alt="" style="display:block;height: 100%;width: 100%">
        </div>
      </div>
    </el-dialog>

    <!-- 报完工提醒框 -->
    <el-dialog title="报完工提醒" :visible.sync="endVisible" width="300px" center>
      <div class="del-dialog-cnt">完成不可恢复，是否确定完成？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="endVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doWorkEnd" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>


    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <div class="loading-container" v-show="!img.length">
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
        message: '',  //组件弹出框的信息
        HideModal: true, //组件是否弹出
        img: [],   //转圈img数组

        tableData: [],//总数据的表数据
        cols: [],     //总数据的表头

        zuoyezhe: "",   //用户名
        dqgw: "",       //中文工位名字
        stationId: "",  //工位对应的ID


        url: "",   //一品图和切断表的URL地址

        listData: [],  //点击复选框中对ID的数组

        listType: "",


        inputWord: '',//扫码的Value

        searchWord: '',//智能检索的value
        is_search: false,

        gwType: 1,//一种工位有几种类型，

        screenVisible: false,
        drawingVisible: false,
        endVisible: false,
        qdbVisible: false,


        left: true,
        zgCenter: false,
        right: false,


        gwListType: 0,


        batch: "",
        batchOptions: [],

        ch: "",
        chOptions: [],

        gw: "",
        gwOptions: [],

        ygh: "",
        codeN: "",
        PNO: "",


        xl: "",
        xlOptions: [],

        typeSelect: "",
        typeSelectOptions: [],


        yxj: "",
        yxjOptions: [],

        kj: "",
        kjOptions: [],

        scx: "",
        scxOptions: [],

        bihou: "",
        bihouOptions: [],
        qianzuoyezhe: "",


        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        l: 0,
        m: 0,
        n: 0,


        arrAll: [],
        num: 1,
        znSearch: true,

        yct: [
          {"prop": "type", "label": "类型"},
          {"prop": "context", "label": "描述"},
          {"prop": "succount", "label": "成功数"},
          {"prop": "failcount", "label": "失败数"},
          {"prop": "allcount", "label": "总数"},
          {"prop": "pici", "label": "批次"},
          {"prop": "createtimeStr", "label": "操作时间"}
        ],
        ycb: [
          {
            "createtime": 1551009488120,
            "createtimeStr": "2019-02-24 19:58:08",
            "failcount": 0,
            "context": "切断表同步到数据库",
            "succount": 0,
            "id": 149,
            "allcount": 0,
            "pici": "20190222",
            "type": "1",
            "title": [
              {"prop": "type", "label": "类型"},
              {"prop": "context", "label": "描述"},
              {"prop": "succount", "label": "成功数"},
              {"prop": "failcount", "label": "失败数"},
              {"prop": "allcount", "label": "总数"},
              {"prop": "pici", "label": "批次"},
              {"prop": "createtimeStr", "label": "操作时间"}
            ],
            "list": [
              {
                "createtime": 1551009488120,
                "createtimeStr": "2019-02-24 19:58:08",
                "failcount": 0,
                "context": "切断表同步到数据库",
                "succount": 0,
                "id": 149,
                "allcount": 0,
                "pici": "20190222",
                "type": "1",
              },
              {
                "createtime": 1551009488120,
                "createtimeStr": "2019-02-24 19:58:08",
                "failcount": 0,
                "context": "切断表同步到数据库",
                "succount": 0,
                "id": 149,
                "allcount": 0,
                "pici": "20190222",
                "type": "1",
              }
            ],
          },
          {
            "createtime": 1551009488120,
            "createtimeStr": "2019-02-24 19:58:08",
            "failcount": 0,
            "context": "切断表同步到数据库",
            "succount": 0,
            "id": 149,
            "allcount": 0,
            "pici": "20190222",
            "type": "1",
            "title": [
              {"prop": "type", "label": "类型"},
              {"prop": "context", "label": "描述"},
              {"prop": "succount", "label": "成功数"},
              {"prop": "failcount", "label": "失败数"},
              {"prop": "allcount", "label": "总数"},
              {"prop": "pici", "label": "批次"},
              {"prop": "createtimeStr", "label": "操作时间"}
            ],
            "list": [
              {
                "createtime": 1551009488120,
                "createtimeStr": "2019-02-24 19:58:08",
                "failcount": 0,
                "context": "切断表同步到数据库",
                "succount": 0,
                "id": 149,
                "allcount": 0,
                "pici": "20190222",
                "type": "1",
              },
              {
                "createtime": 1551009488120,
                "createtimeStr": "2019-02-24 19:58:08",
                "failcount": 0,
                "context": "切断表同步到数据库",
                "succount": 0,
                "id": 149,
                "allcount": 0,
                "pici": "20190222",
                "type": "1",
              }
            ],
          }
        ]

      }

    },
    components: {Loading, footerNav, Modal, headerNav},
    mounted() {
      //点击向上按钮返回头部
      this.showUp();

      //往下滑动动态固定搜索框
      this.showSearch();

      //搜索框颜色变化
      this.bianse();

      //切断工位每隔5分钟刷新一下数据
      setInterval(() => {
        this.qdWorkStationGetDataList(this.stationId)
      }, 50000)

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

      //转圈延迟一秒执行
      setTimeout(() => {
        this.getLoading();
      }, 100);

    },
    methods: {
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
          this.stationId = info.GH;
          if (info.GW === "切断") {
            this.listType = "1";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "直管焊") {
            this.listType = "5";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "短管焊") {
            this.listType = "6";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "小组立") {
            this.listType = "2";
            this.gwListType = "1";
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 1, "type": 1}),
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": "小组立", "type": "1"})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
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
            this.gwListType = "3";
            setTimeout(() => {
              axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": info.GW, "type": "3"})
                .then((res) => {
                  this.tableData = res.data;
                })
                .catch((err) => {
                  console.log(err)
                })
            }, 1000);
          }

          else if (info.GW === "43/48装配") {
            this.listType = "7";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "45/46装配") {
            this.listType = "8";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "大组焊") {
            this.listType = "9";
            /*  this.showTableData(this.stationId, this.dqgw,1,1)*/
          }
          else {

          }
        }
      },


      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },

      //切断工位每隔5分钟刷新一下数据
      qdWorkStationGetDataList(workStation) {
        if (workStation === 1) {
          this.showTableData(this.stationId, this.dqgw, 1, 1)
        }
      },

      //公共方法显示根据不同工位显示不同的表头和表数据
      showTableData(id, name, wz, type) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": name})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data.data;
            that.arrAll = table.data;
            let arr = [];
            for (let i = 0; i < that.arrAll.length; i++) {
              if (i < 9) {
                arr.push(that.arrAll[i])
              }
            }
            that.tableData = arr;
          }));
      },


      //失去焦点后进行智能检索
      searchData(search) {
        if (search) {
          this.znSearch = false;
          this.arrAll.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).indexOf(search) > -1
            })
          });
          if (this.arrAll.length > 1) {
            this.tableData = this.arrAll.filter(function (dataNews) {
              return Object.keys(dataNews).some(function (key) {
                return String(dataNews[key]).indexOf(search) > -1
              })
            })
          }
        }
        else {
          this.znSearch = true
        }
        console.log(this.tableData);
      },

      //输入框为空值时需要执行的数据
      searchEmptyData(search) {
        if (!search) {
          this.znSearch = true
        }
      },

      //每次往表格数据里添加数据
      addData(index) {
        let arr = [];
        for (let i = 0; i < this.arrAll.length; i++) {
          if (i < index) {
            arr.push(this.arrAll[i])
          }
        }
        this.tableData = arr;
      },

      //每次到底部给计算出需要下次添加的数据
      tableLoadingMore() {
        if (this.znSearch === true && this.tableData.length < this.arrAll.length) {
          this.num++;
          let index = 8 * this.num;
          this.addData(index)
        }

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
      selectAll(val) {
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
          return 'red-row';
        }
        else if (row.level === 1) {
          return 'yellow-row';
        }
        else if (row.status === 7) {
          return 'gray-row';
        }
      },


      //扫码直接前往任务页面
      goToPipePage(searchWord) {
        if (searchWord) {
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
          this.endVisible = true;
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

      //进行加工完成
      doWorkEnd() {
        axios.post(" " + url + "/shengchan/updateStatusBatch",
          {
            "ids": this.listData,
            "zuoyezhe": this.zuoyezhe,
            "gongwei": this.dqgw,
            "type": this.gwListType,
            "stationid": this.stationId
          })
          .then((res) => {
            if (res.data === "1") {
              this.endVisible = false;
              this.message = "已经完成";
              this.HideModal = false;
              const that = this;

              function a() {
                that.message = "";
                that.HideModal = true;
                that.showTableData(this.stationId, this.dqgw, 1, 1)
              }

              setTimeout(a, 2000);
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //直管物料统计
      zgMaterialStatistics() {

      },

      //前往总清单
      goGeneralListOfProcessing() {
        this.$router.push("/taskList")
      },


      //查看一品图
      seeYiPinTu(pici, yiguanhao, code) {
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          if (pici && yiguanhao && code) {
            axios.post(" " + url + "/yipintu/getYipintuImg.html", {"pici": pici, "yiguanhao": yiguanhao, "code": code})
              .then((res) => {
                if (res.data.imgurl) {
                  this.url = url + res.data.imgurl;
                  this.drawingVisible = true;
                }
                else {
                  this.message = "没有查到一品图";
                  this.HideModal = false;
                  const that = this;

                  function a() {
                    that.message = "";
                    that.HideModal = true;
                  }

                  setTimeout(a, 2000);
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
          else {
            this.message = "信息不全无法查询";
            this.HideModal = false;
            const that = this;

            function b() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(b, 2000);
          }
        }
        else {
          //IE取消冒泡事件
          window.event.cancelBubble = true;
          if (pici && yiguanhao && code) {
            axios.post(" " + url + "/yipintu/getYipintuImg.html", {"pici": pici, "yiguanhao": yiguanhao, "code": code})
              .then((res) => {
                if (res.data.imgurl) {
                  this.url = url + res.data.imgurl;
                  this.drawingVisible = true;
                }
                else {
                  this.message = "没有查到一品图";
                  this.HideModal = false;
                  const that = this;

                  function a() {
                    that.message = "";
                    that.HideModal = true;
                  }

                  setTimeout(a, 2000);
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
          else {
            this.message = "信息不全无法查询";
            this.HideModal = false;
            const that = this;

            function b() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(b, 2000);
          }
        }
      },


      //查看切断表
      seeCutList() {
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          axios.post(" " + url + "/show/showExcelImg")
            .then((res) => {
              if (res.data) {
                this.url = url + res.data;
                this.qdbVisible = true;
              }
              else {
                this.message = "没有查到切断表";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          //IE取消冒泡事件
          window.event.cancelBubble = true;

        }

      },


      //显示条件筛选
      showScreening() {
        this.screenVisible = true;
        axios.post(" " + url + "/show/showSelect", {"id": this.stationId})
          .then((res) => {
            let data = res.data;
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
              if (data[i].l == 1) {
                this.l = 1;
              }
              if (data[i].m == 1) {
                this.m = 1;
              }
              if (data[i].n == 1) {
                this.n = 1;
              }
            }

            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/getPiciList"),
              axios.post(" " + url + "/api/getPersonProcessList", {"name": ""}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": "11"}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": "9"}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": "22"}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": "4"}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": "21"}),
              axios.post(" " + url + "/sys/dictionaryList", {"id": ""})
            ])
              .then(axios.spread(function (pici, gw, xl, scx, type, yxj, kj, bihou) {
                that.batchOptions = pici.data;
                that.gwOptions = gw.data;
                that.xlOptions = xl.data;
                that.typeSelectOptions = type.data;
                that.yxjOptions = yxj.data;
                that.kjOptions = kj.data;
                that.scxOptions = scx.data;
                that.bihouOptions = bihou.data;
              }));
          })
          .catch((err) => {
            console.log(err)

          });
      },

      //进行筛选查询
      validationScreening() {
        axios.post(" " + url + "/shengchan/shengchanList.html",
          {
            "type": this.gwType,
            "gongxu": this.dqgw,
            "jiagongxian": this.scx,
            "pici": this.batch,
            "preGongxu": this.gw,
            "jiagongxilie": this.xl,
            "chuanhao": this.ch,
            "yiguanhao": this.ygh,
            "typeSelect": this.typeSelect,
            "koujing": this.kj,
            "youxianji": this.yxj,
            "pno": this.PNO,
            "bihou": this.bihou,
            "codeN": this.codeN,
            "zuoyezhe": this.qianzuoyezhe
          })
          .then((res) => {
            this.screenVisible = false;
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //清空筛选条件
      emptyAllValue() {
        this.batch = "";
        this.ch = "";
        this.gw = "";
        this.ygh = "";
        this.codeN = "";
        this.PNO = "";
        this.xl = "";
        this.typeSelect = "";
        this.yxj = "";
        this.kj = "";
        this.scx = "";
        this.bihou = "";
        this.qianzuoyezhe = "";
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
        this.cols= [];
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 1, "type": 1}),
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": "小组立", "type": "1"})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data.data;
            that.tableData = table.data;
          }));
        this.left = true;
        this.right = false;
        this.gwType = 1;
      },

      //小组立显示右边
      showRight() {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 1, "type": 2}),
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": "小组立", "type": "2"})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data.data;
            that.tableData = table.data;
          }));
        this.left = false;
        this.gwType = 2;
        this.gwListType = "2";
        setTimeout(() => {
          this.right = true;
        }, 200)
      },

      //支管显示中二正枝左边
      zgShowLeft() {
        this.left = true;
        this.right = false;
        this.zgCenter = false;
        this.gwListType = "3";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断", "type": "3"})
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
        this.gwListType = "4";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断", "type": "4"})
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
        this.gwListType = "5";
        axios.post(" " + url + "/importother/showOtherZgbExcelPad", {"gongxu": "枝管切断", "type": "5"})
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
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
            if (op > 0) {
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
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;

        }
        .listSearchBtn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            height: 50px;
            margin-left: 2%;
          }
        }

      }
    }

    .xzlDiv {
      .xzl-change {
        height: 60px;
        display: flex;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          button{
            width: 50%;
            height: 50px;
            border-radius: 10px;
            background-color: #409EFF;
            color: @color-white;
            border: none;
          }
        }
        .change-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          button{
            width: 50%;
            height: 50px;
            border-radius: 10px;
            background-color: #409EFF;
            color: @color-white;
            border: none;
          }
        }
      }

    }
    .zgDiv {
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

  .closeBtn {
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

  .container {
    .containerDiv {
      width: 95%;
      height: 70%;
      margin: 0 auto;
      .select {
        width: 16%;
        height: 50px;
        margin-left: 0.6%;
        .el-select {
          width: 100%;
          font-size: 12px;
        }

      }
    }
    .containerBtn {
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
    .container {
      .containerDiv {
        .select {
          width: 30%;
        }
      }
      .containerBtn {
        .el-button {
          width: 35%;
        }
      }

    }
  }

  @media only screen and (max-width: 400px) {
    .container {
      .containerDiv {
        height: 80%;
        .select {
          width: 40%;
          margin-left: 0.5%;
        }
      }
      .containerBtn {
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
