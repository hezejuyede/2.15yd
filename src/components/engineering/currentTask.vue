<template>
  <div class="currentTask">
    <header-nav></header-nav>
    <div class="currentTaskTemplate">
      <div class="currentTaskTemplateBack" @click="goBack">
        <i class="iconfont icon-54"></i>
        <span>返回</span>
      </div>
      <div class="currentTaskTitle" v-if="this.gongHao !=='小组立' && this.gongHao !=='枝管切断'">
        <div class="titleDiv" v-for="(item,index) in titleData" :style="{'width':item.width}">
          <div class="titleDivLeft">
            {{item.name}}
          </div>
          <div class="titleDivRight">
            {{item.text}}
          </div>
        </div>
      </div>
      <div class="currentTaskTitle" v-if="this.gongHao==='小组立'">
        <template>
          <el-table
            :data="topData"
            :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
            :cell-style="{
             border: '1px solid #303133'
            }"
            style="width: 100%;border: 1px solid #303133">
            <el-table-column
              align="center"
              prop="indexno"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              prop="chuanhao"
              label="船番NE0"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="jiagongxilie"
              label="加工系列"
              width="54">
            </el-table-column>
            <el-table-column
              align="center"
              prop="yiguanhao"
              label="一贯番号"
              width="64">
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
                label="PNo."
                width="54">
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
                width="54"
                prop="danwei"
                align="center"
                label="单位">
              </el-table-column>
              <el-table-column
                align="center"
                prop="guanduan"
                label="管端"
                width="55">
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
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="beizhu"
              label="备注"
              width="60">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="currentTaskTitle" v-if="this.gongHao==='枝管切断'">
        <div class="currentTaskTitleTable" v-if="this.$route.params.type==='1'">
          <template>
            <el-table
              :data="topData"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{
             border: '1px solid #303133'
            }"
              style="width: 100%;border: 1px solid #303133">
              <el-table-column
                align="center"
                prop="chuanfan"
                label="船番NE0"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiagongxilie"
                label="加工系列"
                width="54">
              </el-table-column>
              <el-table-column
                align="center"
                prop="fanhao"
                label="一贯番号"
                width="63">
              </el-table-column>
              <el-table-column
                align="center"
                prop="daihao"
                label="代号"
                width="50">
              </el-table-column>
              <el-table-column align="center" label="枝管材">
                <el-table-column
                  align="center"
                  prop="pno"
                  label="PNo."
                  width="54">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="guige"
                  label="规格"
                  width="53">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="waijing"
                  label="外径"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bihou"
                  label="壁厚"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="neijing"
                  label="内径"
                  width="51">
                </el-table-column>
                <el-table-column
                  width="51"
                  prop="changdu"
                  align="center"
                  label="长度">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="muguanwaijing"
                label="母管外径"
                width="53">
              </el-table-column>
              <el-table-column align="center" label=" 工作管">
                <el-table-column
                  align="center"
                  width="51"
                  prop="quanchang"
                  label="全长">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="qieduan"
                  label="切断">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="jiancha"
                  label="检查">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="jinwu"
                label="管端金物"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="zuox"
                label="转角左X°"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="beizhu"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="currentTaskTitleTable" v-if="this.$route.params.type==='2'">
          <template>
            <el-table
              :data="topData"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{
             border: '1px solid #303133'
            }"
              style="width: 100%;border: 1px solid #303133">
              <el-table-column
                align="center"
                prop="chuanfan"
                label="船番NE0"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiagongxilie"
                label="加工系列"
                width="54">
              </el-table-column>
              <el-table-column
                align="center"
                prop="fanhao"
                label="一贯 番号"
                width="64">
              </el-table-column>
              <el-table-column
                align="center"
                prop="daihao"
                label="代号"
                width="50">
              </el-table-column>
              <el-table-column align="center" label="枝管材">
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
                  width="50">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="waijing"
                  label="外径"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bihou"
                  label="壁厚"
                  width="50">
                </el-table-column>
                <el-table-column
                  width="50"
                  prop="changdu"
                  align="center"
                  label="长度">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="muguanwaijing"
                label="母管外径"
                width="58">
              </el-table-column>
              <el-table-column align="center" label=" 工作管">
                <el-table-column
                  align="center"
                  width="51"
                  prop="quanchang"
                  label="全长">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="qieduan"
                  label="切断">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="wjuhao"
                label="ω"
                width="40">
              </el-table-column>
              <el-table-column align="center" label="输入">
                <el-table-column
                  align="center"
                  width="51"
                  prop="atext"
                  label="A">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="btext"
                  label="B">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="ktext"
                  label="K">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="jinwu"
                label="管端金物"
                width="80">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiaodu"
                label="角度"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="beizhu"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="currentTaskTitleTable" v-if="this.$route.params.type==='3'">
          <template>
            <el-table
              :data="topData"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{
             border: '1px solid #303133'
            }"
              style="width: 100%;border: 1px solid #303133">
              <el-table-column
                align="center"
                prop="chuanfan"
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
                prop="fanhao"
                label="一贯番号"
                width="63">
              </el-table-column>
              <el-table-column
                align="center"
                prop="daihao"
                label="代号"
                width="50">
              </el-table-column>
              <el-table-column align="center" label="枝管材">
                <el-table-column
                  align="center"
                  prop="pno"
                  label="PNo"
                  width="49">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="guige"
                  label="规格"
                  width="53">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="waijing"
                  label="外径"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="houdu"
                  label="厚度"
                  width="51">
                </el-table-column>
                <el-table-column
                  width="51"
                  prop="changdu"
                  align="center"
                  label="长度">
                </el-table-column>
                <el-table-column
                  width="64"
                  prop="pianxinliang"
                  align="center"
                  label="偏心量">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="muguanwaijing"
                label="母管外径"
                width="53">
              </el-table-column>
              <el-table-column align="center" label=" 工作管">
                <el-table-column
                  align="center"
                  width="51"
                  prop="quanchang"
                  label="全长">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="64"
                  prop="denglizi"
                  label="等离子">
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="输入">
                <el-table-column
                  align="center"
                  width="51"
                  prop="atext"
                  label="A">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="btext"
                  label="B">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="ktext"
                  label="K">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="jinwu"
                label="管端金物"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiaodu"
                label="角度"
                width="51">
              </el-table-column>
              <el-table-column
                align="center"
                prop="beizhu"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="currentTaskTitleTable" v-if="this.$route.params.type==='4'">
          <template>
            <el-table
              :data="topData"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{
             border: '1px solid #303133'
            }"
              style="width: 100%;border: 1px solid #303133">
              <el-table-column
                align="center"
                prop="chuanfan"
                label="船番NE0"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiagongxilie"
                label="加工系列"
                width="54">
              </el-table-column>
              <el-table-column
                align="center"
                prop="yiguanhao"
                label="一贯番号"
                width="63">
              </el-table-column>
              <el-table-column
                align="center"
                prop="daihao"
                label="代号"
                width="50">
              </el-table-column>
              <el-table-column align="center" label="枝管材">
                <el-table-column
                  align="center"
                  prop="pno"
                  label="PNo."
                  width="54">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="guige"
                  label="规格"
                  width="53">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="waijing"
                  label="外径"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bihou"
                  label="壁厚"
                  width="51">
                </el-table-column>
                <el-table-column
                  width="51"
                  prop="changdu"
                  align="center"
                  label="长度">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="muguanwaijing"
                label="母管外径"
                width="53">
              </el-table-column>
              <el-table-column align="center" label=" 工作管">
                <el-table-column
                  align="center"
                  width="51"
                  prop="quanchang"
                  label="全长">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="qieduan"
                  label="切断">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="wjuhao"
                label="ω"
                width="40">
              </el-table-column>
              <el-table-column align="center" label="输入">
                <el-table-column
                  align="center"
                  width="51"
                  prop="atext"
                  label="A">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="btext"
                  label="B">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="ktext"
                  label="K">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="jinwu"
                label="管端金物"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiaodu"
                label="角度"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="beizhu"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="currentTaskTitleTable" v-if="this.$route.params.type==='5'">
          <template>
            <el-table
              :data="topData"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{
             border: '1px solid #303133'
            }"
              style="width: 100%;border: 1px solid #303133">
              <el-table-column
                align="center"
                prop="chuanfan"
                label="船番NE0"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiagongxilie"
                label="加工系列"
                width="54">
              </el-table-column>
              <el-table-column
                align="center"
                prop="yiguanhao"
                label="一贯番号"
                width="63">
              </el-table-column>
              <el-table-column
                align="center"
                prop="daihao"
                label="代号"
                width="50">
              </el-table-column>
              <el-table-column align="center" label="枝管材">
                <el-table-column
                  align="center"
                  prop="pno"
                  label="PNo."
                  width="54">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="guige"
                  label="规格"
                  width="53">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="waijing"
                  label="外径"
                  width="51">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bihou"
                  label="壁厚"
                  width="51">
                </el-table-column>
                <el-table-column
                  width="51"
                  prop="changdu"
                  align="center"
                  label="长度">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="muguanwaijing"
                label="母管外径"
                width="53">
              </el-table-column>
              <el-table-column align="center" label=" 工作管">
                <el-table-column
                  align="center"
                  width="51"
                  prop="quanchang"
                  label="全长">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="qieduan"
                  label="切断">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="wjuhao"
                label="ω"
                width="40">
              </el-table-column>
              <el-table-column align="center" label="输入">
                <el-table-column
                  align="center"
                  width="51"
                  prop="atext"
                  label="A">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="btext"
                  label="B">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="51"
                  prop="ktext"
                  label="K">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="jinwu"
                label="管端金物"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="jiaodu"
                label="角度"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="beizhu"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="currentTaskBtn">
        <div class="templateBtn" v-for="(item,index) in bottomButton" v-if="item.show==1">
          <button
            :disabled="item.disabled==='0'"
            @click="bottomButtonClick(item.type)"
            :style="{'background-color':item.backgroundcolor,'color':item.color}">
            {{item.name}}
          </button>
        </div>
      </div>
      <div class="currentTaskRouter clearfix">
        <div class="" v-for="(item,index) in routerList">
          <div class="currentTaskRouterList clearfix">
            <div class="currentTaskRouterListTitle"><span>PNO</span><span>:</span><span>{{item.pno}}</span></div>
            <div class="currentTaskRouterListLine">
              <el-steps :active="item.maxstep" finish-status="success">
                <el-step v-for="(item,index) in item.nodeList" :keys="index" :title="item.stationname"></el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </div>
      <div class="currentTaskDiv">
        <div class="currentTaskDivLeft">
          <i class="iconfont icon-unie62b"></i>
          <span>当前工位注意事项</span>
        </div>
        <div class="currentTaskDivRight" v-html="matterData"></div>
      </div>
      <div class="currentTaskDiv">
        <div class="currentTaskDivLeft">
          <i class="iconfont icon-unie62b"></i>
          <span>当前加工管注意事项</span>
        </div>
        <div class="currentTaskDivRight" v-html="matterData"></div>
      </div>
    </div>

    <!--显示上报异常按钮 -->
    <el-dialog title="上报异常" :visible.sync="abnormalBtnVisible" width="90%">
      <div class="closeBtn">
        <el-button type="primary" @click="abnormalBtnVisible = false">关闭当前窗口</el-button>
      </div>
      <div class="container" style="height:350px;width: 100%">
        <div class="qualityBtn">
          <div class="" v-for="(item,index) in options">
            <el-button v-if="index===0" type="primary"
                       @click="showReportAbnormalContent(item.indexno,item.name)">
              {{item.name}}
            </el-button>
            <el-button v-if="index===1" type="success"
                       @click="showReportAbnormalContent(item.indexno,item.name)">
              {{item.name}}
            </el-button>
            <el-button v-if="index===2" type="warning"
                       @click="showReportAbnormalContent(item.indexno,item.name)">
              {{item.name}}
            </el-button>
            <el-button v-if="index===3" type="danger"
                       @click="showReportAbnormalContent(item.indexno,item.name)">
              {{item.name}}
            </el-button>
          </div>

        </div>
      </div>
    </el-dialog>

    <!--上报异常备注 -->
    <el-dialog title="上报异常备注" :visible.sync="abnormalVisible" width="90%">
      <div class="container" style="height:400px;overflow:auto">
        <div class="closeBtn">

          <el-button type="danger" @click="abnormalVisible = false">关闭窗口</el-button>
        </div>
        <div class="qualityDiv">
          <div class="qualityDivTitle ">
            <span style="font-size: 18px">异常原因</span>
            <span style="margin: 0 5px">:</span>
            <el-button type="warning" style="width: 150px;height: 35px">{{abnormalReason}}</el-button>
          </div>
          <div class="qualityDivContent">
            <el-input
              type="textarea"
              ref="siteInput"
              auto-complete="off"
              :autosize="{ minRows: 6, maxRows: 6 }"
              placeholder="请出入异常备注"
              v-model="remarks">
            </el-input>
          </div>
          <div class="qualityDivBtn">
            <button @click="submitAbnormal">提交异常原因</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--查看图纸 -->
    <el-dialog title="一品图查看" :visible.sync="drawingVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger" @click="drawingVisible = false">关闭窗口</el-button>
      </div>
      <div class="container">
        <div class="drawingImg" style="width: 100%;height: 100%">
          <img :src="url" alt="" style="display:block;width: 100%;height: 100%">
        </div>
      </div>
    </el-dialog>

    <!--作业记录 -->
    <el-dialog title="作业记录" :visible.sync="jobLogVisible" width="95%">
      <div class="container" style="height:400px;overflow:auto">
        <div class="containerDiv">
          <el-table
            class="tb-edit"
            :data="listTableData"
            :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
            border
            highlight-current-row
            @select="selectJlList"
            @select-all="selectJlAll"
            style="width: 98%;
            margin: auto">
            <el-table-column
              type="selection"
              align="center"
              width="30">
            </el-table-column>
            <el-table-column
              prop="cindex"
              label="序号"
              align="center"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="oqtypename"
              label="质量内容"
              align="center"
              min-width="20%">
            </el-table-column>
            <el-table-column
              label="值"
              align="center"
              min-width="20%">
              <template slot-scope="scope">
                <div class="" v-if="scope.row.indexno==1">
                  <el-input v-model="scope.row.oqmsg"></el-input>
                </div>
                <div class="" v-if="scope.row.indexno==2">
                  <el-select
                    v-model="scope.row.oqmsg"
                    clearable
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择表名">
                    <el-option
                      v-for="item in scope.row.relatableOptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="btnDiv">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="addJl">提交</el-button>
          </div>

        </div>
      </div>
    </el-dialog>

    <!--弯管状态 -->
    <el-dialog title="弯管完成状态" :visible.sync="elbowVisible" width="95%">
      <div class="closeBtn">
        <el-button type="danger" @click="elbowVisible = false">关闭窗口</el-button>
      </div>
      <div class="container" style="height:450px;overflow:auto">
        <div class="elbowDiv">
          <div class="elbowTop">
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
          <div class="elbowBottom">
            <el-table class="tb-edit"
                      :data="wtTableData"
                      :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                      border
                      height="350"
                      highlight-current-row
                      style="width: 98%;margin: auto">
              <template v-for="(col ,index) in wtCols">
                <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
              </template>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--当前工位表查看 -->
    <el-dialog title="当前工位表查看" :visible.sync="qdbVisible" :fullscreen="true" :center="true">
      <div class="closeBtn">
        <el-button type="danger"  @click="qdbVisible = false">关闭窗口</el-button>
        <el-button type="primary" @click="gwbDoWorkEnd" v-if="this.gongHao !=='43/48装配' && this.gongHao !=='45/46装配' ">报完工</el-button>
      </div>
      <div class="container" style="width: 100%;height: 100%">
        <StationExcel :gwType="gwType"
                       :gongHao="gongHao"
                       :isHideStationExcel="isHideStationExcel"
                       :excelData="excelData"
                       :gzId="gzId"></StationExcel>
      </div>
    </el-dialog>

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
  import headerNav from '../../common/header'
  import footerNav from '../../common/footer'
  import Loading from '../../common/loading'
  import url from '../../assets/js/URL'
  import Modal from '../../common/modal'
  import StationExcel from '../../common/stationExcel'

  export default {
    name: 'drawing',
    data() {
      return {
        img: [],             //转圈img数组
        message: '',         //自己封装的弹框信息
        HideModal: true,     //是否显示弹出框
        isHideStationExcel:false, //工位表是否显示和隐藏

        gongwei: "",        //数字工位
        gongHao: "",        //汉字工号
        zuoyezhe: "",       //当前登录账户
        gwType:"1",         //工位类型，例如小组立和枝管有多个工位
        id: "",             //加工详情页面内管子的ID
        gzId:"",             //工位表管子ID
        routerList: [],                   // 工艺路线的数组，里面有一个或者多个工艺路线
        titleData: [],                   //当前任务页面头部显示内容数组
        matterData: "",                 //注意事项的内容
        bottomButton: [],              //底部按钮的是数组

        topData:[],                     //页面头部在小组立和枝管工位需要展示的数据
        excelData: [],                  //工位表的数据


        abnormalVisible: false,       //上报异常类型提醒框
        abnormalBtnVisible: false,     //上报异常按钮提醒框
        drawingVisible: false,        //一品图提醒框
        jobLogVisible: false,        //作业执行记录提醒框
        elbowVisible: false,         //弯管状态提醒框
        qdbVisible: false,            //工位表提醒框

        batch: "",                 //批次值
        batchOptions: [],          //批次的下拉列表

        wtTableData: [],          //弯头的数据数组
        wtCols: [],               //弯头的数据表头

        url: "",                 //一品图的URL
        listTableData: [],       //作业记录表数据

        options: [],                //异常原因的数组
        abnormalReason: "",       //选择上报的异常原因
        remarks: "",                // 异常备注的内容
        Reason: "",                  //选择的异常按钮id号
        listData: []                //复选框的ID数组

      }

    },
    components: {Loading, footerNav, headerNav, Modal,StationExcel},
    mounted() {


    },
    created() {
      //检索用户状态
      this.getAdminState();

      //转圈延迟一秒执行
      setTimeout(() => {
        this.getLoading();
      }, 1000);

    },
    methods: {
      //转圈延迟一秒执行
      getLoading() {
        this.img = ["1"]
      },
      goBack(){
       this.$router.push("/")
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        const info = JSON.parse(userInfo);
        if (info === null) {
          this.$router.push("/ProductionExecutionLogin")
        }
        else {
          this.zuoyezhe = info.username;
          this.gongwei = info.GH;
          this.gongHao = info.GW;
          const id = localStorage.getItem("pipeId");
          if (id === null || id === "") {
            localStorage.setItem("IndexUrl", 0);
            this.$router.push("/")
          }
          else {
            this.id = id;
            let that = this;
            if (this.gongHao === "43/48装配" || this.gongHao === "45/46装配" || this.gongHao === "大组焊") {
              axios.all([
                axios.post(" " + url + "/shengchan/getCurShengchanguanZhuangpei", {"id": id, stationid: this.gongwei}),
                axios.post(" " + url + "/show/showButton", {"id": this.gongwei}),
              ])
                .then(axios.spread(function (table, btn) {
                  that.wtTableData = table.data;
                  that.titleData = table.data.baseItem;
                  that.tableData = table.data.yipintulist;
                  that.routerList = table.data.flowLine;
                  that.bottomButton = btn.data;
                  if (table.data.contextList !== undefined && table.data.contextList.length > 0) {
                    that.matterData = table.data.contextList[0].noticehtml;
                  }
                }))
            }
            else if (this.gongHao === "弯头焊") {
              let pici = this.$route.params.pici;
              let yiguanno = this.$route.params.yiguanno;
              let codeno = this.$route.params.codeno;
              let fuhao = this.$route.params.fuhao;
              axios.all([
                axios.post(" " + url + "/shengchan/getCurShengchanguanWth", {
                  "pici": pici,
                  "yiguanhao": yiguanno,
                  "codeN": codeno,
                  "fuhao": fuhao
                }),
                axios.post(" " + url + "/show/showButton", {"id": this.gongwei}),
              ])
                .then(axios.spread(function (table, btn) {
                  that.wtTableData = table.data;
                  that.titleData = table.data.baseItem;
                  that.tableData = table.data.yipintulist;
                  that.routerList = table.data.flowLine;
                  that.bottomButton = btn.data;
                  if (table.data.contextList !== undefined && table.data.contextList.length > 0) {
                    that.matterData = table.data.contextList[0].noticehtml;
                  }
                }))
            }
            else if (this.gongHao === "枝管切断") {
              let type = this.$route.params.type;
              this.gwType =type;
              axios.all([
                axios.post(" " + url + "/shengchan/getCurShengchanguanZhiguan", {"id": id, "type": type}),
                axios.post(" " + url + "/show/showButton", {"id": this.gongwei}),
              ])
                .then(axios.spread(function (table, btn) {
                  that.wtTableData = table.data;
                  that.topData = table.data.baseItem;
                  that.tableData = table.data.yipintulist;
                  that.routerList = table.data.flowLine;
                  that.bottomButton = btn.data;
                  if (table.data.contextList !== undefined && table.data.contextList.length > 0) {
                    that.matterData = table.data.contextList[0].noticehtml;
                  }
                }))
            }
            else if (this.gongHao === "弯头切断") {
              axios.all([
                axios.post(" " + url + "/shengchan/getCurShengchanguanwtqd", {"id": id}),
                axios.post(" " + url + "/show/showButton", {"id": this.gongwei}),
              ])
                .then(axios.spread(function (table, btn) {
                  that.wtTableData = table.data;
                  that.titleData = table.data.baseItem;
                  that.tableData = table.data.yipintulist;
                  that.routerList = table.data.flowLine;
                  that.bottomButton = btn.data;
                  if (table.data.contextList !== undefined && table.data.contextList.length > 0) {
                    that.matterData = table.data.contextList[0].noticehtml;
                  }
                }))
            }
            else {
              axios.all([
                axios.post(" " + url + "/shengchan/getCurShengchanguan", {"id": id}),
                axios.post(" " + url + "/show/showButton", {"id": this.gongwei}),
              ])
                .then(axios.spread(function (table, btn) {
                  that.wtTableData = table.data;
                  that.titleData = table.data.baseItem;
                  that.topData = table.data.baseItem;
                  that.tableData = table.data.yipintulist;
                  that.routerList = table.data.flowLine;
                  that.bottomButton = btn.data;
                  if (table.data.contextList !== undefined && table.data.contextList.length > 0) {
                    that.matterData = table.data.contextList[0].noticehtml;
                  }
                }))
            }
          }
        }
      },

      //底部公共点击事件
      bottomButtonClick(type) {
        //加工开始
        if (type === "1") {
          if (this.id) {
            axios.post(" " + url + "/shengchan/startWork", {"id": this.id})
              .then((res) => {
                if (res.data === "success") {
                  this.bottomButton[0].disabled = "0";
                  this.bottomButton[1].disabled = "1";
                  this.message = "已经开始加工";
                  this.HideModal = false;
                  const that = this;

                  function a() {
                    that.message = "";
                    that.HideModal = true;
                  }

                  setTimeout(a, 2000);

                }
                else if (res.data === "-1") {
                  this.bottomButton[0].disabled = "0";
                  this.bottomButton[1].disabled = "1";
                  this.message = "已经开始，请勿重复";
                  this.HideModal = false;
                  const that = this;

                  function b() {
                    that.message = "";
                    that.HideModal = true;
                  }

                  setTimeout(b, 2000);
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        //加工结束
        else if (type === "2") {
          if (this.gongHao === "弯头焊") {
            let pici = this.$route.params.pici;
            let yiguanno = this.$route.params.yiguanno;
            let codeno = this.$route.params.codeno;
            let fuhao = this.$route.params.fuhao;
            let that = this;
            axios.all([
              axios.post(" " + url + "/shengchan/updateStatusWth", {
                "pici": pici,
                "yiguanhao": yiguanno,
                "codeN": codeno,
                "fuhao": fuhao,
                "zuoyezhe": that.zuoyezhe
              }),
            ])
              .then(axios.spread(function (table) {
                if (table.data === "1") {
                  that.$message({
                    message: '报完工成功',
                    type: 'success'
                  });
                  setTimeout(() => {
                    that.$router.push("/")
                  }, 1000);
                }
              }))
          }
          else if (this.gongHao === "枝管切断") {
            axios.post(" " + url + "/shengchan/updateStatus", {
              "id": this.id,
              "zuoyezhe": this.zuoyezhe,
              "stationid": this.gongwei,
              "ids": this.listData,
              "list": this.listTableData,
              "type": this.$route.params.type
            })
              .then((res) => {
                if (res.data === "success") {
                  this.$message({
                    message: '报完工成功',
                    type: 'success'
                  });
                  this.bottomButton[0].disabled = "0";
                  this.bottomButton[1].disabled = "0";
                  this.jobLogVisible = false;
                }
                else if (res.data === "1") {
                  this.$message({
                    message: '报完工成功',
                    type: 'success'
                  });
                  this.bottomButton[0].disabled = "0";
                  this.bottomButton[1].disabled = "0";
                  this.jobLogVisible = false;
                }
                else {
                  this.$message({
                    message: '提交失败',
                    type: 'warning'
                  });
                }
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else {
            let that = this;
            axios.all([
              axios.post(" " + url + "/sysconfig/opreaRecordTypeList", {"station": that.gongwei}),
            ])
              .then(axios.spread(function (listData) {

                if (listData.data.length > 0) {
                  let data = [];
                  for (let i = 0; i < listData.data.length; i++) {
                    if (listData.data[i].code == 2) {
                      axios.post(" " + url + "/sys/dictionaryList", {"id": listData.data[i].code})
                        .then((res) => {
                          var list = {
                            id: listData.data[i].id,
                            cindex: listData.data[i].cindex,
                            oqtypename: listData.data[i].context,
                            indexno: listData.data[i].ctype,
                            oqmsg: listData.data[i].value,
                            relatableOptions: res.data
                          };
                          data.push(list);
                        })
                        .catch((err) => {
                          console.log(err)
                        });
                    }
                    else {
                      var list = {
                        id: listData.data[i].id,
                        cindex: listData.data[i].cindex,
                        oqtypename: listData.data[i].context,
                        indexno: listData.data[i].ctype,
                        oqmsg: listData.data[i].value
                      };
                      data.push(list);
                    }
                  }
                  that.listTableData = data;
                  that.jobLogVisible = true;
                }
                else {
                  that.addJl(1);
                  setTimeout(() => {
                    that.$router.push("/")
                  }, 1000);
                }
              }));
          }
        }
        //查看各位工位表
        else if (type === "3") {
          if(this.gongHao === "小组立"){
            let arr = [];
            for (let i = 0; i < this.topData.length; i++) {
              arr.push(this.topData[i].id)
            }
            this.gzId = arr;
            let pici = this.titleData[0].pici;
            axios.post(" " + url + "/importother/showXiaozuliExcel", {"code": "qieduan", "pici": pici})
              .then((res) => {
                if (res.data) {
                  this.excelData = res.data;
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
          else if(this.gongHao === "枝管切断"){
            let pici = this.titleData[0].pici;
            if(this.gwType==="1"){
              axios.post(" " + url + "/importother/publicData", {"code": "zezz", "pici": pici})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.qdbVisible = true;
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
            else if(this.gwType==="2"){
              axios.post(" " + url + "/importother/publicData", {"code": "zexz", "pici": pici})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.qdbVisible = true;
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
            else if(this.gwType==="3"){
              axios.post(" " + url + "/importother/publicData", {"code": "zzpx", "pici": pici})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.qdbVisible = true;
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
            else if(this.gwType==="4"){
              axios.post(" " + url + "/importother/publicData", {"code": "mgb", "pici": pici})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.qdbVisible = true;
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
            else if(this.gwType==="5"){
              axios.post(" " + url + "/importother/publicData", {"code": "zjg", "pici": pici,"type":this.gwType})
                .then((res) => {
                  if (res.data) {
                    this.excelData = res.data;
                    this.qdbVisible = true;
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
          else {

            let pici = this.titleData[0].text;
            axios.post(" " + url + "/importother/publicData", {"code": "qieduan", "pici": pici})
              .then((res) => {
                if (res.data) {
                  this.excelData = res.data;
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
        }
        //显示上报异常按钮
        else if (type === "4") {
          axios.post(" " + url + "/sys/dictionaryList", {"id": "1"})
            .then((res) => {
              //删除所有
              /*   res.data.splice(0, 1);*/
              //第一个禁用
              /*res.data[0].disabled =true;*/
              this.options = res.data;
            })
            .catch((err) => {
              console.log(err)
            });

          this.abnormalBtnVisible = true;

        }
        //显示查看当前图纸
        else if (type === "5") {
          if(this.gongHao === "小组立"){
            let pici = this.titleData[0].pici;
            let yiguanhao = this.titleData[0].yiguanhao;
            let code = this.titleData[0].daihao;
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
          else if(this.gongHao === "枝管切断"){
            let pici = this.titleData[0].pici;
            let yiguanhao = this.titleData[0].yiguanhao;
            let code = this.titleData[0].daihao;
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
            let pici = this.titleData[0].text;
            let yiguanhao = this.titleData[2].text;
            let code = this.titleData[3].text;
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

        }
        //查看精度管理表
        else if (type === "6") {

        }
        //查看精度管理表
        else if (type === "6") {

        }
        //叫料
        else if (type === "7") {

        }
        //查看3D图
        else if (type === "8") {

        }
        //取消作业
        else if (type === "9") {

        }
        //弯头查询
        else if (type === "10") {
          axios.post(" " + url + "/sys/getPiciList")
            .then((res) => {
              this.batchOptions = res.data;
              this.batch = this.batchOptions[0].id;
              const that = this;
              axios.all([
                axios.post(" " + url + "/sys/showTableTitle", {"name": "wtqdb"}),
                axios.post(" " + url + "/importother/showWtqieduanExcelAll", {"pici": this.batchOptions[0].id})
              ])
                .then(axios.spread(function (title, table) {
                  that.wtCols = title.data;
                  that.wtTableData = table.data;
                }));
              setTimeout(() => {
                this.elbowVisible = true;
              }, 400)

            })
            .catch((err) => {
              console.log(err)
            });
        }

        //废止管处理
        else if (type === "11") {

        }
        //发送数据
        else if (type === "12") {

        }
      },


      //作业记录单选择
      selectJlList(val, index) {

        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].cindex;
            data.push(a)
          }
          this.listData = data;
        }
      },


      //作业记录多全选
      selectJlAll(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].cindex;
            data.push(a)
          }
          this.listData = data;
        }

      },

      //提交作业质量记录
      addJl() {
        axios.post(" " + url + "/shengchan/updateStatus", {
          "id": this.id,
          "zuoyezhe": this.zuoyezhe,
          "stationid": this.gongwei,
          "ids": this.listData,
          "list": this.listTableData,
          "type": 1
        })
          .then((res) => {
            if (res.data === "success") {
              this.$message({
                message: '报完工成功',
                type: 'success'
              });
              this.bottomButton[0].disabled = "0";
              this.bottomButton[1].disabled = "0";
              this.jobLogVisible = false;
              let that = this;
              setTimeout(() => {
                that.$router.push("/")
              }, 1000);
            }
            else if (res.data === "1") {
              this.$message({
                message: '报完工成功',
                type: 'success'
              });
              this.bottomButton[0].disabled = "0";
              this.bottomButton[1].disabled = "0";
              this.jobLogVisible = false;
              let that = this;
              setTimeout(() => {
                that.$router.push("/")
              }, 1000);
            }
            else {
              this.$message({
                message: '提交失败',
                type: 'warning'
              });
            }
          })
          .catch((err) => {
            console.log(err)
          });


      },


      //弯头完成状态查询
      doSearch() {
        if (this.batch) {
          let that = this;
          axios.all([
            axios.post(" " + url + "/sys/showTableTitle", {"name": "wtqdb"}),
            axios.post(" " + url + "/importother/showWtqieduanExcelAll", {"pici": this.batch})
          ])
            .then(axios.spread(function (title, table) {
              that.wtCols = title.data;
              that.wtTableData = table.data;
            }));
        }
        else {
          this.$message({
            type: 'warning',
            message: '查询请选择批次'
          });
        }
      },

      //点按钮弹出备注框
      showReportAbnormalContent(Reason, message) {
        this.abnormalVisible = true;
        this.Reason = Reason;
        this.remarks = "";
        this.abnormalReason = message;
        this.$nextTick(function () {
          this.$refs['siteInput'].focus();
        })


      },

      //进行上报异常
      submitAbnormal() {
        if (this.remarks) {
          const userInfo = sessionStorage.getItem("userInfo");
          const id = localStorage.getItem("pipeId");
          const info = JSON.parse(userInfo);
          const userId = info.username;
          axios.post(" " + url + "/shengchanError/errorEvent",
            {
              "userId": userId,
              "errorId": this.Reason,
              "context": this.remarks,
              "id": id
            })
            .then((res) => {
              if (res.data === "1") {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                let that = this;
                setTimeout(function () {
                  that.abnormalVisible = false;
                  that.abnormalBtnVisible = false;
                }, 2000)
              }
              else if (res.data === "2") {
                this.$message({
                  message: '该管子已经提报异常无需重新提交',
                  type: 'warning'
                });
              }
              else {
                this.$message({
                  message: '提交失败因',
                  type: 'warning'
                });
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.$message({
            message: '请输入异常备注',
            type: 'warning'
          })
        }
      },

      //工位表报完工
      gwbDoWorkEnd(){
        axios.post(" " + url + "/shengchan/updateStatusBatch",
          {
            "ids": [this.id],
            "zuoyezhe": this.zuoyezhe,
            "type": this.gwType,
            "stationid": this.gongwei
          })
          .then((res) => {
            if (res.data === "1") {
              this.$message.success(`报完工成功`);
              let that = this;
              setTimeout(() => {
                that.qdbVisible = false;
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

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .currentTask {
    width: 100%;
    margin-bottom: 80px;
    .currentTaskTemplate {
      width: 100%;
      .currentTaskTemplateBack{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 25px;
        color: #409EFF;
        .icon-54{
          font-size:25px;
        }
      }
      .currentTaskTitle {
        width: 100%;
        background-color: #D8E5F6;
        display: flex;
        flex-flow: row wrap;
        .titleDiv {
          width: 20%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #D8E5F6;
          .titleDivLeft {
            width: 40%;
            height: 50%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: row wrap;
            font-size: @font-size-large-xx;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .titleDivRight {
            width: 50%;
            height: 50%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: row wrap;
            margin-left: 2%;
            background-color: @color-F0;
            border-radius: 5%;
            font-size: @font-size-large-xx;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            text-overflow: ellipsis;
          }
        }
        .currentTaskTitleTable {
          width: 100%;
        }
      }
      .currentTaskDiv {
        width: 95%;
        margin: 20px auto;
        display: flex;
        .currentTaskDivLeft {
          flex: 2;
          background-color: #ED6942;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .icon-unie62b {
            font-size: 400%;
            color: @color-white;
          }
          span {
            margin-top: 10px;
            font-size: @font-size-large;
            color: @color-white;
          }
        }
        .currentTaskDivRight {
          flex: 8;
          height: 100px;
          background-color: #F6F7FB;
          overflow: auto;
          padding: 2%;
        }
      }
      .currentTaskBtn {
        width: 95%;
        height: 60px;
        margin: 15px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        /* button {
           width: 15%;
           height: 50px;
           display: flex;
           align-items: center;
           justify-content: center;
         }*/
        .templateBtn {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          button {
            width: 90%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            color: #ffffff;
          }
          button:disabled {
            background-color: @sousuo;
            pointer-events: none;
            cursor: not-allowed;
            filter: alpha(opacity=1);
            -webkit-box-shadow: none;
            box-shadow: none;
            opacity: .65;
          }
        }
      }
      .currentTaskRouter {
        margin: 15px auto 0 auto;
        width: 95%;
        .currentTaskRouterList{
          width: 100%;
          margin-bottom:20px ;
          .currentTaskRouterListTitle {
            float: left;
            font-size: @font-size-large-xxxx;
            color: @color-background-dd;
            margin-right: 2%;
          }
          .currentTaskRouterListLine{
            width: 88%;
            float: left;
          }
        }

      }
    }

  }

  .qualityDiv {
    width: 100%;
    height: 100%;
    .qualityDivTitle {
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qualityDivContent {
      width: 80%;
      margin: 0 auto;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

    }
    .qualityDivBtn {
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 150px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: @color-blue;
        color: @color-white;
        font-size: @font-size-medium-x;
        border-radius: 10%;
        border: none;

      }
    }

  }

  .container {
    width: 100%;
    height: 100%;
    .elbowDiv {
      width: 100%;
      height: 100%;
      .elbowTop {
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
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
      .elbowBottom {
        padding-top: 10px;
        height: 85%;
        overflow: auto;
      }
    }
    .containerDiv {
      width: 100%;
      height: 100%;
      .btnDiv {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          width: 100px;
          height: 30px;
        }
      }

    }
    .qualityBtn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          width: 95%;
          height: 50px;
          margin-left: 5%;
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

  .el-button {
    width: 100px;
    height: 30px;
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

  @media only screen and (max-width: 1200px) {

    .currentTask {
      .currentTaskTemplate {
        .currentTaskTitle {
          .titleDiv {
            .titleDivLeft {
              font-size: @font-size-large;
            }
            .titleDivRight {
              font-size: @font-size-large
            }
          }
        }
        .currentTaskDiv {
          .currentTaskDivLeft {
            flex: 3;
            .icon-unie62b {
              font-size: 400%;
              color: @color-white;
            }
            span {
              margin-top: 10px;
              font-size: @font-size-large;
              color: @color-white;
            }
          }
          .currentTaskDivRight {
            flex: 7;
          }
        }
        .currentTaskButton {
          button {
            width: 15%;
            font-size: @font-size-medium;
          }
        }
      }

    }

  }

  @media only screen and (max-width: 900px) {
    .currentTask {
      .currentTaskTemplate {
        .currentTaskTitle {
          .titleDiv {
            .titleDivLeft {
              font-size: @font-size-medium;
            }
            .titleDivRight {
              font-size: @font-size-medium
            }
          }
        }
        .currentTaskDiv {
          .currentTaskDivLeft {
            flex: 4;
            .icon-unie62b {
              font-size: 400%;
              color: @color-white;
            }
            span {
              margin-top: 10px;
              font-size: @font-size-medium;
              color: @color-white;
            }
          }
          .currentTaskDivRight {
            flex: 6;
          }
        }
        .currentTaskButton {
          width: 95%;
          button {
            width: 25%;
            font-size: @font-size-small-s;

          }
        }
      }

    }

  }

  @media only screen and (max-width: 640px) {
    .currentTask {
      .currentTaskTemplate {
        .currentTaskTitle {
          .titleDiv {
            .titleDivLeft {
              font-size: @font-size-small;
            }
            .titleDivRight {
              font-size: @font-size-small;
            }
          }
        }
        .currentTaskButton {
          width: 95%;
          button {
            width: 25%;
            font-size: @font-size-small-s;

          }
        }
      }

    }

  }

  @media only screen and (max-width: 400px) {
    .currentTask {
      .currentTaskTemplate {
        .currentTaskTitle {
          .titleDiv {
            .titleDivLeft {
              font-size: @font-size-small-s;
            }
            .titleDivRight {
              font-size: @font-size-small-s;
            }
          }
        }
        .currentTaskDiv {
          .currentTaskDivLeft {
            flex: 4;
            .icon-unie62b {
              font-size: 300%;
              color: @color-white;
            }
            span {
              margin-top: 10px;
              font-size: @font-size-small-s;
              color: @color-white;
            }
          }
          .currentTaskDivRight {
            flex: 6;
          }
        }
        .currentTaskButton {
          width: 95%;
          button {
            width: 25%;
            font-size: @font-size-small-s;

          }
        }
      }

    }

  }

</style>
