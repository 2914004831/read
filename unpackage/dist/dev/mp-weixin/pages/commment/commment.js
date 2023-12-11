"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const _sfc_main = {
  data() {
    return {
      show: false,
      book: {},
      comment: [],
      commentid: [],
      num: 0,
      myid: 0,
      page: 1
    };
  },
  mounted() {
    this.myid = common_vendor.index.getStorageSync("name").id;
    const num = this.num;
    this.getbook(num);
    console.log(num);
    this.getcomment(1, 7, num);
  },
  onLoad: function(option) {
    this.num = option.num;
  },
  // 触底事件
  onReachBottom() {
    this.page++;
    const num = this.num;
    const page = this.page;
    this.getcomment(page, 7, num);
  },
  methods: {
    async getbook(num) {
      const that = this;
      try {
        console.log(pages_base.base_url + "/book/bookByid");
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/book/bookByid",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "bookid": num
          }
        });
        var list1 = {};
        list1 = response.data.data;
        that.book = list1;
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async getcomment(num, num1, num2) {
      const that = this;
      console.log(num);
      console.log(num1);
      console.log(num2);
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/comment/getlimit",
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
            "bookId": num2
          }
        });
        var list1 = [];
        list1 = response.data.data;
        console.log(response);
        list1.forEach(function(item, index) {
          var date = new Date(item.creatTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.creatTime = formattedDate;
        });
        if (num == 1) {
          that.comment = list1;
        } else {
          that.comment = that.comment.concat(list1);
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async deletecomment() {
      const that = this;
      console.log(that.commentid);
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/comment/delcomment",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "commentId": that.commentid
          }
        });
        that.close();
        const number = that.num;
        that.getcomment(1, 7, number);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    },
    open(num) {
      this.commentid = num;
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
    a: common_vendor.f($data.comment, (item, k0, i0) => {
      return common_vendor.e({
        a: item.head,
        b: common_vendor.t(item.userName),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.creatTime),
        e: $data.myid == item.userId
      }, $data.myid == item.userId ? {
        f: common_vendor.o(($event) => $options.open(item.commentId), item.index)
      } : {}, {
        g: item.index
      });
    }),
    b: common_vendor.o(($event) => $options.deletecomment()),
    c: common_vendor.o(($event) => $options.close()),
    d: common_vendor.p({
      show: $data.show,
      mode: "bottom",
      closeable: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/commment/commment.vue"]]);
wx.createPage(MiniProgramPage);
