# photo_switching
一个基于vue的移动端特效插件， 实现类似积目、探探等照片的选择和切换. 只能在移动端运行

### 用法
1. 本插件基于vue 先引用vue.js

> <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

之后引用插件

> <script src="/your path/photo-switching.js"></script>

使用插件

```javascript
<script>
	Vue.use('photoSwitching');
</script>
```

2. 基于vue构建工具（vue-cli）

```javascript
<script>
	import Vue from 'vue'
	import photoSwitching from '/your path/photo-switching.js'
	Vue.use(photoSwitching);
</script>
```
```
<photo-switching :photos="photoArr" @turnend="turnEndHandle($event)" @change="changeHandle($event)">
    <template slot-scope="slotProps">
        <!-- slotProps.photo 返回数组单个元素用于本模板内数据渲染 -->
    </template>
    <template slot="loading">
       <!-- 在此处编写loading 样式在照片翻完时会显示 -->
    </template>
    <template slot="l-circle">
        <!-- 左侧圆圈 不需要可以删除 -->
    </template>
    <template slot="r-circle">
        <!-- 右侧圆圈 不需要可以删除 -->
    </template>
</photo-switching>
```
`@turnend` 所传照片列表快切换完时触发，用于告诉开发者需要加载数据。**注意实际ajax 加载时需要做防止多次请求 的处理, 具体请参考demo**

`@change` 当一页被翻过时触发 返回被翻过的照片的数据

具体例子请参考代码[demo.html](https://github.com/yl1033669613/photo_switching/blob/master/demo/demo.html)

可以查看的[demo](https://yl1033669613.github.io/photo_switching/demo/demo.html) （pc端查看时请使用浏览器的移动端模拟功能。）