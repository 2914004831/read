"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      circle: [],
      bookall: [
        {
          name: "马克思列宁主义书单",
          books: []
        },
        {
          name: "毛泽东思想书单",
          books: []
        },
        {
          name: "邓小平理论书单",
          books: []
        },
        {
          name: "三个代表重要思想书单",
          books: []
        },
        {
          name: "科学发展观书单",
          books: []
        },
        {
          name: "习思想书单",
          books: []
        }
      ]
    };
  },
  onShow() {
    this.getbook(1);
    this.getbook(2);
    this.getbook(3);
    this.getbook(4);
    this.getbook(5);
    this.getbook(6);
    this.getcircle();
  },
  mounted() {
    this.getbook(1);
    this.getbook(2);
    this.getbook(3);
    this.getbook(4);
    this.getbook(5);
    this.getbook(6);
    this.getcircle();
  },
  methods: {
    tip(e) {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    },
    async getcircle() {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/circle/getlist",
          method: "GET",
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {}
        });
        let list = [];
        let list2 = [];
        list = response.data.data;
        list.forEach(function(item, index) {
          var img = item.img;
          list2.push(img);
        });
        that.circle = list2;
      } catch (e) {
      }
    },
    async getbook(num) {
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
            "num": 1,
            "pagesize": 3,
            "bookLabel": num,
            "show": 1
          }
        });
        var list = [];
        list = response.data.data;
        console.log(list);
        console.log(response);
        if (num == 1) {
          that.bookall[0].books = list;
        } else if (num == 2) {
          that.bookall[1].books = list;
        } else if (num == 3) {
          that.bookall[2].books = list;
        } else if (num == 4) {
          that.bookall[3].books = list;
        } else if (num == 5) {
          that.bookall[4].books = list;
        } else if (num == 6) {
          that.bookall[5].books = list;
        } else {
        }
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    gotolist(num) {
      common_vendor.index.navigateTo({
        url: "/pages/booklist/booklist?num=" + num
      });
    },
    book(num) {
      common_vendor.index.navigateTo({
        url: "/pages/book/book?num=" + num
      });
    }
  }
};
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  (_easycom_u_search2 + _easycom_u_swiper2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_swiper)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.tip),
    b: common_vendor.p({
      shape: "round",
      clearabled: true
    }),
    c: common_vendor.p({
      list: $data.circle,
      indicator: true,
      circular: true
    }),
    d: common_vendor.f($data.bookall, (item, index, i0) => {
      return common_vendor.e({
        a: item.books.length != 0
      }, item.books.length != 0 ? {
        b: common_vendor.t(item.name),
        c: common_vendor.f(item.books, (it, ind, i1) => {
          return {
            a: it.bookImg,
            b: common_vendor.t(it.bookName),
            c: common_vendor.o(($event) => $options.book(it.bookid), ind),
            d: ind
          };
        }),
        d: common_vendor.o(($event) => $options.gotolist(index + 1), index)
      } : {}, {
        e: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4f50ca8f"], ["__file", "D:/before/Project/uniApp/pages/main/main.vue"]]);
wx.createPage(MiniProgramPage);
