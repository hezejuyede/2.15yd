<template>
    <div class="materiel">
        <header-nav></header-nav>
        <div class="ProductionExecutionDiv">
            <div class="IconTemplate" v-for="(item , index) in iconData" @click="goToPage(index,item.url)">
                <i :class="item.icon"></i>
                <span>{{item.text}}</span>
            </div>
        </div>
        <div class="loading-container" v-show="!img.length">
            <loading></loading>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import timer from '../../common/timer'
    import headerNav from '../../common/header'
    import footerNav from '../../common/footer'
    import Loading from '../../common/loading'

    export default {
        name: 'materiel',
        data() {
            return {
                img:"",
                iconData: [
                    {"icon": "iconfont icon-kaishi", "text": "加工开始", "url": "/"},
                    {"icon": "iconfont icon-zhilianganquan", "text": "质量评定", "url": "/"},
                    {"icon": "iconfont icon-tuihui", "text": "回退上道工序", "url": "/"},
                    {"icon": "iconfont icon-zanting", "text": "缺料暂停", "url": "/"},
                    {"icon": "iconfont icon-wancheng", "text": "加工完成", "url": "/"},
                ]
            }

        },
        components: {Loading, timer,footerNav,headerNav},
        mounted() {



        },
        created() {
            this.getAdminState();

            setTimeout(() => {
                this.getLoading();
            }, 1000);

        },
        methods: {
            getLoading() {
                this.img = ["1"]
            },
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                this.$router.replace;
                const userInfo = sessionStorage.getItem("userInfo");
                const info = JSON.parse(userInfo);
                if (info === null) {
                    this.$router.push("/ProductionExecutionLogin")
                }
            },
            goToPage(){

            }

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .materiel {
        width: 100%;
        height: 100%;
        .ProductionExecutionDiv {
            width: 100%;
            height: 60%;
            margin-top: 2%;
        }
        .IconTemplate {
            float: left;
            width: 30%;
            height: 40%;
            margin-bottom: 5%;
            margin-left: 3%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;

            .icon-kaishi {
                display: block;
                background-color: #F56C6C;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-zhilianganquan {
                display: block;
                background-color: @color-bg-lan;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-tuihui {
                display: block;
                background-color: @color-bg-cs;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-zanting {
                display: block;
                background-color: #409EFF;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            .icon-wancheng {
                display: block;
                background-color: #67C23A;
                color: @color-white;
                border-radius: 20%;
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 300%;
                text-align: center;
            }
            span {
                margin-top: 5%;
                color: #909399
            }
        }
    }

    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }


</style>
