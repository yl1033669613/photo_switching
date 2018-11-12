import photoSwitching from './photo_switching.vue'
// 导入组件 
const vuePhotoSwitching = {
    install(Vue, options) {
        Vue.component(photoSwitching.name, photoSwitching)
    }
}

if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(vuePhotoSwitching)
}

export default vuePhotoSwitching
