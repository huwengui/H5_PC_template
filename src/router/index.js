import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/utils-doc',
    name: 'utils-doc',
    // 工具库文档页面
    component: () =>
      import(/* webpackChunkName: "utils-doc" */ '../views/UtilsDocView.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
