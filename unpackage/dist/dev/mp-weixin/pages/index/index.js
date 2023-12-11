"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      password: "",
      username: "",
      show: false,
      mesg: "",
      color: true
    };
  },
  watch: {
    password() {
    },
    username() {
    }
  },
  onLoad() {
  },
  methods: {
    gotoRes() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    gotoIndex() {
      common_vendor.index.request({
        url: ""
      });
      common_vendor.index.switchTab({
        url: "/pages/main/main"
      });
    },
    async login() {
      const that = this;
      try {
        console.log("ahahah");
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/user/loginuser",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          data: {
            // 请求参数
            username: that.username,
            pwd: that.password
          }
        });
        if (response.data.code === 200) {
          console.log(response);
          common_vendor.index.setStorageSync("name", response.data.data.data);
          common_vendor.index.setStorageSync("token", response.data.data.token);
          this.mesg = response.data.message;
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
          this.password = "";
          this.username = "";
          common_vendor.index.switchTab({
            url: "/pages/main/main"
          });
        } else {
          common_vendor.index.showToast({
            title: "账号或者密码错误",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        }
      } catch (error) {
        console.log(error);
        common_vendor.index.showToast({
          title: "服务器错误",
          icon: "none",
          // 'none' 表示不显示图标，可根据需求调整
          duration: 1e3
          // 显示时长，单位毫秒
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.password,
    d: common_vendor.o(($event) => $data.password = $event.detail.value),
    e: common_vendor.o(($event) => $options.login()),
    f: common_vendor.o(($event) => $options.gotoRes()),
    g: $data.show
  }, $data.show ? {
    h: common_vendor.t($data.mesg),
    i: common_vendor.n($data.color ? "success" : "erro")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/before/Project/uniApp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
