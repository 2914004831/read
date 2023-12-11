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
      value: "",
      show: false
    };
  },
  onLoad: function(option) {
  },
  onShow() {
    this.getbook(1, 6, this.num);
  },
  // // 下拉刷新
  onPullDownRefresh() {
    this.page = 0;
    setTimeout(() => {
      this.getbook(1, 6, this.num);
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  // // 触底事件
  onReachBottom() {
    this.page++;
    this.getbook(this.page, 6, this.num);
  },
  methods: {
    async getbook() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/book/search",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "bookName": that.value,
            "show": 1
          }
        });
        that.list = response.data.data;
        console.log(response);
        console.log(that.list);
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
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.getbook()),
    b: common_vendor.o(($event) => $options.getbook()),
    c: common_vendor.o(($event) => $data.value = $event),
    d: common_vendor.p({
      placeholder: "请输入搜索书籍名",
      clearabled: true,
      modelValue: $data.value
    }),
    e: common_vendor.f($data.list, (item, index, i0) => {
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
    f: common_vendor.t($data.list[$data.index].bookIntroduce),
    g: common_vendor.o($options.close),
    h: common_vendor.p({
      show: $data.show,
      mode: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"], ["__file", "D:/before/Project/uniApp/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
