"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      num: 1,
      list: [],
      page: 1,
      index: 0,
      show: false
    };
  },
  // onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
  // 	this.num=option.num;
  // 	console.log(option.num); //打印出上个页面传递的参数。
  // },
  onShow() {
    this.getbook(1, 6);
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.page = 0;
    setTimeout(() => {
      this.getbook(1, 6);
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  // 触底事件
  onReachBottom() {
    this.page++;
    this.getbook(this.page, 6);
  },
  methods: {
    async getbook(num, num1) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/likebook/Limit",
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
            "userId": common_vendor.index.getStorageSync("name").id
          }
        });
        var list1 = [];
        list1 = response.data.data;
        console.log("我的喜欢");
        console.log(response);
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
  return common_vendor.e({
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
    b: $data.list.length !== 0
  }, $data.list.length !== 0 ? {
    c: common_vendor.t($data.list[$data.index].bookIntroduce)
  } : {}, {
    d: common_vendor.o($options.close),
    e: common_vendor.p({
      show: $data.show,
      mode: "center"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-de228ff6"], ["__file", "D:/before/Project/uniApp/pages/mybooklist/mybooklist.vue"]]);
wx.createPage(MiniProgramPage);
