<template>
    <div id="app">
        <div class="photo-switching-box">
            <photo-switching :photos="photoArr" @turnend="turnEndHandle($event)" @change="changeHandle($event)">
                <template slot-scope="slotProps">
                    <span>{{slotProps.photo.name}}</span>
                    <img :src="slotProps.photo.img" width="100%" alt="">
                </template>
                <template slot="loading">
                    <div class="photo-sw-loading">
                        这个是loading。。。。
                    </div>
                </template>
                <template slot="l-circle">
                    <div class="cir-inside">左侧</div>
                </template>
                <template slot="r-circle">
                    <div class="cir-inside">右侧</div>
                </template>
            </photo-switching>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import photoSwitching from './lib/index.js'
Vue.use(photoSwitching)

export default {
    name: 'app',
    data() {
        return {
            isLoad: false,
            photoArr: [{name: "测试11111111", img: 'http://192.168.1.5:8081/test-img11.png'}, {name: "测试2", img: 'http://192.168.1.5:8081/test-img21.png'}, {name: "测试3", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试1", img: 'http://192.168.1.5:8081/test-img11.png'}, {name: "测试2", img: 'http://192.168.1.5:8081/test-img21.png'}, {name: "测试3", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试1", img: 'http://192.168.1.5:8081/test-img11.png'}, {name: "测试2", img: 'http://192.168.1.5:8081/test-img21.png'}, {name: "测试3", img: 'http://192.168.1.5:8081/test-img31.png'}],
            photoArr1: [{name: "测试4", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试4", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试4", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试4", img: 'http://192.168.1.5:8081/test-img31.png'},{name: "测试4", img: 'http://192.168.1.5:8081/test-img31.png'}],
            photoArr2: [{name: "测试1", img: 'http://192.168.1.5:8081/test-img11.png'}]
        }
    },
    mounted() {
        let self = this;
    },
    methods: {
        turnEndHandle(e) { // 实际ajax 加载时需要做防止多次请求 的处理
            let self = this;
            if (!self.isLoad) {
                self.isLoad = true;
               setTimeout(() => {
                    self.photoArr = self.photoArr1;
                    self.isLoad = false;
                },500) 
            }
        },
        changeHandle(e) {
            console.log(e)
        }
    }
}
</script>
<style lang="scss">
    body, html{
        padding: 0;
        margin: 0;
    }
    #app{
        height: 100vh;
        overflow: hidden
    }
    .photo-switching-box{
        height: 500px;
        box-sizing: border-box;
        padding: 15px 15px;
    }
    .photo-sw-loading{
        text-align: center;
        width: 100%;
        height: 100%;
        background:#454545;
        box-sizing: border-box;
        padding-top: 100px;
        font-size: 30px;
        color: #fff;
    }
    .cir-inside{
        width: 100%;
        height: 100%;
        background: #eee;
    }
</style>
