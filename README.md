# photo_switching
一个基于vue的特效插件， 实现类似积目、探探等照片的选择和切换. 只能在移动端运行

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

具体页面请参考代码[demo.html](https://github.com/yl1033669613/photo_switching/blob/master/demo/demo.html)

可以查看的[demo](https://yl1033669613.github.io/photo_switching/demo/demo.html) （pc端查看时请使用浏览器的移动端模拟功能，并且在移动端模式下刷新一次。）