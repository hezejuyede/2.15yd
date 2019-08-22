<template>
  <div class="ProductionExecution">
    <header-nav></header-nav>
    <div class="ProductionExecutionDiv">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="listSearch"
             v-if="this.listType ==1 || this.listType ==5 || this.listType ==4 || this.listType ==3 ||this.listType ==11">
          <div class="listSearchInput">
            <el-input
              v-model="searchWord"
              ref="siteInput"
              autofocus
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
        <div class="listSearch" v-if="this.listType ==6 ">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      ref="siteInput"
                      placeholder="检索管子或扫码或手工输入"
                      @blur="searchData(searchWord)"
                      @input="searchEmptyData(searchWord)"
                      @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="materialStatistics">短管物料统计</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
            <button @click="workEnd">报完工</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==2">
          <div class="listSearchInput">
            <el-input v-model="searchWord"
                      ref="siteInput"
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
                      ref="siteInput"
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
        <div class="listSearch" v-if="this.listType ==7 || this.listType ==8">
          <div class="listSearchInput">
            <el-input
              style="width: 250px"
              v-model="searchWord"
              ref="siteInput"
              placeholder="检索管子或扫码或手工输入"
              @blur="searchData(searchWord)"
              @input="searchEmptyData(searchWord)"
              @keyup.enter.native="goToPipePage(searchWord)"></el-input>
            <button @click="materialStatistics">物料统计</button>
            <button @click="showAllList">可作业清单</button>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
            <button @click="goGeneralListOfProcessing">总清单</button>
            <button @click="showYYPipe">预约管</button>
            <button @click="appointmentList" :style="{'background-color':this.yyQDState===2 ? '#d93f30':''}">预约清单</button>
          </div>
        </div>
        <div class="listSearch" v-if="this.listType ==10">
          <div class="listSearchInput">
            <el-input
              v-model="searchWord"
              ref="siteInput"
              placeholder="检索管子或扫码或手工输入"
              @blur="searchData(searchWord)"
              @input="searchEmptyData(searchWord)"
              @keyup.enter.native="goToPipePage(searchWord)"></el-input>
          </div>
          <div class="listSearchBtn">
            <button @click="showScreening">条件筛选</button>
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
          :height="tableHeight"
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
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!--直管焊，短管焊-->
      <div class="publicPage" v-if="this.listType ==5 || this.listType ==6">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          :height="tableHeight"
          border
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="doSelect"
          @selection-change="selectChange"
          ref="moviesTable"
          :cell-style="{fontSize:'12px'}"
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
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">切断表
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <!--弯头切断-->
      <div class="publicPage" v-if="this.listType ==3">
        <el-table
          class="tb-edit"
          v-tableLoadingMore="tableLoadingMore"
          :data="tables"
          :height="tableHeight"
          border
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'20px'}"
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="doSelect"
          @selection-change="selectChange"
          ref="moviesTable"
          :cell-style="{fontSize:'20px'}"
          style="width: 99%;margin: 0 auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <template v-for="(col ,index) in cols">
            <el-table-column
              align="center"
              v-if="col.prop !=='yiguanno' && col.prop !=='codeno' && col.prop !=='koujing' && col.prop !=='guanliqufen' && col.prop !=='jiaodu' && col.prop !=='qieduanbiao' && col.prop !=='yipintu'"
              :prop="col.prop"
              :label="col.label">
            </el-table-column>
            <el-table-column
              align="center"
              width="90"
              v-if="col.prop==='koujing'"
              :prop="col.prop" :label="col.label">
            </el-table-column>
            <el-table-column
              align="center"
              width="65"
              v-if="col.prop==='jiaodu'"
              :prop="col.prop" :label="col.label">
            </el-table-column>
            <el-table-column
              align="center"
              width="250"
              v-if="col.prop==='guanliqufen'"
              :prop="col.prop" :label="col.label">
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
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">切断表
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
          :height="tableHeight"
          border
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          :row-class-name="tableRowClassName"
          @select="selectList"
          @select-all="selectAll"
          @row-click="doSelect"
          @selection-change="selectChange"
          ref="moviesTable"
          style="width: 99%;margin: 0 auto">
          <el-table-column type="expand" :cell-style="{color:'blue'}">
            <template slot-scope="scope">
              <el-table class="tb-edit"
                        :data="scope.row.list"
                        :header-cell-style="{background:'#f0f0f0',color:'blue',fontSize:'20px'}"
                        :cell-style="{color:'blue'}"
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
              v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='shipcode' && col.prop !=='qieduanbiao' && col.prop !=='yipintu'"
              :prop="col.prop"
              :label="col.label">
            </el-table-column>
            <el-table-column
              align="center"
              v-if="col.prop==='shipcode'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <div v-if="scope.row.flag ===2 ">
                  <el-button
                    type="danger"
                    style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                    @click="cancelYpt(scope.row.id)">
                    {{ scope.row.shipcode }}
                  </el-button>
                </div>
                <div v-if="scope.row.flag ===1">{{ scope.row.shipcode }}</div>
              </template>
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
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">切断表
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
          :height="tableHeight"
          border
          @select="selectListWTH"
          @select-all="selectAllWTH"
          :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
          :row-class-name="tableRowClassName"
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
              v-if="col.prop==='xiaozuli'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">小组表
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
          :height="tableHeight"
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
                  @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">切断表
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
              :height="tableHeight"
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
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">小组立表
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
                      @click="seeCutList(scope.row.id,scope.row.fileid)">片付表
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
          <div v-if="left === true">
            <el-table
              :key="0"
              class="tb-edit"
              :data="tables"
              :height="tableHeight"
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
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">正枝表
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
          <div v-if="left2 === true">
            <el-table
              :key="1"
              class="tb-edit"
              :data="tables"
              :height="tableHeight"
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
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">斜枝表
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
          <div v-if="zgCenter === true">
            <el-table
              :key="2"
              class="tb-edit"
              :data="tables"
              :height="tableHeight"
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
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">偏心枝表
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
          <div v-if="right === true">
            <el-table
              :key="3"
              class="tb-edit"
              :data="tables"
              :height="tableHeight"
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
                  v-if="col.prop !=='yiguanno' && col.prop !=='codeno'  && col.prop !=='mgb' && col.prop !=='yipintu'"
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
                  v-if="col.prop==='mgb'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">母管表
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
          <div v-if="right2 === true">
            <el-table
              :key="4"
              class="tb-edit"
              :data="tables"
              :height="tableHeight"
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
                  v-if="col.prop !=='shipcode'  && col.prop !=='zjg' && col.prop !=='yipintu'"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='shipcode'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="goToCurrentTask(scope.row.id)">
                      {{ scope.row.shipcode }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='zjg'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeStationExcel(scope.row.id,scope.row.pici,scope.row.fileid)">支架管表
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
                :key="item.name"
                :label="item.name"
                :value="item.name">
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
          <div class="select fl">
            <el-input v-model="zgwj" placeholder="枝管外径"></el-input>
          </div>
          <div class="select fl">
            <el-input v-model="mgwj" placeholder="母管外径"></el-input>
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
    <div class="yptModal" v-if="drawingVisible===true">
      <div class="closeBtn">
        <el-button type="danger" @click="drawingVisible = false">关闭窗口</el-button>
      </div>
      <viewer :images="imgs" style="z-index: 99999999">
        <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
      </viewer>
    </div>


    <!--查看工位表 -->
    <el-dialog :visible.sync="excelVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="excelVisible = false">关闭窗口</el-button>
        <el-button type="primary" @click="gwbDoWorkEnd"
                   v-if="this.listType !=='7' && this.listType !=='8' && this.listType !=='11'">报完工
        </el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <StationExcel
          :gwType="gwType"
          :gongHao="dqgw"
          :isHideStationExcel="isHideStationExcel"
          :excelData="excelData"
          :gzId="gzId"
          v-on:dghList="dghList"
          v-on:xzlChange="xzlDataChange"></StationExcel>
      </div>
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

    <!--一品图预览筛选 -->
    <el-dialog :visible.sync="yptSelectVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="yptSelectVisible = false">关闭窗口</el-button>
      </div>

      <div class="yptContainer">
        <div class="numberDiv">
          <span>选择了</span><span style="font-size: 40px;color: #dd6161">{{selectYptNumber}}</span><span>,</span>
          <span>一共多少</span><span style="font-size: 40px;color: #dd6161">{{yptNumber}}</span><span>个</span>
        </div>
        <div class="yptContainerExcel">
          <el-table
            :data="yptListData"
            v-tableLoadingMore="addYptList"
            :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
            border
            height="630"
            highlight-current-row
            @select="selectOneYYList"
            @select-all="selectAllYYList"
            @selection-change="selectYPTChange"
            style="width: 98%;margin: auto">
            <el-table-column
              type="selection"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="djz"
              align="center"
              width="55"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="yipintu"
              align="center"
              label="一品图">
              <template scope="scope">
                <div class="" style="height:1000px">
                  <img :src="scope.row.yipintu" alt="" style="height: 1000px;width: 100%">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="yptContainerBtn">
          <el-button type="primary" @click="selectYpt" style="height:50px;width:300px;font-size: 40px">确 定</el-button>
        </div>
      </div>
    </el-dialog>


    <!--物料统计 -->
    <el-dialog :visible.sync="materielVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="closeMaterielVisible">关闭窗口</el-button>
      </div>
      <div class="materielContainer" v-if="this.listType ==1 || this.listType ==5 || this.listType ==4 || this.listType ==3">
        <div class="materielTop">
          <div class="materielTopDiv">
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
            <el-button type="primary" @click="doSearchMateriel">查询</el-button>
          </div>
        </div>
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="koujing"
                label="口径">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                prop="guige"
                label="规格">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zhuwenhao"
                label="注文号"
                width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="allnum"
                label="总数量">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="qieduanchang"
              align="center"
              :label="zuoyezhe">
              <el-table-column
                prop="usednum"
                align="center"
                label="已拿数量">
                <template scope="scope">
                  <div>
                    <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedflag"
                align="center"
                label="全部拿取">
                <template scope="scope">
                  <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                  <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                </template>
              </el-table-column>
            </el-table-column>


          </el-table>
        </div>
        <div class="materielBottom">
          <el-button type="success" @click="doSaveMateriel">确认</el-button>
        </div>
      </div>
      <div class="materielContainer" v-if="this.listType ==6">
        <div class="materielTop">
          <div class="materielTopDiv">
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
            <el-button type="primary" @click="doSearchMateriel">查询</el-button>
          </div>
        </div>
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="koujing"
                label="口径">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                prop="guige"
                label="规格">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zhuwenhao"
                label="注文号"
                width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="allnum"
                label="总数量">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="qieduanchang"
              align="center"
              :label="zuoyezhe">
              <el-table-column
                prop="usednum"
                align="center"
                label="已拿数量">
                <template scope="scope">
                  <div>
                    <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedflag"
                align="center"
                label="全部拿取">
                <template scope="scope">
                  <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                  <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="materielBottom">
          <el-button type="success" @click="doSaveMateriel">确认</el-button>
        </div>
      </div>
      <div class="materielContainer" v-if="this.listType ==2">
        <div class="materielTop">
          <div class="materielTopDiv">
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
            <el-button type="primary" @click="doSearchMateriel">查询</el-button>
          </div>
        </div>
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="koujing"
                label="口径">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                prop="guige"
                label="规格">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zhuwenhao"
                label="注文号"
                width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="allnum"
                label="总数量">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="qieduanchang"
              align="center"
              :label="zuoyezhe">
              <el-table-column
                prop="usednum"
                align="center"
                label="已拿数量">
                <template scope="scope">
                  <div>
                    <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedflag"
                align="center"
                label="全部拿取">
                <template scope="scope">
                  <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                  <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="materielBottom">
          <el-button type="success" @click="doSaveMateriel">确认</el-button>
        </div>
      </div>
      <div class="materielContainer" v-if="this.listType ==7">
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="PROJECT"
                label="船号">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                width="200"
                prop="COMPONENT"
                label="名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="KANRIK"
                label="管理区分">
              </el-table-column>
              <el-table-column
                align="center"
                prop="SEIRI_NO"
                label="行号">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="num"
                label="总数量">
              </el-table-column>
            </el-table-column>
           <!-- <el-table-column
              prop="qieduanchang"
              align="center"
              :label="zuoyezhe">
              <el-table-column
                prop="usednum"
                align="center"
                label="已拿数量">
                <template scope="scope">
                  <div>
                    <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedflag"
                align="center"
                label="全部拿取">
                <template scope="scope">
                  <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                  <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                </template>
              </el-table-column>
            </el-table-column>-->
          </el-table>
        </div>
      </div>
      <div class="materielContainer" v-if="this.listType ==8">
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="PROJECT"
                label="船号">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                width="200"
                prop="COMPONENT"
                label="名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="KANRIK"
                label="管理区分">
              </el-table-column>
              <el-table-column
                align="center"
                prop="SEIRI_NO"
                label="行号">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="num"
                label="总数量">
              </el-table-column>
            </el-table-column>
            <!-- <el-table-column
               prop="qieduanchang"
               align="center"
               :label="zuoyezhe">
               <el-table-column
                 prop="usednum"
                 align="center"
                 label="已拿数量">
                 <template scope="scope">
                   <div>
                     <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                   </div>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="usedflag"
                 align="center"
                 label="全部拿取">
                 <template scope="scope">
                   <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                   <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                 </template>
               </el-table-column>
             </el-table-column>-->
          </el-table>
        </div>
      </div>
      <div class="materielContainer" v-if="this.listType ==11">
        <div class="materielTop">
          <div class="materielTopDiv">
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
            <el-button type="primary" @click="doSearchMateriel">查询</el-button>
          </div>
        </div>
        <div class="materielCenter">
          <el-table
            :data="materielData"
            height="520"
            ref="Table"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'18px',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133',
             fontSize:'16px'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              label="出力日">
              <el-table-column
                width="80"
                align="center"
                prop="koujing"
                label="口径">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              :label="batch">
              <el-table-column
                align="center"
                prop="guige"
                label="规格">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zhuwenhao"
                label="注文号"
                width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column
              align="center"
              label="作业者">
              <el-table-column
                align="center"
                width="80"
                prop="allnum"
                label="总数量">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="qieduanchang"
              align="center"
              :label="zuoyezhe">
              <el-table-column
                prop="usednum"
                align="center"
                label="已拿数量">
                <template scope="scope">
                  <div>
                    <el-input v-model="scope.row.usednum" type="number" label="1" border @change="inputChangeMateriel(scope.$index)">选中</el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="usedflag"
                align="center"
                label="全部拿取">
                <template scope="scope">
                  <el-radio v-model="scope.row.usedflag" label="1" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">否</el-radio>
                  <el-radio v-model="scope.row.usedflag" label="2" border @change="allChangeMateriel(scope.$index,scope.row.usedflag)">是</el-radio>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="materielBottom">
          <el-button type="success" @click="doSaveMateriel">确认</el-button>
        </div>
      </div>
    </el-dialog>


    <!-- 一品图取消提醒框 -->
    <el-dialog title=" 一品图取消提醒" :visible.sync="cenCelVisible" width="300px" center>
      <div class="del-dialog-cnt">取消不可恢复，是否确定取消？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cenCelVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doCancelYpt" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>


    <!-- 报完工提醒 -->
    <el-dialog title=" 报完工提醒" :visible.sync="endVisible" width="300px" center>
      <div class="del-dialog-cnt">报完工不可取消，是否确定报完工？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="endVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doWorkEnd" style="height:30px;width:80px">确 定</el-button>
            </span>
    </el-dialog>


    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>

    <Modal :msg="message" :isHideModal="HideModal"></Modal>

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
  import StationExcel from '../../common/stationExcel'

  export default {
    name: 'ProductionExecution',
    data() {
      return {
        listType: "",   //根据工位控制显示与隐藏内容模块
        message: '',  //组件弹出框的信息
        HideModal: true, //组件是否弹出
        isHideStationExcel: false,//工位表默认是否显示
        img: [],   //转圈img数组
        arrAll: [],//优化页面的，第一次加载需要容器数据
        num: 1,
        znSearch: true,   //是否查询
        tableHeight:Number, //根据页面加载显示table的高度
        tableData: [],//总数据的表数据
        cols: [],     //总数据的表头
        excelData: [],     //工位表数据
        tdTableData: [],  //特定工位的表数据
        materielData:[],  //物料的表数据
        tdCols: [
          {"prop": "chuanhao", "label": "船号"},
          {"prop": "yiguanhao", "label": "一贯号"},
          {"prop": "codeno", "label": "Code"},
          {"prop": "pno", "label": "PNO"},
          {"prop": "koujing", "label": "口径"},
          {"prop": "jiagongxilie", "label": "加工系列"},
        ],    //特定弯管工位的表头
        tdCols2: [
          {"prop": "chuanhao", "label": "船号"},
          {"prop": "yiguanhao", "label": "一贯号"},
          {"prop": "codeno", "label": "Code"},
          {"prop": "jiagongxilie", "label": "加工系列"},
        ],    //特定工位的表头
        zuoyezhe: "",   //用户名
        dqgw: "",       //中文工位名字
        gwbpici: "",        // 单击选中工位表的批次
        stationId: "",  //工位对应的ID
        url: "",   //一品图和切断表的URL地址
        listData: [],  //点击复选框中对ID的数组
        id: "",        //管子的ID
        dgID:[],       //短管工位表报完工ID
        pici:"",        //批次
        gzId: "",       //查看工位表匹配ID
        inputWord: '',//扫码的Value
        searchWord: '',//智能检索的value
        is_search: false,
        gwType: "1",//一种工位有几种类型，
        zgStation: "1",//枝管切断默认显示那个一个
        xzlStation: "1",//小组立默认显示左右
        screenVisible: false,   //筛选条件弹出框
        drawingVisible: false,  // 一品图弹出框
        endVisible: false,     //报完工提醒弹出框
        tdVisible: false,    //特定工位提醒框
        excelVisible: false,   //工位表表弹出框
        yptSelectVisible: false, //一品图预约筛选
        materielVisible:false,//物料弹出框
        cenCelVisible:false,    //一品图取消提醒框
        yptId:"",                 //一品图ID
        yptListData: [],         //一品图预览列表数据
        yptList:[],              //一品图选择的ID
        yptNumber:[],            //一品图总数
        selectYptNumber:0,     //选择的一品图数量
        yyQDState:1,          //预约清单的状态

        left: true,           //显示最左边
        left2: false,         //显示左二
        zgCenter: false,      //显示中间
        right: false,         //显示最右边
        right2: false,        //显示右二
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
        zgwj: "",
        mgwj: "",
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
        imgs: []
      }
    },
    components: {Loading, footerNav, Modal, headerNav, StationExcel},
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
      }, 300000);

      //监听键盘的回车事件
      document.onkeydown = (e) => {
        if (e.keyCode == 13) {
          this.setInputFocus();
        }
      }
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
    activated() {
      this.$router.push("/")
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
          this.setTableHeight();
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
            let xzlStation = sessionStorage.getItem("xzlStation");
            if (xzlStation === null) {
              this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
            }
            else {
              this.gwType = xzlStation;
              if (this.gwType === "1") {
                this.left = true;
                this.right = false;
              }
              else if (this.gwType === "2") {
                this.left = false;
                this.right = true;
              }
              this.showTableData(this.stationId, this.dqgw, 1,this.gwType)
            }

          }
          else if (info.GW === "枝管切断") {
            this.listType = "4";
            let zgStation = sessionStorage.getItem("zgStation");
            if (zgStation === null) {
              this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
            }
            else {
              this.gwType = zgStation;
              if (zgStation === "1") {
                this.left = true;
                this.left2 = false;
                this.zgCenter = false;
                this.right = false;
                this.right2 = false;
                this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
              }
              else if (zgStation === "2") {
                this.left = false;
                this.left2 = true;
                this.zgCenter = false;
                this.right = false;
                this.right2 = false;
                this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
              }
              else if (zgStation === "3") {
                this.left = false;
                this.left2 = false;
                this.zgCenter = true;
                this.right = false;
                this.right2 = false;
                this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
              }
              else if (zgStation === "4") {
                this.left = false;
                this.left2 = false;
                this.zgCenter = false;
                this.right = true;
                this.right2 = false;
                this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
              }
              else if (zgStation === "5") {
                this.left = false;
                this.left2 = false;
                this.zgCenter = false;
                this.right = false;
                this.right2 = true;
                this.showTableData(this.stationId, this.dqgw, 1, this.gwType)
              }

            }

          }
          else if (info.GW === "弯头切断") {
            this.listType = "3";
            this.showTableData(this.stationId, this.dqgw, 1, 1)
          }
          else if (info.GW === "43/48装配") {
            this.listType = "7";
            let zpType = sessionStorage.getItem("zpType");
            if(zpType===null){
              this.showTableData(this.stationId, this.dqgw, 1, 1)
            }
            else {
              let that = this;
              axios.all([
                axios.post(" " + url + "/sys/showTableTitleById", {"stationid": that.stationId, "weizhiid": 1, "type": 1}),
                axios.post(" " + url + "/zhuangpeiPre/getZpProShengchanList", {"stationid": that.stationId, "username": that.zuoyezhe})
              ])
                .then(axios.spread(function (title, table) {
                  that.cols = title.data.data;
                  if (table.data.length > 0) {
                    that.yyQDState = 2;
                    that.tableData =table.data;
                  }
                  else {
                    that.message = "暂无数据";
                    that.HideModal = false;
                    function a() {
                      that.message = "";
                      that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                  }
                }));
            }

          }
          else if (info.GW === "45/46装配") {
            this.listType = "8";
            let zpType = sessionStorage.getItem("zpType");
            if(zpType===null){
              this.showTableData(this.stationId, this.dqgw, 1, 1)
            }
            else {
              let that = this;
              axios.all([
                axios.post(" " + url + "/sys/showTableTitleById", {"stationid": that.stationId, "weizhiid": 1, "type": 1}),
                axios.post(" " + url + "/zhuangpeiPre/getZpProShengchanList", {"stationid": that.stationId, "username": that.zuoyezhe})
              ])
                .then(axios.spread(function (title, table) {
                  that.cols = title.data.data;
                  if (table.data.length > 0) {
                    that.yyQDState = 2;
                    that.tableData =table.data;
                  }
                  else {
                    that.message = "暂无数据";
                    that.HideModal = false;
                    function a() {
                      that.message = "";
                      that.HideModal = true;
                    }

                    setTimeout(a, 2000);
                  }
                }));
            }
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
          this.setInputFocus();
        }
      },


      //根据屏幕分辨率设置Table高度
      setTableHeight() {

        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          if (this.dqgw === "小组立" || this.dqgw === "枝管切断") {
            this.tableHeight = H - 310 + "px";
          }
          else {
            this.tableHeight = H - 250 + "px";
          }
        }
        else {
          var h = document.body.clientHeight;
          if (this.dqgw === "小组立" || this.dqgw === "枝管切断") {
            this.tableHeight = h - 310 + "px";
          }
          else {
            this.tableHeight = h - 250 + "px";
          }
        }

      },



      //自动聚焦输入框
      setInputFocus() {
        this.$nextTick(() => {
          this.$refs['siteInput'].focus();
        })
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
        let screeningConditions = sessionStorage.getItem("screeningConditions");
        if (screeningConditions == null) {
          if (this.dqgw === "切断") {
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": name, "type": type})
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
          else {
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
              axios.post(" " + url + "/shengchan/shengchanList.html", {"gongxu": name, "type": type})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                if (that.listType === "4" && that.left2 === true) {
                  if (table.data.length > 0) {
                    let data = [];
                    for (let i = 0; i < table.data.length; i++) {
                      let json = {
                        "xuhao": i + 1,
                        "linename": table.data[i].linename,
                        "qieduan": table.data[i].qieduan,
                        "atext": table.data[i].atext,
                        "jiagongxian": table.data[i].jiagongxian,
                        "indexno": table.data[i].indexno,
                        "neijing": table.data[i].neijing,
                        "type": table.data[i].type,
                        "waijing": table.data[i].waijing,
                        "yiguanno": table.data[i].yiguanno,
                        "btext": table.data[i].btext,
                        "codeno": table.data[i].codeno,
                        "quanchang": table.data[i].quanchang,
                        "id": table.data[i].id,
                        "chuanfan": table.data[i].chuanfan,
                        "shipcode": table.data[i].shipcode,
                        "zuox": table.data[i].zuox,
                        "fileid": table.data[i].fileid,
                        "createtime": table.data[i].createtime,
                        "jiagongxilie": table.data[i].jiagongxilie,
                        "daihao": table.data[i].daihao,
                        "jinwu": table.data[i].jinwu,
                        "pici": table.data[i].pici,
                        "changdu": table.data[i].changdu,
                        "pno": table.data[i].pno,
                        "bihou": table.data[i].bihou,
                        "pianxinliang": table.data[i].pianxinliang,
                        "shenpiStatus": table.data[i].shenpiStatus,
                        "muguanwaijing": table.data[i].muguanwaijing,
                        "denglizi": table.data[i].denglizi,
                        "beizhu": table.data[i].beizhu,
                        "fanhao": table.data[i].fanhao,
                        "guige": table.data[i].guige,
                        "jiancha": table.data[i].jiancha,
                        "kxtext": table.data[i].kxtext
                      };
                      data.push(json)
                    }
                    that.tableData = data
                  }
                }
                else {
                  that.tableData = table.data;
                }
              }));
          }
        }
        else {
          let ScreeningConditions = JSON.parse(screeningConditions);
          if (this.dqgw === "切断") {
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
              axios.post(" " + url + "/shengchan/shengchanList.html",
                {
                  "type": type,
                  "gongxu": name,
                  "jiagongxian": ScreeningConditions.jiagongxian,
                  "pici": ScreeningConditions.pici,
                  "preGongxu": ScreeningConditions.preGongxu,
                  "jiagongxilie": ScreeningConditions.jiagongxilie,
                  "chuanhao": ScreeningConditions.chuanhao,
                  "yiguanhao": ScreeningConditions.yiguanhao,
                  "typeSelect": ScreeningConditions.typeSelect,
                  "koujing": ScreeningConditions.koujing,
                  "youxianji": ScreeningConditions.youxianji,
                  "pno": ScreeningConditions.pno,
                  "bihou": ScreeningConditions.bihou,
                  "codeN": ScreeningConditions.codeN,
                  "zuoyezhe": ScreeningConditions.zuoyezhe
                })
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
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
          else if (this.dqgw === "小组立") {
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
              axios.post(" " + url + "/shengchan/shengchanList.html",
                {
                  "type": type,
                  "gongxu": name,
                  "jiagongxian": ScreeningConditions.jiagongxian,
                  "pici": ScreeningConditions.pici,
                  "preGongxu": ScreeningConditions.preGongxu,
                  "jiagongxilie": ScreeningConditions.jiagongxilie,
                  "chuanhao": ScreeningConditions.chuanhao,
                  "yiguanhao": ScreeningConditions.yiguanhao,
                  "typeSelect": ScreeningConditions.typeSelect,
                  "koujing": ScreeningConditions.koujing,
                  "youxianji": ScreeningConditions.youxianji,
                  "pno": ScreeningConditions.pno,
                  "bihou": ScreeningConditions.bihou,
                  "codeN": ScreeningConditions.codeN,
                  "zuoyezhe": ScreeningConditions.zuoyezhe,
                  "zgwj": ScreeningConditions.zgwj,
                  "mgwj": ScreeningConditions.mgwj
                })
            ]).then(axios.spread(function (title, table) {
              that.cols = title.data.data;
              that.tableData = table.data;
            }));
          }
          else {
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
              axios.post(" " + url + "/shengchan/shengchanList.html",
                {
                  "type": type,
                  "gongxu": name,
                  "jiagongxian": ScreeningConditions.jiagongxian,
                  "pici": ScreeningConditions.pici,
                  "preGongxu": ScreeningConditions.preGongxu,
                  "jiagongxilie": ScreeningConditions.jiagongxilie,
                  "chuanhao": ScreeningConditions.chuanhao,
                  "yiguanhao": ScreeningConditions.yiguanhao,
                  "typeSelect": ScreeningConditions.typeSelect,
                  "koujing": ScreeningConditions.koujing,
                  "youxianji": ScreeningConditions.youxianji,
                  "pno": ScreeningConditions.pno,
                  "bihou": ScreeningConditions.bihou,
                  "codeN": ScreeningConditions.codeN,
                  "zuoyezhe": ScreeningConditions.zuoyezhe,
                  "zgwj": ScreeningConditions.zgwj,
                  "mgwj": ScreeningConditions.mgwj
                })
            ]).then(axios.spread(function (title, table) {
              that.cols = title.data.data;
              if (that.listType === "4" && that.left2 === true) {
                if (table.data.length > 0) {
                  let data = [];
                  for (let i = 0; i < table.data.length; i++) {
                    let json = {
                      "xuhao": i + 1,
                      "linename": table.data[i].linename,
                      "qieduan": table.data[i].qieduan,
                      "atext": table.data[i].atext,
                      "jiagongxian": table.data[i].jiagongxian,
                      "indexno": table.data[i].indexno,
                      "neijing": table.data[i].neijing,
                      "type": table.data[i].type,
                      "waijing": table.data[i].waijing,
                      "yiguanno": table.data[i].yiguanno,
                      "btext": table.data[i].btext,
                      "codeno": table.data[i].codeno,
                      "quanchang": table.data[i].quanchang,
                      "id": table.data[i].id,
                      "chuanfan": table.data[i].chuanfan,
                      "shipcode": table.data[i].shipcode,
                      "zuox": table.data[i].zuox,
                      "fileid": table.data[i].fileid,
                      "createtime": table.data[i].createtime,
                      "jiagongxilie": table.data[i].jiagongxilie,
                      "daihao": table.data[i].daihao,
                      "jinwu": table.data[i].jinwu,
                      "pici": table.data[i].pici,
                      "changdu": table.data[i].changdu,
                      "pno": table.data[i].pno,
                      "bihou": table.data[i].bihou,
                      "pianxinliang": table.data[i].pianxinliang,
                      "shenpiStatus": table.data[i].shenpiStatus,
                      "muguanwaijing": table.data[i].muguanwaijing,
                      "denglizi": table.data[i].denglizi,
                      "beizhu": table.data[i].beizhu,
                      "fanhao": table.data[i].fanhao,
                      "guige": table.data[i].guige,
                      "jiancha": table.data[i].jiancha,
                      "kxtext": table.data[i].kxtext
                    };
                    data.push(json)
                  }
                  that.tableData = data
                }
              }
              else {
                that.tableData = table.data;
              }
            }));
          }
        }
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

      //弯头焊单选
      selectListWTH(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = {
              "pici": val[i].pici,
              "fuhao": val[i].fuhao,
              "yiguanno": val[i].yiguanno,
              "codeno": val[i].codeno,
              "zuoyezhe": this.zuoyezhe
            };
            data.push(a)
          }
          this.listData = data;
        }
        else {
          this.listData = [];
        }

      },

      //弯头焊全选
      selectAllWTH(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = {
              "pici": val[i].pici,
              "fuhao": val[i].fuhao,
              "yiguanno": val[i].yiguanno,
              "codeno": val[i].codeno,
              "zuoyezhe": this.zuoyezhe
            };
            data.push(a)
          }
          this.listData = data;
          console.log(this.listData)
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
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          if (searchWord) {
            if (this.dqgw === "直管焊" || this.dqgw === "短管焊" || this.dqgw === "切断" || this.dqgw === "弯头焊") {
              axios.post(" " + url + "/shengchan/getShaomaData",
                {
                  "stationid": this.stationId,
                  "shaomacode": searchWord
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    this.message = res.data.message;
                    this.HideModal = false;
                    const that = this;

                    function b() {
                      that.message = "";
                      that.HideModal = true;
                      that.searchWord = "";
                      that.showTableData(that.stationId, that.dqgw, 1, 1)
                    }

                    setTimeout(b, 5000);
                  }
                  else if (res.data.state === "-1") {
                    this.message = res.data.message;
                    this.HideModal = false;
                    const that = this;

                    function a() {
                      that.message = "";
                      that.HideModal = true;
                      that.searchWord = "";
                    }

                    setTimeout(a, 5000);
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
            else {
              axios.post(" " + url + "/shengchan/getShaomaData",
                {
                  "stationid": this.stationId,
                  "shaomacode": searchWord
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    if (this.dqgw === "弯管" || this.dqgw === "43/48装配" || this.dqgw === "45/46装配" || this.dqgw === "大组焊") {
                      this.id = res.data.data.id;
                      this.tdVisible = true;
                      this.tdTableData = [{
                        "jiagongxilie": res.data.data.jiagongxilie,
                        "yiguanhao": res.data.data.yiguanhao,
                        "codeno": res.data.data.codeno,
                        "koujing": res.data.data.koujing,
                        "chuanhao": res.data.data.chuanhao,
                        "pno": res.data.data.pno
                      }];
                    }
                    else if (this.dqgw === "枝管切断") {
                      let id = res.data.data.id;
                      localStorage.setItem("pipeId", id);
                      this.$router.push({
                        name: 'CurrentTask',
                        params: {
                          type: res.data.data.type
                        }
                      })
                    }
                    else {
                      let id = res.data.data.id;
                      localStorage.setItem("pipeId", id);
                      this.$router.push("/CurrentTask");
                    }
                  }
                  else {
                    this.$message({type: 'warning', message: res.data.message});
                    this.searchWord = "";
                  }
                })
                .catch((err) => {
                  console.log(err)
                });
            }
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
        }
        else {
          //IE取消冒泡事件
          window.event.cancelBubble = true;
        }
      },

      //在工位表里报完工
      gwbDoWorkEnd() {
        if (this.dqgw === "短管焊") {
          if(this.dgID.length>0){
            if(this.dgID.length>1){
              this.$message.success("只能选择一个");
            }
            else {
              axios.post(" " + url + "/shengchan/updateStatusDuanguan",
                {
                  "id": this.dgID[0],
                  "zuoyezhe": this.zuoyezhe,
                  "type": this.gwType,
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    this.showTableData(this.stationId, this.dqgw, 1, 1);
                    axios.post(" " + url + "/importother/publicData", {"code": "duanguan", "pici": this.pici})
                      .then((res) => {
                        if (res.data) {
                          this.excelData = res.data;
                        }
                        else {
                          this.message = "没有查到该工位表";
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
                      });
                    this.$message.success(res.data.message);
                  }
                  else {
                    this.$message.warning(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }
          else {
            this.$message.warning("该管是长管,该工位不可报完工");
          }
        }
        else if (this.dqgw === "小组立") {
          if(this.dgID.length>1){
            this.$message.warning("只能选择一个");
          }
          else {
            if(this.dgID.length>0){
              axios.post(" " + url + "/importother/markXiaozuliExcel",
                {
                  "id": this.dgID[0],
                  "zuoyezhe": this.zuoyezhe,
                  "type": this.gwType,
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    this.showTableData(this.stationId, this.dqgw, 1, 1);
                    axios.post(" " + url + "/importother/showXiaozuliExcel", {"pici": this.gwbpici})
                      .then((res) => {
                        this.excelData = res.data;
                      })
                      .catch((err) => {
                        console.log(err)
                      });
                    this.$message.success(res.data.message);
                  }
                  else {
                    this.$message.warning(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
            else {
              this.$message.warning("选中才能报完工");
            }
          }
        }
        else {
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": [this.id],
              "zuoyezhe": this.zuoyezhe,
              "type": this.gwType,
              "stationid": this.stationId
            })
            .then((res) => {
              if (res.data === "1") {
                this.showTableData(this.stationId, this.dqgw, 1, 1);
                this.$message.success(`报完工成功`);
                let that = this;
                setTimeout(() => {
                  that.excelVisible = false;
                }, 1000)
              }
              else {
                this.$message.warning(`报完工失败`);
              }
            })
            .catch((err) => {
              console.log(err)
            })
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
        if (this.dqgw === "切断") {
          axios.post(" " + url + "/shengchan/updateStatusBatch",
            {
              "ids": this.listData,
              "zuoyezhe": this.zuoyezhe,
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
        else if (this.dqgw === "弯头焊") {
          axios.post(" " + url + "/shengchan/updateStatusWthBatch", {"list": this.listData})
            .then((res) => {
              if (res.data === "1") {
                this.endVisible = false;
                this.message = "已经完成";
                this.HideModal = false;
                const that = this;

                function a() {
                  that.message = "";
                  that.HideModal = true;
                  that.listData = [];
                  that.showTableData(that.stationId, that.dqgw, 1, that.gwType)
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

      //各个工位查询物料
      getMaterielData(data1, data2) {
        axios.post(" " + url + "/wuliaotongji/getWuliaotongjiList",
          {
            "type": data1,
            "pici": data2,
          })
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.materielData = res.data.data;
                this.materielVisible = true;
              }
              else {
                this.materielVisible = true;
                this.$message.warning("暂无数据");
              }
            }
            else {
              this.$message.warning(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err)
          });
      },

      // 物料统计
      materialStatistics() {
        if (this.dqgw === "直管焊" ||this.dqgw === "枝管切断" ||this.dqgw === "切断" ||this.dqgw === "弯头焊" |this.dqgw === "弯头切断") {
          axios.post(" " + url + "/sys/getPiciList")
            .then((res)=>{
              this.batch = res.data[0].id;
              this.batchOptions = res.data;
              this.getMaterielData(2,this.batch)
            })
            .catch((err)=>{
              console.log(err)
            })
        }
        else if (this.dqgw === "短管焊") {
          axios.post(" " + url + "/sys/getPiciList")
            .then((res)=>{
              this.batch = res.data[0].id;
              this.batchOptions = res.data;
              this.getMaterielData(1,this.batch)
            })
            .catch((err)=>{
              console.log(err)
            })
        }
        else if (this.dqgw === "小组立") {
          axios.post(" " + url + "/sys/getPiciList")
            .then((res)=>{
              this.batch = res.data[0].id;
              this.batchOptions = res.data;
              axios.post(" " + url + "/wuliaotongji/getWuliaoXzlList",
                {
                  "type": this.gwType,
                  "pici": this.batch,
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    if (res.data.data.length > 0) {
                      this.materielData = res.data.data;
                      this.materielVisible = true;
                    }
                    else {
                      this.materielVisible = true;
                      this.$message.warning("暂无数据");
                    }
                  }
                  else {
                    this.$message.warning(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err)
                });
            })
            .catch((err)=>{
              console.log(err)
            })
        }
        else if (this.dqgw === "43/48装配") {
          axios.post(" " + url + "/wuliaotongji/getProWuliaoZpList",
            {
              "stationid": this.stationId,
              "username": this.zuoyezhe,
            })
            .then((res) => {
              if (res.data.length > 0) {
                this.materielData = res.data;
                this.materielVisible = true;
              }
              else {
                this.$message.warning("暂无数据");
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else if (this.dqgw === "45/46装配") {
          axios.post(" " + url + "/wuliaotongji/getProWuliaoZpList",
            {
              "stationid": this.stationId,
              "username": this.zuoyezhe,
            })
            .then((res) => {
              if (res.data.length > 0) {
                this.materielData = res.data;
                this.materielVisible = true;
              }
              else {
                this.$message.warning("暂无数据");
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {

        }
      },

      //关闭物料统计
      closeMaterielVisible() {
        this.materielVisible = false;
        this.materielData = [];

      },

      //查询物料
      doSearchMateriel() {
        if (this.batch) {
          if (this.dqgw === "直管焊" || this.dqgw === "枝管切断" || this.dqgw === "切断" || this.dqgw === "弯头焊") {
            this.getMaterielData(2, this.batch);
          }
          else if (this.dqgw === "短管焊") {
            this.getMaterielData(1, this.batch);
          }
          else if (this.dqgw === "小组立") {
            axios.post(" " + url + "/wuliaotongji/getWuliaoXzlList",
              {
                "type": this.gwType,
                "pici": this.batch,
              })
              .then((res) => {
                if (res.data.state === "1") {
                  if (res.data.data.length > 0) {
                    this.materielData = res.data.data;
                    this.materielVisible = true;
                  }
                  else {
                    this.materielVisible = true;
                    this.$message.warning("暂无数据");
                  }
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else if (this.dqgw === "弯头切断") {
            axios.post(" " + url + "/wuliaotongji/getWuliaoWtqdList",
              {
                "type": this.gwType,
                "pici": this.batch,
              })
              .then((res) => {
                if (res.data.state === "1") {
                  if (res.data.data.length > 0) {
                    this.materielData = res.data.data;
                    this.materielVisible = true;
                  }
                  else {
                    this.materielVisible = true;
                    this.$message.warning("暂无数据");
                  }
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else {
            this.$message.success("添加成功");
          }
        }
        else {
          this.$message.warning("批次不能为空");
        }
      },

      //保存物料
      doSaveMateriel() {
        if(this.materielData.length>0){
          if (this.dqgw === "直管焊" ||this.dqgw === "枝管切断" ||this.dqgw === "切断" ||this.dqgw === "弯头焊") {
            axios.post(" " + url + "/wuliaotongji/saveWuliaoTongji",
              {
                "pici":this.batch,
                "list": this.materielData,
                "zuoyezhe": this.zuoyezhe,
                "type":"2"
              })
              .then((res) => {
                if (res.data.state === "1") {
                  this.materielData=[];
                  this.$message.success("添加成功");
                  this.materielVisible = false;
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else if (this.dqgw === "短管焊") {
            axios.post(" " + url + "/wuliaotongji/saveWuliaoTongji",
              {
                "pici":this.batch,
                "list": this.materielData,
                "zuoyezhe": this.zuoyezhe,
                "type":"1"
              })
              .then((res) => {
                if (res.data.state === "1") {
                  this.materielData=[];
                  this.$message.success("添加成功");
                  this.materielVisible = false;
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });

          }
          else if (this.dqgw === "小组立") {
            if(this.gwType==="1"){
              axios.post(" " + url + "/wuliaotongji/saveWuliaoXzl",
                {
                  "pici":this.batch,
                  "list": this.materielData,
                  "zuoyezhe": this.zuoyezhe,
                  "type":this.gwType
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    this.materielData=[];
                    this.$message.success("添加成功");
                    this.materielVisible = false;
                  }
                  else {
                    this.$message.warning(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err)
                });
            }
            else if(this.gwType==="2"){
              axios.post(" " + url + "/wuliaotongji/saveWuliaoPf",
                {
                  "pici":this.batch,
                  "list": this.materielData,
                  "zuoyezhe": this.zuoyezhe,
                  "type":this.gwType
                })
                .then((res) => {
                  if (res.data.state === "1") {
                    this.materielData=[];
                    this.$message.success("添加成功");
                    this.materielVisible = false;
                  }
                  else {
                    this.$message.warning(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err)
                });
            }

          }
          else if (this.dqgw === "弯头切断") {
            axios.post(" " + url + "/wuliaotongji/saveWuliaoWtqd",
              {
                "pici":this.batch,
                "list": this.materielData,
                "zuoyezhe": this.zuoyezhe,
                "type":"1"
              })
              .then((res) => {
                if (res.data.state === "1") {
                  this.materielData=[];
                  this.$message.success("添加成功");
                  this.materielVisible = false;
                }
                else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else {
            this.$message.success("添加成功");
          }
        }
        else {
          this.$message.warning("数据为空，无需保存");
        }

      },

      //根据input选择框变化
      inputChangeMateriel(index){
        let z = parseInt(this.materielData[index].allnum);
        let y = parseInt(this.materielData[index].usednum);
        if (y === z) {
          this.materielData[index].usedflag = "2";
        }
        else if (y > z) {
          this.materielData[index].usednum = z;
          this.materielData[index].usedflag = "2";
          this.$message.warning(`数量不能超出总数量`);
        }
        else {
          this.materielData[index].usedflag = "1";
        }
      },

      //全部拿取选择框变化
      allChangeMateriel(index,label){
        if(label ==="2"){
          const n = this.materielData[index].allnum;
          this.materielData[index].usednum =n;
        }
        else if (label==="1") {
          this.materielData[index].usednum =0;
        }
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
                  this.imgs = [
                    {
                      "url": this.url
                    }
                  ];
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

      //查看工位表
      seeStationExcel(id, pici, fileid) {
        this.gwbpici = pici;
        this.id = id;
        this.gzId = fileid;
        //防止冒泡
        if (event && event.stopPropagation) {
          //W3C取消冒泡事件
          event.stopPropagation();
          if (this.dqgw === "小组立" || this.dqgw === "弯头焊") {
            axios.post(" " + url + "/importother/showXiaozuliExcel", {"pici": pici})
              .then((res) => {
                if (res.data) {
                  this.excelData = res.data;
                  this.excelVisible = true;
                }
                else {
                  this.message = "没有查到该工位表";
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
          else if (this.dqgw === "枝管切断") {
            if (this.gwType === "1") {
              axios.post(" " + url + "/importother/publicData", {"code": "zezz", "pici": pici, "fileid": this.gzId})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.excelVisible = true;
                  }
                  else {
                    this.message = "没有查到该工位表";
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
            else if (this.gwType === "2") {
              axios.post(" " + url + "/importother/publicData", {"code": "zexz", "pici": pici, "fileid": this.gzId})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.excelVisible = true;
                  }
                  else {
                    this.message = "没有查到该工位表";
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
            else if (this.gwType === "3") {
              axios.post(" " + url + "/importother/publicData", {"code": "zzpx", "pici": pici, "fileid": this.gzId})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.excelVisible = true;
                  }
                  else {
                    this.message = "没有查到该工位表";
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
            else if (this.gwType === "4") {
              axios.post(" " + url + "/importother/publicData", {"code": "mgb", "pici": pici})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.excelVisible = true;
                  }
                  else {
                    this.message = "没有查到该工位表";
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
            else if (this.gwType === "5") {
              axios.post(" " + url + "/importother/publicData", {"code": "zjg", "pici": pici, "type": this.gwType})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.excelVisible = true;
                  }
                  else {
                    this.message = "没有查到该工位表";
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
          }
          else if (this.dqgw === "短管焊") {
            this.pici= pici;
            axios.post(" " + url + "/importother/publicData", {"code": "duanguan", "pici": pici})
              .then((res) => {
                if (res.data) {
                  this.excelData = res.data;
                  this.excelVisible = true;
                }
                else {
                  this.message = "没有查到该工位表";
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
            axios.post(" " + url + "/importother/publicData", {"code": "qieduan", "pici": pici})
              .then((res) => {
                if (res.data) {
                  this.excelData = res.data;
                  this.excelVisible = true;
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
        }
        else {
          //IE取消冒泡事件
          window.event.cancelBubble = true;
        }
      },


      //工位表中小组立数据更新
      xzlDataChange(val) {
        if (val === true) {
          axios.post(" " + url + "/importother/showXiaozuliExcel", {"pici": this.gwbpici})
            .then((res) => {
              this.excelData = res.data;
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },

      //短管焊选中的ID
      dghList(val) {
        if (val.length > 0) {
          this.dgID=val
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
        let json = {
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
          "zuoyezhe": this.qianzuoyezhe,
          "zgwj": this.zgwj,
          "mgwj": this.mgwj,
        };
        let Json = JSON.stringify(json);
        sessionStorage.setItem("screeningConditions", Json);
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
        else if (this.dqgw === "小组立") {
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
              "zuoyezhe": this.qianzuoyezhe,
              "zgwj": this.zgwj,
              "mgwj": this.mgwj
            })
            .then((res) => {
              this.screenVisible = false;
              this.tableData = res.data;
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
              "zuoyezhe": this.qianzuoyezhe,
              "zgwj": this.zgwj,
              "mgwj": this.mgwj
            })
            .then((res) => {
              this.screenVisible = false;
              if (this.listType === "4" && this.left2 === true) {
                let data = [];
                for (let i = 0; i < res.data.length; i++) {
                  let json = {
                    "xuhao": i + 1,
                    "linename": res.data[i].linename,
                    "qieduan": res.data[i].qieduan,
                    "atext": res.data[i].atext,
                    "jiagongxian": res.data[i].jiagongxian,
                    "indexno": res.data[i].indexno,
                    "neijing": res.data[i].neijing,
                    "type": res.data[i].type,
                    "waijing": res.data[i].waijing,
                    "yiguanno": res.data[i].yiguanno,
                    "btext": res.data[i].btext,
                    "codeno": res.data[i].codeno,
                    "quanchang": res.data[i].quanchang,
                    "id": res.data[i].id,
                    "chuanfan": res.data[i].chuanfan,
                    "shipcode": res.data[i].shipcode,
                    "zuox": res.data[i].zuox,
                    "fileid": res.data[i].fileid,
                    "createtime": res.data[i].createtime,
                    "jiagongxilie": res.data[i].jiagongxilie,
                    "daihao": res.data[i].daihao,
                    "jinwu": res.data[i].jinwu,
                    "pici": res.data[i].pici,
                    "changdu": res.data[i].changdu,
                    "pno": res.data[i].pno,
                    "bihou": res.data[i].bihou,
                    "pianxinliang": res.data[i].pianxinliang,
                    "shenpiStatus": res.data[i].shenpiStatus,
                    "muguanwaijing": res.data[i].muguanwaijing,
                    "denglizi": res.data[i].denglizi,
                    "beizhu": res.data[i].beizhu,
                    "fanhao": res.data[i].fanhao,
                    "guige": res.data[i].guige,
                    "jiancha": res.data[i].jiancha,
                    "kxtext": res.data[i].kxtext
                  };
                  data.push(json)
                }
                this.tableData = data;
              }
              else {
                this.tableData = res.data;
              }

            })
            .catch((err) => {
              console.log(err)
            })
        }
      },

      //清空筛选条件
      emptyAllValue() {
        sessionStorage.removeItem("screeningConditions");
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
        this.zgwj = "";
        this.mgwj = "";
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
          this.xzlStation = "1";
          sessionStorage.setItem("xzlStation", this.xzlStation);
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
          this.xzlStation = "2";
          sessionStorage.setItem("xzlStation", this.xzlStation);
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
          this.zgStation = "1";
          sessionStorage.setItem("zgStation", this.zgStation);
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
          this.zgStation = "2";
          sessionStorage.setItem("zgStation", this.zgStation);
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
          this.zgStation = "3";
          sessionStorage.setItem("zgStation", this.zgStation);
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
          this.zgStation = "4";
          sessionStorage.setItem("zgStation", this.zgStation);
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
          this.zgStation = "5";
          sessionStorage.setItem("zgStation", this.zgStation);
          this.showTableData(this.stationId, this.dqgw, 1, this.gwType);
        }
      },

      //显示一品图预约列表
      showYYPipe() {
        let screeningConditions = sessionStorage.getItem("screeningConditions");
        if (screeningConditions == null) {
          axios.post(" " + url + "/zhuangpeiPre/getZpYipintuList", {"stationid": this.stationId})
            .then((res) => {
              if (res.data.length>0) {
                this.yptList=[];
                this.yptSelectVisible = true;
                let data = [];
                for (let i = 0; i < res.data.length; i++) {
                  let imgUrl =res.data[i].yipintuMap;
                  if(res.data[i].yipintuMap !==null){
                    let json = {
                      "id": res.data[i].id,
                      "djz": res.data[i].xuhao,
                      "yipintu": url + imgUrl.imgurl
                    };
                    data.push(json)
                  }
                  else {
                    console.log(2)
                  }
                }
                this.yptNumber = data.length;
                this.yptListData = data;
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
            });
        }
        else {
          let ScreeningConditions = JSON.parse(screeningConditions);
          axios.post(" " + url + "/zhuangpeiPre/getZpYipintuList", {
            "type": 1,
            "stationid": this.stationId,
            "jiagongxian": ScreeningConditions.jiagongxian,
            "pici": ScreeningConditions.pici,
            "preGongxu": ScreeningConditions.preGongxu,
            "jiagongxilie": ScreeningConditions.jiagongxilie,
            "chuanhao": ScreeningConditions.chuanhao,
            "yiguanhao": ScreeningConditions.yiguanhao,
            "typeSelect": ScreeningConditions.typeSelect,
            "koujing": ScreeningConditions.koujing,
            "youxianji": ScreeningConditions.youxianji,
            "pno": ScreeningConditions.pno,
            "bihou": ScreeningConditions.bihou,
            "codeN": ScreeningConditions.codeN,
            "zuoyezhe": ScreeningConditions.zuoyezhe,
            "zgwj": ScreeningConditions.zgwj,
            "mgwj": ScreeningConditions.mgwj
          })
            .then((res) => {
              if (res.data.length>0) {
                this.yptList=[];
                this.yptSelectVisible = true;
                let data = [];
                for (let i = 0; i < res.data.length; i++) {
                  let imgUrl =res.data[i].yipintuMap;
                  if(res.data[i].yipintuMap !==null){
                    let json = {
                      "id": res.data[i].id,
                      "djz": res.data[i].xuhao,
                      "yipintu": url + imgUrl.imgurl
                    };
                    data.push(json)
                  }
                  else {
                    console.log(2)
                  }
                }
                this.yptNumber = data.length;
                this.yptListData = data;
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
            });

        }
      },

      //预约一品图清单
      appointmentList() {
        axios.post(" " + url + "/zhuangpeiPre/getZpProShengchanList", {
          "stationid": this.stationId,
          "username": this.zuoyezhe,
        })
          .then((res) => {
            if (res.data.length > 0) {
              this.yyQDState = 2;
              this.tableData = res.data;
            }
            else {
              this.message = "暂无数据";
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
          });
      },

      //选择一个一品图
      selectOneYYList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.selectYptNumber= data.length;
          this.yptList = data;
        }
        else {
          this.yptList = [];
          this.selectYptNumber=this.yptList.length;
        }
      },

      //全部选择一品图
      selectAllYYList(val) {
        this.selectOneYYList(val)
      },

      //选择改变一品图
      selectYPTChange(val){
       this.selectOneYYList(val)
      },

      //选择的一品图
      selectYpt(){
        if (this.yptList.length > 0) {
          axios.post(" " + url + "/zhuangpeiPre/updateProYipintu", {
            "stationid": this.stationId,
            "username": this.zuoyezhe,
            "ids":this.yptList
          })
            .then((res) => {
              if (res.data.state === "1") {
                this.appointmentList();
                this.$message.success("添加成功");
                this.yptSelectVisible = false;
                sessionStorage.setItem("zpType","1")
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
            });
        }
        else {
          this.$message.warning("选择不能为空");
        }

      },

      //显示一拼图取消
      doCancelYpt(){
        if (this.yptId) {
          axios.post(" " + url + "/zhuangpeiPre/cancelYipintu", {"id":this.yptId})
            .then((res) => {
              if (res.data.state === "1") {
                this.$message.success("去除成功");
                this.cenCelVisible=false;
                axios.post(" " + url + "/zhuangpeiPre/getZpProShengchanList", {
                  "stationid": this.stationId,
                  "username": this.zuoyezhe,
                })
                  .then((res) => {
                    if (res.data.length > 0) {
                      this.yyQDState = 2;
                      this.tableData = res.data;
                    }
                    else {
                      sessionStorage.removeItem("zpType");
                      this.tableData =[];
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  });
              }
              else {
                this.$message.warning(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {
          this.$message.warning("找不到ID");
        }
      },

      //取消选择的一品图
      cancelYpt(id) {
        if (id) {
          this.yptId = id;
          this.cenCelVisible = true;
        }
        else {
          this.$message.warning("找不到ID");
        }
      },

      //显示总清单
      showAllList(){
        this.yyQDState=1;
        this.showTableData(this.stationId, this.dqgw, 1, 1)
      },

      //往下拉逐步添加一品图
      addYptList() {

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
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 110px;
            height: 50px;
            margin-left: 2%;
            background-color: @color-dlLan;
            border: none;
            color: @color-white;
            border-radius: 10px;
          }
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
    top: -8px;
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
        width: 25%;
        height: 100px;
        font-size: @font-size-large;
        margin-left: 5%;
      }
    }
  }

  .yptContainer {
    height: 680px;
    width: 100%;
    position: relative;
    .numberDiv{
      position: absolute;
      top: -40px;
      left: 0;
      z-index: 999;
      width: 300px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @font-size-medium-x;
    }
    .yptContainerExcel {
      overflow: auto;
      height: 630px;
    }
    .yptContainerBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
    }
  }

  .materielContainer{
    .materielTop{
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .materielTopDiv{
        width: 380px;
        height:50px;
        .el-button{
          width: 120px;
          height: 40px;
          margin-left: 10px;
          font-size: @font-size-large-xxx;
        }
      }
    }
    .materielBottom{
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button{
        width: 300px;
        height: 60px;
        font-size: @font-size-large-xxxxxxxx;
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

  .yptModal {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #ffffff;
    top: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
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
