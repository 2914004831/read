"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      wordshow: false,
      show: false,
      value1: "",
      comment: [],
      commentid: [],
      wordid: 0,
      num: 0,
      myid: 0,
      page: 1
    };
  },
  mounted() {
    this.myid = common_vendor.index.getStorageSync("name").id;
    this.getword(1, 7);
  },
  // 触底事件
  onReachBottom() {
    this.page++;
    const page = this.page;
    this.getword(page, 7);
  },
  methods: {
    async getword(num, num1) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/word/getuserid",
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
        console.log(response);
        list1.forEach(function(item, index) {
          var date = new Date(item.time);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.time = formattedDate;
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
    async deleteword() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/word/delbyid",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "id": that.wordid
          }
        });
        console.log("留言id");
        console.log(that.wordid);
        that.close();
        common_vendor.index.showToast({
          title: "留言删除成功",
          icon: "none",
          // 'none' 表示不显示图标，可根据需求调整
          duration: 1e3
          // 显示时长，单位毫秒
        });
        that.page = 1;
        that.getword(1, 7);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    },
    open(num) {
      console.log("传入数字");
      console.log(num);
      this.wordid = num;
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
        d: common_vendor.t(item.time),
        e: $data.myid == item.userId
      }, $data.myid == item.userId ? {
        f: common_vendor.o(($event) => $options.open(item.id), item.index)
      } : {}, {
        g: item.index
      });
    }),
    b: common_vendor.o(($event) => $options.deleteword()),
    c: common_vendor.o(($event) => $options.close()),
    d: common_vendor.o($options.close),
    e: common_vendor.o($options.open),
    f: common_vendor.p({
      show: $data.show,
      mode: "bottom",
      closeable: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/myword/myword.vue"]]);
wx.createPage(MiniProgramPage);
