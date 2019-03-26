<template>
  <div class="ProductionExecution">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="listSearch"
             v-if="this.listType ==1 || this.listType ==5 || this.listType ==4 || this.listType ==3|| this.listType ==11">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="zgMaterialStatistics">直管物料统计</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
            <button @click="workEnd">报完工</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==6 ">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="dgMaterialStatistics">短管物料统计</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
            <button @click="workEnd">报完工</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==2">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="materialStatistics">物料统计</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
            <button @click="workEnd">报完工</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==9">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="materialStatistics">物料统计</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==7 || this.listType ==8 || this.listType ==10">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="yptLook">一品图预览</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
          </div>
        </div>
      </div>

      <!--切断-->
      <div class="publicPage" v-if="this.listType ==1 ">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tableData"
          height="500"
          border
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
                  @click="seeCutList(scope.row.id,scope.row.pici)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>


      <!--直管焊，短管焊，弯头切断-->
      <div class="publicPage" v-if="this.listType ==5 || this.listType ==6 ||this.listType ==3">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          height="500"
          border
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
                  @click="seeCutList(scope.row.id,scope.row.pici)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>


      <!--43/48装配、45/46装配和大组焊-->
      <div class="publicPage" v-if="this.listType ==7 || this.listType ==8 || this.listType ==9">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          height="500"
          border
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="doSelect"
          @selection-change="selectChange"
          ref="moviesTable"
          style="width: 99%;margin: 0 auto">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table class="tb-edit"
                        :data="scope.row.list"
                        :header-cell-style="{background:'#f0f0f0',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                        border
                        highlight-current-row
                        style="width: 98%;margin: auto">
                <template v-for="(col ,index) in scope.row.title">
                  <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                </template>
              </el-table>
            </template>
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
                  @click="goToCurrentTask(
                  scope.row.id,
                  scope.row.jiagongxilie,
                  scope.row.koujing,
                  scope.row.shipcode,
                  scope.row.yiguanno,
                  scope.row.codeno,
                  scope.row.pno
                  )">
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
                  @click="goToCurrentTask(
                  scope.row.id,
                  scope.row.jiagongxilie,
                  scope.row.koujing,
                  scope.row.shipcode,
                  scope.row.yiguanno,
                  scope.row.codeno,
                  scope.row.pno)">
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
                  @click="seeCutList(scope.row.id,scope.row.pici)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!--弯头焊-->
      <div class="publicPage" v-if="this.listType ==11">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          height="500"
          border
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
                  @click="wthGoToCurrentTask(
                  scope.row.pici,
                  scope.row.fuhao,
                  scope.row.yiguanno,
                  scope.row.codeno)">
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
                  @click="wthGoToCurrentTask(
                  scope.row.pici,
                  scope.row.fuhao,
                  scope.row.yiguanno,
                  scope.row.codeno)">
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
                  @click="seeCutList(scope.row.id,scope.row.pici)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>

        </el-table>
      </div>

      <!--弯管-->
      <div class="publicPage" v-if="this.listType ==10">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          height="500"
          border
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="doSelect"
          @selection-change="selectChange"
          ref="moviesTable"
          style="width: 99%;margin: 0 auto">
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
                  @click="goToCurrentTask(
                  scope.row.id,
                  scope.row.jiagongxilie,
                  scope.row.koujing,
                  scope.row.shipcode,
                  scope.row.yiguanno,
                  scope.row.codeno,
                  scope.row.pno)">
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
                  @click="goToCurrentTask(
                  scope.row.id,
                  scope.row.jiagongxilie,
                  scope.row.koujing,
                  scope.row.shipcode,
                  scope.row.yiguanno,
                  scope.row.codeno,
                  scope.row.pno)">
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
                  @click="seeCutList(scope.row.id,scope.row.pici)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!--小组立-->
      <div class="xzlDiv" v-if="this.listType ==2">
        <div class="xzl-change">
          <div class="change-left" @click="showLeft">
            <button
              :style="{
             'background-color':this.left ? '#2A437B':'',
             'color':this.left ? '#ffffff':''}">
              中二小组立
            </button>
          </div>
          <div class="change-right" @click="showRight">
            <button
              :style="{
             'background-color':this.right ? '#2A437B':'',
             'color':this.right  ? '#ffffff':''}">
              中二片付
            </button>
          </div>
        </div>
        <div class="xzl-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'14px'}"
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
                  v-if="col.prop =='pici'"
                  width="85"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='pno'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='guige'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='hujing'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='houdu'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='lianjiexinxi'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='qieduanchang'"
                  width="70"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='beizhu'"
                  width="55"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='jiagongxilie'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='typeStr'"
                  width="52"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='levelStr'"
                  width="70"
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
                      @click="seeXzlList(scope.row.id,scope.row.pici)">小组立表
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
              :data="tables"
              height="450"
              border
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='pianfubiao'  && col.prop !=='jinwuzhu' && col.prop !=='yipintu'"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="150"
                  v-if="col.prop==='jinwuzhu'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.jinwuzhu }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='yiguanno'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.yiguanno }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='codeno'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.codeno }}
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
                      @click="seeCutList(scope.row.id)">片付表
                    </el-button>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </div>
      </div>

      <!-- 枝管切断-->
      <div class="zgDiv" v-if="this.listType ==4">
        <div class="zg-change">
          <div class="change-left" @click="zgShowLeft">
            <button
              :style="{
             'background-color':this.left ? '#2A437B':'',
             'color':this.left ? '#ffffff':''}">
              正枝
            </button>
          </div>
          <div class="change-left2" @click="zgShowLeft2">
            <button
              :style="{
             'background-color':this.left2 ? '#2A437B':'',
             'color':this.left2 ? '#ffffff':''}">
              斜枝
            </button>
          </div>
          <div class="change-center" @click="zgShowCenter">
            <button
              :style="{
             'background-color':this.zgCenter ? '#2A437B':'',
             'color':this.zgCenter ? '#ffffff':''}">
              偏心枝
            </button>
          </div>
          <div class="change-right" @click="zgShowRight">
            <button
              :style="{
              'background-color':this.right ? '#2A437B':'',
              'color':this.right ? '#ffffff':''}">
              母管表
            </button>
          </div>
          <div class="change-right2" @click="zgShowRight2">
            <button
              :style="{
              'background-color':this.right2 ? '#2A437B':'',
              'color':this.right2 ? '#ffffff':''}">
              支架管
            </button>
          </div>
        </div>
        <div class="zg-list">
          <div class="saoMa" v-if="left === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='zzb' && col.prop !=='yipintu'"
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
                  v-if="col.prop==='zzb'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList(scope.row.id)">正枝表
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
          <div class="saoMa" v-if="left2 === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='xzb' && col.prop !=='yipintu'"
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
                  v-if="col.prop==='xzb'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList(scope.row.id)">斜枝表
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
          <div class="account" v-if="zgCenter === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='pxz' && col.prop !=='yipintu'"
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
                  v-if="col.prop==='pxz'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList(scope.row.id)">偏心枝表
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
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
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
                      @click="seeCutList(scope.row.id)">母管开孔表
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
          <div class="account" v-if="right2 === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              height="450"
              border
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
                      @click="seeCutList(scope.row.id)">支架管表
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

    <!--查看一品图 -->
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
    <el-dialog title="工位表查看" :visible.sync="qdbVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="qdbVisible = false">关闭窗口</el-button>
        <!-- <el-button type="primary" @click="gwbDoWorkEnd">报完工</el-button>-->
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <el-table
          :data="qdbData"
          height="640"
          :header-cell-style="{
            background:'#f0f0f0',
            border: '1px solid #303133',
            fontSize:'12px',
            color:'rgba(0, 0, 0, 1)'}"
          :cell-style="{
             border: '1px solid #303133',
             fontSize:'12px'
            }"

          style="width: 100%;border: 1px solid #303133">
          <el-table-column
            align="center"
            prop="type"

            label="管种">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shipcode"
            label="船番NE0"
            width="70">
          </el-table-column>
          <el-table-column
            align="center"
            prop="waijingchang"
            label="外径"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bihou"
            label="壁厚"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            prop="waijing"
            label="母管长"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="pno"
            label="PNo"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            prop="jiagongxilie"
            label="加工系列"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="yiguanhao"
            label="一贯号"
            width="65">
          </el-table-column>
          <el-table-column
            align="center"
            prop="codeno"
            label="代码No"
            width="70">
          </el-table-column>
          <el-table-column
            width="70"
            prop="qieduanchang"
            align="center"
            label="切断长">
          </el-table-column>
          <el-table-column
            align="center"
            prop="guanduan"
            label="管端"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            prop="wanqu"
            width="55"
            label="弯曲">
          </el-table-column>
          <el-table-column
            align="center"
            prop="albl"
            label="备注">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!--查看小组立表 -->
    <el-dialog title="小组立表查看" :visible.sync="xzlVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="xzlVisible = false">关闭窗口</el-button>
        <el-button type="primary" @click="gwbDoWorkEnd">报完工</el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <el-table
          :data="xzlData"
          height="640"
          :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'12px',
            color:'rgba(0, 0, 0, 1)'}"
          :cell-style="{
             border: '1px solid #303133',
             fontSize:'12px'
            }"
          style="width: 100%;border: 1px solid #303133">
          <!--  <el-table-column
              align="center"
              prop="indexno"
              label="序号"
              width="50">
            </el-table-column>-->
          <el-table-column
            align="center"
            prop="chuanhao"
            label="船番NE0"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="jiagongxilie"
            label="加工系列"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="yiguanhao"
            label="一贯番号"
            width="57">
          </el-table-column>
          <el-table-column
            align="center"
            prop="daihao"
            label="代号"
            width="50">
          </el-table-column>
          <el-table-column align="center" label="管材">
            <el-table-column
              align="center"
              prop="pno"
              label="PNo"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              prop="guige"
              label="规格"
              width="53">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hujing"
              label="呼径"
              width="51">
            </el-table-column>
            <el-table-column
              align="center"
              prop="houdu"
              label="厚度"
              width="51">
            </el-table-column>
            <el-table-column
              width="70"
              prop="qieduanchang"
              align="center"
              label="切断长">
            </el-table-column>
            <el-table-column
              width="50"
              prop="danwei"
              align="center"
              label="单位">
            </el-table-column>
            <el-table-column
              align="center"
              prop="guanduan"
              label="管端"
              width="70">
            </el-table-column>
            <el-table-column
              align="center"
              prop="jiaodu"
              label="角度"
              width="55">
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            prop="lianjiexinxi"
            label="连接信息"
            width="53">
          </el-table-column>
          <el-table-column align="center" label="金物">
            <el-table-column
              align="center"
              prop="pinming"
              label="品名（注番）.">
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            prop="guanduan2"
            label="管端"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="beizhu"
            label="备注"
            width="60">
          </el-table-column>
        </el-table>
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

    <!--  特定工位提醒框 -->
    <el-dialog title="当前管信息确认" :visible.sync="tdVisible" width="80%" center>
      <div class="tdContainer" style="height:400px;overflow:auto">
        <div class="tdContainerDiv" v-if="this.dqgw ==='43/48装配' || this.dqgw ==='45/46装配' || this.dqgw ==='大组焊'">
          <el-table
            border
            class="tb-edit"
            :data="tdTableData"
            :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
            :row-class-name="tableRowClassName"
            ref="moviesTable"
            style="width: 99%;margin: 0 auto">
            <template v-for="(col ,index) in tdCols2">
              <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
            </template>
          </el-table>
        </div>
        <div class="tdContainerDiv" v-if="this.dqgw ==='弯管'">
          <el-table
            border
            class="tb-edit"
            :data="tdTableData"
            :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
            :row-class-name="tableRowClassName"
            ref="moviesTable"
            style="width: 99%;margin: 0 auto">
            <template v-for="(col ,index) in tdCols">
              <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
            </template>
          </el-table>
        </div>
        <div class="tdContainerBtn">
          <el-button type="danger" @click="tdVisible = false">信息不符，退出作业</el-button>
          <el-button type="success" icon="search" @click="tdGoToCurrentTask">核对正确，开始作业</el-button>
        </div>
      </div>
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
        listType: "",   //根据工位控制显示与隐藏内容模块


        message: '',  //组件弹出框的信息
        HideModal: true, //组件是否弹出
        img: [],   //转圈img数组


        arrAll: [],//优化页面的，第一次加载需要容器数据

        num: 1,

        znSearch: true,   //是否查询


        tableData: [],//总数据的表数据
        cols: [],     //总数据的表头
        xzlData: [],     //小组立表数据
        qdbData: [],     //切断表数据
        tdTableData: [],  //特定工位的表数据
        tdCols: [
          {"prop": "chuanhao", "label": "船号"},
          {"prop": "yiguanhao", "label": "一贯号"},
          {"prop": "codeno", "label": "Code"},
          {"prop": "pno", "label": "PNO"},
          {"prop": "koujing", "label": "口径"},
          {"prop": "jiagongxilie", "label": "加工系列"},
        ],    //特定工位的表头
        tdCols2: [
          {"prop": "chuanhao", "label": "船号"},
          {"prop": "yiguanhao", "label": "一贯号"},
          {"prop": "codeno", "label": "Code"},
          {"prop": "jiagongxilie", "label": "加工系列"},
        ],    //特定工位的表头


        zuoyezhe: "",   //用户名
        dqgw: "",       //中文工位名字
        stationId: "",  //工位对应的ID


        url: "",   //一品图和切断表的URL地址

        listData: [],  //点击复选框中对ID的数组

        id: "",        //管子的ID


        inputWord: '',//扫码的Value

        searchWord: '',//智能检索的value
        is_search: false,

        gwType: 1,//一种工位有几种类型，

        screenVisible: false,   //筛选条件弹出框
        drawingVisible: false,  // 一品图弹出框
        endVisible: false,     //报完工提醒弹出框
        qdbVisible: false,    //工位表查看弹出框
        tdVisible: false,    //特定工位提醒框
        xzlVisible: false,   //小组里表弹出框

        left: true,    //        显示最左边
        left2: false,    //      显示左二
        zgCenter: false,    //   显示中间
        right: false,    //      显示最右边
        right2: false,    //     显示右二


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
      }, 300000)

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
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {
                "stationid": that.stationId,
                "weizhiid": 1,
                "type": 1
              }),
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": that.dqgw, "type": 1})
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
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "枝管切断") {
            this.listType = "4";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "弯头切断") {
            this.listType = "3";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
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
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "弯管") {
            this.listType = "10";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "弯头焊") {
            this.listType = "11";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
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
          let that = this;
          axios.all([
            axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": that.dqgw})
          ])
            .then(axios.spread(function (table) {
              that.arrAll = table.data;
              let arr = [];
              for (let i = 0; i < that.arrAll.length; i++) {
                if (i < 9) {
                  arr.push(that.arrAll[i])
                }
              }
              that.tableData = arr;
            }));
        }
      },

      //公共方法显示根据不同工位显示不同的表头和表数据
      showTableData(id, name, wz, type) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
          axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": name, "type": type})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data.data;
            that.tableData = table.data;
          }));
      },

      //失去焦点后进行智能检索
      searchData(search) {
        if (this.dqgw === "切断") {
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
        }
      },

      //输入框为空值时需要执行的数据
      searchEmptyData(search) {
        if (this.dqgw === "切断") {
          if (!search) {
            this.znSearch = true;
            let arr = [];
            for (let i = 0; i < this.arrAll.length; i++) {
              if (i < 9) {
                arr.push(this.arrAll[i])
              }
            }
            this.tableData = arr;
          }
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
        if (this.dqgw === "切断" && this.znSearch === true && this.tableData.length < this.arrAll.length) {
          this.num++;
          let index = 8 * this.num;
          this.addData(index)
        }
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
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": searchWord,
            })
            .then((res) => {
              if (res.data === "1") {
                localStorage.setItem("pipeId", "653");
                localStorage.setItem("IndexUrl", 2);
                this.$router.push("/CurrentTask");
              }
              else {


              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {
          this.message = "扫不到管子信息";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);

        }
      },

      //在工位表里报完工
      gwbDoWorkEnd() {
        axios.post(" " + url + "/shengchan/updateStatusBatch",
          {
            "ids": [this.id],
            "zuoyezhe": this.zuoyezhe,
            "gongwei": this.dqgw,
            "type": this.gwListType,
            "stationid": this.stationId
          })
          .then((res) => {
            if (res.data === "1") {
              this.showTableData(this.stationId, this.dqgw, 1, 1);
              this.$message.success(`报完工成功`);
              let that = this;
              setTimeout(() => {
                that.qdbVisible = false;
                that.xzlVisible = false;
              }, 1000)
            }
            else {
              this.$message.warning(`报完工失败`);
            }
          })
          .catch((err) => {
            console.log(err)
          })
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
        if (this.dqgw === "切断") {
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": this.listData,
              "zuoyezhe": this.zuoyezhe,
              "gongwei": this.dqgw,
              "type": this.gwType,
              "stationid": this.stationId,
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
                  axios.all([
                    axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": that.dqgw, "type": 1})
                  ])
                    .then(axios.spread(function (table) {
                      that.arrAll = table.data;
                      let arr = [];
                      for (let i = 0; i < that.arrAll.length; i++) {
                        if (i < 9) {
                          arr.push(that.arrAll[i])
                        }
                      }
                      that.tableData = arr;
                    }));
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": this.listData,
              "zuoyezhe": this.zuoyezhe,
              "gongwei": this.dqgw,
              "type": this.gwType,
              "stationid": this.stationId,
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
                  that.showTableData(that.stationId, that.dqgw, 1, that.gwType)
                }

                setTimeout(a, 2000);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },


      //直管物料统计
      zgMaterialStatistics() {

      },

      //短管物料统计
      dgMaterialStatistics() {

      },
      
      // 物料统计
      materialStatistics() {

      },

      //一拼图预览
      yptLook() {

      },

      //前往总清单
      goGeneralListOfProcessing() {
        this.$router.push("/taskList");

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

            function c() {
              that.message = "";
              that.HideModal = true;
            }

            setTimeout(c, 2000);
          }
        }
      },


      //查看切断表
      seeCutList(id, pici) {
        this.id = id;
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          axios.post(" " + url + "/importother/publicData", {"code": "qieduan", "pici": pici})
            .then((res) => {
              if (res.data) {
                this.qdbData = res.data;
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


      //查看小组立表
      seeXzlList(id, pici) {
        this.id = id;
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          axios.post(" " + url + "/importother/showXiaozuliExcel", {"pici": pici})
            .then((res) => {
              if (res.data) {
                this.xzlData = res.data;
                this.xzlVisible = true;
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
        if (this.dqgw === "切断") {
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
              this.arrAll = res.data;
              let arr = [];
              for (let i = 0; i < this.arrAll.length; i++) {
                if (i < 9) {
                  arr.push(this.arrAll[i])
                }
              }
              this.tableData = arr;
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
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
        }


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
      goToCurrentTask(id, jiagongxilie, koujing, shipcode, yiguanno, codeno, pno) {
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          if (id) {
            this.id = id;
            if (this.dqgw === "弯管" || this.dqgw === "43/48装配" || this.dqgw === "45/46装配" || this.dqgw === "大组焊") {
              localStorage.setItem("pipeId", id);
              this.tdVisible = true;
              this.tdTableData = [{
                "jiagongxilie": jiagongxilie,
                "yiguanhao": yiguanno,
                "codeno": codeno,
                "koujing": koujing,
                "chuanhao": shipcode,
                "pno": pno
              }];
            }
            else if (this.dqgw === "枝管切断") {

              localStorage.setItem("pipeId", id);
              this.$router.push({
                name: 'CurrentTask',
                params: {
                  type: this.gwType
                }
              })
            }
            else {
              localStorage.setItem("pipeId", id);
              this.$router.push("/CurrentTask");
            }
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

      //弯头焊进行详情页面
      wthGoToCurrentTask(pici, fuhao, yiguanno, codeno) {
        if (pici && fuhao && yiguanno && codeno) {
          this.$router.push({
            name: 'CurrentTask',
            params: {
              pici: pici,
              fuhao: fuhao,
              yiguanno: yiguanno,
              codeno: codeno
            }
          })
        }
        else {
          this.$message.warning(`信息不全，无法进行加工详情`);
        }
      },


      //特定工位进行确认后要执行的方法
      tdGoToCurrentTask() {
        if (this.id) {
          this.$router.push("/CurrentTask");
          localStorage.setItem("pipeId", this.id);
          axios.post(" " + url + "/shengchan/startWork", {"id": this.id})
            .then((res) => {
              if (res.data === "success") {
              }
              else if (res.data === "-1") {
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }

      },

      //小组立显示左边
      showLeft() {
        if (this.left !== true) {
          this.cols = [];
          this.left = true;
          this.right = false;
          this.gwType = 1;
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }
      },

      //小组立显示右边
      showRight() {
        if (this.right !== true) {
          this.cols = [];
          this.right = true;
          this.left = false;
          this.gwType = 2;
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }
      },

      //支管显示正枝
      zgShowLeft() {
        if (this.left !== true) {
          this.cols = [];
          this.left = true;
          this.left2 = false;
          this.zgCenter = false;
          this.right = false;
          this.right2 = false;
          this.gwType = "1";
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }

      },

      //支管显示斜枝
      zgShowLeft2() {
        if (this.left2 !== true) {
          this.cols = [];
          this.left = false;
          this.left2 = true;
          this.zgCenter = false;
          this.right = false;
          this.right2 = false;
          this.gwType = "2";
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }

      },

      //支管显示偏心枝
      zgShowCenter() {
        if (this.zgCenter !== true) {
          this.cols = [];
          this.left = false;
          this.left2 = false;
          this.zgCenter = true;
          this.right = false;
          this.right2 = false;
          this.gwType = "3";
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }

      },

      //支管显示母管开孔
      zgShowRight() {
        if (this.right !== true) {
          this.cols = [];
          this.left = false;
          this.left2 = false;
          this.zgCenter = false;
          this.right = true;
          this.right2 = false;
          this.gwType = "4";
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }

      },

      //支管显示支架管
      zgShowRight2() {
        if (this.right2 !== true) {
          this.cols = [];
          this.left = false;
          this.left2 = false;
          this.zgCenter = false;
          this.right = false;
          this.right2 = true;
          this.gwType = "5";
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
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
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            height: 50px;
            margin-left: 2%;
            background-color: @color-dlLan;
            border: none;
            color: @color-white;
            border-radius: 10px;
          }
        }

      }
    }
    .xzlDiv {
      .xzl-change {
        width: 99%;
        margin: 0 auto;
        height: 60px;
        display: flex;
        background-color: @color-dlLan;;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          button {
            width: 100%;
            height: 100%;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
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
          button {
            width: 100%;
            height: 100%;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            background-color: @color-white;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
            border: none;
          }
        }
      }
    }
    .zgDiv {
      .zg-change {
        width: 99%;
        margin: 0 auto;
        height: 60px;
        display: flex;
        border-top: 1px solid @color-background-d;
        border-left: 1px solid @color-background-d;
        border-right: 1px solid @color-background-d;
        background-color: @color-background-d;;
        .change-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          border-right: 1px solid @color-background-d;
          button {
            width: 100%;
            height: 100%;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
            border: none;
          }
        }
        .change-left2 {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          border-right: 1px solid @color-background-d;
          button {
            width: 100%;
            height: 100%;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
            border: none;
          }
        }
        .change-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          border-right: 1px solid @color-background-d;
          button {
            width: 100%;
            height: 100%;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
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
          border-right: 1px solid @color-background-d;
          button {
            width: 100%;
            height: 100%;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
            border: none;
          }

        }
        .change-right2 {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: @font-size-large;
          color: @color-background-dd;
          cursor: pointer;
          button {
            width: 100%;
            height: 100%;
            color: @color-background-dd;
            cursor: pointer;
            background-color: @color-white;
            border: none;
          }

        }
      }
    }
  }

  .closeBtn {
    width: 100%;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .el-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 50px;
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



  .tdContainer {
    .tdContainerDiv {
      width: 95%;
      height: 70%;
      margin: 0 auto;
    }
    .tdContainerBtn {
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
        width: 40%;
        height: 80px;
        margin-right: 10%;
        margin-left: 10%;
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
        button {
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
          button {
            width: 40%;
            font-size: @font-size-small-s;
          }
        }

      }
    }
  }

</style>
