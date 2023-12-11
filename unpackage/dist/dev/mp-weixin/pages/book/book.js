"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      value: 0,
      ok: false,
      value1: "",
      show: false,
      comment: [],
      book: {},
      num: 0,
      page: 1,
      likeid: 0,
      more: true,
      bookshow: false,
      textshow: false,
      isself: false,
      gocomment: true
    };
  },
  onLoad: function(option) {
    this.num = option.num;
    this.getbook(option.num);
    this.istrueself();
  },
  onShow() {
    const num = this.num;
    this.getcomment(num, 1, 3);
    this.istrueself();
  },
  onPullDownRefresh() {
    this.page = 0;
    const num = this.num;
    setTimeout(() => {
      this.getbook(num);
      this.getcomment(num, 1, 3);
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    async getbook(num) {
      console.log(num);
      const that = this;
      try {
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
            "bookid": num,
            "show": 1
          }
        });
        console.log(response);
        console.log(response.data.data);
        that.book = response.data.data;
      } catch (e) {
        console.log("bookerror");
        console.log(e);
      }
    },
    async getcomment(num, num1, num2) {
      const that = this;
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
            "num": num1,
            "pagesize": num2,
            "bookId": num
          }
        });
        let list1 = [];
        list1 = response.data.data;
        console.log(response);
        if (list1.length == 0) {
          that.more = false;
        }
        list1.forEach(function(item, index) {
          var date = new Date(item.creatTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          item.creatTime = formattedDate;
        });
        that.comment = list1;
        if (that.comment.length == 0) {
          that.textshow = true;
        } else {
          that.textshow = false;
        }
      } catch (e) {
        console.log("commenterror");
        console.log(e);
      }
    },
    async outcomment() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/comment/add",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "userId": common_vendor.index.getStorageSync("name").id,
            "content": that.value1,
            "bookId": that.num,
            "bookName": that.book.bookName,
            "userName": common_vendor.index.getStorageSync("name").username
          }
        });
        that.close();
        console.log(response);
        common_vendor.index.showToast({
          title: "评论发布成功",
          icon: "none",
          // 'none' 表示不显示图标，可根据需求调整
          duration: 1e3
          // 显示时长，单位毫秒
        });
        this.getcomment(that.num, 1, 3);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async inself() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/likebook/addhlike",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "userId": common_vendor.index.getStorageSync("name").id,
            "bookId": that.num,
            "bookName": that.book.bookName
          }
        });
        console.log(response);
        if (response.data.code == 200) {
          common_vendor.index.showToast({
            title: "加入书架成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        } else {
          common_vendor.index.showToast({
            title: "加入书架失败",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        }
        that.istrueself();
      } catch (e) {
        console.log("error");
        console.log(e);
        common_vendor.index.showToast({
          title: "服务器错误",
          icon: "none",
          // 'none' 表示不显示图标，可根据需求调整
          duration: 1e3
          // 显示时长，单位毫秒
        });
      }
    },
    async outself() {
      const that = this;
      try {
        console.log(that.likeid);
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/likebook/del",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "likeId": that.likeid
          }
        });
        console.log(response);
        if (response.data.code == 200) {
          common_vendor.index.showToast({
            title: "从书架移除成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        } else {
          common_vendor.index.showToast({
            title: "从书架移除失败",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        }
        that.istrueself();
      } catch (e) {
        console.log("error");
        console.log(e);
        common_vendor.index.showToast({
          title: "服务器错误",
          icon: "none",
          // 'none' 表示不显示图标，可根据需求调整
          duration: 1e3
          // 显示时长，单位毫秒
        });
      }
    },
    async istrueself() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/likebook/byuserbook",
          // 替换为实际的 API 地址
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "bookId": that.num,
            "userId": common_vendor.index.getStorageSync("name").id
          }
        });
        console.log(response);
        if (response.data.data == 0) {
          that.isself = false;
        } else {
          if (response.data.data.likeId) {
            that.likeid = response.data.data.likeId;
            that.isself = true;
          } else {
            that.isself = false;
          }
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    gotocontent() {
      const num = this.num;
      common_vendor.index.navigateTo({
        url: "/pages/content/content?num=" + num
      });
    },
    gotocomment() {
      const num = this.num;
      common_vendor.index.navigateTo({
        url: "/pages/commment/commment?num=" + num
      });
    },
    addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    },
    open() {
      this.show = true;
    },
    op() {
      this.bookshow = true;
    },
    close() {
      this.value1 = "", this.bookshow = false;
      this.show = false;
    }
  }
};
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  (_easycom_u_popup2 + _easycom_u__textarea2)();
}
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_u__textarea = () => "../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
if (!Math) {
  (_easycom_u_popup + _easycom_u__textarea)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.book.bookImg,
    b: common_vendor.t($data.book.bookName),
    c: common_vendor.t($data.book.bookAuther),
    d: common_vendor.t($data.book.bookIntroduce),
    e: common_vendor.o(($event) => $options.op()),
    f: common_vendor.t($data.book.bookIntroduce),
    g: common_vendor.o($options.close),
    h: common_vendor.p({
      show: $data.bookshow,
      mode: "center"
    }),
    i: $data.textshow
  }, $data.textshow ? {} : {}, {
    j: common_vendor.f($data.comment, (item, index, i0) => {
      return {
        a: item.head,
        b: common_vendor.t(item.userName),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.creatTime),
        e: index
      };
    }),
    k: $data.more
  }, $data.more ? {
    l: common_vendor.o(($event) => $options.gotocomment())
  } : {}, {
    m: common_vendor.o(($event) => $options.open()),
    n: common_vendor.o(($event) => $data.value1 = $event),
    o: common_vendor.p({
      placeholder: "请输入内容",
      modelValue: $data.value1
    }),
    p: common_vendor.o(($event) => $options.outcomment()),
    q: common_vendor.p({
      show: $data.show,
      mode: "bottom"
    }),
    r: !$data.isself
  }, !$data.isself ? {
    s: common_vendor.o(($event) => $options.inself())
  } : {}, {
    t: $data.isself
  }, $data.isself ? {
    v: common_vendor.o(($event) => $options.outself())
  } : {}, {
    w: common_vendor.o(($event) => $options.gotocontent())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e0cf4858"], ["__file", "D:/before/Project/uniApp/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
