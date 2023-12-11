"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      password: "",
      password1: "",
      show: false,
      mesg: "",
      color: true
    };
  },
  methods: {
    checkpwd() {
      if (this.password == this.password1) {
        if (this.password.length >= 6) {
          return true;
        } else {
          this.show = true;
          this.color = false;
          this.mesg = "密码格式错误";
          setTimeout(() => {
            this.show = false;
          }, 1500);
          return false;
        }
      } else {
        this.show = true;
        this.color = false;
        this.mesg = "密码不一致";
        setTimeout(() => {
          this.show = false;
        }, 800);
        return false;
      }
    },
    async changepass() {
      const that = this;
      try {
        if (that.checkpwd()) {
          console.log("yes");
          console.log(common_vendor.index.getStorageSync("token"));
          const response = await common_vendor.index.request({
            url: pages_base.base_url + "/user/updatepwd",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": common_vendor.index.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              username: common_vendor.index.getStorageSync("name").username,
              pwd: that.password
            }
          });
          console.log(response);
          if (response.data.code === 200) {
            this.show = true;
            this.color = true;
            this.mesg = response.data.message;
            setTimeout(() => {
              this.show = false;
            }, 800);
            this.password = "";
            this.password1 = "";
            this.logout();
          } else {
            this.show = true;
            this.color = false;
            this.mesg = response.data.message;
            setTimeout(() => {
              this.show = false;
            }, 800);
          }
        } else {
        }
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/user/logout",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {}
        });
        console.log(response);
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.password,
    b: common_vendor.o(($event) => $data.password = $event.detail.value),
    c: $data.password1,
    d: common_vendor.o(($event) => $data.password1 = $event.detail.value),
    e: common_vendor.o(($event) => $options.changepass()),
    f: $data.show
  }, $data.show ? {
    g: common_vendor.t($data.mesg),
    h: common_vendor.n($data.color ? "success" : "erro")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f800cd94"], ["__file", "D:/before/Project/uniApp/pages/password/password.vue"]]);
wx.createPage(MiniProgramPage);
