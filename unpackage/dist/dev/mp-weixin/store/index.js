"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    login: false,
    essayid: 0,
    id: 1,
    user: {},
    lljl: []
  },
  mutations: {
    // 定义mutations，用于修改状态(同步)
    update(state, payload) {
      state[state] = payload;
    },
    setNumber(state, newValue) {
      state.essayid = newValue;
    }
  },
  actions: {
    // 定义actions，用于修改状态(异步)
    // 2秒后更新状态
    updateUid(context, payload) {
      setTimeout(() => {
        context.commit("updateUid", payload);
      }, 2e3);
    },
    updateNumber({ commit }, newValue) {
      commit("setNumber", newValue);
    }
  },
  getters: {
    // 定义一个getters
    formatUid(state) {
      return state.uid + " Tom";
    },
    formatessayid(state) {
      return state.essayid;
    }
  },
  modules: {}
});
exports.store = store;
