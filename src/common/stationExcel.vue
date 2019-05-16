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
      <div class="" v-if="gongHao === '小组立' || gongHao === '弯头焊'">
        <el-table
          :data="excelData"
          height="640"
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
      <div class="" v-if="gongHao !== '小组立'&& gongHao !== '枝管切断' && gongHao !== '弯头焊'">
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
             fontSize:'11px'
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
            prop="waijingchang"
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
            width="64">
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
            prop="guanduanjinwu"
            width="50"
            label="管端金物">
          </el-table-column>
          <el-table-column
            align="center"
            prop="hanjiezhuangtai"
            width="50"
            label="焊接状态">
          </el-table-column>
          <el-table-column
            align="center"
            prop="albl"
            label="备注">
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
  export default {
    name: 'modal',
    data() {
      return {
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
        else {
          if (row.id === this.gzId) {
            return 'green-row';
          }
        }
      }

    },
    props: ['gwType','gongHao', 'isHideStationExcel','excelData','gzId']
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
