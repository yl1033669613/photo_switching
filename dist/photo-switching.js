!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define("photo-switching",[],i):"object"==typeof exports?exports["photo-switching"]=i():t["photo-switching"]=i()}("undefined"!=typeof self?self:this,function(){return function(t){function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}var e={};return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="/dist/",i(i.s=1)}([function(t,i,e){"use strict";i.a={name:"photoSwitching",props:{photos:{type:Array,default:[]}},data:function(){return{currTotal:[],curr:[],startIdx:0,containerW:0,startX:0,currX:0,moveDisX:0,angle:0,turnOpacity:1,scale:.9,opacity:1,cirScale:.1,cirOpacity:0,cirXDis:0,frontStyle:{zIndex:1,transform:"",opacity:1},backStyle:{zIndex:0,transformOrigin:"50% 50%",transform:"scale3d(.9, .9, 1)"},lCircleSty:{opacity:0,transform:"scale3d(.1, .1, 1) translate3d(-50%, 0, 0)",left:0},rCircleSty:{opacity:0,transform:"scale3d(.1, .1, 1) translate3d(50%, 0, 0)",right:0},isTouch:!1,isTurnPhoto:!1,circleVisible:"left"}},mounted:function(){if(this.containerW=this.$refs.photoSC.clientWidth,this._winResized(),this.currTotal=this.photos,0==this.currTotal.length)this.curr=[{isLoading:!0,isloadingBack:!1,zIndex:1},{isLoading:!1,isloadingBack:!0,zIndex:0}];else if(1==this.currTotal.length){this.curr.push(this.currTotal[0]),this.curr[0].zIndex=1,this.curr[0].isloadingBack=!1;var t={isLoading:!0,isloadingBack:!1,zIndex:0};this.curr.push(t),this.startIdx=1}else if(this.currTotal.length>=2){for(var i=0;i<2;i++)this.currTotal[this.startIdx+i].zIndex=1-i,this.currTotal[this.startIdx+i].isloadingBack=!1,this.curr.push(this.currTotal[this.startIdx+i]);this.startIdx=2}},watch:{photos:function(t,i){if(this.curr[0].isLoading)if(t.length>=2){for(var e=[],r=0;r<2;r++)t[r].zIndex=1-r,t[r].isloadingBack=!1,e.push(t[r]);this.curr=e,this.startIdx=2}else if(1==t.length){this.curr=[],this.curr.push(t[0]),this.curr[0].zIndex=1,this.curr[0].isloadingBack=!1;var s={isLoading:!0,isloadingBack:!1,zIndex:0};this.curr.push(s),this.startIdx=1}else 0==t.length&&(this.startIdx=0);else this.curr[1].isLoading&&t.length>0?(this.curr.splice(1,1),this.curr[1]=t[0],this.curr[1].zIndex=0,this.curr[1].isloadingBack=!1,this.startIdx=1):this.startIdx=0;this.currTotal=t}},methods:{_touchstartHandle:function(t){this.currX=t.touches[0].clientX,this.startX=t.touches[0].clientX,this.moveDisX=0,this.isTurnPhoto&&(this.isTurnPhoto=!1,this._updateCurrArr()),this.isTouch=!0},_touchmoveHandle:function(t){var i=t.touches[0].clientX;this.moveDisX=i-this.currX,this.currX=i;var e=this.angle+this.moveDisX/13;if(this.angle=this._limitInMaxAndMin(20,-20,e),this.frontStyle.transform="rotate3d(0, 0, 1, "+this.angle+"deg)",Math.abs(this.angle)<6||1!=this.scale||0!=this.opacity||1!=this.cirOpacity||1!=this.cirScale||this.cirXDis!=this.containerW/2){var r=i-this.startX>=0?this.scale+this.moveDisX/780:this.scale-this.moveDisX/780;this.scale=this._limitInMaxAndMin(1,.9,r),this.backStyle.transform="scale3d("+this.scale+", "+this.scale+", 1)";var s=i-this.startX>=0?this.opacity-this.moveDisX/78:this.opacity+this.moveDisX/78;this.opacity=this._limitInMaxAndMin(1,0,s),this.circleVisible=i-this.startX>=0?"left":"right",this._sideCircleAni(i)}},_touchendHandle:function(t){this.isTouch=!1,Math.abs(this.angle)>=6&&!this.curr[0].isLoading?(this.startIdx>=this.currTotal.length-1&&this._turnToTheEnd(),this.isTurnPhoto=!0,this._isChangePage("left"==this.circleVisible?"right":"left",this.curr[0]),this._photoisAni("turn")):this._photoisAni("resume")},_sideCircleAni:function(t){var i=void 0,e=void 0,r=void 0,s="left"===this.circleVisible;i=s?this.cirOpacity+this.moveDisX/78:this.cirOpacity-this.moveDisX/78,this.cirOpacity=this._limitInMaxAndMin(1,0,i),e=s?this.cirXDis+this.moveDisX/.53:this.cirXDis-this.moveDisX/.53,this.cirXDis=this._limitInMaxAndMin(this.containerW/2,0,e),r=s?this.cirScale+this.moveDisX/87:this.cirScale-this.moveDisX/87,this.cirScale=this._limitInMaxAndMin(1,.1,r),s?(this.rCircleSty={opacity:0,transform:"scale3d(.1, .1, 1) translate3d(50%, 0, 0)",right:0},this.lCircleSty={opacity:this.cirOpacity,transform:"scale3d("+this.cirScale+", "+this.cirScale+", 1) translate3d(-50%, 0, 0)",left:this.cirXDis+"px"}):(this.LCircleSty={opacity:0,transform:"scale3d(.1, .1, 1) translate3d(-50%, 0, 0)",left:0},this.rCircleSty={opacity:this.cirOpacity,transform:"scale3d("+this.cirScale+", "+this.cirScale+", 1) translate3d(50%, 0, 0)",right:this.cirXDis+"px"})},_photoisAni:function(t){var i=this,e=this;if("turn"==t){var r="left",s=0;e.angle>0&&(r="right"),e._easeoutAni(e.angle,"left"==r?e.angle-15:e.angle+15,8,.1,function(t,i){e.angle=t,e.frontStyle.transform="rotate3d(0, 0, 1, "+e.angle+"deg)",i&&2==++s&&e._updateCurrArr()}),e._easeoutAni(e.turnOpacity,0,8,.005,function(t,i){e.turnOpacity=t,e.frontStyle.opacity=e.turnOpacity,i&&2==++s&&e._updateCurrArr()}),e._easeoutAni(e.cirOpacity,0,8,.005,function(t,i){e.cirOpacity=t,("left"==e.circleVisible?e.lCircleSty:e.rCircleSty).opacity=e.cirOpacity})}else"resume"==t&&(e._easeoutAni(e.angle,0,6,.01,function(t,i){e.angle=t,e.frontStyle.transform="rotate3d(0, 0, 1, "+e.angle+"deg)"}),e._easeoutAni(e.scale,.9,8,.005,function(t,r){e.scale=t,e.backStyle.transform="scale3d("+i.scale+", "+i.scale+", 1)"}),e._easeoutAni(e.opacity,1,8,.01,function(t,i){e.opacity=t}),e._circleEaseAni())},_circleEaseAni:function(){var t=this,i=this;i._easeoutAni(i.cirScale,.1,8,.005,function(e,r){i.cirScale=e,"left"==i.circleVisible?i.lCircleSty.transform="scale3d("+t.cirScale+", "+t.cirScale+", 1) translate3d(-50%, 0, 0)":i.rCircleSty.transform="scale3d("+t.cirScale+", "+t.cirScale+", 1) translate3d(50%, 0, 0)"}),i._easeoutAni(i.cirXDis,0,8,1,function(t,e){i.cirXDis=t,("left"==i.circleVisible?i.lCircleSty:i.rCircleSty)[i.circleVisible]=i.cirXDis+"px"}),i._easeoutAni(i.cirOpacity,0,8,.01,function(t,e){i.cirOpacity=t,("left"==i.circleVisible?i.lCircleSty:i.rCircleSty).opacity=i.cirOpacity})},_updateCurrArr:function(){if(this.isTurnPhoto=!1,this.startIdx<this.currTotal.length)this.curr.splice(0,1),this.curr.push(this.currTotal[this.startIdx]),this.curr[0].zIndex=1,this.curr[1].zIndex=0,this.curr[1].isloadingBack=!1,this.startIdx++;else{var t=void 0;t=this.curr[1].isLoading?{isLoading:!1,isloadingBack:!0}:{isLoading:!0,isloadingBack:!1},this.curr.splice(0,1),this.curr.push(t),this.curr[0].zIndex=1,this.curr[1].zIndex=0}this._resetTransf()},_resetTransf:function(){this.angle=0,this.turnOpacity=1,this.scale=.9,this.opacity=1,this.cirScale=.1,this.cirOpacity=0,this.cirXDis=0,this.frontStyle={zIndex:1,transform:"",opacity:1},this.backStyle={zIndex:0,transformOrigin:"50% 50%",transform:"scale3d(.9, .9, 1)"},this.lCircleSty={opacity:0,transform:"scale3d(.1, .1, 1) translate3d(-50%, 0, 0)",left:0},this.rCircleSty={opacity:0,transform:"scale3d(.1, .1, 1) translate3d(50%, 0, 0)",right:0}},_easeoutAni:function(t,i,e,r,s){var n=this,a=i;if(t!=i&&"number"==typeof t){i=i||0,e=e||2;!function o(){if(!n.isTouch){if(t+=(i-t)/e,Math.abs(t-a)<r)return void s(i,!0);s(t,!1),requestAnimationFrame(o)}}()}},_limitInMaxAndMin:function(t,i,e){return e>=t?t:e<=i?i:e},_turnToTheEnd:function(){this.$emit("turnend",{state:"Close to the end"})},_isChangePage:function(t,i){var e={};for(var r in i)"zIndex"!=r&&"isloadingBack"!=r&&(e[r]=i[r]);this.$emit("change",{direction:t,item:e})},_winResized:function(){var t=this;window.addEventListener("resize",function(i){t.containerW=t.$refs.photoSC.clientWidth})}}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=e(2),s={install:function(t,i){t.component(r.a.name,r.a)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),i.default=s},function(t,i,e){"use strict";function r(t){e(3)}var s=e(0),n=e(9),a=e(8),o=r,c=a(s.a,n.a,!1,o,"data-v-3a15562b",null);i.a=c.exports},function(t,i,e){var r=e(4);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e(6)("35d497c2",r,!0,{})},function(t,i,e){i=t.exports=e(5)(!1),i.push([t.i,".photo-switching-container[data-v-3a15562b]{width:100%;height:100%;border-radius:7px;position:relative}.rotate-content[data-v-3a15562b]{transform-origin:50% 200%;-webkit-transform-origin:50% 200%;background:#ccc;will-change:transform}.back-photo-mask[data-v-3a15562b],.rotate-content[data-v-3a15562b]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:7px}.back-photo-mask[data-v-3a15562b]{background:rgba(0,0,0,.6)}.loading-card[data-v-3a15562b]{width:100%;height:100%;position:absolute;top:0;left:0;overflow:hidden;border-radius:7px}.side-circie[data-v-3a15562b]{width:70px;height:70px;position:absolute;z-index:20;text-align:center;line-height:70px;border-radius:50%;overflow:hidden;top:0;bottom:0;margin:auto 0}",""])},function(t,i){function e(t,i){var e=t[1]||"",s=t[3];if(!s)return e;if(i&&"function"==typeof btoa){var n=r(s);return[e].concat(s.sources.map(function(t){return"/*# sourceURL="+s.sourceRoot+t+" */"})).concat([n]).join("\n")}return[e].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var i=[];return i.toString=function(){return this.map(function(i){var r=e(i,t);return i[2]?"@media "+i[2]+"{"+r+"}":r}).join("")},i.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},s=0;s<this.length;s++){var n=this[s][0];"number"==typeof n&&(r[n]=!0)}for(s=0;s<t.length;s++){var a=t[s];"number"==typeof a[0]&&r[a[0]]||(e&&!a[2]?a[2]=e:e&&(a[2]="("+a[2]+") and ("+e+")"),i.push(a))}},i}},function(t,i,e){function r(t){for(var i=0;i<t.length;i++){var e=t[i],r=h[e.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](e.parts[s]);for(;s<e.parts.length;s++)r.parts.push(n(e.parts[s]));r.parts.length>e.parts.length&&(r.parts.length=e.parts.length)}else{for(var a=[],s=0;s<e.parts.length;s++)a.push(n(e.parts[s]));h[e.id]={id:e.id,refs:1,parts:a}}}}function s(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function n(t){var i,e,r=document.querySelector("style["+y+'~="'+t.id+'"]');if(r){if(p)return g;r.parentNode.removeChild(r)}if(m){var n=f++;r=d||(d=s()),i=a.bind(null,r,n,!1),e=a.bind(null,r,n,!0)}else r=s(),i=o.bind(null,r),e=function(){r.parentNode.removeChild(r)};return i(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;i(t=r)}else e()}}function a(t,i,e,r){var s=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(i,s);else{var n=document.createTextNode(s),a=t.childNodes;a[i]&&t.removeChild(a[i]),a.length?t.insertBefore(n,a[i]):t.appendChild(n)}}function o(t,i){var e=i.css,r=i.media,s=i.sourceMap;if(r&&t.setAttribute("media",r),v.ssrId&&t.setAttribute(y,i.id),s&&(e+="\n/*# sourceURL="+s.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=e(7),h={},u=c&&(document.head||document.getElementsByTagName("head")[0]),d=null,f=0,p=!1,g=function(){},v=null,y="data-vue-ssr-id",m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,i,e,s){p=e,v=s||{};var n=l(t,i);return r(n),function(i){for(var e=[],s=0;s<n.length;s++){var a=n[s],o=h[a.id];o.refs--,e.push(o)}i?(n=l(t,i),r(n)):n=[];for(var s=0;s<e.length;s++){var o=e[s];if(0===o.refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete h[o.id]}}}};var x=function(){var t=[];return function(i,e){return t[i]=e,t.filter(Boolean).join("\n")}}()},function(t,i){t.exports=function(t,i){for(var e=[],r={},s=0;s<i.length;s++){var n=i[s],a=n[0],o=n[1],c=n[2],l=n[3],h={id:t+":"+s,css:o,media:c,sourceMap:l};r[a]?r[a].parts.push(h):e.push(r[a]={id:a,parts:[h]})}return e}},function(t,i){t.exports=function(t,i,e,r,s,n){var a,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,o=t.default);var l="function"==typeof o?o.options:o;i&&(l.render=i.render,l.staticRenderFns=i.staticRenderFns,l._compiled=!0),e&&(l.functional=!0),s&&(l._scopeId=s);var h;if(n?(h=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},l._ssrRegister=h):r&&(h=r),h){var u=l.functional,d=u?l.render:l.beforeCreate;u?(l._injectStyles=h,l.render=function(t,i){return h.call(i),d(t,i)}):l.beforeCreate=d?[].concat(d,h):[h]}return{esModule:a,exports:o,options:l}}},function(t,i,e){"use strict";var r=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"photoSC",staticClass:"photo-switching-container",on:{touchstart:function(i){i.preventDefault(),t._touchstartHandle(i)},touchmove:function(i){i.preventDefault(),t._touchmoveHandle(i)},touchend:function(i){i.preventDefault(),t._touchendHandle(i)}}},[t._l(t.curr,function(i,r){return e("div",{directives:[{name:"show",rawName:"v-show",value:!i.isloadingBack,expression:"!item.isloadingBack"}],key:r,staticClass:"rotate-content animated",style:1==i.zIndex?t.frontStyle:t.backStyle},[0==i.zIndex?e("div",{staticClass:"back-photo-mask",style:{opacity:t.opacity}}):t._e(),t._v(" "),t._t("default",null,{photo:i}),t._v(" "),i.isLoading?e("div",{staticClass:"loading-card"},[t._t("loading")],2):t._e()],2)}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"left"==t.circleVisible&&2==t.curr.length&&!t.curr[0].isLoading,expression:"circleVisible  == 'left' && (curr.length == 2 && !curr[0].isLoading)"}],staticClass:"side-circie",style:"left"==t.circleVisible?t.lCircleSty:""},[t._t("l-circle")],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"right"==t.circleVisible&&2==t.curr.length&&!t.curr[0].isLoading,expression:"circleVisible  == 'right' && (curr.length == 2 && !curr[0].isLoading)"}],staticClass:"side-circie",style:"right"==t.circleVisible?t.rCircleSty:""},[t._t("r-circle")],2)],2)},s=[],n={render:r,staticRenderFns:s};i.a=n}])});
//# sourceMappingURL=photo-switching.js.map