import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入页面公共样式
import '@/styles/index.less'
// 引入验证插件
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 本地化
Validator.localize('zh-cn', zhCN)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
