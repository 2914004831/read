"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_base = require("../base.js");
const _sfc_main = {
  data() {
    return {
      value: 0,
      num: 0,
      show: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      lstshow: false,
      list: ["1", 2],
      chapternum: 0,
      pageNum: 0,
      html: "",
      paragraphsPerPage: 0,
      // 当前页码
      totilpage: 0,
      totilnum: 0,
      currentContent: "",
      // 当前页的内容
      currentChapter: 0,
      // 当前章节
      indexchapter: 0,
      lastchapter: 0,
      chapters: [],
      // 章节列表
      nav_types: [
        {
          value: "章节列表",
          className: "fff"
        },
        {
          value: "进度条",
          className: "ant"
        },
        {
          value: "背景色",
          className: "grey"
        }
      ]
    };
  },
  onLoad: function(option) {
    this.num = option.num;
    console.log("我的书籍Id是");
    this.getbook(this.num);
  },
  watch: {
    chapterContent(newContent) {
      this.currentContent = newContent;
    }
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
      this.endX = event.touches[0].clientX;
      this.endY = event.touches[0].clientY;
    },
    handleTouchEnd() {
      const right = Math.abs(this.endX - this.startX);
      const top = Math.abs(this.endY - this.startY);
      if (right >= top) {
        if (this.endX > this.startX) {
          this.handleRightSwipe();
        } else if (this.endX < this.startX) {
          this.handleLeftSwipe();
        }
      } else {
        if (this.endY > this.startY) {
          this.handledownSwipe();
          this.handleRightSwipe();
        } else if (this.endY < this.startY) {
          this.handleupSwipe();
          this.handleLeftSwipe();
        }
      }
    },
    handleRightSwipe() {
      if (!this.show) {
        const page = this.paragraphsPerPage;
        this.loadPage(page, 1);
      }
    },
    handleLeftSwipe() {
      if (!this.show) {
        const page = this.paragraphsPerPage;
        this.loadPage(page, 2);
      }
    },
    handleupSwipe() {
      this.open();
    },
    handledownSwipe() {
      this.close();
    },
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    setPageNum(num) {
      this.pageNum = num;
    },
    async getbook(num) {
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/book/read",
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
        that.chapternum = response.data.data;
        let lastkey;
        let indexkey;
        const keys = Object.keys(response.data.data);
        if (keys.length > 0) {
          lastkey = keys[keys.length - 1];
          indexkey = keys[0];
        } else {
          lastkey = "无数据";
        }
        that.indexchapter = indexkey;
        that.lastchapter = lastkey;
        that.getcontent(that.indexchapter, 1);
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    },
    async getcontent(index, num) {
      this.currentChapter = index;
      const that = this;
      try {
        const response = await common_vendor.index.request({
          url: pages_base.base_url + "/book/getcontent",
          method: "POST",
          // 请求方法，可以是 'GET'、'POST' 等
          header: {
            "Authorization": common_vendor.index.getStorageSync("token")
            // 添加认证头部
          },
          data: {
            "bookid": that.num,
            "num": index
          }
        });
        console.log(response);
        const paragraphs = response.data.data.split(/(<p>.*?<\/p>)/);
        const textWithoutPTags = response.data.data.replace(/<\/?p>/g, "");
        const textWithoutSpanTagspan = textWithoutPTags.replace(/<\s*span\b[^>]*>[\s\S]*?<\/span>/gi, "");
        const textWithoutATagsa = textWithoutSpanTagspan.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "");
        const textWithoutATagsaimg = textWithoutATagsa.replace(/<img\b[^>]*>(.*?)<\/img>/gi, "");
        that.html = textWithoutATagsaimg;
        that.totilnum = textWithoutATagsaimg.length;
        const totalChars = textWithoutATagsaimg.length - 348;
        const totalPages = Math.ceil(totalChars / 350) + 1;
        that.totilpage = totalPages;
        if (num == 1) {
          const pageContent = textWithoutATagsaimg.substring(0, 348);
          that.paragraphsPerPage = 1;
          that.currentContent = pageContent;
        } else {
          that.paragraphsPerPage = totalPages - 1;
          that.loadPage(totalPages - 1, 2);
        }
      } catch (e) {
        console.error("捕获到异常", e);
      }
    },
    loadPage(page, num) {
      if (num == 1) {
        if (page == 1) {
          this.currentChapter--;
          if (this.currentChapter < this.indexchapter) {
            return;
          }
          this.getcontent(this.currentChapter, 2);
        }
        let start;
        let end;
        if (page == 2) {
          start = 0;
          end = (page - 2) * 348 + 348;
        } else if (page == this.totilpage) {
          start = (page - 2) * 348 + 348;
          end = this.totilnum;
        } else {
          start = (page - 2) * 348 + 348;
          end = (page - 1) * 348 + 348;
        }
        const pageContent = this.html.substring(start, end);
        this.chapterContent = pageContent;
        this.paragraphsPerPage--;
        this.currentContent = pageContent;
      } else {
        if (page == this.totilpage) {
          this.currentChapter++;
          let last = parseInt(this.currentChapter);
          if (last > this.lastchapter) {
            common_vendor.index.showToast({
              title: "最后一章",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
            return;
          } else {
            this.getcontent(this.currentChapter, 1);
          }
        }
        let start;
        if (page == 1) {
          start = 348;
        } else {
          start = (page - 1) * 348 + 348;
        }
        console.log(start);
        const end = start + 348;
        const pageContent = this.html.substring(start, end);
        this.chapterContent = pageContent;
        this.paragraphsPerPage++;
        this.currentContent = pageContent;
      }
    },
    changback(num) {
      const element = this.$refs.body;
      if (num == 1) {
        element.className = "fff";
      } else if (num == 2) {
        element.className = "ant";
      } else if (num == 3) {
        element.className = "grey";
      }
    }
  },
  // },
  computed: {
    progress() {
      if (this.totilpage === 0) {
        return 0;
      }
      return (this.paragraphsPerPage / this.totilpage * 100).toFixed(2);
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
    a: $data.currentContent,
    b: $data.pageNum === 0
  }, $data.pageNum === 0 ? {
    c: common_vendor.f($data.chapternum, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.getcontent(index, 1), index),
        c: index
      };
    })
  } : {}, {
    d: $data.pageNum === 1
  }, $data.pageNum === 1 ? {
    e: `${$options.progress}%`,
    f: common_vendor.t($options.progress)
  } : {}, {
    g: $data.pageNum === 2
  }, $data.pageNum === 2 ? {
    h: common_vendor.o(($event) => $options.changback(1)),
    i: common_vendor.o(($event) => $options.changback(2)),
    j: common_vendor.o(($event) => $options.changback(3))
  } : {}, {
    k: common_vendor.f($data.nav_types, (item, index, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: common_vendor.o(($event) => $options.setPageNum(index))
      };
    }),
    l: common_vendor.p({
      show: $data.show
    }),
    m: common_vendor.o(($event) => $data.show = !$data.show),
    n: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    o: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    p: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/content/content.vue"]]);
wx.createPage(MiniProgramPage);
