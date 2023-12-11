"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      list: [],
      listhis: []
    };
  },
  onShow() {
    this.getstudy();
    this.study();
  },
  methods: {
    gotoessay(num) {
      console.log("我是获取");
      console.log(num);
      common_vendor.index.setStorageSync("essayid", num);
      common_vendor.index.navigateTo({
        url: "/pages/essay/essay"
      });
    },
    async study() {
      const that = this;
      const num = common_vendor.index.getStorageSync("name");
      console.log(num);
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/essay/getlist",
          // 替换为实际的 API 地址
          method: "GET",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {}
        });
        var list1 = [];
        list1 = response.data.data;
        console.log(response);
        console.log(list1);
        list1.forEach(function(item, index) {
          var date = new Date(item.creatTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.creatTime = formattedDate;
          let exists = that.listhis.includes(item.essayId);
          if (exists) {
            item.show = 1;
          } else {
          }
        });
        that.list = list1;
        console.log(that.list);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    },
    async getstudy() {
      const that = this;
      const num = common_vendor.index.getStorageSync("name").id;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/history/getlist",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "userId": num
          }
        });
        console.log("获取记录成功");
        var list1 = [];
        list1 = response.data.data;
        var list = [];
        list1.forEach(function(item, index) {
          list.push(item.essayId);
        });
        that.listhis = list;
        console.log("获取的记录id");
        console.log(that.listhis);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    }
  }
};
if (!Array) {
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  (_easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_divider2)();
}
const _easycom_u_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
if (!Math) {
  (_easycom_u_cell + _easycom_u_cell_group + _easycom_u_divider)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: "2a474795-1-" + i0 + "," + ("2a474795-0-" + i0),
        b: common_vendor.p({
          size: "large",
          title: item.title,
          value: "已学习"
        }),
        c: common_vendor.t(item.time),
        d: "2a474795-0-" + i0,
        e: item.index,
        f: common_vendor.o(($event) => $options.gotoessay(item.essayId), item.index)
      };
    }),
    b: common_vendor.p({
      text: "没有更多了"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/study/study.vue"]]);
wx.createPage(MiniProgramPage);
