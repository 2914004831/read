"use strict";
const common_vendor = require("./common/vendor.js");
function routingIntercept(to, from, next) {
  const token = common_vendor.index.getStorageSync("token");
  if (!token || token == null || token == "") {
    common_vendor.index.showToast({
      title: "请先登录",
      icon: "none"
    });
    common_vendor.index.redirectTo({
      url: "/pages/index/index"
      // 请根据实际路由路径进行调整
    });
  } else {
    next();
  }
}
exports.routingIntercept = routingIntercept;
