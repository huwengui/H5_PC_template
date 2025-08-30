import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible.js' // 暂时注释掉，避免加载错误
import '@/css/base.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建Vue实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
