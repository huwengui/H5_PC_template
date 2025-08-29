import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "@/css/base.css";
import request from "@/utils/request";
import { api } from "@/utils/request";

// 将HTTP客户端挂载到Vue原型上
Vue.prototype.$http = request;
Vue.prototype.$api = api;

Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
