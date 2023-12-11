"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      num: 0,
      list: [],
      page: 1,
      index: 0,
      show: false
    };
  },
  onLoad: function(option) {
    this.num = option.num;
    console.log(option.num);
  },
  onShow() {
    this.getbook(1, 6, this.num);
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.page = 0;
    setTimeout(() => {
      this.getbook(1, 6, this.num);
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  // 触底事件
  onReachBottom() {
    this.page++;
    this.getbook(this.page, 6, this.num);
  },
  methods: {
    async getbook(num, num1, num2) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/book/getlabellimit",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "num": num,
            "pagesize": num1,
            "bookLabel": num2,
            "show": 1
          }
        });
        var list1 = [];
        console.log(response);
        list1 = response.data.data;
        if (num == 1) {
          that.list = list1;
        } else {
          that.list = that.list.concat(list1);
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    gotobook(num) {
      common_vendor.index.navigateTo({
        url: "/pages/book/book?num=" + num
      });
    },
    open(num) {
      this.index = num;
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.bookImg,
        b: common_vendor.o(($event) => $options.gotobook(item.bookid), index),
        c: common_vendor.t(item.bookName),
        d: common_vendor.o(($event) => $options.gotobook(item.bookid), index),
        e: common_vendor.t(item.bookAuther),
        f: common_vendor.o(($event) => $options.gotobook(item.bookid), index),
        g: common_vendor.t(item.bookIntroduce),
        h: common_vendor.o(($event) => $options.open(index), index),
        i: index
      };
    }),
    b: common_vendor.t($data.list[$data.index].bookIntroduce),
    c: common_vendor.o($options.close),
    d: common_vendor.p({
      show: $data.show,
      mode: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ab0d65e2"], ["__file", "D:/before/Project/uniApp/pages/booklist/booklist.vue"]]);
wx.createPage(MiniProgramPage);
