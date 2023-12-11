import App from './App'
import store from "./store/index.js"
import uviewPlus from '@/uni_modules/uview-plus'
import Vuex from 'vuex';
import interceptor from './interpeceptor.js'; // 引入路由守卫函数

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }



  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
	store
  ...App
})

// 注册路由守卫
Vue.mixin({
  beforeCreate() {
    if (this.$options.beforeEnter) {
      this.$beforeEnter = this.$options.beforeEnter;
    }
  }
});

Vue.prototype.$interceptor = interceptor;

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
   app.use(store)
   app.use(Vuex)
  return {
    app
  }
}
// #endif