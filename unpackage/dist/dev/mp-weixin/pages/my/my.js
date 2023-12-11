"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const interpeceptor = require("../../interpeceptor.js");
const _sfc_main = {
  data() {
    return {
      cover: "",
      // 存储头像的 URL
      show: false,
      title: "积分规则",
      content: "学习专题加十分",
      user: {
        name: "",
        head: "",
        score: ""
      }
    };
  },
  mounted() {
    this.get();
    this.getuser();
  },
  onShow() {
    console.log("我的主页");
    interpeceptor.routingIntercept();
    this.getuser();
  },
  methods: {
    upload() {
      common_vendor.index.chooseImage({
        count: 1,
        // 只允许选择一张图片
        sizeType: ["original", "compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        // 从相册选择
        success: (chooseImageRes) => {
          common_vendor.index.compressImage({
            src: chooseImageRes.tempFilePaths[0],
            quality: 50,
            // 压缩质量
            success: (compressRes) => {
              this.cover = chooseImageRes.tempFilePaths[0];
              common_vendor.index.uploadFile({
                url: pages_base.base_url + "/user/updatehead",
                // 替换为实际的上传接口地址
                filePath: compressRes.tempFilePath,
                // 上传的文件路径
                name: "imageFile",
                // 服务器接收文件的字段名
                formData: {
                  id: common_vendor.index.getStorageSync("name").id
                  // 其他表单数据
                },
                header: {
                  "Authorization": common_vendor.index.getStorageSync("token")
                  // 添加认证头部
                },
                success: (uploadRes) => {
                  console.log("上传成功", uploadRes);
                },
                fail: (uploadErr) => {
                  console.log("上传失败", uploadErr);
                }
              });
            },
            fail: (compressErr) => {
              console.log("压缩图片失败", compressErr);
            }
          });
        },
        fail: (chooseImageErr) => {
          console.log("选择图片失败", chooseImageErr);
        }
      });
    },
    showModal() {
      this.show = true;
    },
    confirm() {
      this.show = false;
    },
    gotopassword() {
      common_vendor.index.navigateTo({
        url: "/pages/password/password"
      });
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
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
        common_vendor.index.setStorageSync("token", null);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async get() {
      const that = this;
      try {
        that.user.name = common_vendor.index.getStorageSync("name").username;
        that.user.score = common_vendor.index.getStorageSync("name").score;
      } catch (e) {
        console.log(e);
      }
    },
    async getuser() {
      const that = this;
      const num = common_vendor.index.getStorageSync("name").username;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/user/userByname",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "username": num
          }
        });
        console.log(response);
        that.user.score = response.data.data[0].score;
        that.cover = response.data.data[0].head;
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    gotoscore() {
      common_vendor.index.navigateTo({
        url: "/pages/score/score"
      });
    },
    gotostudy() {
      common_vendor.index.navigateTo({
        url: "/pages/study/study"
      });
    },
    gotoself() {
      common_vendor.index.navigateTo({
        url: "/pages/mybooklist/mybooklist"
      });
    },
    gotoword() {
      common_vendor.index.navigateTo({
        url: "/pages/myword/myword"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  _easycom_u_modal2();
}
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  _easycom_u_modal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.cover,
    b: common_vendor.o((...args) => $options.upload && $options.upload(...args)),
    c: common_vendor.t($data.user.name),
    d: common_vendor.t($data.user.score),
    e: common_vendor.o(($event) => $options.gotoscore()),
    f: common_vendor.o(($event) => $options.gotostudy()),
    g: common_vendor.o(($event) => $options.gotoself()),
    h: common_vendor.o(($event) => $options.gotoword()),
    i: common_vendor.o(($event) => $options.showModal()),
    j: common_vendor.o(($event) => $options.gotopassword()),
    k: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    l: common_vendor.sr("uModal", "4d6d7001-0"),
    m: common_vendor.o($options.confirm),
    n: common_vendor.p({
      show: $data.show,
      title: $data.title,
      content: $data.content,
      asyncClose: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
