<template>
  <div class="TaskListTemplate">
    <header-nav></header-nav>
    <div class="TaskList" ref="TaskList">
      <!-- 公共头部-->
      <div class="contentTop" ref="contentTop">
        <div class="listSearch">
          <div class="dzySearch">
            <button :style="{'background-color':this.nowClick===1 ? '#d93f30':''}" @click="dzySearch">全部待转入</button>
          </div>
          <div class="ycSearch">
            <button :style="{'background-color':this.nowClick===2 ? '#d93f30':''}" @click="ycSearch">全部异常管</button>
          </div>
          <div class="pcSearch">
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
            <button :style="{'background-color':this.nowClick===3 ? '#d93f30':''}" @click="doPcSearch">查询</button>
          </div>
          <div class="listSearchInput">
            <el-input v-model="searchWord" placeholder="智能检索"></el-input>
          </div>
          <div class="tjSearch">
            <button :style="{'background-color':this.nowClick===4 ? '#d93f30':''}" @click="showScreening">条件筛选</button>
          </div>
        </div>
      </div>

      <!--切断，直管焊，短管焊-->
      <div class="publicPage" v-if="this.listType ==1">
        <el-table class="tb-edit"
                  :data="tables"
                  height="500"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                  :row-class-name="tableRowClassName"
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
              v-if="col.prop==='qieduanbiao'"
              :prop="col.prop" :label="col.label">
              <template scope="scope">
                <el-button
                  type="success"
                  style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                  @click="seeCutList">切断表</el-button>
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

      <!--小组立-->
      <div class="xzlDiv" v-if="this.listType ==2">
        <div class="xzl-change">
          <div class="change-left" @click="showLeft" >
            <button
              :style="{
             'background-color':this.left ? '#2A437B':'',
             'color':this.left ? '#ffffff':''}">
              中二小组立
            </button>
          </div>
          <div class="change-right" @click="showRight" >
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
            <el-table class="tb-edit"
                      :data="tables"
                      height="450"
                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                      :row-class-name="tableRowClassName"
                      ref="moviesTable"
                      style="width: 99%;margin: 0 auto">
              <template v-for="(col ,index) in cols">
                <el-table-column
                  align="center"
                  v-if="col.prop =='pici'"
                  width="83"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='shipcode'"
                  width="63"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='pno'"
                  width="40"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='guige'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='hujing'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='houdu'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='lianjiexinxi'"
                  width="48"
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
                  width="45"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='jiagongxilie'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="col.prop =='typeStr'"
                width="48"
                :prop="col.prop"
                :label="col.label">
              </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='levelStr'"
                  width="65"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
                  v-if="col.prop==='yiguanno'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.yiguanno }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
                  v-if="col.prop==='codeno'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.codeno }}
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
                <el-table-column
                  align="center"
                  v-if="col.prop =='curstationname'"
                  width="50"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='statusStr'"
                  width="50"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="account" v-if="right === true">
            <el-table class="tb-edit"
                      :data="tables"
                      height="450"
                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
                      :row-class-name="tableRowClassName"
                      ref="moviesTable"
                      style="width: 99%;margin: 0 auto">
              <template v-for="(col ,index) in cols">
                <el-table-column
                  align="center"
                  v-if="col.prop =='pici'"
                  width="83"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='chuanhao'"
                  width="63"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='pno'"
                  width="40"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='guige'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='hujing'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='houdu'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='lianjiexinxi'"
                  width="48"
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
                  width="45"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='jiagongxilie'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='typeStr'"
                  width="48"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='levelStr'"
                  width="65"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
                  v-if="col.prop==='yiguanno'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    {{ scope.row.yiguanno }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
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
                  v-if="col.prop =='curstationname'"
                  width="50"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop =='statusStr'"
                  width="50"
                  :prop="col.prop"
                  :label="col.label">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-if="col.prop==='pianfubiao'"
                  :prop="col.prop" :label="col.label">
                  <template scope="scope">
                    <el-button
                      type="success"
                      style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center"
                      @click="seeCutList">片付表</el-button>
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
          <div class="change-left" @click="zgShowLeft">
            <button  :style="{'background-color':this.left ? '#d93f30':''}">
              中二正枝
            </button>
          </div>
          <div class="change-center" @click="zgShowCenter">
            <button  :style="{'background-color':this.zgCenter ? '#d93f30':''}">
              中二斜枝
            </button>
          </div>
          <div class="change-right" @click="zgShowRight">
            <button  :style="{'background-color':this.right ? '#d93f30':''}">
              直枝偏心
            </button>
          </div>
        </div>
        <div class="zg-list">
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
          <div class="account" v-if="zgCenter === true">
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
          <el-button type="danger" @click="screenVisible = false" >关闭窗口</el-button>
          <el-button type="warning" icon="search" @click="emptyAllValue">一键清空</el-button>
          <el-button type="success" icon="search" @click="validationScreening">确认筛选</el-button>
        </div>
      </div>
    </el-dialog>

    <!--查看图纸 -->
    <el-dialog title="一品图查看" :visible.sync="drawingVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="drawingVisible = false" >关闭窗口</el-button>
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
        <el-button type="danger" @click="qdbVisible = false" >关闭窗口</el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <div class="drawingImg" style="width: 100%;height: 100%">
          <img :src="url" alt="" style="display:block;height: 100%;width: 100%">
        </div>
      </div>
    </el-dialog>

    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
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
        img:[],
        nowClick:2,

        k: "200",
        url: "",

        stationId:"",
        gongwei:"",

        screenVisible: false,
        drawingVisible: false,
        qdbVisible:false,

        ycSearchBtn: 0,
        dzySearchBtn: 0,


        searchWord: "",


        listType: "",

        tableData: [],
        cols: [],

        gwType:1,
        left: true,
        zgCenter: false,
        right: false,



        batch: "",
        batchOptions: [],

        ch: "",
        chOptions: [],

        gw: "",
        gwOptions: [],

        ygh:"",
        codeN:"",
        PNO:"",


        xl: "",
        xlOptions: [],

        typeSelect:"",
        typeSelectOptions:[],


        yxj: "",
        yxjOptions: [],

        kj:"",
        kjOptions: [],

        scx:"",
        scxOptions:[],

        bihou:"",
        bihouOptions:[],
        qianzuoyezhe:"",


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
        l:0,
        m:0,
        n:0,

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

      //转圈延迟一秒执行
      setTimeout(() => {
        this.getLoading();
      }, 100);
    },
    methods: {

      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },


      //公共方法显示根据不同工位显示不同的表头和表数据
      showTableData(id, name, wz, type) {

        let that = this;
        axios.all([
          axios.post(" " + url + "/sys/showTableTitleById", {"stationid": id, "weizhiid": wz, "type": type}),
          axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": name})
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data.data;
            that.tableData = table.data;
          }));
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          const infoS = JSON.parse(userInfo);
          this.stationId = infoS.GH;
          this.gongwei = infoS.GW;
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
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {
                "stationid": this.stationId,
                "weizhiid": 2,
                "type": 1
              }),
              axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": this.gongwei, "yichang": 1, "type": 1})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
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
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {
                "stationid": this.stationId,
                "weizhiid": 2,
                "type": 1
              }),
              axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": this.gongwei, "yichang": 1})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
          }
          else {
            this.listType = 1;
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {
                "stationid": this.stationId,
                "weizhiid": 2,
                "type": 1
              }),
              axios.post(" " + url + "/shengchan/shengchanListAll", {"gongxu": this.gongwei, "yichang": 1})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
          }
        }
      },

      //查询待作业
      dzySearch() {
        this.ycSearchBtn = 0;
        this.dzySearchBtn = 1;
        this.nowClick =1;
        axios.post(" " + url + "/shengchan/shengchanListAll",
          {
            "gongxu": this.gongwei,
            "daizuoye": this.dzySearchBtn,
            "type": this.gwType
          }
        )
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //查询异常
      ycSearch() {
        this.ycSearchBtn = 1;
        this.dzySearchBtn = 0;
        this.nowClick =2;
        axios.post(" " + url + "/shengchan/shengchanListAll",
          {
            "gongxu": this.gongwei,
            "yichang": this.ycSearchBtn,
            "type": this.gwType
          }
        )
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err)
          })

      },

      //批次查询
      doPcSearch() {
        if (this.batch) {
          this.ycSearchBtn = 0;
          this.dzySearchBtn = 0;
          this.nowClick =3;
          const userInfo = sessionStorage.getItem("userInfo");
          if (userInfo === null) {
            this.$router.push("/ProductionExecutionLogin")
          }
          else {
            const info = JSON.parse(userInfo);
            axios.post(" " + url + "/shengchan/shengchanListAll", {
              "gongxu": info.GW,
              "pici": this.batch,
              "type": this.gwType
            })
              .then((res) => {
                this.tableData = res.data;
              })
              .catch((err) => {
                console.log(err)
              })
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
        this.nowClick =4;
        if (this.ycSearchBtn === 1) {
          axios.post(" " + url + "/shengchan/shengchanListAll",
            {
              "type": this.gwType,
              "gongxu": this.gongwei,
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
              "yichang": this.ycSearchBtn
            })
            .then((res) => {
              this.screenVisible = false;
              this.tableData = res.data;
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else if (this.dzySearchBtn === 1) {
          axios.post(" " + url + "/shengchan/shengchanListAll",
            {
              "type": this.gwType,
              "gongxu": this.gongwei,
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
              "daizuoye": this.dzySearchBtn
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
          axios.post(" " + url + "/shengchan/shengchanListAll",
            {
              "type": this.gwType,
              "gongxu": this.gongwei,
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


      //颜色
      tableRowClassName({row, rowIndex}) {
        if (row.status === 3) {
          return 'warning-row';
        }
        else if (row.status === 2) {
          return 'success-row';
        }
        else if (row.status === 0) {
          return 'info-row';
        }
        else if (row.statusStr === "已完成") {
          return 'success-row';
        }
        else if (row.statusStr === "未开时") {
          return 'warning-row';
        }

        else if (row.status === 7) {
          return 'gray-row';
        }
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
                  this.url = res.data.imgurl;
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


      //小组立显示左边
      showLeft() {
        if(this.left !==true){
          this.cols = [];
          this.left = true;
          this.right = false;
          this.gwType = 1;
          setTimeout(() => {
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 2, "type": 1}),
              axios.post(" " + url + "/shengchan/shengchanListAll.html", {"gongxu": "小组立", "type": "1"})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
          }, 200)
        }

      },

      //小组立显示右边
      showRight() {
        if(this.right !==true){
          this.cols = [];
          this.left = false;
          this.right = true;
          this.gwType = 2;
          setTimeout(() => {
            let that = this;
            axios.all([
              axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 2, "type": 2}),
              axios.post(" " + url + "/shengchan/shengchanListAll.html", {"gongxu": "小组立", "type": "2"})
            ])
              .then(axios.spread(function (title, table) {
                that.cols = title.data.data;
                that.tableData = table.data;
              }));
          }, 200)
        }


      },


      //支管显示中二正枝左边
      zgShowLeft() {
        this.cols = [];
        this.left = true;
        this.right = false;
        this.zgCenter = false;
        this.gwType = 1;
        setTimeout(() => {
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 2, "type": 1}),
            axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断", "type": "3"})
          ])
            .then(axios.spread(function (title, table) {
              that.cols = title.data.data;
              that.tableData = table.data;
            }));
        }, 200)
      },

      //支管显示中二斜枝中间
      zgShowCenter() {
        this.cols = [];
        this.left = false;
        this.right = false;
        this.zgCenter = true;
        this.gwType = 2;
        setTimeout(() => {
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 2, "type": 2}),
            axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断", "type": "4"})
          ])
            .then(axios.spread(function (title, table) {
              that.cols = title.data.data;
              that.tableData = table.data;
            }));
        }, 200)
      },

      //支管显示直枝偏心中间
      zgShowRight() {
        this.cols = [];
        this.left = false;
        this.zgCenter = false;
        this.right = true;
        this.gwType = 3;
        setTimeout(() => {
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/showTableTitleById", {"stationid": this.stationId, "weizhiid": 2, "type": 3}),
            axios.post(" " + url + "/importother/showOtherZgbExcelPadAll", {"gongxu": "枝管切断", "type": "5"})
          ])
            .then(axios.spread(function (title, table) {
              that.cols = title.data.data;
              that.tableData = table.data;
            }));
        }, 200)
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


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .TaskListTemplate {
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
        .dzySearch {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: @color-dlLan;
            width: 80%;
            height: 50px;
            border: none;
            color: @color-white;
            border-radius: 10px;
          }

        }
        .ycSearch {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: @color-dlLan;
            width: 80%;
            height: 50px;
            border: none;
            color: @color-white;
            border-radius: 10px;
          }
        }
        .pcSearch {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: @color-dlLan;
            border: none;
            width: 30%;
            height: 50px;
            margin-left: 5%;
            margin-right: 5%;
            color: @color-white;
            border-radius: 10px;
          }
        }
        .listSearchInput {
          flex: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;

        }
        .tjSearch {
          flex: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            background-color: @color-dlLan;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80%;
            height: 50px;
            margin-left: 10%;
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
        border-top-right-radius:30px;
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
          button{
            width: 80%;
            height: 50px;
            border-radius: 10px;
            background-color: #409EFF;
            color: @color-white;
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
          button{
            width: 80%;
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
            width: 80%;
            height: 50px;
            border-radius: 10px;
            background-color: #409EFF;
            color: @color-white;
            border: none;
          }
        }
      }
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

  .closeBtn{
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


  @media only screen and (max-width: 800px) {
    .TaskList {
      margin-bottom: 80px;
      .contentTop {
        .contentTopLeft {

        }
        .contentTopRight {
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            height: 35px;
            margin-left: 2%;
          }
        }
      }
    }
  }

</style>
