"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      num: 0,
      essayid: 0,
      list: {},
      content: "<p>1111</p>",
      enterTimestamp: 0,
      // 记录进入页面的时间戳
      stayDuration: 0
      // 停留时间
    };
  },
  onShow() {
    this.getessay();
    this.enterTimestamp = Date.now();
  },
  onLoad(option) {
    this.essayid = option.num;
    this.enterTimestamp = Date.now();
  },
  onUnload() {
    const exitTimestamp = Date.now();
    this.stayDuration = exitTimestamp - this.enterTimestamp;
    new Date(this.stayDuration);
    if (this.stayDuration > 5e3) {
      this.addhis();
      this.updatascore();
    }
  },
  methods: {
    async getessay() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/essay/essayByid",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "essayId": that.essayid
          }
        });
        var date = new Date(response.data.data[0].creatTime);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
        response.data.data[0].creatTime = formattedDate;
        that.list = response.data.data[0];
        const regex = new RegExp("<img", "gi");
        that.list.content = that.list.content.replace(regex, `<img style="max-width: 100%; height: auto"`);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async addhis() {
      const that = this;
      try {
        console.log("我添加记录了");
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/history/addhis",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "name": that.list.title,
            "score": 10,
            "userId": common_vendor.index.getStorageSync("name").id,
            "essayId": that.list.essayId
          }
        });
        console.log(response);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.list.creatTime),
    b: common_vendor.t($data.list.title),
    c: $data.list.content
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/essay/essay.vue"]]);
wx.createPage(MiniProgramPage);
