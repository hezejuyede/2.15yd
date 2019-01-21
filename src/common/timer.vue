<template>
    <div class="cumulativeLoginTime">
        <span>在岗时间统计</span><span>:</span><span>{{str}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        name: 'cumulativeLoginTime',
        data() {
            return {

                str: ''
            }
        },
        created (){
            setInterval(this.getTime,1000)
        },
        watch: {},
        methods: {
            getTime() {
                axios.get("/api/AccumulatedTime")
                    .then((res) => {
                        this.str = res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            timer() {   //定义计时函数
                this.ms = this.ms + 50;         //毫秒
                if (this.ms >= 1000) {
                    this.ms = 0;
                    this.s = this.s + 1;         //秒
                }
                if (this.s >= 60) {
                    this.s = 0;
                    this.m = this.m + 1;        //分钟
                }
                if (this.m >= 60) {
                    this.m = 0;
                    this.h = this.h + 1;        //小时
                }
                this.str = this.toDub(this.h) + ":" + this.toDub(this.m) + ":" + this.toDub(this.s) + ""
            },
            toDub(n) {  //补0操作
                if (n < 10) {
                    return "0" + n;
                }
                else {
                    return "" + n;
                }
            }
        },
        props: ['startTime']
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";
    .cumulativeLoginTime {
        height: 40px;
        line-height: 40px;
    }


</style>
