<template>
  <div v-bind:class="{hideModal:isHideStationExcel}">
    <div class="templateTop" ref="templateTop">
      <div class="" v-if="gongHao === '枝管切断'">
        <div class="" v-if="gwType === '1'">
          <template>
            <el-table
              height="640"
              :data="excelData"
              :row-class-name="tableRowClassName"
              :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            color:'rgba(0, 0, 0, 1)'}"
              :cell-style="{border: '1px solid #303133'}"
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
        <div class="" v-if="gwType === '2'">
          <template>
            <el-table
              height="640"
              :data="excelData"
              :row-class-name="tableRowClassNameZGQD"
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
                label="船番NE"
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
                  width="80">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="bihou"
                  label="壁厚"
                  width="60">
                </el-table-column>
                <el-table-column
                  width="60"
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
                  width="80"
                  prop="qieduan"
                  label="切断">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                prop="wjuhao"
                label="ω"
                width="100">
              </el-table-column>
              <el-table-column align="center" label="输入">
                <el-table-column
                  align="center"
                  width="50"
                  prop="atext"
                  label="A">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
                  prop="btext"
                  label="B">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="50"
                  prop="kxtext"
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
                prop="zuox"
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
        <div class="" v-if="gwType === '3'">
          <template>
            <el-table
              height="640"
              :data="excelData"
              :row-class-name="tableRowClassName"
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
                label="船番NE"
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
                  prop="kxtext"
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
                prop="zuox"
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
        <div class="" v-if="gwType === '4'">
          <template>
            <el-table
              height="640"
              :data="excelData"
              :row-class-name="tableRowClassName"
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
                label="船番NE"
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
                  prop="kxtext"
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
                prop="zuox"
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
        <div class="" v-if="gwType === '5'">
          <template>
            <el-table
              height="640"
              :data="excelData"
              :row-class-name="tableRowClassName"
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
                label="船番NE"
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
                  width="80">
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
                  prop="kxtext"
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
                prop="zuox"
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
      <div class="" v-if="gongHao === '小组立'">
        <el-table
          :data="excelData"
          height="640"
          ref="Table"
          :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'12px',
            color:'rgba(0, 0, 0, 1)'}"
          :cell-style="{
             border: '1px solid #303133',
             fontSize:'11px'
            }"
          :row-class-name="tableRowClassName"
          @selection-change="selectChange"
          @select="selectList"
          @select-all="selectAll"
          style="width: 100%;border: 1px solid #303133">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            align="center"
            prop="chuanhao"
            label="船番NE"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="jiagongxiliev"
            label="加工系列"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="yiguanhaov"
            label="一贯番号"
            width="70">
          </el-table-column>
          <el-table-column
            align="center"
            prop="codenov"
            label="代号"
            width="50">
          </el-table-column>
          <el-table-column align="center" label="管材">
            <el-table-column
              align="center"
              prop="pno"
              label="PNo"
              width="47">
            </el-table-column>
            <el-table-column
              align="center"
              prop="guigev"
              label="规格"
              width="53">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hujingv"
              label="呼径"
              width="58">
            </el-table-column>
            <el-table-column
              align="center"
              prop="houduv"
              label="厚度"
              width="51">
            </el-table-column>
            <el-table-column
              width="59"
              prop="qieduanchang"
              align="center"
              label="切断长">
            </el-table-column>
            <el-table-column
              width="47"
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
            width="47">
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
      <div class="" v-if="gongHao === '弯头焊'">
        <el-table
          :data="excelData"
          height="640"
          ref="Table"
          :header-cell-style="{
            background:'#ffffff',
            border: '1px solid #303133',
            fontSize:'12px',
            color:'rgba(0, 0, 0, 1)'}"
          :cell-style="{
             border: '1px solid #303133',
             fontSize:'11px'
            }"
          style="width: 100%;border: 1px solid #303133">
          <el-table-column
            align="center"
            prop="chuanhao"
            label="船番NE"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="jiagongxiliev"
            label="加工系列"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="yiguanhaov"
            label="一贯番号"
            width="57">
          </el-table-column>
          <el-table-column
            align="center"
            prop="codenov"
            label="代号"
            width="50">
          </el-table-column>
          <el-table-column align="center" label="管材">
            <el-table-column
              align="center"
              prop="pno"
              label="PNo"
              width="47">
            </el-table-column>
            <el-table-column
              align="center"
              prop="guigev"
              label="规格"
              width="53">
            </el-table-column>
            <el-table-column
              align="center"
              prop="hujingv"
              label="呼径"
              width="51">
            </el-table-column>
            <el-table-column
              align="center"
              prop="houduv"
              label="厚度"
              width="51">
            </el-table-column>
            <el-table-column
              width="59"
              prop="qieduanchang"
              align="center"
              label="切断长">
            </el-table-column>
            <el-table-column
              width="47"
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
            width="47">
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
      <div class="" v-if="gongHao === '短管焊'">
        <el-table
          :data="excelData"
          height="640"
          :row-class-name="tableRowClassNameDGH"
          @select="selectListDG"
          :header-cell-style="{
            background:'#f0f0f0',
            border: '1px solid #303133',
            fontSize:'11px',
            color:'rgba(0, 0, 0, 1)'}"
          :cell-style="{
             border: '1px solid #303133',
             fontSize:'10px'
            }"
          highlight-current-row
          style="width: 100%;border: 1px solid #303133">
          <el-table-column
            type="selection"
            align="center"
            width="30">
          </el-table-column>
          <el-table-column
            align="center"
            prop="typev"
            label="管种">
          </el-table-column>
          <el-table-column
            align="center"
            prop="waijingv"
            label="外径"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bihouv"
            label="壁厚"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="sucaichangv"
            label="素材长"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shipcode"
            label="船号"
            width="60">
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
            label="codeNo"
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
            prop="pno"
            label="PNo"
            width="45">
          </el-table-column>
          <el-table-column
            width="60"
            prop="qieduanchang"
            align="center"
            label="切断长">
          </el-table-column>
          <el-table-column
            align="center"
            prop="guanduan"
            label="管端"
            width="47">
          </el-table-column>
          <el-table-column
            align="center"
            prop="wanqu"
            width="47"
            label="弯S">
          </el-table-column>
          <el-table-column
            align="center"
            prop="gdjw"
            width="45"
            label="管端金物">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.gdjw"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="hjzt"
            width="45"
            label="焊接状态">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.hjzt"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="albl"
            label="备注">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.albl"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="canchang"
            width="55"
            label="残长">
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-if="gongHao !== '小组立'&& gongHao !== '枝管切断' && gongHao !== '短管焊' && gongHao !== '弯头焊'">
        <el-table
          :data="excelData"
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
          :row-class-name="tableRowClassName"
          highlight-current-row
          style="width: 100%;border: 1px solid #303133">
          <el-table-column
            align="center"
            prop="typev"
            label="管种">
          </el-table-column>
          <el-table-column
            align="waijingv"
            prop="waijingv"
            label="外径"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="bihouv"
            label="壁厚"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="sucaichangv"
            label="素材长"
            width="60">
          </el-table-column>
          <el-table-column
            align="center"
            prop="shipcode"
            label="船号"
            width="60">
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
            label="codeNo"
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
            prop="pno"
            label="PNo"
            width="50">
          </el-table-column>
          <el-table-column
            width="60"
            prop="qieduanchang"
            align="center"
            label="切断长">
          </el-table-column>
          <el-table-column
            align="center"
            prop="guanduan"
            label="管端"
            width="47">
          </el-table-column>
          <el-table-column
            align="center"
            prop="wanqu"
            width="47"
            label="弯S">
          </el-table-column>
          <el-table-column
            align="center"
            prop="gdjw"
            width="50"
            label="管端金物">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.gdjw"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="hjzt"
            width="50"
            label="焊接状态">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.hjzt"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="albl"
            label="备注">
            <template scope="scope">
              <div class="" style="height: 100%;width: 100%" v-html="scope.row.albl"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="canchang"
            width="55"
            label="残长">
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import url from '../assets/js/URL'

  export default {
    name: 'modal',
    data() {
      return {
        rowId: "",
        dgList:[],
        selectState: false
      }
    },
    created() {

    },
    mounted() {


    },
    watch: {
      excelData: {
        handler(newValue, oldValue) {
          if (newValue === true) {

          }
        },
        deep: true
      }

    },
    methods: {
      //根据状态显示不同颜色
      tableRowClassName({row, rowIndex}) {
        if (typeof (this.gzId) == "object") {
          if (row.id === this.gzId[0]) {
            return 'green-row';
          }
        }
        else if (row.status === 1) {
          return 'xzl-row';
        }
        else {
          if (row.id === this.gzId) {
            return 'green-row';
          }
          else if  (row.status === "4") {
            return 'xzl-row';
          }
          else if(row.status === 2){
            return 'xzl-row';
          }
          else if  (row.status === "5") {
            return 'xzl-row';
          }
        }
      },

      tableRowClassNameDGH({row, rowIndex}){
        if (typeof (this.gzId) == "object") {
          if (row.id === this.gzId[0]) {
            return 'green-row';
          }
        }
        else if (row.status === 1) {
          return 'xzl-row';
        }
        else {
          if (row.id === this.gzId) {
            return 'green-row';
          }
          else if  (row.status === "4") {
            return 'xzl-row';
          }
          else if(row.status === "2"){
            return 'xzl-row';
          }
          else if  (row.status === "5") {
            return 'xzl-row';
          }
        }
      },

      tableRowClassNameZGQD({row, rowIndex}) {
        if (row.status === 2) {
          return 'green-row';
        }
        else if  (row.status === "4") {
          return 'xzl-row';
        }
        else if  (row.status === "5") {
          return 'xzl-row';
        }
      },

      selectChange(val) {
        /*if (val.length > 1) {
          this.$refs.Table.clearSelection();
          this.$refs.Table.toggleRowSelection(val.pop());
          console.log(val[0].id)
        }
        else {
        }*/
      },
      //小组立单选
      selectList(val, row) {
        /*if (row.id == this.rowId) {
          this.rowId = "";
          axios.post(" " + url + "/importother/markXiaozuliExcel", {"id": row.id, "status": 0})
            .then((res) => {
              if (res.data.state === "1") {
                this.xzlDataChange();
                this.tableRowClassName({row})
              }
              else if (res.data.state === "-1") {
                this.$message.warning(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.rowId = row.id;
          axios.post(" " + url + "/importother/markXiaozuliExcel", {"id": row.id, "status": 1})
            .then((res) => {
              if (res.data.state === "1") {
                this.xzlDataChange();
                this.tableRowClassName({row})
              }
              else if (res.data.state === "-1") {
                this.$message.warning(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }*/
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            if(a){
              data.push(a)
            }
          }
          this.$emit('dghList', data);
        }
        else {
          this.listData = [];
          this.$emit('dghList', data);
        }
      },

      //小组立全选
      selectAll(val) {
        this.selectList(val)
      },

      //小组立数据更新
      xzlDataChange(){
        let flag = true;
        this.$emit('xzlChange', flag);
      },
      //短管焊
      selectListDG(val, row){
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].nodeid;
            if(a){
              data.push(a)
            }
          }
          this.$emit('dghList', data);
        }
        else {
          this.listData = [];
          this.$emit('dghList', data);
        }
      },
    },
    props: ['gwType', 'gongHao', 'isHideStationExcel', 'excelData', 'gzId']

  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    .modal-message {
      width: 250px;
      height: 100px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      color: @color-white;
      font-size: 20px;
      text-align: center;
      line-height: 100px;
      border-radius: 10%;
      background-color: @color-background-dd;
    }
  }

  .hideModal {
    display: none;
  }
</style>
