import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible.js' // 暂时注释掉，避免加载错误
import '@/css/base.css'
import utils from '@/utils'
import api from '@/api'

Vue.use(ElementUI)

// 将 utils 工具库挂载到 Vue 原型上
Vue.prototype.$utils = utils
// 将 api 接口挂载到 Vue 原型上
Vue.prototype.$api = api

Vue.config.productionTip = false

// 创建Vue实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
