<template>
    <div class="photo-switching-container" ref="photoSC" @touchstart.prevent="_touchstartHandle($event)" @touchmove.prevent="_touchmoveHandle($event)" @touchend.prevent="_touchendHandle($event)">
        <div class="rotate-content animated" v-for="(item, index) in curr" :key="index" :style="item.zIndex == 1 ? frontStyle : backStyle" v-show="!item.isloadingBack">
            <div class="back-photo-mask" v-if="item.zIndex == 0" :style="{opacity: opacity}"></div>
            <slot :photo="item"></slot>
            <div class="loading-card" v-if="item.isLoading">
                <slot name="loading"></slot>
            </div>
        </div>
        <div class="side-circie" v-show="circleVisible  == 'left' && (curr.length == 2 && !curr[0].isLoading)" :style="circleVisible == 'left' ? lCircleSty : ''">
            <slot name="l-circle"></slot>
        </div>
        <div class="side-circie" v-show="circleVisible  == 'right' && (curr.length == 2 && !curr[0].isLoading)" :style="circleVisible == 'right' ? rCircleSty : ''">
            <slot name="r-circle"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'photoSwitching',
    props: {
        photos: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            currTotal: [], //保存当前请求临时数组
            curr: [],
            startIdx: 0,
            containerW: 0,

            // touchs
            startX: 0,
            currX: 0,
            moveDisX: 0,

            angle: 0,
            turnOpacity: 1,

            scale: .9,
            opacity: 1,

            // circle 参数
            cirScale: .1,
            cirOpacity: 0,
            cirXDis: 0,

            frontStyle: {
                zIndex: 1,
                transform: '',
                opacity: 1
            },
            backStyle: {
                zIndex: 0,
                transformOrigin: '50% 50%',
                transform: 'scale3d(.9, .9, 1)'
            },
            lCircleSty: {
                opacity: 0,
                transform: 'scale3d(.1, .1, 1) translate3d(-50%, 0, 0)',
                left: 0
            },
            rCircleSty: {
                opacity: 0,
                transform: 'scale3d(.1, .1, 1) translate3d(50%, 0, 0)',
                right: 0
            },

            isTouch: false,
            isTurnPhoto: false,

            //side circle
            circleVisible: 'left'
        }
    },
    mounted() {
        // 获取容器宽度
        this.containerW = this.$refs.photoSC.clientWidth;

        this._winResized();

        this.currTotal = this.photos;

        if (this.currTotal.length == 0) { //组件初始化判断
            this.curr = [{
                isLoading: true,
                isloadingBack: false,
                zIndex: 1
            }, {
                isLoading: false,
                isloadingBack: true,
                zIndex: 0
            }]
        } else if (this.currTotal.length == 1) {
            this.curr.push(this.currTotal[0]);
            this.curr[0].zIndex = 1;
            this.curr[0].isloadingBack = false;
            let obj = {
                isLoading: true,
                isloadingBack: false,
                zIndex: 0
            };
            this.curr.push(obj);
            this.startIdx = 1
        } else if (this.currTotal.length >= 2) {
            for (let i = 0; i < 2; i++) {
                this.currTotal[this.startIdx + i].zIndex = 1 - i;
                this.currTotal[this.startIdx + i].isloadingBack = false;
                this.curr.push(this.currTotal[this.startIdx + i])
            };
            this.startIdx = 2
        }
    },
    watch: {
        photos(val, oldVal) { //判断数组是否刷新
            if (this.curr[0].isLoading) {
                if (val.length >= 2) {
                    let arr = [];
                    for (let i = 0; i < 2; i++) {
                        val[i].zIndex = 1 - i;
                        val[i].isloadingBack = false;
                        arr.push(val[i])
                    };
                    this.curr = arr;
                    this.startIdx = 2
                } else if (val.length == 1) {
                    this.curr = [];
                    this.curr.push(val[0]);
                    this.curr[0].zIndex = 1;
                    this.curr[0].isloadingBack = false;
                    let obj = {
                        isLoading: true,
                        isloadingBack: false,
                        zIndex: 0
                    };
                    this.curr.push(obj);
                    this.startIdx = 1
                } else if (val.length == 0) {
                    this.startIdx = 0
                }
            } else if (this.curr[1].isLoading) {
                if (val.length > 0) {
                    this.curr.splice(1, 1);
                    this.curr[1] = val[0];
                    this.curr[1].zIndex = 0;
                    this.curr[1].isloadingBack = false;
                    this.startIdx = 1;
                } else {
                    this.startIdx = 0
                }
            } else {
                this.startIdx = 0
            };
            this.currTotal = val;
        }
    },
    methods: {
        _touchstartHandle(e) {
            this.currX = e.touches[0].clientX;
            this.startX = e.touches[0].clientX;
            this.moveDisX = 0;
            if (this.isTurnPhoto) {
                this.isTurnPhoto = false;
                this._updateCurrArr()
            };
            this.isTouch = true
        },
        _touchmoveHandle(e) {
            let moveX = e.touches[0].clientX;
            this.moveDisX = moveX - this.currX;
            this.currX = moveX;

            //主体的动作
            // front photo 角度变化
            let _angle = this.angle + this.moveDisX / 13;
            this.angle = this._limitInMaxAndMin(20, -20, _angle);
            this.frontStyle.transform = `rotate3d(0, 0, 1, ${this.angle}deg)`;
            if (Math.abs(this.angle) < 6 || (this.scale != 1 || this.opacity != 0 || this.cirOpacity != 1 || this.cirScale != 1 || this.cirXDis != this.containerW / 2)) { //判断角度超过限制则除了front photo 其他动画暂停
                //back photo 缩放变化
                let _scale = (moveX - this.startX) >= 0 ? (this.scale + this.moveDisX / 780) : (this.scale - this.moveDisX / 780);
                this.scale = this._limitInMaxAndMin(1, .9, _scale);
                this.backStyle.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;
                // back photo mask 透明度变化
                let _opacity = (moveX - this.startX) >= 0 ? (this.opacity - this.moveDisX / 78) : (this.opacity + this.moveDisX / 78);
                this.opacity = this._limitInMaxAndMin(1, 0, _opacity);

                // 计算side circle方向 以及动作
                this.circleVisible = (moveX - this.startX) >= 0 ? 'left' : 'right';
                this._sideCircleAni(moveX)
            }
        },
        _touchendHandle(e) {
            this.isTouch = false;
            if (Math.abs(this.angle) >= 6 && !this.curr[0].isLoading) {
                if (this.startIdx >= this.currTotal.length - 1) {
                    this._turnToTheEnd();
                };
                this.isTurnPhoto = true;
                this._isChangePage(this.circleVisible == 'left' ? 'right' : 'left', this.curr[0]);
                this._photoisAni('turn')
            } else {
                this._photoisAni('resume')
            }
        },
        // side circle ani
        _sideCircleAni(moveX) {
            let _opacity, _xMoveDis, _scale;
            let isLeft = this.circleVisible === 'left';
            //透明度
            _opacity = isLeft ? (this.cirOpacity + this.moveDisX / 78) : (this.cirOpacity - this.moveDisX / 78);
            this.cirOpacity = this._limitInMaxAndMin(1, 0, _opacity);
            //距离
            _xMoveDis = isLeft ? (this.cirXDis + this.moveDisX / .53) : (this.cirXDis - this.moveDisX / .53);
            this.cirXDis = this._limitInMaxAndMin(this.containerW / 2, 0, _xMoveDis);
            //缩放
            _scale = isLeft ? (this.cirScale + this.moveDisX / 87) : (this.cirScale - this.moveDisX / 87);
            this.cirScale = this._limitInMaxAndMin(1, .1, _scale);

            if (isLeft) {
                this.rCircleSty = {
                    opacity: 0,
                    transform: 'scale3d(.1, .1, 1) translate3d(50%, 0, 0)',
                    right: 0
                };
                this.lCircleSty = {
                    opacity: this.cirOpacity,
                    transform: `scale3d(${this.cirScale}, ${this.cirScale}, 1) translate3d(-50%, 0, 0)`,
                    left: `${this.cirXDis}px`
                }
            } else {
                this.LCircleSty = {
                    opacity: 0,
                    transform: 'scale3d(.1, .1, 1) translate3d(-50%, 0, 0)',
                    left: 0
                };
                this.rCircleSty = {
                    opacity: this.cirOpacity,
                    transform: `scale3d(${this.cirScale}, ${this.cirScale}, 1) translate3d(50%, 0, 0)`,
                    right: `${this.cirXDis}px`
                }
            }
        },
        _photoisAni(type) {
            let self = this;
            if (type == 'turn') {
                let direction = 'left';
                let isTurn = 0;
                if (self.angle > 0) { //right
                    direction = 'right'
                };
                //翻页时 的角度过渡
                self._easeoutAni(self.angle, direction == 'left' ? (self.angle - 15) : (self.angle + 15), 8, .1, (ang, isEnd) => {
                    self.angle = ang;
                    self.frontStyle.transform = `rotate3d(0, 0, 1, ${self.angle}deg)`;
                    if (isEnd) {
                        isTurn++;
                        if (isTurn == 2) {
                            self._updateCurrArr();
                        }
                    }
                });
                // 翻页时 的透明度过渡
                self._easeoutAni(self.turnOpacity, 0, 8, .005, (opa, isEnd) => {
                    self.turnOpacity = opa;
                    self.frontStyle.opacity = self.turnOpacity;
                    if (isEnd) {
                        isTurn++;
                        if (isTurn == 2) {
                            self._updateCurrArr();
                        }
                    }
                });
                //翻页时 circle fadeOut
                self._easeoutAni(self.cirOpacity, 0, 8, .005, (opa, isEnd) => {
                    self.cirOpacity = opa;
                    let styles = self.circleVisible == 'left' ? self.lCircleSty : self.rCircleSty;
                    styles.opacity = self.cirOpacity
                })

            } else if (type == 'resume') {
                //主体的过渡
                //角度
                self._easeoutAni(self.angle, 0, 6, .01, (ang, isEnd) => {
                    self.angle = ang;
                    self.frontStyle.transform = `rotate3d(0, 0, 1, ${self.angle}deg)`;
                });
                //back photo 缩放
                self._easeoutAni(self.scale, .9, 8, .005, (sca, isEnd) => {
                    self.scale = sca;
                    self.backStyle.transform = `scale3d(${this.scale}, ${this.scale}, 1)`;
                });
                //back photo mask 透明度
                self._easeoutAni(self.opacity, 1, 8, .01, (opa, isEnd) => {
                    self.opacity = opa;
                });

                //circle
                self._circleEaseAni()
            }
        },
        _circleEaseAni() {
            let self = this;
            //back photo 缩放
            self._easeoutAni(self.cirScale, .1, 8, .005, (sca, isEnd) => {
                self.cirScale = sca;
                if (self.circleVisible == 'left') {
                    self.lCircleSty.transform = `scale3d(${this.cirScale}, ${this.cirScale}, 1) translate3d(-50%, 0, 0)`;
                } else {
                    self.rCircleSty.transform = `scale3d(${this.cirScale}, ${this.cirScale}, 1) translate3d(50%, 0, 0)`;
                }
            });
            //角度
            self._easeoutAni(self.cirXDis, 0, 8, 1, (dis, isEnd) => {
                self.cirXDis = dis;
                let styles = self.circleVisible == 'left' ? self.lCircleSty : self.rCircleSty;
                styles[self.circleVisible] = self.cirXDis + 'px';
            });
            //back photo mask 透明度
            self._easeoutAni(self.cirOpacity, 0, 8, .01, (opa, isEnd) => {
                self.cirOpacity = opa;
                let styles = self.circleVisible == 'left' ? self.lCircleSty : self.rCircleSty;
                styles.opacity = self.cirOpacity
            })
        },
        _updateCurrArr() {
            this.isTurnPhoto = false;
            if (this.startIdx < this.currTotal.length) {
                this.curr.splice(0, 1);
                this.curr.push(this.currTotal[this.startIdx]);
                this.curr[0].zIndex = 1;
                this.curr[1].zIndex = 0;
                this.curr[1].isloadingBack = false;
                this.startIdx++
            } else {
                let obj;
                if (this.curr[1].isLoading) {
                    obj = {
                        isLoading: false,
                        isloadingBack: true
                    }
                } else {
                    obj = {
                        isLoading: true,
                        isloadingBack: false
                    }
                };
                this.curr.splice(0, 1);
                this.curr.push(obj);
                this.curr[0].zIndex = 1;
                this.curr[1].zIndex = 0
            };
            this._resetTransf()
        },
        _resetTransf() {
            this.angle = 0;
            this.turnOpacity = 1;

            this.scale = .9;
            this.opacity = 1;

            this.cirScale = .1;
            this.cirOpacity = 0;
            this.cirXDis = 0;

            this.frontStyle = {
                zIndex: 1,
                transform: '',
                opacity: 1
            };
            this.backStyle = {
                zIndex: 0,
                transformOrigin: '50% 50%',
                transform: 'scale3d(.9, .9, 1)'
            };
            this.lCircleSty = {
                opacity: 0,
                transform: 'scale3d(.1, .1, 1) translate3d(-50%, 0, 0)',
                left: 0
            };
            this.rCircleSty = {
                opacity: 0,
                transform: 'scale3d(.1, .1, 1) translate3d(50%, 0, 0)',
                right: 0
            }
        },
        _easeoutAni(start, end, rate, limit, callback) {
            let self = this;
            let _end = end;
            if (start == end || typeof start != 'number') {　　
                return;
            };　　
            end = end || 0;　　
            rate = rate || 2;
            let step = () => {　
                if (self.isTouch) return;　
                start = start + (end - start) / rate;
                if (Math.abs(start - _end) < limit) {
                    callback(end, true);　　
                    return;
                };
                callback(start, false);　　
                requestAnimationFrame(step);
            };　　
            step()
        },
        //limit fn
        _limitInMaxAndMin(max, min, val) {
            if (val >= max) {
                return max
            } else if (val <= min) {
                return min
            } else {
                return val
            }
        },
        //当前数组翻页快结束的自定义事件
        _turnToTheEnd() {
            this.$emit('turnend', {state: 'Close to the end'});
        },
        _isChangePage(direction, item) {
            let itemObj = {};
            for (let key in item) {
                if (key != 'zIndex' && key != 'isloadingBack') {
                    itemObj[key] = item[key];
                }
            };
            this.$emit('change', {
                direction: direction,
                item: itemObj
            })
        },
        _winResized() {
            let self = this;
            //窗口变化时更新容器宽度
            window.addEventListener('resize', function(e) {
                self.containerW = self.$refs.photoSC.clientWidth;
            });
        }
    }
}
</script>
<style scoped lang="scss">
.photo-switching-container {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    position: relative;
}

.rotate-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    transform-origin: 50% 200%;
    -webkit-transform-origin: 50% 200%;
    background: #ccc;
    will-change: transform;
}

.back-photo-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    border-radius: 7px;
}

.loading-card {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 7px;
}

.side-circie {
    width: 70px;
    height: 70px;
    position: absolute;
    z-index: 20;
    text-align: center;
    line-height: 70px;
    border-radius: 50%;
    overflow: hidden;
    top: 0;
    bottom: 0;
    margin: auto 0;
}
</style>
