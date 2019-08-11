import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载vant组件并且引入图片懒加载
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入页面公共样式
import '@/styles/index.less'
// 引入验证插件
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 引入全局过滤器
import '@/filters'
Vue.use(VeeValidate)
// 本地化
Validator.localize('zh-cn', zhCN)
// 注册vant组件和图片懒加载
Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false
// 设置代码延时处理
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => [
      resolve()
    ], time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
