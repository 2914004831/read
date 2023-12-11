"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      password: "",
      password1: "",
      username: "",
      show: false,
      mesg: "",
      color: true
    };
  },
  watch: {
    password() {
      console.log(this.password.length);
    },
    username() {
    }
  },
  onLoad() {
  },
  methods: {
    checkpwd() {
      if (this.username != "") {
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
      } else {
        this.show = true;
        this.color = false;
        this.mesg = "账号不能为空";
        setTimeout(() => {
          this.show = false;
        }, 800);
        return false;
      }
    },
    async register() {
      const that = this;
      try {
        if (that.checkpwd()) {
          const response = await common_vendor.index.request({
            url: pages_base.base_url + "/user/register",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            data: {
              // 请求参数
              username: that.username,
              pwd: that.password,
              role: 0
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
            this.username = "";
            this.password1 = "";
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
      } catch (error) {
        this.show = true;
        this.color = false;
        this.mesg = error.message;
        setTimeout(() => {
          this.show = false;
        }, 800);
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
    e: $data.password1,
    f: common_vendor.o(($event) => $data.password1 = $event.detail.value),
    g: common_vendor.o(($event) => $options.register()),
    h: $data.show
  }, $data.show ? {
    i: common_vendor.t($data.mesg),
    j: common_vendor.n($data.color ? "success" : "erro")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"], ["__file", "D:/before/Project/uniApp/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
