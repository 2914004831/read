"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      falg: 0,
      type: "warning",
      value: 3,
      namevalue: 0,
      page: 1,
      list0: [
        {
          name: "全部",
          disabled: false,
          essay: []
        },
        {
          name: "马克思列宁主义",
          disabled: false,
          essay: []
        },
        {
          name: "毛泽东思想",
          isDot: false,
          essay: []
        },
        {
          name: "邓小平理论",
          isDot: false,
          essay: []
        },
        {
          name: "三个代表重要思想",
          isDot: false,
          essay: []
        },
        {
          name: "科学发展观",
          isDot: false,
          essay: []
        },
        {
          name: "习思想",
          isDot: false,
          essay: []
        },
        {
          name: "课后习题",
          isDot: false,
          essay: []
        }
      ],
      listhis: []
    };
  },
  mounted() {
    this.gethis();
    this.getallessay(1, 10, 0);
  },
  onShow() {
    this.gethis();
    if (this.namevalue == 0) {
      this.getallessay(1, 10, 0);
    } else {
      this.getessay(1, 10, this.namevalue);
    }
  },
  // 触底
  onReachBottom() {
    this.page++;
    const page = this.page;
    const label = this.namevalue;
    if (label == 0) {
      this.getallessay(page, 10, 0);
    } else {
      this.getessay(page, 10, label);
    }
  },
  methods: {
    click(item, index) {
      const name = item.name;
      if (name == "全部") {
        this.namevalue = 0;
        this.page = 1;
        this.getallessay(this.page, 10, 0);
      } else if (name == "马克思列宁主义") {
        this.namevalue = 1;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else if (name == "毛泽东思想") {
        this.namevalue = 2;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else if (name == "邓小平理论") {
        this.namevalue = 3;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else if (name == "三个代表重要思想") {
        this.namevalue = 4;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else if (name == "科学发展观") {
        this.namevalue = 5;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else if (name == "习思想") {
        this.namevalue = 6;
        this.page = 1;
        this.getessay(this.page, 10, this.namevalue);
      } else
        ;
    },
    // 根据标签获取
    async getessay(num, num1, num2) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/essay/getlimitbylabel",
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
            "label": num2
          }
        });
        var list1 = [];
        list1 = response.data.data;
        list1.forEach(function(item, index) {
          var date = new Date(item.creatTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.creatTime = formattedDate;
          if (that.listhis.includes(item.essayId)) {
            item.show = 1;
          }
        });
        if (num == 1) {
          that.list0[num2].essay = list1;
        } else {
          that.list0[num2].essay = that.list0[num2].essay.concat(list1);
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    // 获取全部
    async getallessay(num, num1, num2) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/essay/getlimit",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "num": num,
            "pagesize": num1
          }
        });
        var list1 = [];
        list1 = response.data.data;
        list1.forEach(function(item, index) {
          var date = new Date(item.creatTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.creatTime = formattedDate;
          if (that.listhis.includes(item.essayId)) {
            item.show = 1;
          }
        });
        if (num == 1) {
          that.list0[num2].essay = list1;
        } else {
          that.list0[num2].essay = that.list0[num2].essay.concat(list1);
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    // 获取历史
    async gethis() {
      const that = this;
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
            "userId": common_vendor.index.getStorageSync("name").id
          }
        });
        var list1 = [];
        list1 = response.data.data;
        list1.forEach(function(item, index) {
          that.listhis.push(item.essayId);
        });
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    // 补零函数
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    },
    // 去文章
    gotoessay(num) {
      console.log(num);
      common_vendor.index.navigateTo({
        url: "/pages/essay/essay?num=" + num
      });
    }
  }
};
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  _easycom_u_tabs2();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
if (!Math) {
  _easycom_u_tabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.click),
    b: common_vendor.p({
      list: $data.list0,
      lineColor: "#e2510e"
    }),
    c: common_vendor.f($data.list0[$data.namevalue].essay, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.creatTime),
        c: item.show == 0
      }, item.show == 0 ? {} : {}, {
        d: item.show == 1
      }, item.show == 1 ? {} : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.gotoessay(item.essayId), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b4bddda2"], ["__file", "D:/before/Project/uniApp/pages/special/special.vue"]]);
wx.createPage(MiniProgramPage);
