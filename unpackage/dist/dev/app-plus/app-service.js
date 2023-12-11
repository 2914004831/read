if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const base_url = "https://7888k0724y.zicp.fun/";
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$A = {
    data() {
      return {
        password: "",
        username: "",
        show: false,
        mesg: "",
        color: true
      };
    },
    watch: {
      password() {
      },
      username() {
      }
    },
    onLoad() {
    },
    methods: {
      gotoRes() {
        uni.navigateTo({
          url: "/pages/register/register"
        });
      },
      gotoIndex() {
        uni.request({
          url: ""
        });
        uni.switchTab({
          url: "/pages/main/main"
        });
      },
      async login() {
        const that = this;
        try {
          formatAppLog("log", "at pages/index/index.vue:75", "ahahah");
          const response = await uni.request({
            url: base_url + "/user/loginuser",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            data: {
              // 请求参数
              username: that.username,
              pwd: that.password
            }
          });
          if (response.data.code === 200) {
            formatAppLog("log", "at pages/index/index.vue:87", response);
            uni.setStorageSync("name", response.data.data.data);
            uni.setStorageSync("token", response.data.data.token);
            this.mesg = response.data.message;
            uni.showToast({
              title: "登录成功",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
            this.password = "";
            this.username = "";
            uni.switchTab({
              url: "/pages/main/main"
            });
          } else {
            uni.showToast({
              title: "账号或者密码错误",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
          }
        } catch (error2) {
          formatAppLog("log", "at pages/index/index.vue:111", error2);
          uni.showToast({
            title: "服务器错误",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
        }
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", {
          class: "content",
          style: { "background-color": "#f9f9f9", "width": "100vw", "height": "100vh" }
        }, [
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("view", {
              class: "",
              style: { "display": "flex", "justify-content": "center", "align-items": "center", "padding": "25% 0 5% 0" }
            }, [
              vue.createElementVNode("text", { style: { "font-size": "24px" } }, "红色阅读app")
            ]),
            vue.createElementVNode("view", { class: "input_content" }, [
              vue.createElementVNode("view", { class: "input" }, [
                vue.createElementVNode("text", { class: "text" }, "账号："),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "info",
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                    placeholder: "请输入账号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.username]
                ])
              ]),
              vue.createElementVNode("view", { class: "input" }, [
                vue.createElementVNode("text", { class: "text" }, "密码："),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "password",
                    class: "info",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
                    placeholder: "请输入密码"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.password]
                ])
              ]),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: _cache[2] || (_cache[2] = ($event) => $options.login())
                }, "登录")
              ]),
              vue.createElementVNode("view", { style: { "margin-top": "10px" } }, [
                vue.createElementVNode("text", {
                  style: { "font-size": "12px" },
                  class: "gotoRes",
                  onClick: _cache[3] || (_cache[3] = ($event) => $options.gotoRes())
                }, " 还没有注册？点击我注册 ")
              ])
            ])
          ])
        ]),
        $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass($data.color ? "success" : "erro"),
            style: { "position": "fixed", "padding": "0.6rem", "color": "#ffffff", "border-radius": "0.2rem", "top": "2rem", "left": "30%" }
          },
          vue.toDisplayString($data.mesg),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/before/Project/uniApp/pages/index/index.vue"]]);
  const _sfc_main$z = {
    data() {
      return {
        password: "",
        password1: "",
        username: "",
        show: false,
        mesg: "",
        color: true
      };
    },
    watch: {
      password() {
        formatAppLog("log", "at pages/register/register.vue:52", this.password.length);
      },
      username() {
      }
    },
    onLoad() {
    },
    methods: {
      checkpwd() {
        if (this.username != "") {
          if (this.password == this.password1) {
            if (this.password.length >= 6) {
              return true;
            } else {
              this.show = true;
              this.color = false;
              this.mesg = "密码格式错误";
              setTimeout(() => {
                this.show = false;
              }, 1500);
              return false;
            }
          } else {
            this.show = true;
            this.color = false;
            this.mesg = "密码不一致";
            setTimeout(() => {
              this.show = false;
            }, 800);
            return false;
          }
        } else {
          this.show = true;
          this.color = false;
          this.mesg = "账号不能为空";
          setTimeout(() => {
            this.show = false;
          }, 800);
          return false;
        }
      },
      async register() {
        const that = this;
        try {
          if (that.checkpwd()) {
            const response = await uni.request({
              url: base_url + "/user/register",
              // 替换为实际的 API 地址
              method: "POST",
              // 请求方法，可以是 'GET'、'POST' 等
              data: {
                // 请求参数
                username: that.username,
                pwd: that.password,
                role: 0
              }
            });
            formatAppLog("log", "at pages/register/register.vue:111", response);
            if (response.data.code === 200) {
              this.show = true;
              this.color = true;
              this.mesg = response.data.message;
              setTimeout(() => {
                this.show = false;
              }, 800);
              this.password = "";
              this.username = "";
              this.password1 = "";
            } else {
              this.show = true;
              this.color = false;
              this.mesg = response.data.message;
              setTimeout(() => {
                this.show = false;
              }, 800);
            }
          } else {
          }
        } catch (error2) {
          this.show = true;
          this.color = false;
          this.mesg = error2.message;
          setTimeout(() => {
            this.show = false;
          }, 800);
        }
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode("view", { class: "body" }, [
            vue.createElementVNode("view", {
              class: "",
              style: { "display": "flex", "justify-content": "center", "align-items": "center", "margin": "25% 0 5% 0" }
            }, [
              vue.createElementVNode("text", { style: { "font-size": "24px" } }, "红色阅读app")
            ]),
            vue.createElementVNode("view", { class: "input_content" }, [
              vue.createElementVNode("view", { class: "input" }, [
                vue.createElementVNode("text", { class: "text" }, "账号："),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "info",
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                    placeholder: "请输入账号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.username]
                ])
              ]),
              vue.createElementVNode("view", { class: "input" }, [
                vue.createElementVNode("text", { class: "text" }, "密码："),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "password",
                    class: "info",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
                    placeholder: "请输入密码 密码至少六位"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.password]
                ])
              ]),
              vue.createElementVNode("view", { class: "input" }, [
                vue.createElementVNode("text", { class: "text" }, "确认密码："),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "password",
                    class: "info",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password1 = $event),
                    placeholder: "请再次输入密码"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.password1]
                ])
              ]),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("button", {
                  class: "btn",
                  onClick: _cache[3] || (_cache[3] = ($event) => $options.register())
                }, "注册")
              ])
            ])
          ])
        ]),
        $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass($data.color ? "success" : "erro"),
            style: { "position": "fixed", "padding": "0.6rem", "color": "#ffffff", "border-radius": "0.2rem", "top": "3rem", "left": "35%" }
          },
          vue.toDisplayString($data.mesg),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-bac4a35d"], ["__file", "D:/before/Project/uniApp/pages/register/register.vue"]]);
  const icons = {
    "uicon-level": "",
    "uicon-column-line": "",
    "uicon-checkbox-mark": "",
    "uicon-folder": "",
    "uicon-movie": "",
    "uicon-star-fill": "",
    "uicon-star": "",
    "uicon-phone-fill": "",
    "uicon-phone": "",
    "uicon-apple-fill": "",
    "uicon-chrome-circle-fill": "",
    "uicon-backspace": "",
    "uicon-attach": "",
    "uicon-cut": "",
    "uicon-empty-car": "",
    "uicon-empty-coupon": "",
    "uicon-empty-address": "",
    "uicon-empty-favor": "",
    "uicon-empty-permission": "",
    "uicon-empty-news": "",
    "uicon-empty-search": "",
    "uicon-github-circle-fill": "",
    "uicon-rmb": "",
    "uicon-person-delete-fill": "",
    "uicon-reload": "",
    "uicon-order": "",
    "uicon-server-man": "",
    "uicon-search": "",
    "uicon-fingerprint": "",
    "uicon-more-dot-fill": "",
    "uicon-scan": "",
    "uicon-share-square": "",
    "uicon-map": "",
    "uicon-map-fill": "",
    "uicon-tags": "",
    "uicon-tags-fill": "",
    "uicon-bookmark-fill": "",
    "uicon-bookmark": "",
    "uicon-eye": "",
    "uicon-eye-fill": "",
    "uicon-mic": "",
    "uicon-mic-off": "",
    "uicon-calendar": "",
    "uicon-calendar-fill": "",
    "uicon-trash": "",
    "uicon-trash-fill": "",
    "uicon-play-left": "",
    "uicon-play-right": "",
    "uicon-minus": "",
    "uicon-plus": "",
    "uicon-info": "",
    "uicon-info-circle": "",
    "uicon-info-circle-fill": "",
    "uicon-question": "",
    "uicon-error": "",
    "uicon-close": "",
    "uicon-checkmark": "",
    "uicon-android-circle-fill": "",
    "uicon-android-fill": "",
    "uicon-ie": "",
    "uicon-IE-circle-fill": "",
    "uicon-google": "",
    "uicon-google-circle-fill": "",
    "uicon-setting-fill": "",
    "uicon-setting": "",
    "uicon-minus-square-fill": "",
    "uicon-plus-square-fill": "",
    "uicon-heart": "",
    "uicon-heart-fill": "",
    "uicon-camera": "",
    "uicon-camera-fill": "",
    "uicon-more-circle": "",
    "uicon-more-circle-fill": "",
    "uicon-chat": "",
    "uicon-chat-fill": "",
    "uicon-bag-fill": "",
    "uicon-bag": "",
    "uicon-error-circle-fill": "",
    "uicon-error-circle": "",
    "uicon-close-circle": "",
    "uicon-close-circle-fill": "",
    "uicon-checkmark-circle": "",
    "uicon-checkmark-circle-fill": "",
    "uicon-question-circle-fill": "",
    "uicon-question-circle": "",
    "uicon-share": "",
    "uicon-share-fill": "",
    "uicon-shopping-cart": "",
    "uicon-shopping-cart-fill": "",
    "uicon-bell": "",
    "uicon-bell-fill": "",
    "uicon-list": "",
    "uicon-list-dot": "",
    "uicon-zhihu": "",
    "uicon-zhihu-circle-fill": "",
    "uicon-zhifubao": "",
    "uicon-zhifubao-circle-fill": "",
    "uicon-weixin-circle-fill": "",
    "uicon-weixin-fill": "",
    "uicon-twitter-circle-fill": "",
    "uicon-twitter": "",
    "uicon-taobao-circle-fill": "",
    "uicon-taobao": "",
    "uicon-weibo-circle-fill": "",
    "uicon-weibo": "",
    "uicon-qq-fill": "",
    "uicon-qq-circle-fill": "",
    "uicon-moments-circel-fill": "",
    "uicon-moments": "",
    "uicon-qzone": "",
    "uicon-qzone-circle-fill": "",
    "uicon-baidu-circle-fill": "",
    "uicon-baidu": "",
    "uicon-facebook-circle-fill": "",
    "uicon-facebook": "",
    "uicon-car": "",
    "uicon-car-fill": "",
    "uicon-warning-fill": "",
    "uicon-warning": "",
    "uicon-clock-fill": "",
    "uicon-clock": "",
    "uicon-edit-pen": "",
    "uicon-edit-pen-fill": "",
    "uicon-email": "",
    "uicon-email-fill": "",
    "uicon-minus-circle": "",
    "uicon-minus-circle-fill": "",
    "uicon-plus-circle": "",
    "uicon-plus-circle-fill": "",
    "uicon-file-text": "",
    "uicon-file-text-fill": "",
    "uicon-pushpin": "",
    "uicon-pushpin-fill": "",
    "uicon-grid": "",
    "uicon-grid-fill": "",
    "uicon-play-circle": "",
    "uicon-play-circle-fill": "",
    "uicon-pause-circle-fill": "",
    "uicon-pause": "",
    "uicon-pause-circle": "",
    "uicon-eye-off": "",
    "uicon-eye-off-outline": "",
    "uicon-gift-fill": "",
    "uicon-gift": "",
    "uicon-rmb-circle-fill": "",
    "uicon-rmb-circle": "",
    "uicon-kefu-ermai": "",
    "uicon-server-fill": "",
    "uicon-coupon-fill": "",
    "uicon-coupon": "",
    "uicon-integral": "",
    "uicon-integral-fill": "",
    "uicon-home-fill": "",
    "uicon-home": "",
    "uicon-hourglass-half-fill": "",
    "uicon-hourglass": "",
    "uicon-account": "",
    "uicon-plus-people-fill": "",
    "uicon-minus-people-fill": "",
    "uicon-account-fill": "",
    "uicon-thumb-down-fill": "",
    "uicon-thumb-down": "",
    "uicon-thumb-up": "",
    "uicon-thumb-up-fill": "",
    "uicon-lock-fill": "",
    "uicon-lock-open": "",
    "uicon-lock-opened-fill": "",
    "uicon-lock": "",
    "uicon-red-packet-fill": "",
    "uicon-photo-fill": "",
    "uicon-photo": "",
    "uicon-volume-off-fill": "",
    "uicon-volume-off": "",
    "uicon-volume-fill": "",
    "uicon-volume": "",
    "uicon-red-packet": "",
    "uicon-download": "",
    "uicon-arrow-up-fill": "",
    "uicon-arrow-down-fill": "",
    "uicon-play-left-fill": "",
    "uicon-play-right-fill": "",
    "uicon-rewind-left-fill": "",
    "uicon-rewind-right-fill": "",
    "uicon-arrow-downward": "",
    "uicon-arrow-leftward": "",
    "uicon-arrow-rightward": "",
    "uicon-arrow-upward": "",
    "uicon-arrow-down": "",
    "uicon-arrow-right": "",
    "uicon-arrow-left": "",
    "uicon-arrow-up": "",
    "uicon-skip-back-left": "",
    "uicon-skip-forward-right": "",
    "uicon-rewind-right": "",
    "uicon-rewind-left": "",
    "uicon-arrow-right-double": "",
    "uicon-arrow-left-double": "",
    "uicon-wifi-off": "",
    "uicon-wifi": "",
    "uicon-empty-data": "",
    "uicon-empty-history": "",
    "uicon-empty-list": "",
    "uicon-empty-page": "",
    "uicon-empty-order": "",
    "uicon-man": "",
    "uicon-woman": "",
    "uicon-man-add": "",
    "uicon-man-add-fill": "",
    "uicon-man-delete": "",
    "uicon-man-delete-fill": "",
    "uicon-zh": "",
    "uicon-en": ""
  };
  const version = "3";
  {
    formatAppLog("log", "at uni_modules/uview-plus/libs/config/config.js:5", `
 %c uview-plus V${version} %c https://ijry.github.io/uview-plus/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
  }
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ],
    // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
    color: {
      "u-primary": "#2979ff",
      "u-warning": "#ff9900",
      "u-success": "#19be6b",
      "u-error": "#fa3534",
      "u-info": "#909399",
      "u-main-color": "#303133",
      "u-content-color": "#606266",
      "u-tips-color": "#909399",
      "u-light-color": "#c0c4cc"
    },
    // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
    unit: "px"
  };
  const ActionSheet = {
    // action-sheet组件
    actionSheet: {
      show: false,
      title: "",
      description: "",
      actions: () => [],
      index: "",
      cancelText: "",
      closeOnClickAction: true,
      safeAreaInsetBottom: true,
      openType: "",
      closeOnClickOverlay: true,
      round: 0
    }
  };
  const Album = {
    // album 组件
    album: {
      urls: () => [],
      keyName: "",
      singleSize: 180,
      multipleSize: 70,
      space: 6,
      singleMode: "scaleToFill",
      multipleMode: "aspectFill",
      maxCount: 9,
      previewFullImage: true,
      rowCount: 3,
      showMore: true
    }
  };
  const Alert = {
    // alert警告组件
    alert: {
      title: "",
      type: "warning",
      description: "",
      closable: false,
      showIcon: false,
      effect: "light",
      center: false,
      fontSize: 14
    }
  };
  const Avatar = {
    // avatar 组件
    avatar: {
      src: "",
      shape: "circle",
      size: 40,
      mode: "scaleToFill",
      text: "",
      bgColor: "#c0c4cc",
      color: "#ffffff",
      fontSize: 18,
      icon: "",
      mpAvatar: false,
      randomBgColor: false,
      defaultUrl: "",
      colorIndex: "",
      name: ""
    }
  };
  const AvatarGroup = {
    // avatarGroup 组件
    avatarGroup: {
      urls: () => [],
      maxCount: 5,
      shape: "circle",
      mode: "scaleToFill",
      showMore: true,
      size: 40,
      keyName: "",
      gap: 0.5,
      extraValue: 0
    }
  };
  const Backtop = {
    // backtop组件
    backtop: {
      mode: "circle",
      icon: "arrow-upward",
      text: "",
      duration: 100,
      scrollTop: 0,
      top: 400,
      bottom: 100,
      right: 20,
      zIndex: 9,
      iconStyle: () => ({
        color: "#909399",
        fontSize: "19px"
      })
    }
  };
  const Badge = {
    // 徽标数组件
    badge: {
      isDot: false,
      value: "",
      show: true,
      max: 999,
      type: "error",
      showZero: false,
      bgColor: null,
      color: null,
      shape: "circle",
      numberType: "overflow",
      offset: () => [],
      inverted: false,
      absolute: false
    }
  };
  const Button = {
    // button组件
    button: {
      hairline: false,
      type: "info",
      size: "normal",
      shape: "square",
      plain: false,
      disabled: false,
      loading: false,
      loadingText: "",
      loadingMode: "spinner",
      loadingSize: 15,
      openType: "",
      formType: "",
      appParameter: "",
      hoverStopPropagation: true,
      lang: "en",
      sessionFrom: "",
      sendMessageTitle: "",
      sendMessagePath: "",
      sendMessageImg: "",
      showMessageCard: false,
      dataName: "",
      throttleTime: 0,
      hoverStartTime: 0,
      hoverStayTime: 200,
      text: "",
      icon: "",
      iconColor: "",
      color: ""
    }
  };
  const Calendar = {
    // calendar 组件
    calendar: {
      title: "日期选择",
      showTitle: true,
      showSubtitle: true,
      mode: "single",
      startText: "开始",
      endText: "结束",
      customList: () => [],
      color: "#3c9cff",
      minDate: 0,
      maxDate: 0,
      defaultDate: null,
      maxCount: Number.MAX_SAFE_INTEGER,
      // Infinity
      rowHeight: 56,
      formatter: null,
      showLunar: false,
      showMark: true,
      confirmText: "确定",
      confirmDisabledText: "确定",
      show: false,
      closeOnClickOverlay: false,
      readonly: false,
      showConfirm: true,
      maxRange: Number.MAX_SAFE_INTEGER,
      // Infinity
      rangePrompt: "",
      showRangePrompt: true,
      allowSameDay: false,
      round: 0,
      monthNum: 3
    }
  };
  const CarKeyboard = {
    // 车牌号键盘
    carKeyboard: {
      random: false
    }
  };
  const Cell = {
    // cell组件的props
    cell: {
      customClass: "",
      title: "",
      label: "",
      value: "",
      icon: "",
      disabled: false,
      border: true,
      center: false,
      url: "",
      linkType: "navigateTo",
      clickable: false,
      isLink: false,
      required: false,
      arrowDirection: "",
      iconStyle: {},
      rightIconStyle: {},
      rightIcon: "arrow-right",
      titleStyle: {},
      size: "",
      stop: true,
      name: ""
    }
  };
  const CellGroup = {
    // cell-group组件的props
    cellGroup: {
      title: "",
      border: true,
      customStyle: {}
    }
  };
  const Checkbox = {
    // checkbox组件
    checkbox: {
      name: "",
      shape: "",
      size: "",
      checkbox: false,
      disabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      iconColor: "",
      label: "",
      labelSize: "",
      labelColor: "",
      labelDisabled: ""
    }
  };
  const CheckboxGroup = {
    // checkbox-group组件
    checkboxGroup: {
      name: "",
      value: () => [],
      shape: "square",
      disabled: false,
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      size: 18,
      placement: "row",
      labelSize: 14,
      labelColor: "#303133",
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      iconPlacement: "left",
      borderBottom: false
    }
  };
  const CircleProgress = {
    // circleProgress 组件
    circleProgress: {
      percentage: 30
    }
  };
  const Code = {
    // code 组件
    code: {
      seconds: 60,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
      keepRunning: false,
      uniqueKey: ""
    }
  };
  const CodeInput = {
    // codeInput 组件
    codeInput: {
      adjustPosition: true,
      maxlength: 6,
      dot: false,
      mode: "box",
      hairline: false,
      space: 10,
      value: "",
      focus: false,
      bold: false,
      color: "#606266",
      fontSize: 18,
      size: 35,
      disabledKeyboard: false,
      borderColor: "#c9cacc",
      disabledDot: true
    }
  };
  const Col = {
    // col 组件
    col: {
      span: 12,
      offset: 0,
      justify: "start",
      align: "stretch",
      textAlign: "left"
    }
  };
  const Collapse = {
    // collapse 组件
    collapse: {
      value: null,
      accordion: false,
      border: true
    }
  };
  const CollapseItem = {
    // collapseItem 组件
    collapseItem: {
      title: "",
      value: "",
      label: "",
      disabled: false,
      isLink: true,
      clickable: true,
      border: true,
      align: "left",
      name: "",
      icon: "",
      duration: 300
    }
  };
  const ColumnNotice = {
    // columnNotice 组件
    columnNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80,
      step: false,
      duration: 1500,
      disableTouch: true
    }
  };
  const CountDown = {
    // u-count-down 计时器组件
    countDown: {
      time: 0,
      format: "HH:mm:ss",
      autoStart: true,
      millisecond: false
    }
  };
  const CountTo = {
    // countTo 组件
    countTo: {
      startVal: 0,
      endVal: 0,
      duration: 2e3,
      autoplay: true,
      decimals: 0,
      useEasing: true,
      decimal: ".",
      color: "#606266",
      fontSize: 22,
      bold: false,
      separator: ""
    }
  };
  const DatetimePicker = {
    // datetimePicker 组件
    datetimePicker: {
      show: false,
      showToolbar: true,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      closeOnClickOverlay: false,
      defaultIndex: () => []
    }
  };
  const Divider = {
    // divider组件
    divider: {
      dashed: false,
      hairline: true,
      dot: false,
      textPosition: "center",
      text: "",
      textSize: 14,
      textColor: "#909399",
      lineColor: "#dcdfe6"
    }
  };
  const Empty = {
    // empty组件
    empty: {
      icon: "",
      text: "",
      textColor: "#c0c4cc",
      textSize: 14,
      iconColor: "#c0c4cc",
      iconSize: 90,
      mode: "data",
      width: 160,
      height: 160,
      show: true,
      marginTop: 0
    }
  };
  const Form = {
    // form 组件
    form: {
      model: () => ({}),
      rules: () => ({}),
      errorType: "message",
      borderBottom: true,
      labelPosition: "left",
      labelWidth: 45,
      labelAlign: "left",
      labelStyle: () => ({})
    }
  };
  const GormItem = {
    // formItem 组件
    formItem: {
      label: "",
      prop: "",
      borderBottom: "",
      labelWidth: "",
      rightIcon: "",
      leftIcon: "",
      required: false,
      leftIconStyle: ""
    }
  };
  const Gap = {
    // gap组件
    gap: {
      bgColor: "transparent",
      height: 20,
      marginTop: 0,
      marginBottom: 0,
      customStyle: {}
    }
  };
  const Grid = {
    // grid组件
    grid: {
      col: 3,
      border: false,
      align: "left"
    }
  };
  const GridItem = {
    // grid-item组件
    gridItem: {
      name: null,
      bgColor: "transparent"
    }
  };
  const {
    color: color$3
  } = config;
  const Icon = {
    // icon组件
    icon: {
      name: "",
      color: color$3["u-content-color"],
      size: "16px",
      bold: false,
      index: "",
      hoverClass: "",
      customPrefix: "uicon",
      label: "",
      labelPos: "right",
      labelSize: "15px",
      labelColor: color$3["u-content-color"],
      space: "3px",
      imgMode: "",
      width: "",
      height: "",
      top: 0,
      stop: false
    }
  };
  const Image = {
    // image组件
    image: {
      src: "",
      mode: "aspectFill",
      width: "300",
      height: "225",
      shape: "square",
      radius: 0,
      lazyLoad: true,
      showMenuByLongpress: true,
      loadingIcon: "photo",
      errorIcon: "error-circle",
      showLoading: true,
      showError: true,
      fade: true,
      webp: false,
      duration: 500,
      bgColor: "#f3f4f6"
    }
  };
  const IndexAnchor = {
    // indexAnchor 组件
    indexAnchor: {
      text: "",
      color: "#606266",
      size: 14,
      bgColor: "#dedede",
      height: 32
    }
  };
  const IndexList = {
    // indexList 组件
    indexList: {
      inactiveColor: "#606266",
      activeColor: "#5677fc",
      indexList: () => [],
      sticky: true,
      customNavHeight: 0
    }
  };
  const Input = {
    // index 组件
    input: {
      value: "",
      type: "text",
      fixed: false,
      disabled: false,
      disabledColor: "#f5f7fa",
      clearable: false,
      password: false,
      maxlength: -1,
      placeholder: null,
      placeholderClass: "input-placeholder",
      placeholderStyle: "color: #c0c4cc",
      showWordLimit: false,
      confirmType: "done",
      confirmHold: false,
      holdKeyboard: false,
      focus: false,
      autoBlur: false,
      disableDefaultPadding: false,
      cursor: -1,
      cursorSpacing: 30,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      inputAlign: "left",
      fontSize: "15px",
      color: "#303133",
      prefixIcon: "",
      prefixIconStyle: "",
      suffixIcon: "",
      suffixIconStyle: "",
      border: "surround",
      readonly: false,
      shape: "square",
      formatter: null
    }
  };
  const Keyboard = {
    // 键盘组件
    keyboard: {
      mode: "number",
      dotDisabled: false,
      tooltip: true,
      showTips: true,
      tips: "",
      showCancel: true,
      showConfirm: true,
      random: false,
      safeAreaInsetBottom: true,
      closeOnClickOverlay: true,
      show: false,
      overlay: true,
      zIndex: 10075,
      cancelText: "取消",
      confirmText: "确定",
      autoChange: false
    }
  };
  const Line = {
    // line组件
    line: {
      color: "#d6d7d9",
      length: "100%",
      direction: "row",
      hairline: true,
      margin: 0,
      dashed: false
    }
  };
  const LineProgress = {
    // lineProgress 组件
    lineProgress: {
      activeColor: "#19be6b",
      inactiveColor: "#ececec",
      percentage: 0,
      showText: true,
      height: 12
    }
  };
  const {
    color: color$2
  } = config;
  const Link = {
    // link超链接组件props参数
    link: {
      color: color$2["u-primary"],
      fontSize: 15,
      underLine: false,
      href: "",
      mpTips: "链接已复制，请在浏览器打开",
      lineColor: "",
      text: ""
    }
  };
  const List = {
    // list 组件
    list: {
      showScrollbar: false,
      lowerThreshold: 50,
      upperThreshold: 0,
      scrollTop: 0,
      offsetAccuracy: 10,
      enableFlex: false,
      pagingEnabled: false,
      scrollable: true,
      scrollIntoView: "",
      scrollWithAnimation: false,
      enableBackToTop: false,
      height: 0,
      width: 0,
      preLoadScreen: 1
    }
  };
  const ListItem = {
    // listItem 组件
    listItem: {
      anchor: ""
    }
  };
  const {
    color: color$1
  } = config;
  const LoadingIcon = {
    // loading-icon加载中图标组件
    loadingIcon: {
      show: true,
      color: color$1["u-tips-color"],
      textColor: color$1["u-tips-color"],
      vertical: false,
      mode: "spinner",
      size: 24,
      textSize: 15,
      text: "",
      timingFunction: "ease-in-out",
      duration: 1200,
      inactiveColor: ""
    }
  };
  const LoadingPage = {
    // loading-page组件
    loadingPage: {
      loadingText: "正在加载",
      image: "",
      loadingMode: "circle",
      loading: false,
      bgColor: "#ffffff",
      color: "#C8C8C8",
      fontSize: 19,
      iconSize: 28,
      loadingColor: "#C8C8C8"
    }
  };
  const Loadmore = {
    // loadmore 组件
    loadmore: {
      status: "loadmore",
      bgColor: "transparent",
      icon: true,
      fontSize: 14,
      iconSize: 17,
      color: "#606266",
      loadingIcon: "spinner",
      loadmoreText: "加载更多",
      loadingText: "正在加载...",
      nomoreText: "没有更多了",
      isDot: false,
      iconColor: "#b7b7b7",
      marginTop: 10,
      marginBottom: 10,
      height: "auto",
      line: false,
      lineColor: "#E6E8EB",
      dashed: false
    }
  };
  const Modal = {
    // modal 组件
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "确认",
      cancelText: "取消",
      showConfirmButton: true,
      showCancelButton: false,
      confirmColor: "#2979ff",
      cancelColor: "#606266",
      buttonReverse: false,
      zoom: true,
      asyncClose: false,
      closeOnClickOverlay: false,
      negativeTop: 0,
      width: "650rpx",
      confirmButtonShape: ""
    }
  };
  const color = {
    primary: "#3c9cff",
    info: "#909399",
    default: "#909399",
    warning: "#f9ae3d",
    error: "#f56c6c",
    success: "#5ac725",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  const Navbar = {
    // navbar 组件
    navbar: {
      safeAreaInsetTop: true,
      placeholder: false,
      fixed: true,
      border: false,
      leftIcon: "arrow-left",
      leftText: "",
      rightText: "",
      rightIcon: "",
      title: "",
      bgColor: "#ffffff",
      titleWidth: "400rpx",
      height: "44px",
      leftIconSize: 20,
      leftIconColor: color.mainColor,
      autoBack: false,
      titleStyle: ""
    }
  };
  const NoNetwork = {
    // noNetwork
    noNetwork: {
      tips: "哎呀，网络信号丢失",
      zIndex: "",
      image: "data:image/png;base64,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"
    }
  };
  const NoticeBar = {
    // noticeBar
    noticeBar: {
      text: () => [],
      direction: "row",
      step: false,
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      speed: 80,
      fontSize: 14,
      duration: 2e3,
      disableTouch: true,
      url: "",
      linkType: "navigateTo"
    }
  };
  const Notify = {
    // notify组件
    notify: {
      top: 0,
      type: "primary",
      color: "#ffffff",
      bgColor: "",
      message: "",
      duration: 3e3,
      fontSize: 15,
      safeAreaInsetTop: false
    }
  };
  const NumberBox = {
    // 步进器组件
    numberBox: {
      name: "",
      value: 0,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      integer: false,
      disabled: false,
      disabledInput: false,
      asyncChange: false,
      inputWidth: 35,
      showMinus: true,
      showPlus: true,
      decimalLength: null,
      longPress: true,
      color: "#323233",
      buttonSize: 30,
      bgColor: "#EBECEE",
      cursorSpacing: 100,
      disableMinus: false,
      disablePlus: false,
      iconStyle: ""
    }
  };
  const NumberKeyboard = {
    // 数字键盘
    numberKeyboard: {
      mode: "number",
      dotDisabled: false,
      random: false
    }
  };
  const Overlay = {
    // overlay组件
    overlay: {
      show: false,
      zIndex: 10070,
      duration: 300,
      opacity: 0.5
    }
  };
  const Parse = {
    // parse
    parse: {
      copyLink: true,
      errorImg: "",
      lazyLoad: false,
      loadingImg: "",
      pauseVideo: true,
      previewImg: true,
      setTitle: true,
      showImgMenu: true
    }
  };
  const Picker = {
    // picker
    picker: {
      show: false,
      showToolbar: true,
      title: "",
      columns: () => [],
      loading: false,
      itemHeight: 44,
      cancelText: "取消",
      confirmText: "确定",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      visibleItemCount: 5,
      keyName: "text",
      closeOnClickOverlay: false,
      defaultIndex: () => [],
      immediateChange: false
    }
  };
  const Popup = {
    // popup组件
    popup: {
      show: false,
      overlay: true,
      mode: "bottom",
      duration: 300,
      closeable: false,
      overlayStyle: () => {
      },
      closeOnClickOverlay: true,
      zIndex: 10075,
      safeAreaInsetBottom: true,
      safeAreaInsetTop: false,
      closeIconPos: "top-right",
      round: 0,
      zoom: true,
      bgColor: "",
      overlayOpacity: 0.5
    }
  };
  const Radio = {
    // radio组件
    radio: {
      name: "",
      shape: "",
      disabled: "",
      labelDisabled: "",
      activeColor: "",
      inactiveColor: "",
      iconSize: "",
      labelSize: "",
      label: "",
      labelColor: "",
      size: "",
      iconColor: "",
      placement: ""
    }
  };
  const RadioGroup = {
    // radio-group组件
    radioGroup: {
      value: "",
      disabled: false,
      shape: "circle",
      activeColor: "#2979ff",
      inactiveColor: "#c8c9cc",
      name: "",
      size: 18,
      placement: "row",
      label: "",
      labelColor: "#303133",
      labelSize: 14,
      labelDisabled: false,
      iconColor: "#ffffff",
      iconSize: 12,
      borderBottom: false,
      iconPlacement: "left"
    }
  };
  const Rate = {
    // rate组件
    rate: {
      value: 1,
      count: 5,
      disabled: false,
      size: 18,
      inactiveColor: "#b2b2b2",
      activeColor: "#FA3534",
      gutter: 4,
      minCount: 1,
      allowHalf: false,
      activeIcon: "star-fill",
      inactiveIcon: "star",
      touchable: true
    }
  };
  const ReadMore = {
    // readMore
    readMore: {
      showHeight: 400,
      toggle: false,
      closeText: "展开阅读全文",
      openText: "收起",
      color: "#2979ff",
      fontSize: 14,
      textIndent: "2em",
      name: ""
    }
  };
  const Row = {
    // row
    row: {
      gutter: 0,
      justify: "start",
      align: "center"
    }
  };
  const RowNotice = {
    // rowNotice
    rowNotice: {
      text: "",
      icon: "volume",
      mode: "",
      color: "#f9ae3d",
      bgColor: "#fdf6ec",
      fontSize: 14,
      speed: 80
    }
  };
  const ScrollList = {
    // scrollList
    scrollList: {
      indicatorWidth: 50,
      indicatorBarWidth: 20,
      indicator: true,
      indicatorColor: "#f2f2f2",
      indicatorActiveColor: "#3c9cff",
      indicatorStyle: ""
    }
  };
  const Search = {
    // search
    search: {
      shape: "round",
      bgColor: "#f2f2f2",
      placeholder: "请输入关键字",
      clearabled: true,
      focus: false,
      showAction: true,
      actionStyle: () => ({}),
      actionText: "搜索",
      inputAlign: "left",
      inputStyle: () => ({}),
      disabled: false,
      borderColor: "transparent",
      searchIconColor: "#909399",
      searchIconSize: 22,
      color: "#606266",
      placeholderColor: "#909399",
      searchIcon: "search",
      margin: "0",
      animation: false,
      value: "",
      maxlength: "-1",
      height: 32,
      label: null
    }
  };
  const Section = {
    // u-section组件
    section: {
      title: "",
      subTitle: "更多",
      right: true,
      fontSize: 15,
      bold: true,
      color: "#303133",
      subColor: "#909399",
      showLine: true,
      lineColor: "",
      arrow: true
    }
  };
  const Skeleton = {
    // skeleton
    skeleton: {
      loading: true,
      animate: true,
      rows: 0,
      rowsWidth: "100%",
      rowsHeight: 18,
      title: true,
      titleWidth: "50%",
      titleHeight: 18,
      avatar: false,
      avatarSize: 32,
      avatarShape: "circle"
    }
  };
  const Slider = {
    // slider组件
    slider: {
      value: 0,
      blockSize: 18,
      min: 0,
      max: 100,
      step: 1,
      activeColor: "#2979ff",
      inactiveColor: "#c0c4cc",
      blockColor: "#ffffff",
      showValue: false,
      disabled: false,
      blockStyle: () => {
      }
    }
  };
  const StatusBar = {
    // statusBar
    statusBar: {
      bgColor: "transparent"
    }
  };
  const Steps = {
    // steps组件
    steps: {
      direction: "row",
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#969799",
      activeIcon: "",
      inactiveIcon: "",
      dot: false
    }
  };
  const StepsItem = {
    // steps-item组件
    stepsItem: {
      title: "",
      desc: "",
      iconSize: 17,
      error: false
    }
  };
  const Sticky = {
    // sticky组件
    sticky: {
      offsetTop: 0,
      customNavHeight: 0,
      disabled: false,
      bgColor: "transparent",
      zIndex: "",
      index: ""
    }
  };
  const Subsection = {
    // subsection组件
    subsection: {
      list: [],
      current: 0,
      activeColor: "#3c9cff",
      inactiveColor: "#303133",
      mode: "button",
      fontSize: 12,
      bold: true,
      bgColor: "#eeeeef",
      keyName: "name"
    }
  };
  const SwipeAction = {
    // swipe-action组件
    swipeAction: {
      autoClose: true
    }
  };
  const SwipeActionItem = {
    // swipeActionItem 组件
    swipeActionItem: {
      show: false,
      name: "",
      disabled: false,
      threshold: 20,
      autoClose: true,
      options: [],
      duration: 300
    }
  };
  const Swiper = {
    // swiper 组件
    swiper: {
      list: () => [],
      indicator: false,
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      indicatorStyle: "",
      indicatorMode: "line",
      autoplay: true,
      current: 0,
      currentItemId: "",
      interval: 3e3,
      duration: 300,
      circular: false,
      previousMargin: 0,
      nextMargin: 0,
      acceleration: false,
      displayMultipleItems: 1,
      easingFunction: "default",
      keyName: "url",
      imgMode: "aspectFill",
      height: 130,
      bgColor: "#f3f4f6",
      radius: 4,
      loading: false,
      showTitle: false
    }
  };
  const SwipterIndicator = {
    // swiperIndicator 组件
    swiperIndicator: {
      length: 0,
      current: 0,
      indicatorActiveColor: "",
      indicatorInactiveColor: "",
      indicatorMode: "line"
    }
  };
  const Switch = {
    // switch
    switch: {
      loading: false,
      disabled: false,
      size: 25,
      activeColor: "#2979ff",
      inactiveColor: "#ffffff",
      value: false,
      activeValue: true,
      inactiveValue: false,
      asyncChange: false,
      space: 0
    }
  };
  const Tabbar = {
    // tabbar
    tabbar: {
      value: null,
      safeAreaInsetBottom: true,
      border: true,
      zIndex: 1,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      fixed: true,
      placeholder: true
    }
  };
  const TabbarItem = {
    //
    tabbarItem: {
      name: null,
      icon: "",
      badge: null,
      dot: false,
      text: "",
      badgeStyle: "top: 6px;right:2px;"
    }
  };
  const Tabs = {
    //
    tabs: {
      duration: 300,
      list: () => [],
      lineColor: "#3c9cff",
      activeStyle: () => ({
        color: "#303133"
      }),
      inactiveStyle: () => ({
        color: "#606266"
      }),
      lineWidth: 20,
      lineHeight: 3,
      lineBgSize: "cover",
      itemStyle: () => ({
        height: "44px"
      }),
      scrollable: true,
      current: 0,
      keyName: "name"
    }
  };
  const Tag = {
    // tag 组件
    tag: {
      type: "primary",
      disabled: false,
      size: "medium",
      shape: "square",
      text: "",
      bgColor: "",
      color: "",
      borderColor: "",
      closeColor: "#C6C7CB",
      name: "",
      plainFill: false,
      plain: false,
      closable: false,
      show: true,
      icon: ""
    }
  };
  const Text = {
    // text 组件
    text: {
      type: "",
      show: true,
      text: "",
      prefixIcon: "",
      suffixIcon: "",
      mode: "",
      href: "",
      format: "",
      call: false,
      openType: "",
      bold: false,
      block: false,
      lines: "",
      color: "#303133",
      size: 15,
      iconStyle: () => ({
        fontSize: "15px"
      }),
      decoration: "none",
      margin: 0,
      lineHeight: "",
      align: "left",
      wordWrap: "normal"
    }
  };
  const Textarea = {
    // textarea 组件
    textarea: {
      value: "",
      placeholder: "",
      placeholderClass: "textarea-placeholder",
      placeholderStyle: "color: #c0c4cc",
      height: 70,
      confirmType: "done",
      disabled: false,
      count: false,
      focus: false,
      autoHeight: false,
      fixed: false,
      cursorSpacing: 0,
      cursor: "",
      showConfirmBar: true,
      selectionStart: -1,
      selectionEnd: -1,
      adjustPosition: true,
      disableDefaultPadding: false,
      holdKeyboard: false,
      maxlength: 140,
      border: "surround",
      formatter: null
    }
  };
  const Toast = {
    // toast组件
    toast: {
      zIndex: 10090,
      loading: false,
      text: "",
      icon: "",
      type: "",
      loadingMode: "",
      show: "",
      overlay: false,
      position: "center",
      params: () => {
      },
      duration: 2e3,
      isTab: false,
      url: "",
      callback: null,
      back: false
    }
  };
  const Toolbar = {
    // toolbar 组件
    toolbar: {
      show: true,
      cancelText: "取消",
      confirmText: "确认",
      cancelColor: "#909193",
      confirmColor: "#3c9cff",
      title: ""
    }
  };
  const Tooltip = {
    // tooltip 组件
    tooltip: {
      text: "",
      copyText: "",
      size: 14,
      color: "#606266",
      bgColor: "transparent",
      direction: "top",
      zIndex: 10071,
      showCopy: true,
      buttons: () => [],
      overlay: true,
      showToast: true
    }
  };
  const Transition = {
    // transition动画组件的props
    transition: {
      show: false,
      mode: "fade",
      duration: "300",
      timingFunction: "ease-out"
    }
  };
  const Upload = {
    // upload组件
    upload: {
      accept: "image",
      capture: () => ["album", "camera"],
      compressed: true,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: false,
      previewFullImage: true,
      maxCount: 52,
      disabled: false,
      imageMode: "aspectFill",
      name: "",
      sizeType: () => ["original", "compressed"],
      multiple: false,
      deletable: true,
      maxSize: Number.MAX_VALUE,
      fileList: () => [],
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: true
    }
  };
  const props$i = {
    ...ActionSheet,
    ...Album,
    ...Alert,
    ...Avatar,
    ...AvatarGroup,
    ...Backtop,
    ...Badge,
    ...Button,
    ...Calendar,
    ...CarKeyboard,
    ...Cell,
    ...CellGroup,
    ...Checkbox,
    ...CheckboxGroup,
    ...CircleProgress,
    ...Code,
    ...CodeInput,
    ...Col,
    ...Collapse,
    ...CollapseItem,
    ...ColumnNotice,
    ...CountDown,
    ...CountTo,
    ...DatetimePicker,
    ...Divider,
    ...Empty,
    ...Form,
    ...GormItem,
    ...Gap,
    ...Grid,
    ...GridItem,
    ...Icon,
    ...Image,
    ...IndexAnchor,
    ...IndexList,
    ...Input,
    ...Keyboard,
    ...Line,
    ...LineProgress,
    ...Link,
    ...List,
    ...ListItem,
    ...LoadingIcon,
    ...LoadingPage,
    ...Loadmore,
    ...Modal,
    ...Navbar,
    ...NoNetwork,
    ...NoticeBar,
    ...Notify,
    ...NumberBox,
    ...NumberKeyboard,
    ...Overlay,
    ...Parse,
    ...Picker,
    ...Popup,
    ...Radio,
    ...RadioGroup,
    ...Rate,
    ...ReadMore,
    ...Row,
    ...RowNotice,
    ...ScrollList,
    ...Search,
    ...Section,
    ...Skeleton,
    ...Slider,
    ...StatusBar,
    ...Steps,
    ...StepsItem,
    ...Sticky,
    ...Subsection,
    ...SwipeAction,
    ...SwipeActionItem,
    ...Swiper,
    ...SwipterIndicator,
    ...Switch,
    ...Tabbar,
    ...TabbarItem,
    ...Tabs,
    ...Tag,
    ...Text,
    ...Textarea,
    ...Toast,
    ...Toolbar,
    ...Tooltip,
    ...Transition,
    ...Upload
  };
  const props$h = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: props$i.icon.name
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: props$i.icon.color
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: props$i.icon.size
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: props$i.icon.bold
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: props$i.icon.index
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: props$i.icon.hoverClass
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: props$i.icon.customPrefix
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: props$i.icon.label
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: props$i.icon.labelPos
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: props$i.icon.labelSize
      },
      // label的颜色
      labelColor: {
        type: String,
        default: props$i.icon.labelColor
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: props$i.icon.space
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: props$i.icon.imgMode
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: props$i.icon.width
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: props$i.icon.height
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: props$i.icon.top
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: props$i.icon.stop
      }
    }
  };
  const mpMixin = {};
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return uni.$u.deepMerge(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          this.$u.route({ type: this.linkType, url: url2 });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = uni.$u.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const _sfc_main$y = {
    name: "u-icon",
    data() {
      return {};
    },
    emits: ["click"],
    mixins: [mpMixin, mixin, props$h],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && uni.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: uni.$u.addUnit(this.size),
          lineHeight: uni.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: uni.$u.addUnit(this.top)
        };
        if (this.color && !uni.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? uni.$u.addUnit(this.width) : uni.$u.addUnit(this.size);
        style.height = this.height ? uni.$u.addUnit(this.height) : uni.$u.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        return icons["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-icon", ["u-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$u.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$u.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$u.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$u.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$u.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-ac70166d"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-icon/u-icon.vue"]]);
  const props$g = {
    props: {
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: props$i.search.shape
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: props$i.search.bgColor
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: props$i.search.placeholder
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: props$i.search.clearabled
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: props$i.search.focus
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: props$i.search.showAction
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: props$i.search.actionStyle
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: props$i.search.actionText
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: props$i.search.inputAlign
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: props$i.search.inputStyle
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: props$i.search.disabled
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: props$i.search.borderColor
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: props$i.search.searchIconColor
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: props$i.search.color
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: props$i.search.placeholderColor
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: props$i.search.searchIcon
      },
      searchIconSize: {
        type: [Number, String],
        default: props$i.search.searchIconSize
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: props$i.search.margin
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: props$i.search.animation
      },
      // 输入框的初始化内容
      modelValue: {
        type: String,
        default: props$i.search.value
      },
      value: {
        type: String,
        default: props$i.search.value
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: props$i.search.maxlength
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: props$i.search.height
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: props$i.search.label
      }
    }
  };
  const _sfc_main$x = {
    name: "u-search",
    mixins: [mpMixin, mixin, props$g],
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      modelValue: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      showActionBtn() {
        return !this.animation && this.showAction;
      }
    },
    emits: ["clear", "search", "custom", "focus", "blur", "click", "clickIcon", "update:modelValue", "change"],
    methods: {
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      },
      // 点击左边图标
      clickIcon() {
        this.$emit("clickIcon");
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([{
          margin: _ctx.margin
        }, _ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-search__content",
            style: vue.normalizeStyle({
              backgroundColor: _ctx.bgColor,
              borderRadius: _ctx.shape == "round" ? "100px" : "4px",
              borderColor: _ctx.borderColor
            })
          },
          [
            _ctx.$slots.label || _ctx.label !== null ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }, () => [
              vue.createElementVNode(
                "text",
                { class: "u-search__content__label" },
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ], true) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-search__content__icon" }, [
              vue.createVNode(_component_u_icon, {
                onClick: $options.clickIcon,
                size: _ctx.searchIconSize,
                name: _ctx.searchIcon,
                color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
              }, null, 8, ["onClick", "size", "name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $data.keyword,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: _ctx.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: _ctx.focus,
              maxlength: _ctx.maxlength,
              "placeholder-class": "u-search__content__input--placeholder",
              placeholder: _ctx.placeholder,
              "placeholder-style": `color: ${_ctx.placeholderColor}`,
              class: "u-search__content__input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: _ctx.inputAlign,
                color: _ctx.color,
                backgroundColor: _ctx.bgColor,
                height: _ctx.$u.addUnit(_ctx.height)
              }, _ctx.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && _ctx.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-search__content__icon u-search__content__close",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_u_icon, {
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            style: vue.normalizeStyle([_ctx.actionStyle]),
            class: vue.normalizeClass(["u-search__action", [($options.showActionBtn || $data.show) && "u-search__action--active"]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString(_ctx.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-e082a34a"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-search/u-search.vue"]]);
  const props$f = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: props$i.loadingIcon.show
      },
      // 颜色
      color: {
        type: String,
        default: props$i.loadingIcon.color
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: props$i.loadingIcon.textColor
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: props$i.loadingIcon.vertical
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: props$i.loadingIcon.mode
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: props$i.loadingIcon.size
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: props$i.loadingIcon.textSize
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: props$i.loadingIcon.text
      },
      // 动画模式
      timingFunction: {
        type: String,
        default: props$i.loadingIcon.timingFunction
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: props$i.loadingIcon.duration
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: props$i.loadingIcon.inactiveColor
      }
    }
  };
  const _sfc_main$w = {
    name: "u-loading-icon",
    mixins: [mpMixin, mixin, props$f],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = uni.$u.colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading-icon", [_ctx.vertical && "u-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["u-loading-icon__spinner", [`u-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$u.addUnit(_ctx.size),
              height: _ctx.$u.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "u-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$u.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-2af81691"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.vue"]]);
  const props$e = {
    props: {
      // 轮播的长度
      length: {
        type: [String, Number],
        default: props$i.swiperIndicator.length
      },
      // 当前处于活动状态的轮播的索引
      current: {
        type: [String, Number],
        default: props$i.swiperIndicator.current
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: props$i.swiperIndicator.indicatorActiveColor
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: props$i.swiperIndicator.indicatorInactiveColor
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: props$i.swiperIndicator.indicatorMode
      }
    }
  };
  const _sfc_main$v = {
    name: "u-swiper-indicator",
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        lineWidth: 22
      };
    },
    computed: {
      // 指示器为线型的样式
      lineStyle() {
        let style = {};
        style.width = uni.$u.addUnit(this.lineWidth);
        style.transform = `translateX(${uni.$u.addUnit(this.current * this.lineWidth)})`;
        style.backgroundColor = this.indicatorActiveColor;
        return style;
      },
      // 指示器为点型的样式
      dotStyle() {
        return (index2) => {
          let style = {};
          style.backgroundColor = index2 === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
          return style;
        };
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-swiper-indicator" }, [
      _ctx.indicatorMode === "line" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["u-swiper-indicator__wrapper", [`u-swiper-indicator__wrapper--${_ctx.indicatorMode}`]]),
          style: vue.normalizeStyle({
            width: _ctx.$u.addUnit($data.lineWidth * _ctx.length),
            backgroundColor: _ctx.indicatorInactiveColor
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "u-swiper-indicator__wrapper--line__bar",
              style: vue.normalizeStyle([$options.lineStyle])
            },
            null,
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      _ctx.indicatorMode === "dot" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-swiper-indicator__wrapper"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.length, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                class: vue.normalizeClass(["u-swiper-indicator__wrapper__dot", [index2 === _ctx.current && "u-swiper-indicator__wrapper__dot--active"]]),
                key: index2,
                style: vue.normalizeStyle([$options.dotStyle(index2)])
              },
              null,
              6
              /* CLASS, STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-7b7c7ea6"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-swiper-indicator/u-swiper-indicator.vue"]]);
  const props$d = {
    props: {
      // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
      list: {
        type: Array,
        default: props$i.swiper.list
      },
      // 是否显示面板指示器
      indicator: {
        type: Boolean,
        default: props$i.swiper.indicator
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: props$i.swiper.indicatorActiveColor
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: props$i.swiper.indicatorInactiveColor
      },
      // 指示器样式，可通过bottom，left，right进行定位
      indicatorStyle: {
        type: [String, Object],
        default: props$i.swiper.indicatorStyle
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: props$i.swiper.indicatorMode
      },
      // 是否自动切换
      autoplay: {
        type: Boolean,
        default: props$i.swiper.autoplay
      },
      // 当前所在滑块的 index
      current: {
        type: [String, Number],
        default: props$i.swiper.current
      },
      // 当前所在滑块的 item-id ，不能与 current 被同时指定
      currentItemId: {
        type: String,
        default: props$i.swiper.currentItemId
      },
      // 滑块自动切换时间间隔
      interval: {
        type: [String, Number],
        default: props$i.swiper.interval
      },
      // 滑块切换过程所需时间
      duration: {
        type: [String, Number],
        default: props$i.swiper.duration
      },
      // 播放到末尾后是否重新回到开头
      circular: {
        type: Boolean,
        default: props$i.swiper.circular
      },
      // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
      previousMargin: {
        type: [String, Number],
        default: props$i.swiper.previousMargin
      },
      // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
      nextMargin: {
        type: [String, Number],
        default: props$i.swiper.nextMargin
      },
      // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
      acceleration: {
        type: Boolean,
        default: props$i.swiper.acceleration
      },
      // 同时显示的滑块数量，nvue、支付宝小程序不支持
      displayMultipleItems: {
        type: Number,
        default: props$i.swiper.displayMultipleItems
      },
      // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
      // 只对微信小程序有效
      easingFunction: {
        type: String,
        default: props$i.swiper.easingFunction
      },
      // list数组中指定对象的目标属性名
      keyName: {
        type: String,
        default: props$i.swiper.keyName
      },
      // 图片的裁剪模式
      imgMode: {
        type: String,
        default: props$i.swiper.imgMode
      },
      // 组件高度
      height: {
        type: [String, Number],
        default: props$i.swiper.height
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: props$i.swiper.bgColor
      },
      // 组件圆角，数值或带单位的字符串
      radius: {
        type: [String, Number],
        default: props$i.swiper.radius
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: props$i.swiper.loading
      },
      // 是否显示标题，要求数组对象中有title属性
      showTitle: {
        type: Boolean,
        default: props$i.swiper.showTitle
      }
    }
  };
  const _sfc_main$u = {
    name: "u-swiper",
    mixins: [mpMixin, mixin, props$d],
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val, preVal) {
        if (val === preVal)
          return;
        this.currentIndex = val;
      }
    },
    computed: {
      itemStyle() {
        return (index2) => {
          const style = {};
          if (this.nextMargin && this.previousMargin) {
            style.borderRadius = uni.$u.addUnit(this.radius);
            if (index2 !== this.currentIndex)
              style.transform = "scale(0.92)";
          }
          return style;
        };
      }
    },
    methods: {
      getItemType(item) {
        if (typeof item === "string")
          return uni.$u.test.video(this.getSource(item)) ? "video" : "image";
        if (typeof item === "object" && this.keyName) {
          if (!item.type)
            return uni.$u.test.video(this.getSource(item)) ? "video" : "image";
          if (item.type === "image")
            return "image";
          if (item.type === "video")
            return "video";
          return "image";
        }
      },
      // 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
      getSource(item) {
        if (typeof item === "string")
          return item;
        if (typeof item === "object" && this.keyName)
          return item[this.keyName];
        else
          uni.$u.error("请按格式传递列表参数");
        return "";
      },
      // 轮播切换事件
      change(e) {
        const {
          current
        } = e.detail;
        this.pauseVideo(this.currentIndex);
        this.currentIndex = current;
        this.$emit("change", e.detail);
      },
      // 切换轮播时，暂停视频播放
      pauseVideo(index2) {
        const lastItem = this.getSource(this.list[index2]);
        if (uni.$u.test.video(lastItem)) {
          const video2 = uni.createVideoContext(`video-${index2}`, this);
          video2.pause();
        }
      },
      // 当一个轮播item为视频时，获取它的视频海报
      getPoster(item) {
        return typeof item === "object" && item.poster ? item.poster : "";
      },
      // 点击某个item
      clickHandler(index2) {
        this.$emit("click", index2);
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1$4);
    const _component_u_swiper_indicator = resolveEasycom(vue.resolveDynamicComponent("u-swiper-indicator"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-swiper",
        style: vue.normalizeStyle({
          backgroundColor: _ctx.bgColor,
          height: _ctx.$u.addUnit(_ctx.height),
          borderRadius: _ctx.$u.addUnit(_ctx.radius)
        })
      },
      [
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-swiper__loading"
        }, [
          vue.createVNode(_component_u_loading_icon, { mode: "circle" })
        ])) : (vue.openBlock(), vue.createElementBlock("swiper", {
          key: 1,
          class: "u-swiper__wrapper",
          style: vue.normalizeStyle({
            height: _ctx.$u.addUnit(_ctx.height)
          }),
          onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
          circular: _ctx.circular,
          interval: _ctx.interval,
          duration: _ctx.duration,
          autoplay: _ctx.autoplay,
          current: _ctx.current,
          currentItemId: _ctx.currentItemId,
          previousMargin: _ctx.$u.addUnit(_ctx.previousMargin),
          nextMargin: _ctx.$u.addUnit(_ctx.nextMargin),
          acceleration: _ctx.acceleration,
          displayMultipleItems: _ctx.displayMultipleItems,
          easingFunction: _ctx.easingFunction
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.list, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                class: "u-swiper__wrapper__item",
                key: index2
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-swiper__wrapper__item__wrapper",
                    style: vue.normalizeStyle([$options.itemStyle(index2)])
                  },
                  [
                    vue.createCommentVNode(" 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 "),
                    $options.getItemType(item) === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "u-swiper__wrapper__item__wrapper__image",
                      src: $options.getSource(item),
                      mode: _ctx.imgMode,
                      onClick: ($event) => $options.clickHandler(index2),
                      style: vue.normalizeStyle({
                        height: _ctx.$u.addUnit(_ctx.height),
                        borderRadius: _ctx.$u.addUnit(_ctx.radius)
                      })
                    }, null, 12, ["src", "mode", "onClick"])) : vue.createCommentVNode("v-if", true),
                    $options.getItemType(item) === "video" ? (vue.openBlock(), vue.createElementBlock("video", {
                      key: 1,
                      class: "u-swiper__wrapper__item__wrapper__video",
                      id: `video-${index2}`,
                      "enable-progress-gesture": false,
                      src: $options.getSource(item),
                      poster: $options.getPoster(item),
                      title: _ctx.showTitle && _ctx.$u.test.object(item) && item.title ? item.title : "",
                      style: vue.normalizeStyle({
                        height: _ctx.$u.addUnit(_ctx.height)
                      }),
                      controls: "",
                      onClick: ($event) => $options.clickHandler(index2)
                    }, null, 12, ["id", "src", "poster", "title", "onClick"])) : vue.createCommentVNode("v-if", true),
                    _ctx.showTitle && _ctx.$u.test.object(item) && item.title && _ctx.$u.test.image($options.getSource(item)) ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 2,
                        class: "u-swiper__wrapper__item__wrapper__title u-line-1"
                      },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 44, ["circular", "interval", "duration", "autoplay", "current", "currentItemId", "previousMargin", "nextMargin", "acceleration", "displayMultipleItems", "easingFunction"])),
        vue.createElementVNode(
          "view",
          {
            class: "u-swiper__indicator",
            style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.indicatorStyle)])
          },
          [
            vue.renderSlot(_ctx.$slots, "indicator", {}, () => [
              !_ctx.loading && _ctx.indicator && !_ctx.showTitle ? (vue.openBlock(), vue.createBlock(_component_u_swiper_indicator, {
                key: 0,
                indicatorActiveColor: _ctx.indicatorActiveColor,
                indicatorInactiveColor: _ctx.indicatorInactiveColor,
                length: _ctx.list.length,
                current: $data.currentIndex,
                indicatorMode: _ctx.indicatorMode
              }, null, 8, ["indicatorActiveColor", "indicatorInactiveColor", "length", "current", "indicatorMode"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-4e7d0c90"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-swiper/u-swiper.vue"]]);
  const _sfc_main$t = {
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
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      async getcircle() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/circle/getlist",
            method: "GET",
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {}
          });
          let list = [];
          let list2 = [];
          list = response.data.data;
          list.forEach(function(item, index2) {
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
          const response = await uni.request({
            url: base_url + "/book/getlabellimit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          formatAppLog("log", "at pages/main/main.vue:147", list);
          formatAppLog("log", "at pages/main/main.vue:148", response);
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
          formatAppLog("log", "at pages/main/main.vue:164", "error");
          formatAppLog("log", "at pages/main/main.vue:165", e);
        }
      },
      gotolist(num) {
        uni.navigateTo({
          url: "/pages/booklist/booklist?num=" + num
        });
      },
      book(num) {
        uni.navigateTo({
          url: "/pages/book/book?num=" + num
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_search = resolveEasycom(vue.resolveDynamicComponent("u-search"), __easycom_0$8);
    const _component_u_swiper = resolveEasycom(vue.resolveDynamicComponent("u-swiper"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "",
      style: {}
    }, [
      vue.createElementVNode("view", { class: "pa-10" }, [
        vue.createCommentVNode(" 搜索 "),
        vue.createVNode(_component_u_search, {
          shape: "round",
          clearabled: true,
          class: "pa-10",
          onFocus: $options.tip
        }, null, 8, ["onFocus"]),
        vue.createCommentVNode(" 轮播图 "),
        vue.createVNode(_component_u_swiper, {
          list: $data.circle,
          indicator: "",
          circular: ""
        }, null, 8, ["list"])
      ]),
      vue.createCommentVNode(" 书单 "),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.bookall, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "bg-g ra-10 ma-10",
            key: index2
          }, [
            item.books.length != 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "pa-10"
            }, [
              vue.createElementVNode("view", {
                class: "",
                style: { "font-weight": "700", "font-size": "1.2rem", "padding": "0.5rem 0", "position": "relative" }
              }, [
                vue.createElementVNode("view", {
                  class: "ra-10",
                  style: { "height": "3px", "width": "20%", "position": "absolute", "bottom": "0", "background-color": "#e2510e", "left": "5%" }
                }),
                vue.createTextVNode(
                  " " + vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(item.books, (it, ind) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "inbox pa-t10",
                    style: { "width": "33%" },
                    key: ind
                  }, [
                    vue.createElementVNode("view", { class: "" }, [
                      vue.createElementVNode("view", {
                        class: "inbox book",
                        id: "imageContainer",
                        onClick: ($event) => $options.book(it.bookid)
                      }, [
                        vue.createElementVNode("img", {
                          class: "inbox itimg",
                          src: it.bookImg,
                          alt: "Image"
                        }, null, 8, ["src"]),
                        vue.createElementVNode(
                          "view",
                          {
                            class: "overflow-ellipsis",
                            style: { "position": "absolute", "font-size": "0.8rem", "margin-left": "0.1rem" }
                          },
                          vue.toDisplayString(it.bookName),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("view", {
                  class: "ma-t20 button",
                  style: {},
                  onClick: ($event) => $options.gotolist(index2 + 1)
                }, " 查看书单 ", 8, ["onClick"])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("view", { class: "pa-10" })
    ]);
  }
  const PagesMainMain = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-4f50ca8f"], ["__file", "D:/before/Project/uniApp/pages/main/main.vue"]]);
  const props$c = {
    props: {
      color: {
        type: String,
        default: props$i.line.color
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: props$i.line.length
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: props$i.line.direction
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: props$i.line.hairline
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: props$i.line.margin
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: props$i.line.dashed
      }
    }
  };
  const _sfc_main$s = {
    name: "u-line",
    mixins: [mpMixin, mixin, props$c],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = uni.$u.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = uni.$u.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-72791e59"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-line/u-line.vue"]]);
  const props$b = {
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: props$i.transition.show
      },
      // 使用的动画模式
      mode: {
        type: String,
        default: props$i.transition.mode
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: props$i.transition.duration
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: props$i.transition.timingFunction
      }
    }
  };
  const getClassNames = (name) => ({
    enter: `u-${name}-enter u-${name}-enter-active`,
    "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
    leave: `u-${name}-leave u-${name}-leave-active`,
    "leave-to": `u-${name}-leave-to u-${name}-leave-active`
  });
  const transition = {
    methods: {
      // 组件被点击发出事件
      clickHandler() {
        this.$emit("click");
      },
      // vue版本的组件进场处理
      async vueEnter() {
        const classNames = getClassNames(this.mode);
        this.status = "enter";
        this.$emit("beforeEnter");
        this.inited = true;
        this.display = true;
        this.classes = classNames.enter;
        await vue.nextTick();
        {
          this.$emit("enter");
          this.transitionEnded = false;
          this.$emit("afterEnter");
          this.classes = classNames["enter-to"];
        }
      },
      // 动画离场处理
      async vueLeave() {
        if (!this.display)
          return;
        const classNames = getClassNames(this.mode);
        this.status = "leave";
        this.$emit("beforeLeave");
        this.classes = classNames.leave;
        await vue.nextTick();
        {
          this.transitionEnded = false;
          this.$emit("leave");
          setTimeout(this.onTransitionEnd, this.duration);
          this.classes = classNames["leave-to"];
        }
      },
      // 完成过渡后触发
      onTransitionEnd() {
        if (this.transitionEnded)
          return;
        this.transitionEnded = true;
        this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
        if (!this.show && this.display) {
          this.display = false;
          this.inited = false;
        }
      }
    }
  };
  const _sfc_main$r = {
    name: "u-transition",
    data() {
      return {
        inited: false,
        // 是否显示/隐藏组件
        viewStyle: {},
        // 组件内部的样式
        status: "",
        // 记录组件动画的状态
        transitionEnded: false,
        // 组件是否结束的标记
        display: false,
        // 组件是否展示
        classes: ""
        // 应用的类名
      };
    },
    emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
    computed: {
      mergeStyle() {
        const { viewStyle, customStyle } = this;
        return {
          transitionDuration: `${this.duration}ms`,
          // display: `${this.display ? '' : 'none'}`,
          transitionTimingFunction: this.timingFunction,
          // 避免自定义样式影响到动画属性，所以写在viewStyle前面
          ...uni.$u.addStyle(customStyle),
          ...viewStyle
        };
      }
    },
    // 将mixin挂在到组件中，uni.$u.mixin实际上为一个vue格式对象
    mixins: [mpMixin, mixin, transition, props$b],
    watch: {
      show: {
        handler(newVal) {
          newVal ? this.vueEnter() : this.vueLeave();
        },
        // 表示同时监听初始化时的props的show的意思
        immediate: true
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-transition", $data.classes]),
        ref: "u-transition",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
        style: vue.normalizeStyle([$options.mergeStyle]),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.noop && _ctx.noop(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-5cec8177"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-transition/u-transition.vue"]]);
  const props$a = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: props$i.overlay.show
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: props$i.overlay.zIndex
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: props$i.overlay.duration
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: props$i.overlay.opacity
      }
    }
  };
  const _sfc_main$q = {
    name: "u-overlay",
    mixins: [mpMixin, mixin, props$a],
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_u_transition, {
      show: _ctx.show,
      "custom-class": "u-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick"]);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-9112bed9"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-overlay/u-overlay.vue"]]);
  const props$9 = {
    props: {
      bgColor: {
        type: String,
        default: props$i.statusBar.bgColor
      }
    }
  };
  const _sfc_main$p = {
    name: "u-status-bar",
    mixins: [mpMixin, mixin, props$9],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = uni.$u.addUnit(uni.$u.sys().statusBarHeight, "px");
        style.backgroundColor = this.bgColor;
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "u-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-eb8e0cdd"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-status-bar/u-status-bar.vue"]]);
  const props$8 = {
    props: {}
  };
  const _sfc_main$o = {
    name: "u-safe-bottom",
    mixins: [mpMixin, mixin, props$8],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-safe-bottom", [!$data.isNvue && "u-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-f3d22cfe"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-safe-bottom/u-safe-bottom.vue"]]);
  const props$7 = {
    props: {
      // 是否展示弹窗
      show: {
        type: Boolean,
        default: props$i.popup.show
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: props$i.popup.overlay
      },
      // 弹出的方向，可选值为 top bottom right left center
      mode: {
        type: String,
        default: props$i.popup.mode
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: props$i.popup.duration
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: props$i.popup.closeable
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: props$i.popup.overlayStyle
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: props$i.popup.closeOnClickOverlay
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: props$i.popup.zIndex
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: props$i.popup.safeAreaInsetBottom
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: props$i.popup.safeAreaInsetTop
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: props$i.popup.closeIconPos
      },
      // 是否显示圆角
      round: {
        type: [Boolean, String, Number],
        default: props$i.popup.round
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: props$i.popup.zoom
      },
      // 弹窗背景色，设置为transparent可去除白色背景
      bgColor: {
        type: String,
        default: props$i.popup.bgColor
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: props$i.popup.overlayOpacity
      }
    }
  };
  const _sfc_main$n = {
    name: "u-popup",
    mixins: [mpMixin, mixin, props$7],
    data() {
      return {
        overlayDuration: this.duration + 50
      };
    },
    watch: {
      show(newValue, oldValue) {
      }
    },
    computed: {
      transitionStyle() {
        const style = {
          zIndex: this.zIndex,
          position: "fixed",
          display: "flex"
        };
        style[this.mode] = 0;
        if (this.mode === "left") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "right") {
          return uni.$u.deepMerge(style, {
            bottom: 0,
            top: 0
          });
        } else if (this.mode === "top") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "bottom") {
          return uni.$u.deepMerge(style, {
            left: 0,
            right: 0
          });
        } else if (this.mode === "center") {
          return uni.$u.deepMerge(style, {
            alignItems: "center",
            "justify-content": "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          });
        }
      },
      contentStyle() {
        const style = {};
        uni.$u.sys();
        if (this.mode !== "center") {
          style.flex = 1;
        }
        if (this.bgColor) {
          style.backgroundColor = this.bgColor;
        }
        if (this.round) {
          const value = uni.$u.addUnit(this.round);
          if (this.mode === "top") {
            style.borderBottomLeftRadius = value;
            style.borderBottomRightRadius = value;
          } else if (this.mode === "bottom") {
            style.borderTopLeftRadius = value;
            style.borderTopRightRadius = value;
          } else if (this.mode === "center") {
            style.borderRadius = value;
          }
        }
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      },
      position() {
        if (this.mode === "center") {
          return this.zoom ? "fade-zoom" : "fade";
        }
        if (this.mode === "left") {
          return "slide-left";
        }
        if (this.mode === "right") {
          return "slide-right";
        }
        if (this.mode === "bottom") {
          return "slide-up";
        }
        if (this.mode === "top") {
          return "slide-down";
        }
      }
    },
    methods: {
      // 点击遮罩
      overlayClick() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      },
      close(e) {
        this.$emit("close");
      },
      afterEnter() {
        this.$emit("open");
      },
      clickHandler() {
        if (this.mode === "center") {
          this.overlayClick();
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_overlay = resolveEasycom(vue.resolveDynamicComponent("u-overlay"), __easycom_0$6);
    const _component_u_status_bar = resolveEasycom(vue.resolveDynamicComponent("u-status-bar"), __easycom_1$1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    const _component_u_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("u-safe-bottom"), __easycom_3);
    const _component_u_transition = resolveEasycom(vue.resolveDynamicComponent("u-transition"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-popup" }, [
      _ctx.overlay ? (vue.openBlock(), vue.createBlock(_component_u_overlay, {
        key: 0,
        show: _ctx.show,
        onClick: $options.overlayClick,
        duration: $data.overlayDuration,
        customStyle: _ctx.overlayStyle,
        opacity: _ctx.overlayOpacity
      }, null, 8, ["show", "onClick", "duration", "customStyle", "opacity"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_u_transition, {
        show: _ctx.show,
        customStyle: $options.transitionStyle,
        mode: $options.position,
        duration: _ctx.duration,
        onAfterEnter: $options.afterEnter,
        onClick: $options.clickHandler
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: "u-popup__content",
              style: vue.normalizeStyle([$options.contentStyle]),
              onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop"]))
            },
            [
              _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_u_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
              _ctx.closeable ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                  class: vue.normalizeClass(["u-popup__content__close", ["u-popup__content__close--" + _ctx.closeIconPos]]),
                  "hover-class": "u-popup__content__close--hover",
                  "hover-stay-time": "150"
                },
                [
                  vue.createVNode(_component_u_icon, {
                    name: "close",
                    color: "#909399",
                    size: "18",
                    bold: ""
                  })
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_u_safe_bottom, { key: 2 })) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["show", "customStyle", "mode", "duration", "onAfterEnter", "onClick"])
    ]);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-05c24e9b"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-popup/u-popup.vue"]]);
  const props$6 = {
    props: {
      // 是否展示modal
      show: {
        type: Boolean,
        default: props$i.modal.show
      },
      // 标题
      title: {
        type: [String],
        default: props$i.modal.title
      },
      // 弹窗内容
      content: {
        type: String,
        default: props$i.modal.content
      },
      // 确认文案
      confirmText: {
        type: String,
        default: props$i.modal.confirmText
      },
      // 取消文案
      cancelText: {
        type: String,
        default: props$i.modal.cancelText
      },
      // 是否显示确认按钮
      showConfirmButton: {
        type: Boolean,
        default: props$i.modal.showConfirmButton
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: props$i.modal.showCancelButton
      },
      // 确认按钮颜色
      confirmColor: {
        type: String,
        default: props$i.modal.confirmColor
      },
      // 取消文字颜色
      cancelColor: {
        type: String,
        default: props$i.modal.cancelColor
      },
      // 对调确认和取消的位置
      buttonReverse: {
        type: Boolean,
        default: props$i.modal.buttonReverse
      },
      // 是否开启缩放效果
      zoom: {
        type: Boolean,
        default: props$i.modal.zoom
      },
      // 是否异步关闭，只对确定按钮有效
      asyncClose: {
        type: Boolean,
        default: props$i.modal.asyncClose
      },
      // 是否允许点击遮罩关闭modal
      closeOnClickOverlay: {
        type: Boolean,
        default: props$i.modal.closeOnClickOverlay
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
      negativeTop: {
        type: [String, Number],
        default: props$i.modal.negativeTop
      },
      // modal宽度，不支持百分比，可以数值，px，rpx单位
      width: {
        type: [String, Number],
        default: props$i.modal.width
      },
      // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
      confirmButtonShape: {
        type: String,
        default: props$i.modal.confirmButtonShape
      }
    }
  };
  const _sfc_main$m = {
    name: "u-modal",
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {
        loading: false
      };
    },
    watch: {
      show(n) {
        if (n && this.loading)
          this.loading = false;
      }
    },
    methods: {
      // 点击确定按钮
      confirmHandler() {
        if (this.asyncClose) {
          this.loading = true;
        }
        this.$emit("confirm");
      },
      // 点击取消按钮
      cancelHandler() {
        this.$emit("cancel");
      },
      // 点击遮罩
      // 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
      // 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽有然遮罩，但是为了让弹窗内容能flex居中
      // 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
      // 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
      clickHandler() {
        if (this.closeOnClickOverlay) {
          this.$emit("close");
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$7);
    const _component_u_loading_icon = resolveEasycom(vue.resolveDynamicComponent("u-loading-icon"), __easycom_1$4);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      mode: "center",
      zoom: _ctx.zoom,
      show: _ctx.show,
      customStyle: {
        borderRadius: "6px",
        overflow: "hidden",
        marginTop: `-${_ctx.$u.addUnit(_ctx.negativeTop)}`
      },
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      safeAreaInsetBottom: false,
      duration: 400,
      onClick: $options.clickHandler
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: "u-modal",
            style: vue.normalizeStyle({
              width: _ctx.$u.addUnit(_ctx.width)
            })
          },
          [
            _ctx.title ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "u-modal__title"
              },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: "u-modal__content",
                style: vue.normalizeStyle({
                  paddingTop: `${_ctx.title ? 12 : 25}px`
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createElementVNode(
                    "text",
                    { class: "u-modal__content__text" },
                    vue.toDisplayString(_ctx.content),
                    1
                    /* TEXT */
                  )
                ], true)
              ],
              4
              /* STYLE */
            ),
            _ctx.$slots.confirmButton ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-modal__button-group--confirm-button"
            }, [
              vue.renderSlot(_ctx.$slots, "confirmButton", {}, void 0, true)
            ])) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createVNode(_component_u_line),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-modal__button-group",
                    style: vue.normalizeStyle({
                      flexDirection: _ctx.buttonReverse ? "row-reverse" : "row"
                    })
                  },
                  [
                    _ctx.showCancelButton ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: vue.normalizeClass(["u-modal__button-group__wrapper u-modal__button-group__wrapper--cancel", [_ctx.showCancelButton && !_ctx.showConfirmButton && "u-modal__button-group__wrapper--only-cancel"]]),
                        "hover-stay-time": 150,
                        "hover-class": "u-modal__button-group__wrapper--hover",
                        onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelHandler && $options.cancelHandler(...args))
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "u-modal__button-group__wrapper__text",
                            style: vue.normalizeStyle({
                              color: _ctx.cancelColor
                            })
                          },
                          vue.toDisplayString(_ctx.cancelText),
                          5
                          /* TEXT, STYLE */
                        )
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    _ctx.showConfirmButton && _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_u_line, {
                      key: 1,
                      direction: "column"
                    })) : vue.createCommentVNode("v-if", true),
                    _ctx.showConfirmButton ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        class: vue.normalizeClass(["u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm", [!_ctx.showCancelButton && _ctx.showConfirmButton && "u-modal__button-group__wrapper--only-confirm"]]),
                        "hover-stay-time": 150,
                        "hover-class": "u-modal__button-group__wrapper--hover",
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmHandler && $options.confirmHandler(...args))
                      },
                      [
                        $data.loading ? (vue.openBlock(), vue.createBlock(_component_u_loading_icon, { key: 0 })) : (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            class: "u-modal__button-group__wrapper__text",
                            style: vue.normalizeStyle({
                              color: _ctx.confirmColor
                            })
                          },
                          vue.toDisplayString(_ctx.confirmText),
                          5
                          /* TEXT, STYLE */
                        ))
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["zoom", "show", "customStyle", "closeOnClickOverlay", "onClick"]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-f667648f"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-modal/u-modal.vue"]]);
  function routingIntercept(to, from, next) {
    const token = uni.getStorageSync("token");
    if (!token || token == null || token == "") {
      uni.showToast({
        title: "请先登录",
        icon: "none"
      });
      uni.redirectTo({
        url: "/pages/index/index"
        // 请根据实际路由路径进行调整
      });
    } else {
      next();
    }
  }
  const _sfc_main$l = {
    data() {
      return {
        cover: "",
        // 存储头像的 URL
        show: false,
        title: "积分规则",
        content: "学习专题加十分",
        user: {
          name: "",
          head: "",
          score: ""
        }
      };
    },
    mounted() {
      this.get();
      this.getuser();
    },
    onShow() {
      formatAppLog("log", "at pages/my/my.vue:74", "我的主页");
      routingIntercept();
      this.getuser();
    },
    methods: {
      upload() {
        uni.chooseImage({
          count: 1,
          // 只允许选择一张图片
          sizeType: ["original", "compressed"],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album"],
          // 从相册选择
          success: (chooseImageRes) => {
            uni.compressImage({
              src: chooseImageRes.tempFilePaths[0],
              quality: 50,
              // 压缩质量
              success: (compressRes) => {
                this.cover = chooseImageRes.tempFilePaths[0];
                uni.uploadFile({
                  url: base_url + "/user/updatehead",
                  // 替换为实际的上传接口地址
                  filePath: compressRes.tempFilePath,
                  // 上传的文件路径
                  name: "imageFile",
                  // 服务器接收文件的字段名
                  formData: {
                    id: uni.getStorageSync("name").id
                    // 其他表单数据
                  },
                  header: {
                    "Authorization": uni.getStorageSync("token")
                    // 添加认证头部
                  },
                  success: (uploadRes) => {
                    formatAppLog("log", "at pages/my/my.vue:105", "上传成功", uploadRes);
                  },
                  fail: (uploadErr) => {
                    formatAppLog("log", "at pages/my/my.vue:109", "上传失败", uploadErr);
                  }
                });
              },
              fail: (compressErr) => {
                formatAppLog("log", "at pages/my/my.vue:115", "压缩图片失败", compressErr);
              }
            });
          },
          fail: (chooseImageErr) => {
            formatAppLog("log", "at pages/my/my.vue:121", "选择图片失败", chooseImageErr);
          }
        });
      },
      showModal() {
        this.show = true;
      },
      confirm() {
        this.show = false;
      },
      gotopassword() {
        uni.navigateTo({
          url: "/pages/password/password"
        });
      },
      async logout() {
        try {
          const response = await uni.request({
            url: base_url + "/user/logout",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {}
          });
          uni.navigateTo({
            url: "/pages/index/index"
          });
          uni.setStorageSync("token", null);
        } catch (e) {
          formatAppLog("log", "at pages/my/my.vue:157", "error");
          formatAppLog("log", "at pages/my/my.vue:158", e);
        }
      },
      async get() {
        const that = this;
        try {
          that.user.name = uni.getStorageSync("name").username;
          that.user.score = uni.getStorageSync("name").score;
        } catch (e) {
          formatAppLog("log", "at pages/my/my.vue:168", e);
        }
      },
      async getuser() {
        const that = this;
        const num = uni.getStorageSync("name").username;
        try {
          const response = await uni.request({
            url: base_url + "/user/userByname",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "username": num
            }
          });
          formatAppLog("log", "at pages/my/my.vue:186", response);
          that.user.score = response.data.data[0].score;
          that.cover = response.data.data[0].head;
        } catch (e) {
          formatAppLog("log", "at pages/my/my.vue:190", "error");
          formatAppLog("log", "at pages/my/my.vue:191", e);
        }
      },
      gotoscore() {
        uni.navigateTo({
          url: "/pages/score/score"
        });
      },
      gotostudy() {
        uni.navigateTo({
          url: "/pages/study/study"
        });
      },
      gotoself() {
        uni.navigateTo({
          url: "/pages/mybooklist/mybooklist"
        });
      },
      gotoword() {
        uni.navigateTo({
          url: "/pages/myword/myword"
        });
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", {
          class: "",
          style: { "background": "linear-gradient(to right, #ff5500, #ff5e62)", "position": "fixed", "width": "100vw", "height": "5rem", "z-index": "-1" }
        }),
        vue.createCommentVNode(" 头部区域 "),
        vue.createElementVNode("view", { class: "pa-10" }, [
          vue.createElementVNode("view", {
            class: "ra-50 ma-10 bg-s inbox",
            style: { "width": "4rem", "height": "4rem" },
            onClick: _cache[0] || (_cache[0] = (...args) => $options.upload && $options.upload(...args))
          }, [
            vue.createCommentVNode(' 这里使用 :src="cover"  将src动态赋值'),
            vue.createElementVNode("image", {
              src: $data.cover,
              class: "ra-50",
              style: { "width": "4rem", "height": "4rem" }
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "inbox pa-10 fo-w",
              style: { "font-size": "1rem", "position": "absolute", "top": "2rem" }
            },
            vue.toDisplayString($data.user.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "pa-10" },
            " 学习积分:" + vue.toDisplayString($data.user.score),
            1
            /* TEXT */
          ),
          vue.createCommentVNode(" 下面的区域 "),
          vue.createElementVNode("view", { class: "pa-10 border ra-10" }, [
            vue.createElementVNode("view", {
              class: "pa-10 border-b",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.gotoscore())
            }, " 我的积分 "),
            vue.createElementVNode("view", {
              class: "pa-10 border-b",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.gotostudy())
            }, " 我的学习 "),
            vue.createElementVNode("view", {
              class: "pa-10 border-b",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.gotoself())
            }, " 我的书架 "),
            vue.createElementVNode("view", {
              class: "pa-10 border-b",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.gotoword())
            }, " 我的留言 "),
            vue.createElementVNode("view", {
              class: "pa-10 border-b",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.showModal())
            }, " 积分规则 ")
          ]),
          vue.createElementVNode("view", { class: "pa-10" }, [
            vue.createElementVNode("button", {
              class: "fo-w ra-20",
              style: { "background": "linear-gradient(to right, #ff5500, #ff5e62)" },
              onClick: _cache[6] || (_cache[6] = ($event) => $options.gotopassword())
            }, "修改密码")
          ]),
          vue.createElementVNode("view", { class: "pa-10" }, [
            vue.createElementVNode("view", {
              class: "ra-20 pos",
              style: { "top": "8rem", "right": "3rem", "color": "#ff5500" },
              onClick: _cache[7] || (_cache[7] = (...args) => $options.logout && $options.logout(...args))
            }, "退出登录")
          ])
        ]),
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_u_modal, {
            show: $data.show,
            title: $data.title,
            content: $data.content,
            onConfirm: $options.confirm,
            ref: "uModal",
            asyncClose: true
          }, null, 8, ["show", "title", "content", "onConfirm"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "D:/before/Project/uniApp/pages/my/my.vue"]]);
  const props$5 = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: props$i.badge.isDot
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: props$i.badge.value
      },
      // 显示的内容
      modelValue: {
        type: [Number, String],
        default: props$i.badge.modelValue
      },
      // 是否显示
      show: {
        type: Boolean,
        default: props$i.badge.show
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: props$i.badge.max
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: String,
        default: props$i.badge.type
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: props$i.badge.showZero
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: props$i.badge.bgColor
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: props$i.badge.color
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: String,
        default: props$i.badge.shape
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: String,
        default: props$i.badge.numberType
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: props$i.badge.offset
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: props$i.badge.inverted
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: props$i.badge.absolute
      }
    }
  };
  const _sfc_main$k = {
    name: "u-badge",
    mixins: [mpMixin, props$5, mixin],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = uni.$u.addUnit(top);
            style.right = uni.$u.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "u-badge--dot" : "u-badge--not-dot", _ctx.inverted && "u-badge--inverted", _ctx.shape === "horn" && "u-badge--horn", `u-badge--${_ctx.type}${_ctx.inverted ? "--inverted" : ""}`], "u-badge"]),
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-06cca9b7"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-badge/u-badge.vue"]]);
  const props$4 = {
    props: {
      // 滑块的移动过渡时间，单位ms
      duration: {
        type: Number,
        default: props$i.tabs.duration
      },
      // tabs标签数组
      list: {
        type: Array,
        default: props$i.tabs.list
      },
      // 滑块颜色
      lineColor: {
        type: String,
        default: props$i.tabs.lineColor
      },
      // 菜单选择中时的样式
      activeStyle: {
        type: [String, Object],
        default: props$i.tabs.activeStyle
      },
      // 菜单非选中时的样式
      inactiveStyle: {
        type: [String, Object],
        default: props$i.tabs.inactiveStyle
      },
      // 滑块长度
      lineWidth: {
        type: [String, Number],
        default: props$i.tabs.lineWidth
      },
      // 滑块高度
      lineHeight: {
        type: [String, Number],
        default: props$i.tabs.lineHeight
      },
      // 滑块背景显示大小，当滑块背景设置为图片时使用
      lineBgSize: {
        type: String,
        default: props$i.tabs.lineBgSize
      },
      // 菜单item的样式
      itemStyle: {
        type: [String, Object],
        default: props$i.tabs.itemStyle
      },
      // 菜单是否可滚动
      scrollable: {
        type: Boolean,
        default: props$i.tabs.scrollable
      },
      // 当前选中标签的索引
      current: {
        type: [Number, String],
        default: props$i.tabs.current
      },
      // 默认读取的键名
      keyName: {
        type: String,
        default: props$i.tabs.keyName
      }
    }
  };
  const _sfc_main$j = {
    name: "u-tabs",
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {
        firstTime: true,
        scrollLeft: 0,
        scrollViewWidth: 0,
        lineOffsetLeft: 0,
        tabsRect: {
          left: 0
        },
        innerCurrent: 0,
        moving: false
      };
    },
    watch: {
      current: {
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue !== this.innerCurrent) {
            this.innerCurrent = newValue;
            this.$nextTick(() => {
              this.resize();
            });
          }
        }
      },
      // list变化时，重新渲染list各项信息
      list() {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    computed: {
      textStyle() {
        return (index2) => {
          const style = {};
          const customeStyle = index2 === this.innerCurrent ? uni.$u.addStyle(this.activeStyle) : uni.$u.addStyle(
            this.inactiveStyle
          );
          if (this.list[index2].disabled) {
            style.color = "#c8c9cc";
          }
          return uni.$u.deepMerge(customeStyle, style);
        };
      },
      propsBadge() {
        return uni.$u.props.badge;
      }
    },
    async mounted() {
      this.init();
    },
    emits: ["click", "change"],
    methods: {
      setLineLeft() {
        const tabItem = this.list[this.innerCurrent];
        if (!tabItem) {
          return;
        }
        let lineOffsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => total + curr.rect.width, 0);
        const lineWidth = uni.$u.getPx(this.lineWidth);
        this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
        if (this.firstTime) {
          setTimeout(() => {
            this.firstTime = false;
          }, 10);
        }
      },
      // nvue下设置滑块的位置
      animation(x, duration = 0) {
      },
      // 点击某一个标签
      clickHandler(item, index2) {
        this.$emit("click", {
          ...item,
          index: index2
        });
        if (item.disabled)
          return;
        this.innerCurrent = index2;
        this.resize();
        this.$emit("change", {
          ...item,
          index: index2
        });
      },
      init() {
        uni.$u.sleep().then(() => {
          this.resize();
        });
      },
      setScrollLeft() {
        const tabRect = this.list[this.innerCurrent];
        const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
          return total + curr.rect.width;
        }, 0);
        const windowWidth = uni.$u.sys().windowWidth;
        let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect.right) / 2 + this.tabsRect.left / 2;
        scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width);
        this.scrollLeft = Math.max(0, scrollLeft);
      },
      // 获取所有标签的尺寸
      resize() {
        if (this.list.length === 0) {
          return;
        }
        Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
          this.tabsRect = tabsRect;
          this.scrollViewWidth = 0;
          itemRect.map((item, index2) => {
            this.scrollViewWidth += item.width;
            this.list[index2].rect = item;
          });
          this.setLineLeft();
          this.setScrollLeft();
        });
      },
      // 获取导航菜单的尺寸
      getTabsRect() {
        return new Promise((resolve) => {
          this.queryRect("u-tabs__wrapper__scroll-view").then((size) => resolve(size));
        });
      },
      // 获取所有标签的尺寸
      getAllItemRect() {
        return new Promise((resolve) => {
          const promiseAllArr = this.list.map((item, index2) => this.queryRect(
            `u-tabs__wrapper__nav__item-${index2}`,
            true
          ));
          Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
        });
      },
      // 获取各个标签的尺寸
      queryRect(el, item) {
        return new Promise((resolve) => {
          this.$uGetRect(`.${el}`).then((size) => {
            resolve(size);
          });
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-tabs" }, [
      vue.createElementVNode("view", { class: "u-tabs__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
        vue.createElementVNode("view", { class: "u-tabs__wrapper__scroll-view-wrapper" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": _ctx.scrollable,
            "scroll-left": $data.scrollLeft,
            "scroll-with-animation": "",
            class: "u-tabs__wrapper__scroll-view",
            "show-scrollbar": false,
            ref: "u-tabs__wrapper__scroll-view"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "u-tabs__wrapper__nav",
                ref: "u-tabs__wrapper__nav"
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.list, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["u-tabs__wrapper__nav__item", [`u-tabs__wrapper__nav__item-${index2}`, item.disabled && "u-tabs__wrapper__nav__item--disabled"]]),
                      key: index2,
                      onClick: ($event) => $options.clickHandler(item, index2),
                      ref_for: true,
                      ref: `u-tabs__wrapper__nav__item-${index2}`,
                      style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.itemStyle), { flex: _ctx.scrollable ? "" : 1 }])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass([[item.disabled && "u-tabs__wrapper__nav__item__text--disabled"], "u-tabs__wrapper__nav__item__text"]),
                          style: vue.normalizeStyle([$options.textStyle(index2)])
                        },
                        vue.toDisplayString(item[_ctx.keyName]),
                        7
                        /* TEXT, CLASS, STYLE */
                      ),
                      vue.createVNode(_component_u_badge, {
                        show: !!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value)),
                        isDot: item.badge && item.badge.isDot || $options.propsBadge.isDot,
                        value: item.badge && item.badge.value || $options.propsBadge.value,
                        max: item.badge && item.badge.max || $options.propsBadge.max,
                        type: item.badge && item.badge.type || $options.propsBadge.type,
                        showZero: item.badge && item.badge.showZero || $options.propsBadge.showZero,
                        bgColor: item.badge && item.badge.bgColor || $options.propsBadge.bgColor,
                        color: item.badge && item.badge.color || $options.propsBadge.color,
                        shape: item.badge && item.badge.shape || $options.propsBadge.shape,
                        numberType: item.badge && item.badge.numberType || $options.propsBadge.numberType,
                        inverted: item.badge && item.badge.inverted || $options.propsBadge.inverted,
                        customStyle: "margin-left: 4px;"
                      }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])
                    ], 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-tabs__wrapper__nav__line",
                    ref: "u-tabs__wrapper__nav__line",
                    style: vue.normalizeStyle([{
                      width: _ctx.$u.addUnit(_ctx.lineWidth),
                      transform: `translate(${$data.lineOffsetLeft}px)`,
                      transitionDuration: `${$data.firstTime ? 0 : _ctx.duration}ms`,
                      height: _ctx.$u.addUnit(_ctx.lineHeight),
                      background: _ctx.lineColor,
                      backgroundSize: _ctx.lineBgSize
                    }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              512
              /* NEED_PATCH */
            )
          ], 8, ["scroll-x", "scroll-left"])
        ]),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-02b0c54f"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-tabs/u-tabs.vue"]]);
  const _sfc_main$i = {
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
      const page2 = this.page;
      const label = this.namevalue;
      if (label == 0) {
        this.getallessay(page2, 10, 0);
      } else {
        this.getessay(page2, 10, label);
      }
    },
    methods: {
      click(item, index2) {
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
          const response = await uni.request({
            url: base_url + "/essay/getlimitbylabel",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.creatTime);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
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
          formatAppLog("log", "at pages/special/special.vue:163", "error");
          formatAppLog("log", "at pages/special/special.vue:164", e);
        }
      },
      // 获取全部
      async getallessay(num, num1, num2) {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/essay/getlimit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "num": num,
              "pagesize": num1
            }
          });
          var list1 = [];
          list1 = response.data.data;
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.creatTime);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
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
          formatAppLog("log", "at pages/special/special.vue:202", "error");
          formatAppLog("log", "at pages/special/special.vue:203", e);
        }
      },
      // 获取历史
      async gethis() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/history/getlist",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "userId": uni.getStorageSync("name").id
            }
          });
          var list1 = [];
          list1 = response.data.data;
          list1.forEach(function(item, index2) {
            that.listhis.push(item.essayId);
          });
        } catch (e) {
          formatAppLog("log", "at pages/special/special.vue:227", "error");
          formatAppLog("log", "at pages/special/special.vue:228", e);
        }
      },
      // 补零函数
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      },
      // 去文章
      gotoessay(num) {
        formatAppLog("log", "at pages/special/special.vue:238", num);
        uni.navigateTo({
          url: "/pages/essay/essay?num=" + num
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_tabs = resolveEasycom(vue.resolveDynamicComponent("u-tabs"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_u_tabs, {
            list: $data.list0,
            onClick: $options.click,
            lineColor: "#e2510e"
          }, null, 8, ["list", "onClick"])
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list0[$data.namevalue].essay, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "",
              key: index2,
              onClick: ($event) => $options.gotoessay(item.essayId)
            }, [
              vue.createElementVNode("view", {
                class: "ma-10 pa-10 rel",
                style: { "border-radius": "0.3rem", "background-color": "#f9f9f9" }
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "overflow-ellipsis",
                    style: { "font-size": "1.1rem" }
                  },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "fo-g",
                    style: { "font-size": "0.8rem" }
                  },
                  vue.toDisplayString(item.creatTime),
                  1
                  /* TEXT */
                ),
                item.show == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "red pos",
                  style: { "right": "2rem", "top": "40%" }
                }, " 未学习 ")) : vue.createCommentVNode("v-if", true),
                item.show == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "green pos",
                  style: { "right": "2rem", "top": "40%" }
                }, " 已学习 ")) : vue.createCommentVNode("v-if", true)
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSpecialSpecial = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-b4bddda2"], ["__file", "D:/before/Project/uniApp/pages/special/special.vue"]]);
  const props$3 = {
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: props$i.cell.title
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: props$i.cell.label
      },
      // 右侧的内容
      value: {
        type: [String, Number],
        default: props$i.cell.value
      },
      // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
      icon: {
        type: String,
        default: props$i.cell.icon
      },
      // 是否禁用cell
      disabled: {
        type: Boolean,
        default: props$i.cell.disabled
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: props$i.cell.border
      },
      // 内容是否垂直居中(主要是针对右侧的value部分)
      center: {
        type: Boolean,
        default: props$i.cell.center
      },
      // 点击后跳转的URL地址
      url: {
        type: String,
        default: props$i.cell.url
      },
      // 链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作
      linkType: {
        type: String,
        default: props$i.cell.linkType
      },
      // 是否开启点击反馈(表现为点击时加上灰色背景)
      clickable: {
        type: Boolean,
        default: props$i.cell.clickable
      },
      // 是否展示右侧箭头并开启点击反馈
      isLink: {
        type: Boolean,
        default: props$i.cell.isLink
      },
      // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
      required: {
        type: Boolean,
        default: props$i.cell.required
      },
      // 右侧的图标箭头
      rightIcon: {
        type: String,
        default: props$i.cell.rightIcon
      },
      // 右侧箭头的方向，可选值为：left，up，down
      arrowDirection: {
        type: String,
        default: props$i.cell.arrowDirection
      },
      // 左侧图标样式
      iconStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.iconStyle;
        }
      },
      // 右侧箭头图标的样式
      rightIconStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.rightIconStyle;
        }
      },
      // 标题的样式
      titleStyle: {
        type: [Object, String],
        default: () => {
          return uni.$u.props.cell.titleStyle;
        }
      },
      // 单位元的大小，可选值为large
      size: {
        type: String,
        default: props$i.cell.size
      },
      // 点击cell是否阻止事件传播
      stop: {
        type: Boolean,
        default: props$i.cell.stop
      },
      // 标识符，cell被点击时返回
      name: {
        type: [Number, String],
        default: props$i.cell.name
      }
    }
  };
  const _sfc_main$h = {
    name: "u-cell",
    data() {
      return {};
    },
    mixins: [mpMixin, mixin, props$3],
    computed: {
      titleTextStyle() {
        return uni.$u.addStyle(this.titleStyle);
      }
    },
    emits: ["click"],
    methods: {
      // 点击cell
      clickHandler(e) {
        if (this.disabled)
          return;
        this.$emit("click", {
          name: this.name
        });
        this.openPage();
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$9);
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-cell", [_ctx.customClass]]),
      style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
      "hover-class": !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "u-cell--clickable" : "",
      "hover-stay-time": 250,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell__body", [_ctx.center && "u-cell--center", _ctx.size === "large" && "u-cell__body--large"]])
        },
        [
          vue.createElementVNode("view", { class: "u-cell__body__content" }, [
            vue.createElementVNode("view", { class: "u-cell__left-icon-wrap" }, [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: _ctx.icon,
                  "custom-style": _ctx.iconStyle,
                  size: _ctx.size === "large" ? 22 : 18
                }, null, 8, ["name", "custom-style", "size"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ]),
            vue.createElementVNode("view", { class: "u-cell__title" }, [
              vue.renderSlot(_ctx.$slots, "title", {}, () => [
                _ctx.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["u-cell__title-text", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__title-text--large"]]),
                    style: vue.normalizeStyle([$options.titleTextStyle])
                  },
                  vue.toDisplayString(_ctx.title),
                  7
                  /* TEXT, CLASS, STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ], true),
              vue.renderSlot(_ctx.$slots, "label", {}, () => [
                _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["u-cell__label", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__label--large"]])
                  },
                  vue.toDisplayString(_ctx.label),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "value", {}, () => [
            !_ctx.$u.test.empty(_ctx.value) ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["u-cell__value", [_ctx.disabled && "u-cell--disabled", _ctx.size === "large" && "u-cell__value--large"]])
              },
              vue.toDisplayString(_ctx.value),
              3
              /* TEXT, CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["u-cell__right-icon-wrap", [`u-cell__right-icon-wrap--${_ctx.arrowDirection}`]])
            },
            [
              vue.renderSlot(_ctx.$slots, "right-icon", {}, () => [
                _ctx.isLink ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: _ctx.rightIcon,
                  "custom-style": _ctx.rightIconStyle,
                  color: _ctx.disabled ? "#c8c9cc" : "info",
                  size: _ctx.size === "large" ? 18 : 16
                }, null, 8, ["name", "custom-style", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      _ctx.border ? (vue.openBlock(), vue.createBlock(_component_u_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-3fd6feca"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-cell/u-cell.vue"]]);
  const props$2 = {
    props: {
      // 分组标题
      title: {
        type: String,
        default: props$i.cellGroup.title
      },
      // 是否显示外边框
      border: {
        type: Boolean,
        default: props$i.cellGroup.border
      }
    }
  };
  const _sfc_main$g = {
    name: "u-cell-group",
    mixins: [mpMixin, mixin, props$2]
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
        class: vue.normalizeClass([[_ctx.customClass], "u-cell-group"])
      },
      [
        _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-cell-group__title"
        }, [
          vue.renderSlot(_ctx.$slots, "title", {}, () => [
            vue.createElementVNode(
              "text",
              { class: "u-cell-group__title__text" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ], true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "u-cell-group__wrapper" }, [
          _ctx.border ? (vue.openBlock(), vue.createBlock(_component_u_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-014d39dc"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-cell-group/u-cell-group.vue"]]);
  const props$1 = {
    props: {
      // 是否虚线
      dashed: {
        type: Boolean,
        default: props$i.divider.dashed
      },
      // 是否细线
      hairline: {
        type: Boolean,
        default: props$i.divider.hairline
      },
      // 是否以点替代文字，优先于text字段起作用
      dot: {
        type: Boolean,
        default: props$i.divider.dot
      },
      // 内容文本的位置，left-左边，center-中间，right-右边
      textPosition: {
        type: String,
        default: props$i.divider.textPosition
      },
      // 文本内容
      text: {
        type: [String, Number],
        default: props$i.divider.text
      },
      // 文本大小
      textSize: {
        type: [String, Number],
        default: props$i.divider.textSize
      },
      // 文本颜色
      textColor: {
        type: String,
        default: props$i.divider.textColor
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: props$i.divider.lineColor
      }
    }
  };
  const _sfc_main$f = {
    name: "u-divider",
    mixins: [mpMixin, mixin, props$1],
    computed: {
      textStyle() {
        const style = {};
        style.fontSize = uni.$u.addUnit(this.textSize);
        style.color = this.textColor;
        return style;
      },
      // 左边线条的的样式
      leftLineStyle() {
        const style = {};
        if (this.textPosition === "left") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      },
      // 右边线条的的样式
      rightLineStyle() {
        const style = {};
        if (this.textPosition === "right") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      }
    },
    methods: {
      // divider组件被点击时触发
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-divider",
        style: vue.normalizeStyle([_ctx.$u.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createVNode(_component_u_line, {
          color: _ctx.lineColor,
          customStyle: $options.leftLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"]),
        _ctx.dot ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "u-divider__dot"
        }, "●")) : _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-divider__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_u_line, {
          color: _ctx.lineColor,
          customStyle: $options.rightLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-ea022cee"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-divider/u-divider.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        list: []
      };
    },
    onShow() {
      this.getscore();
    },
    methods: {
      async getscore() {
        const that = this;
        const num = uni.getStorageSync("name");
        formatAppLog("log", "at pages/score/score.vue:38", num);
        try {
          const response = await uni.request({
            url: base_url + "/history/getlist",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "userId": uni.getStorageSync("name").id
            }
          });
          formatAppLog("log", "at pages/score/score.vue:50", "更新哦");
          formatAppLog("log", "at pages/score/score.vue:51", response);
          var list1 = [];
          list1 = response.data.data;
          formatAppLog("log", "at pages/score/score.vue:55", response);
          formatAppLog("log", "at pages/score/score.vue:56", list1);
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.time);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
            var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
            item.time = formattedDate;
            item.score = "+" + item.score;
          });
          that.list = list1;
          formatAppLog("log", "at pages/score/score.vue:67", that.list);
        } catch (e) {
          formatAppLog("log", "at pages/score/score.vue:69", "error");
          formatAppLog("log", "at pages/score/score.vue:70", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_cell = resolveEasycom(vue.resolveDynamicComponent("u-cell"), __easycom_0$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_1);
    const _component_u_divider = resolveEasycom(vue.resolveDynamicComponent("u-divider"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "bg-g pa-10" }, [
      vue.createElementVNode("view", { class: "bg-w" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "",
              key: item.index
            }, [
              vue.createVNode(
                _component_u_cell_group,
                null,
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_cell, {
                      size: "large",
                      title: item.name,
                      value: item.score
                    }, null, 8, ["title", "value"]),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "fo-g",
                        style: { "font-size": "0.2rem", "padding": "0.2rem" }
                      },
                      vue.toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", {
          class: "",
          style: { "padding": "0.2rem" }
        }, [
          vue.createVNode(_component_u_divider, { text: "没有更多了" })
        ])
      ])
    ]);
  }
  const PagesScoreScore = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "D:/before/Project/uniApp/pages/score/score.vue"]]);
  const _sfc_main$d = {
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
        formatAppLog("log", "at pages/study/study.vue:37", "我是获取");
        formatAppLog("log", "at pages/study/study.vue:38", num);
        uni.setStorageSync("essayid", num);
        uni.navigateTo({
          url: "/pages/essay/essay"
        });
      },
      async study() {
        const that = this;
        const num = uni.getStorageSync("name");
        formatAppLog("log", "at pages/study/study.vue:47", num);
        try {
          const response = await uni.request({
            url: base_url + "/essay/getlist",
            // 替换为实际的 API 地址
            method: "GET",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {}
          });
          var list1 = [];
          list1 = response.data.data;
          formatAppLog("log", "at pages/study/study.vue:59", response);
          formatAppLog("log", "at pages/study/study.vue:60", list1);
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.creatTime);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
            var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
            item.creatTime = formattedDate;
            let exists = that.listhis.includes(item.essayId);
            if (exists) {
              item.show = 1;
            } else {
            }
          });
          that.list = list1;
          formatAppLog("log", "at pages/study/study.vue:75", that.list);
        } catch (e) {
          formatAppLog("log", "at pages/study/study.vue:77", "error");
          formatAppLog("log", "at pages/study/study.vue:78", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      },
      async getstudy() {
        const that = this;
        const num = uni.getStorageSync("name").id;
        try {
          const response = await uni.request({
            url: base_url + "/history/getlist",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "userId": num
            }
          });
          formatAppLog("log", "at pages/study/study.vue:99", "获取记录成功");
          var list1 = [];
          list1 = response.data.data;
          var list = [];
          list1.forEach(function(item, index2) {
            list.push(item.essayId);
          });
          that.listhis = list;
          formatAppLog("log", "at pages/study/study.vue:107", "获取的记录id");
          formatAppLog("log", "at pages/study/study.vue:108", that.listhis);
        } catch (e) {
          formatAppLog("log", "at pages/study/study.vue:110", "error");
          formatAppLog("log", "at pages/study/study.vue:111", e);
        }
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_cell = resolveEasycom(vue.resolveDynamicComponent("u-cell"), __easycom_0$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_1);
    const _component_u_divider = resolveEasycom(vue.resolveDynamicComponent("u-divider"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "bg-g pa-10" }, [
      vue.createElementVNode("view", { class: "bg-w" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "",
              key: item.index,
              onClick: ($event) => $options.gotoessay(item.essayId)
            }, [
              vue.createVNode(
                _component_u_cell_group,
                null,
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_cell, {
                      size: "large",
                      title: item.title,
                      value: "已学习"
                    }, null, 8, ["title"]),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "fo-g",
                        style: { "font-size": "0.2rem", "padding": "0.2rem" }
                      },
                      vue.toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", {
          class: "",
          style: { "padding": "0.2rem" }
        }, [
          vue.createVNode(_component_u_divider, { text: "没有更多了" })
        ])
      ])
    ]);
  }
  const PagesStudyStudy = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "D:/before/Project/uniApp/pages/study/study.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        num: 0,
        list: [],
        page: 1,
        index: 0,
        value: "",
        show: false
      };
    },
    onLoad: function(option) {
    },
    onShow() {
      this.getbook(1, 6, this.num);
    },
    // // 下拉刷新
    onPullDownRefresh() {
      this.page = 0;
      setTimeout(() => {
        this.getbook(1, 6, this.num);
        uni.stopPullDownRefresh();
      }, 1e3);
    },
    // // 触底事件
    onReachBottom() {
      this.page++;
      this.getbook(this.page, 6, this.num);
    },
    methods: {
      async getbook() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/book/search",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "bookName": that.value,
              "show": 1
            }
          });
          that.list = response.data.data;
          formatAppLog("log", "at pages/search/search.vue:86", response);
          formatAppLog("log", "at pages/search/search.vue:87", that.list);
        } catch (e) {
          formatAppLog("log", "at pages/search/search.vue:91", "error");
          formatAppLog("log", "at pages/search/search.vue:92", e);
        }
      },
      gotobook(num) {
        uni.navigateTo({
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_search = resolveEasycom(vue.resolveDynamicComponent("u-search"), __easycom_0$8);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "pa-10" }, [
          vue.createVNode(_component_u_search, {
            placeholder: "请输入搜索书籍名",
            modelValue: $data.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value = $event),
            clearabled: true,
            onSearch: _cache[1] || (_cache[1] = ($event) => $options.getbook()),
            onCustom: _cache[2] || (_cache[2] = ($event) => $options.getbook())
          }, null, 8, ["modelValue"])
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "bg-g ra-10 pa-10 rel",
              key: index2,
              style: { "margin": "1rem 0.8rem" }
            }, [
              vue.createCommentVNode(" 书的封面 "),
              vue.createElementVNode("view", {
                class: "bg-w inbox",
                style: { "width": "6rem", "height": "7rem" },
                onClick: ($event) => $options.gotobook(item.bookid)
              }, [
                vue.createElementVNode("img", {
                  src: item.bookImg,
                  style: { "width": "100%", "height": "100%" },
                  class: "inbox"
                }, null, 8, ["src"])
              ], 8, ["onClick"]),
              vue.createCommentVNode(" 书名 "),
              vue.createElementVNode("view", {
                class: "inbox pos pa-l10",
                style: { "top": "1rem", "font-size": "1.2rem", "font-weight": "700", "width": "12rem" },
                onClick: ($event) => $options.gotobook(item.bookid)
              }, vue.toDisplayString(item.bookName), 9, ["onClick"]),
              vue.createCommentVNode(" 书的作者 "),
              vue.createElementVNode("view", {
                class: "inbox pos pa-l10",
                style: { "top": "2.5rem", "font-size": "0.9rem", "margin": "0.6rem 0", "width": "12rem" },
                onClick: ($event) => $options.gotobook(item.bookid)
              }, vue.toDisplayString(item.bookAuther), 9, ["onClick"]),
              vue.createCommentVNode(" 书的简介 "),
              vue.createElementVNode("view", {
                class: "inbox fo-g pa-l10 text-container pa-t10",
                onClick: ($event) => $options.open(index2)
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "overflow-ellipsis" },
                  vue.toDisplayString(item.bookIntroduce),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", { class: "pa-10" }),
        vue.createVNode(_component_u_popup, {
          show: $data.show,
          mode: "center",
          onClose: $options.close
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: "",
                style: { "padding": "0.5rem", "margin": "0.5rem", "border-radius": "0.6rem" }
              },
              vue.toDisplayString($data.list[$data.index].bookIntroduce),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show", "onClose"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-c10c040c"], ["__file", "D:/before/Project/uniApp/pages/search/search.vue"]]);
  const props = {
    props: {
      // 输入框的内容
      value: {
        type: [String, Number],
        default: props$i.textarea.value
      },
      // 输入框的内容
      modelValue: {
        type: [String, Number],
        default: props$i.textarea.value
      },
      // 输入框为空时占位符
      placeholder: {
        type: [String, Number],
        default: props$i.textarea.placeholder
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: props$i.input.placeholderClass
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: props$i.input.placeholderStyle
      },
      // 输入框高度
      height: {
        type: [String, Number],
        default: props$i.textarea.height
      },
      // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
      confirmType: {
        type: String,
        default: props$i.textarea.confirmType
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: props$i.textarea.disabled
      },
      // 是否显示统计字数
      count: {
        type: Boolean,
        default: props$i.textarea.count
      },
      // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
      focus: {
        type: Boolean,
        default: props$i.textarea.focus
      },
      // 是否自动增加高度
      autoHeight: {
        type: Boolean,
        default: props$i.textarea.autoHeight
      },
      // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
      fixed: {
        type: Boolean,
        default: props$i.textarea.fixed
      },
      // 指定光标与键盘的距离
      cursorSpacing: {
        type: Number,
        default: props$i.textarea.cursorSpacing
      },
      // 指定focus时的光标位置
      cursor: {
        type: [String, Number],
        default: props$i.textarea.cursor
      },
      // 是否显示键盘上方带有”完成“按钮那一栏，
      showConfirmBar: {
        type: Boolean,
        default: props$i.textarea.showConfirmBar
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: Number,
        default: props$i.textarea.selectionStart
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: Number,
        default: props$i.textarea.selectionEnd
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: props$i.textarea.adjustPosition
      },
      // 是否去掉 iOS 下的默认内边距，只微信小程序有效
      disableDefaultPadding: {
        type: Boolean,
        default: props$i.textarea.disableDefaultPadding
      },
      // focus时，点击页面的时候不收起键盘，只微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: props$i.textarea.holdKeyboard
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: props$i.textarea.maxlength
      },
      // 边框类型，surround-四周边框，bottom-底部边框
      border: {
        type: String,
        default: props$i.textarea.border
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: props$i.textarea.formatter
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      }
    }
  };
  const _sfc_main$b = {
    name: "u-textarea",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value) => value
      };
    },
    created() {
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          this.innerValue = newVal;
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 组件的类名
      textareaClass() {
        let classes = [], { border, disabled } = this;
        border === "surround" && (classes = classes.concat(["u-border", "u-textarea--radius"]));
        border === "bottom" && (classes = classes.concat([
          "u-border-bottom",
          "u-textarea--no-radius"
        ]));
        disabled && classes.push("u-textarea--disabled");
        return classes.join(" ");
      },
      // 组件的样式
      textareaStyle() {
        const style = {};
        return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
      }
    },
    emits: ["update:modelValue", "linechange", "focus", "blur", "change", "confirm", "keyboardheightchange"],
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      onFocus(e) {
        this.$emit("focus", e);
      },
      onBlur(e) {
        this.$emit("blur", e);
        uni.$u.formValidate(this, "blur");
      },
      onLinechange(e) {
        this.$emit("linechange", e);
      },
      onInput(e) {
        let { value = "" } = e.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value);
        this.innerValue = value;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value = this.innerValue;
        this.$nextTick(() => {
          this.$emit("update:modelValue", value);
          this.changeFromInner = true;
          this.$emit("change", value);
          uni.$u.formValidate(this, "change");
        });
      },
      onConfirm(e) {
        this.$emit("confirm", e);
      },
      onKeyboardheightchange(e) {
        this.$emit("keyboardheightchange", e);
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-textarea", $options.textareaClass]),
        style: vue.normalizeStyle([$options.textareaStyle])
      },
      [
        vue.createElementVNode("textarea", {
          class: "u-textarea__field",
          value: $data.innerValue,
          style: vue.normalizeStyle({ height: _ctx.$u.addUnit(_ctx.height) }),
          placeholder: _ctx.placeholder,
          "placeholder-style": _ctx.$u.addStyle(_ctx.placeholderStyle, "string"),
          "placeholder-class": _ctx.placeholderClass,
          disabled: _ctx.disabled,
          focus: _ctx.focus,
          autoHeight: _ctx.autoHeight,
          fixed: _ctx.fixed,
          cursorSpacing: _ctx.cursorSpacing,
          cursor: _ctx.cursor,
          showConfirmBar: _ctx.showConfirmBar,
          selectionStart: _ctx.selectionStart,
          selectionEnd: _ctx.selectionEnd,
          adjustPosition: _ctx.adjustPosition,
          disableDefaultPadding: _ctx.disableDefaultPadding,
          holdKeyboard: _ctx.holdKeyboard,
          maxlength: _ctx.maxlength,
          "confirm-type": _ctx.confirmType,
          ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
          onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onLinechange: _cache[2] || (_cache[2] = (...args) => $options.onLinechange && $options.onLinechange(...args)),
          onInput: _cache[3] || (_cache[3] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args))
        }, null, 44, ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "focus", "autoHeight", "fixed", "cursorSpacing", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "adjustPosition", "disableDefaultPadding", "holdKeyboard", "maxlength", "confirm-type", "ignoreCompositionEvent"]),
        _ctx.count ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "u-textarea__count",
            style: vue.normalizeStyle({
              "background-color": _ctx.disabled ? "transparent" : "#fff"
            })
          },
          vue.toDisplayString($data.innerValue.length) + "/" + vue.toDisplayString(_ctx.maxlength),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const uvTextarea = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-b6c174a6"], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u-textarea/u-textarea.vue"]]);
  const _sfc_main$a = {
    name: "u--textarea",
    mixins: [mpMixin, props, mixin],
    components: {
      uvTextarea
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uvTextarea = vue.resolveComponent("uvTextarea");
    return vue.openBlock(), vue.createBlock(_component_uvTextarea, {
      value: _ctx.value,
      modelValue: _ctx.modelValue,
      placeholder: _ctx.placeholder,
      height: _ctx.height,
      confirmType: _ctx.confirmType,
      disabled: _ctx.disabled,
      count: _ctx.count,
      focus: _ctx.focus,
      autoHeight: _ctx.autoHeight,
      fixed: _ctx.fixed,
      cursorSpacing: _ctx.cursorSpacing,
      cursor: _ctx.cursor,
      showConfirmBar: _ctx.showConfirmBar,
      selectionStart: _ctx.selectionStart,
      selectionEnd: _ctx.selectionEnd,
      adjustPosition: _ctx.adjustPosition,
      disableDefaultPadding: _ctx.disableDefaultPadding,
      holdKeyboard: _ctx.holdKeyboard,
      maxlength: _ctx.maxlength,
      border: _ctx.border,
      customStyle: _ctx.customStyle,
      formatter: _ctx.formatter,
      ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
      onInput: _cache[0] || (_cache[0] = (e) => _ctx.$emit("input", e)),
      "onUpdate:modelValue": _cache[1] || (_cache[1] = (e) => _ctx.$emit("update:modelValue", e))
    }, null, 8, ["value", "modelValue", "placeholder", "height", "confirmType", "disabled", "count", "focus", "autoHeight", "fixed", "cursorSpacing", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "adjustPosition", "disableDefaultPadding", "holdKeyboard", "maxlength", "border", "customStyle", "formatter", "ignoreCompositionEvent"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/before/Project/uniApp/uni_modules/uview-plus/components/u--textarea/u--textarea.vue"]]);
  const _sfc_main$9 = {
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
        uni.stopPullDownRefresh();
      }, 1e3);
    },
    methods: {
      async getbook(num) {
        formatAppLog("log", "at pages/book/book.vue:133", num);
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/book/bookByid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "bookid": num,
              "show": 1
            }
          });
          formatAppLog("log", "at pages/book/book.vue:147", response);
          formatAppLog("log", "at pages/book/book.vue:148", response.data.data);
          that.book = response.data.data;
        } catch (e) {
          formatAppLog("log", "at pages/book/book.vue:151", "bookerror");
          formatAppLog("log", "at pages/book/book.vue:152", e);
        }
      },
      async getcomment(num, num1, num2) {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/comment/getlimit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          formatAppLog("log", "at pages/book/book.vue:173", response);
          if (list1.length == 0) {
            that.more = false;
          }
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.creatTime);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
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
          formatAppLog("log", "at pages/book/book.vue:193", "commenterror");
          formatAppLog("log", "at pages/book/book.vue:194", e);
        }
      },
      async outcomment() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/comment/add",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "userId": uni.getStorageSync("name").id,
              "content": that.value1,
              "bookId": that.num,
              "bookName": that.book.bookName,
              "userName": uni.getStorageSync("name").username
            }
          });
          that.close();
          formatAppLog("log", "at pages/book/book.vue:216", response);
          uni.showToast({
            title: "评论发布成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
          this.getcomment(that.num, 1, 3);
        } catch (e) {
          formatAppLog("log", "at pages/book/book.vue:224", "error");
          formatAppLog("log", "at pages/book/book.vue:225", e);
        }
      },
      async inself() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/likebook/addhlike",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "userId": uni.getStorageSync("name").id,
              "bookId": that.num,
              "bookName": that.book.bookName
            }
          });
          formatAppLog("log", "at pages/book/book.vue:243", response);
          if (response.data.code == 200) {
            uni.showToast({
              title: "加入书架成功",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
          } else {
            uni.showToast({
              title: "加入书架失败",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
          }
          that.istrueself();
        } catch (e) {
          formatAppLog("log", "at pages/book/book.vue:259", "error");
          formatAppLog("log", "at pages/book/book.vue:260", e);
          uni.showToast({
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
          formatAppLog("log", "at pages/book/book.vue:271", that.likeid);
          const response = await uni.request({
            url: base_url + "/likebook/del",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "likeId": that.likeid
            }
          });
          formatAppLog("log", "at pages/book/book.vue:282", response);
          if (response.data.code == 200) {
            uni.showToast({
              title: "从书架移除成功",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
          } else {
            uni.showToast({
              title: "从书架移除失败",
              icon: "none",
              // 'none' 表示不显示图标，可根据需求调整
              duration: 1e3
              // 显示时长，单位毫秒
            });
          }
          that.istrueself();
        } catch (e) {
          formatAppLog("log", "at pages/book/book.vue:298", "error");
          formatAppLog("log", "at pages/book/book.vue:299", e);
          uni.showToast({
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
          const response = await uni.request({
            url: base_url + "/likebook/byuserbook",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "bookId": that.num,
              "userId": uni.getStorageSync("name").id
            }
          });
          formatAppLog("log", "at pages/book/book.vue:321", response);
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
          formatAppLog("log", "at pages/book/book.vue:334", "error");
          formatAppLog("log", "at pages/book/book.vue:335", e);
        }
      },
      gotocontent() {
        const num = this.num;
        uni.navigateTo({
          url: "/pages/content/content?num=" + num
        });
      },
      gotocomment() {
        const num = this.num;
        uni.navigateTo({
          url: "/pages/commment/commment?num=" + num
        });
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
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
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    const _component_u__textarea = resolveEasycom(vue.resolveDynamicComponent("u--textarea"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "bg-g ra-10 ma-10 pa-10" }, [
            vue.createCommentVNode(" 书的封面 "),
            vue.createElementVNode("view", {
              class: "bg-w inbox ra-10",
              style: { "width": "8rem", "height": "10rem" }
            }, [
              vue.createElementVNode("img", {
                src: $data.book.bookImg,
                alt: "",
                style: { "width": "100%", "height": "100%" },
                class: "inbox"
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "inbox pos pa-10" }, [
              vue.createCommentVNode(" 书名 "),
              vue.createElementVNode("view", {
                class: "",
                style: { "font-size": "1.5rem", "width": "11rem" }
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "overflow-ellipsis",
                    style: { "font-weight": "700" }
                  },
                  vue.toDisplayString($data.book.bookName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 书的作者 "),
              vue.createElementVNode("view", {
                class: "inbox",
                style: { "padding": "0.4rem 1rem", "width": "9rem" }
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "overflow-ellipsis" },
                  vue.toDisplayString($data.book.bookAuther),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 书的简介 "),
              vue.createElementVNode("view", {
                class: "inbox fo-g text-container pa-t10",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.op())
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "overflow-ellipsis" },
                  vue.toDisplayString($data.book.bookIntroduce),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createCommentVNode(" 简介 "),
          vue.createVNode(_component_u_popup, {
            show: $data.bookshow,
            mode: "center",
            onClose: $options.close
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: "",
                  style: { "padding": "0.5rem", "margin": "0.5rem", "border-radius": "0.6rem" }
                },
                vue.toDisplayString($data.book.bookIntroduce),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["show", "onClose"]),
          vue.createCommentVNode(" 评论区 "),
          vue.createElementVNode("view", { class: "bg-g ra-10 ma-10 pa-10" }, [
            $data.textshow ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "w-100 text-center"
            }, " 暂无评论 ")) : vue.createCommentVNode("v-if", true),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.comment, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "bg-w ra-10 pa-10 rel ma-b10",
                  key: index2
                }, [
                  vue.createCommentVNode(" 头像 "),
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createElementVNode("view", {
                      class: "inbox ra-50",
                      style: { "width": "2.5rem", "height": "2.5rem", "margin": "0.3rem", "overflow": "hidden" }
                    }, [
                      vue.createElementVNode("img", {
                        src: item.head,
                        alt: "",
                        style: { "width": "100%", "height": "100%" }
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "inbox" },
                      vue.toDisplayString(item.userName),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createCommentVNode(" 评论内容 "),
                  vue.createElementVNode(
                    "view",
                    { class: "pa-l10 overflowcomment" },
                    vue.toDisplayString(item.content),
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" 评论时间 "),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "fo-g",
                      style: { "font-size": "0.8rem", "padding": "0.5rem" }
                    },
                    vue.toDisplayString(item.creatTime),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $data.more ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: ""
            }, [
              vue.createElementVNode("button", {
                class: "ra-20 fo-w bg-red",
                style: { "margin": "2rem 0.5rem" },
                onClick: _cache[1] || (_cache[1] = ($event) => $options.gotocomment())
              }, "查看更多评论")
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "" }, [
            vue.createElementVNode("view", {
              class: "ma-10",
              style: { "background-color": "#ffffff", "border-bottom": "0.3rem solid #e2510e", "width": "20%" },
              onClick: _cache[2] || (_cache[2] = ($event) => $options.open())
            }, "发布评论")
          ]),
          vue.createElementVNode("view", { class: "pa-10" }),
          vue.createVNode(_component_u_popup, {
            show: $data.show,
            mode: "bottom"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "",
                style: { "padding": "2.5rem 0.5rem" }
              }, [
                vue.createVNode(_component_u__textarea, {
                  modelValue: $data.value1,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.value1 = $event),
                  placeholder: "请输入内容"
                }, null, 8, ["modelValue"])
              ]),
              vue.createElementVNode("button", {
                class: "ma-10 ra-20 fo-w bg-red",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.outcomment())
              }, "发布评论")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["show"])
        ]),
        vue.createElementVNode("view", {
          class: "",
          style: { "height": "3rem" }
        }),
        vue.createElementVNode("view", {
          class: "",
          style: { "position": "fixed", "bottom": "0", "display": "flex", "background-color": "#ffffff", "width": "100%", "padding": "5px" }
        }, [
          !$data.isself ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "ra-10 bg-red",
            style: { "color": "#ffffff", "width": "40%" },
            onClick: _cache[5] || (_cache[5] = ($event) => $options.inself())
          }, "加入书架")) : vue.createCommentVNode("v-if", true),
          $data.isself ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 1,
            class: "ra-10 bg-red",
            style: { "color": "#ffffff", "width": "40%" },
            onClick: _cache[6] || (_cache[6] = ($event) => $options.outself())
          }, "已经加入书架")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("button", {
            class: "ra-10",
            style: { "background-color": "#ffffff", "border": "0.1rem solid #e2510e", "width": "35%" },
            onClick: _cache[7] || (_cache[7] = ($event) => $options.gotocontent())
          }, "阅读")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesBookBook = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-e0cf4858"], ["__file", "D:/before/Project/uniApp/pages/book/book.vue"]]);
  new Proxy({}, {
    get(_, key) {
      throw new Error(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
    }
  });
  const _sfc_main$8 = {
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
      this.myid = uni.getStorageSync("name").id;
      const num = this.num;
      this.getbook(num);
      formatAppLog("log", "at pages/commment/commment.vue:60", num);
      this.getcomment(1, 7, num);
    },
    onLoad: function(option) {
      this.num = option.num;
    },
    // 触底事件
    onReachBottom() {
      this.page++;
      const num = this.num;
      const page2 = this.page;
      this.getcomment(page2, 7, num);
    },
    methods: {
      async getbook(num) {
        const that = this;
        try {
          formatAppLog("log", "at pages/commment/commment.vue:77", base_url + "/book/bookByid");
          const response = await uni.request({
            url: base_url + "/book/bookByid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          formatAppLog("log", "at pages/commment/commment.vue:92", "error");
          formatAppLog("log", "at pages/commment/commment.vue:93", e);
        }
      },
      async getcomment(num, num1, num2) {
        const that = this;
        formatAppLog("log", "at pages/commment/commment.vue:99", num);
        formatAppLog("log", "at pages/commment/commment.vue:100", num1);
        formatAppLog("log", "at pages/commment/commment.vue:101", num2);
        try {
          const response = await uni.request({
            url: base_url + "/comment/getlimit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          formatAppLog("log", "at pages/commment/commment.vue:117", response);
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.creatTime);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
            var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
            item.creatTime = formattedDate;
          });
          if (num == 1) {
            that.comment = list1;
          } else {
            that.comment = that.comment.concat(list1);
          }
        } catch (e) {
          formatAppLog("log", "at pages/commment/commment.vue:132", "error");
          formatAppLog("log", "at pages/commment/commment.vue:133", e);
        }
      },
      async deletecomment() {
        const that = this;
        formatAppLog("log", "at pages/commment/commment.vue:139", that.commentid);
        try {
          const response = await uni.request({
            url: base_url + "/comment/delcomment",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "commentId": that.commentid
            }
          });
          that.close();
          const number2 = that.num;
          that.getcomment(1, 7, number2);
        } catch (e) {
          formatAppLog("log", "at pages/commment/commment.vue:155", "error");
          formatAppLog("log", "at pages/commment/commment.vue:156", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 评论区 "),
      vue.createElementVNode("view", { class: "bg-g" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.comment, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "bg-w ra-10 ma-10 pa-10 rel",
              key: item.index
            }, [
              vue.createCommentVNode(" 头像 "),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("view", {
                  class: "inbox bg-s ra-50",
                  style: { "width": "2.5rem", "height": "2.5rem", "margin": "0.3rem", "overflow": "hidden" }
                }, [
                  vue.createElementVNode("img", {
                    src: item.head,
                    alt: "",
                    class: "icon-100"
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "inbox" },
                  vue.toDisplayString(item.userName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 评论内容 "),
              vue.createElementVNode(
                "view",
                { class: "pa-l10" },
                vue.toDisplayString(item.content),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" 评论时间 "),
              vue.createElementVNode(
                "view",
                {
                  class: "fo-g",
                  style: { "font-size": "0.8rem", "padding": "0.5rem" }
                },
                vue.toDisplayString(item.creatTime),
                1
                /* TEXT */
              ),
              $data.myid == item.userId ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "pa-l10 pos",
                style: { "bottom": "1rem", "right": "1rem", "font-size": "0.8rem", "color": "#db4900" },
                onClick: ($event) => $options.open(item.commentId)
              }, " 删除我的评论 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 弹出层 "),
      vue.createVNode(_component_u_popup, {
        show: $data.show,
        mode: "bottom",
        closeable: "true"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "pa-10 w-100 text-center" }, " 是否确认删除 "),
          vue.createElementVNode("view", { class: "panel-around" }, [
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.deletecomment())
            }, "确认"),
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[1] || (_cache[1] = ($event) => $options.close())
            }, "取消")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show"])
    ]);
  }
  const PagesCommmentCommment = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/before/Project/uniApp/pages/commment/commment.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        num: 0,
        list: [],
        page: 1,
        index: 0,
        show: false
      };
    },
    onLoad: function(option) {
      this.num = option.num;
      formatAppLog("log", "at pages/booklist/booklist.vue:52", option.num);
    },
    onShow() {
      this.getbook(1, 6, this.num);
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.page = 0;
      setTimeout(() => {
        this.getbook(1, 6, this.num);
        uni.stopPullDownRefresh();
      }, 1e3);
    },
    // 触底事件
    onReachBottom() {
      this.page++;
      this.getbook(this.page, 6, this.num);
    },
    methods: {
      async getbook(num, num1, num2) {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/book/getlabellimit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "num": num,
              "pagesize": num1,
              "bookLabel": num2,
              "show": 1
            }
          });
          var list1 = [];
          formatAppLog("log", "at pages/booklist/booklist.vue:90", response);
          list1 = response.data.data;
          if (num == 1) {
            that.list = list1;
          } else {
            that.list = that.list.concat(list1);
          }
        } catch (e) {
          formatAppLog("log", "at pages/booklist/booklist.vue:99", "error");
          formatAppLog("log", "at pages/booklist/booklist.vue:100", e);
        }
      },
      gotobook(num) {
        uni.navigateTo({
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.list, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "bg-g ra-10 pa-10 rel",
                key: index2,
                style: { "margin": "1rem 0.8rem" }
              }, [
                vue.createCommentVNode(" 书的封面 "),
                vue.createElementVNode("view", {
                  class: "bg-w inbox",
                  style: { "width": "6rem", "height": "7rem" },
                  onClick: ($event) => $options.gotobook(item.bookid)
                }, [
                  vue.createElementVNode("img", {
                    src: item.bookImg,
                    style: { "width": "100%", "height": "100%" },
                    class: "inbox"
                  }, null, 8, ["src"])
                ], 8, ["onClick"]),
                vue.createCommentVNode(" 书名 "),
                vue.createElementVNode("view", {
                  class: "inbox pos pa-l10",
                  style: { "top": "1rem", "font-size": "1.2rem", "font-weight": "700", "width": "12rem" },
                  onClick: ($event) => $options.gotobook(item.bookid)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "overflow-ellipsistitle" },
                    vue.toDisplayString(item.bookName),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]),
                vue.createCommentVNode(" 书的作者 "),
                vue.createElementVNode("view", {
                  class: "inbox pos pa-l10",
                  style: { "top": "2.5rem", "font-size": "0.9rem", "margin": "0.6rem 0", "width": "12rem" },
                  onClick: ($event) => $options.gotobook(item.bookid)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "overflow-ellipsistitle" },
                    vue.toDisplayString(item.bookAuther),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]),
                vue.createCommentVNode(" 书的简介 "),
                vue.createElementVNode("view", {
                  class: "inbox fo-g pa-l10 text-container pa-t10",
                  onClick: ($event) => $options.open(index2)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "overflow-ellipsis" },
                    vue.toDisplayString(item.bookIntroduce),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "pa-10" }),
        vue.createVNode(_component_u_popup, {
          show: $data.show,
          mode: "center",
          onClose: $options.close
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: "",
                style: { "padding": "0.5rem", "margin": "0.5rem", "border-radius": "0.6rem" }
              },
              vue.toDisplayString($data.list[$data.index].bookIntroduce),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show", "onClose"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesBooklistBooklist = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-ab0d65e2"], ["__file", "D:/before/Project/uniApp/pages/booklist/booklist.vue"]]);
  const _sfc_main$6 = {
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
          const response = await uni.request({
            url: base_url + "/essay/essayByid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "essayId": that.essayid
            }
          });
          var date2 = new Date(response.data.data[0].creatTime);
          var year = date2.getFullYear();
          var month = date2.getMonth() + 1;
          var day = date2.getDate();
          var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
          response.data.data[0].creatTime = formattedDate;
          that.list = response.data.data[0];
          const regex = new RegExp("<img", "gi");
          that.list.content = that.list.content.replace(regex, `<img style="max-width: 100%; height: auto"`);
        } catch (e) {
          formatAppLog("log", "at pages/essay/essay.vue:71", "error");
          formatAppLog("log", "at pages/essay/essay.vue:72", e);
        }
      },
      async addhis() {
        const that = this;
        try {
          formatAppLog("log", "at pages/essay/essay.vue:79", "我添加记录了");
          const response = await uni.request({
            url: base_url + "/history/addhis",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "name": that.list.title,
              "score": 10,
              "userId": uni.getStorageSync("name").id,
              "essayId": that.list.essayId
            }
          });
          formatAppLog("log", "at pages/essay/essay.vue:93", response);
        } catch (e) {
          formatAppLog("log", "at pages/essay/essay.vue:95", "error");
          formatAppLog("log", "at pages/essay/essay.vue:96", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "padding": "0.7rem" } }, [
      vue.createElementVNode(
        "view",
        { class: "fo-g" },
        vue.toDisplayString($data.list.creatTime),
        1
        /* TEXT */
      ),
      vue.createElementVNode(
        "h1",
        null,
        vue.toDisplayString($data.list.title),
        1
        /* TEXT */
      ),
      vue.createElementVNode("div", {
        innerHTML: $data.list.content
      }, null, 8, ["innerHTML"])
    ]);
  }
  const PagesEssayEssay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/before/Project/uniApp/pages/essay/essay.vue"]]);
  const _sfc_main$5 = {
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
    // 	__f__('log','at pages/mybooklist/mybooklist.vue:52',option.num); //打印出上个页面传递的参数。
    // },
    onShow() {
      this.getbook(1, 6);
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.page = 0;
      setTimeout(() => {
        this.getbook(1, 6);
        uni.stopPullDownRefresh();
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
          const response = await uni.request({
            url: base_url + "/likebook/Limit",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "num": num,
              "pagesize": num1,
              "userId": uni.getStorageSync("name").id
            }
          });
          var list1 = [];
          list1 = response.data.data;
          formatAppLog("log", "at pages/mybooklist/mybooklist.vue:90", "我的喜欢");
          formatAppLog("log", "at pages/mybooklist/mybooklist.vue:91", response);
          if (num == 1) {
            that.list = list1;
          } else {
            that.list = that.list.concat(list1);
          }
        } catch (e) {
          formatAppLog("log", "at pages/mybooklist/mybooklist.vue:99", "error");
          formatAppLog("log", "at pages/mybooklist/mybooklist.vue:100", e);
        }
      },
      gotobook(num) {
        uni.navigateTo({
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.list, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "bg-g ra-10 pa-10 rel",
            key: index2,
            style: { "margin": "1rem 0.8rem" }
          }, [
            vue.createCommentVNode(" 书的封面 "),
            vue.createElementVNode("view", {
              class: "bg-w inbox",
              style: { "width": "6rem", "height": "7rem" },
              onClick: ($event) => $options.gotobook(item.bookid)
            }, [
              vue.createElementVNode("img", {
                src: item.bookImg,
                style: { "width": "100%", "height": "100%" },
                class: "inbox"
              }, null, 8, ["src"])
            ], 8, ["onClick"]),
            vue.createCommentVNode(" 书名 "),
            vue.createElementVNode("view", {
              class: "inbox pos pa-l10",
              style: { "top": "1rem", "font-size": "1.2rem", "font-weight": "700", "width": "12rem" },
              onClick: ($event) => $options.gotobook(item.bookid)
            }, [
              vue.createElementVNode(
                "view",
                { class: "overflow-ellipsistitle" },
                vue.toDisplayString(item.bookName),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]),
            vue.createCommentVNode(" 书的作者 "),
            vue.createElementVNode("view", {
              class: "inbox pos pa-l10",
              style: { "height": "3rem", "top": "2.5rem", "font-size": "0.9rem", "margin": "0.6rem 0", "width": "12rem" },
              onClick: ($event) => $options.gotobook(item.bookid)
            }, [
              vue.createElementVNode(
                "view",
                { class: "overflow-ellipsistitle" },
                vue.toDisplayString(item.bookAuther),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]),
            vue.createCommentVNode(" 书的简介 "),
            vue.createElementVNode("view", {
              class: "inbox fo-g pa-l10 text-container pa-t10",
              onClick: ($event) => $options.open(index2)
            }, [
              vue.createElementVNode(
                "view",
                { class: "overflow-ellipsis" },
                vue.toDisplayString(item.bookIntroduce),
                1
                /* TEXT */
              )
            ], 8, ["onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("view", { class: "pa-10" }),
      vue.createVNode(_component_u_popup, {
        show: $data.show,
        mode: "center",
        onClose: $options.close
      }, {
        default: vue.withCtx(() => [
          $data.list.length !== 0 ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "",
              style: { "padding": "0.5rem", "margin": "0.5rem", "border-radius": "0.6rem" }
            },
            vue.toDisplayString($data.list[$data.index].bookIntroduce),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "onClose"])
    ]);
  }
  const PagesMybooklistMybooklist = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-de228ff6"], ["__file", "D:/before/Project/uniApp/pages/mybooklist/mybooklist.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        password: "",
        password1: "",
        show: false,
        mesg: "",
        color: true
      };
    },
    methods: {
      checkpwd() {
        if (this.password == this.password1) {
          if (this.password.length >= 6) {
            return true;
          } else {
            this.show = true;
            this.color = false;
            this.mesg = "密码格式错误";
            setTimeout(() => {
              this.show = false;
            }, 1500);
            return false;
          }
        } else {
          this.show = true;
          this.color = false;
          this.mesg = "密码不一致";
          setTimeout(() => {
            this.show = false;
          }, 800);
          return false;
        }
      },
      async changepass() {
        const that = this;
        try {
          if (that.checkpwd()) {
            formatAppLog("log", "at pages/password/password.vue:57", "yes");
            formatAppLog("log", "at pages/password/password.vue:58", uni.getStorageSync("token"));
            const response = await uni.request({
              url: base_url + "/user/updatepwd",
              // 替换为实际的 API 地址
              method: "POST",
              // 请求方法，可以是 'GET'、'POST' 等
              header: {
                "Authorization": uni.getStorageSync("token")
                // 添加认证头部
              },
              data: {
                username: uni.getStorageSync("name").username,
                pwd: that.password
              }
            });
            formatAppLog("log", "at pages/password/password.vue:70", response);
            if (response.data.code === 200) {
              this.show = true;
              this.color = true;
              this.mesg = response.data.message;
              setTimeout(() => {
                this.show = false;
              }, 800);
              this.password = "";
              this.password1 = "";
              this.logout();
            } else {
              this.show = true;
              this.color = false;
              this.mesg = response.data.message;
              setTimeout(() => {
                this.show = false;
              }, 800);
            }
          } else {
          }
        } catch (e) {
          formatAppLog("log", "at pages/password/password.vue:94", e);
        }
      },
      async logout() {
        try {
          const response = await uni.request({
            url: base_url + "/user/logout",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {}
          });
          formatAppLog("log", "at pages/password/password.vue:109", response);
          uni.navigateTo({
            url: "/pages/index/index"
          });
        } catch (e) {
          formatAppLog("log", "at pages/password/password.vue:114", "error");
          formatAppLog("log", "at pages/password/password.vue:115", e);
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "pa-10 ma-t20" }, [
          vue.createElementVNode("view", { class: "pa-l30" }, [
            vue.createTextVNode(" 新密码："),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "password",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.password = $event),
                placeholder: "请输入密码不少于6位",
                class: "border ra-10",
                style: { "margin": "1rem", "width": "60%", "padding": "0.2rem 0.7rem" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.password]
            ]),
            vue.createTextVNode(" 确认密码："),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "password",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password1 = $event),
                placeholder: "请再次输入密码",
                class: "border ra-10",
                style: { "margin": "1rem", "width": "60%", "padding": "0.2rem 0.7rem" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.password1]
            ]),
            vue.createElementVNode("button", {
              class: "ra-20 fo-w ma-20",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.changepass()),
              style: { "background": "linear-gradient(to right, #ff5500, #ff5e62)" }
            }, "确认修改")
          ])
        ]),
        $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass($data.color ? "success" : "erro"),
            style: { "position": "fixed", "padding": "0.6rem", "color": "#ffffff", "border-radius": "0.2rem", "top": "3rem", "left": "35%" }
          },
          vue.toDisplayString($data.mesg),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesPasswordPassword = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-f800cd94"], ["__file", "D:/before/Project/uniApp/pages/password/password.vue"]]);
  const _sfc_main$3 = {
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
      formatAppLog("log", "at pages/content/content.vue:97", "我的书籍Id是");
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
          const page2 = this.paragraphsPerPage;
          this.loadPage(page2, 1);
        }
      },
      handleLeftSwipe() {
        if (!this.show) {
          const page2 = this.paragraphsPerPage;
          this.loadPage(page2, 2);
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
          const response = await uni.request({
            url: base_url + "/book/read",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
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
          formatAppLog("log", "at pages/content/content.vue:199", "error");
          formatAppLog("log", "at pages/content/content.vue:200", e);
        }
      },
      async getcontent(index2, num) {
        this.currentChapter = index2;
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/book/getcontent",
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "bookid": that.num,
              "num": index2
            }
          });
          formatAppLog("log", "at pages/content/content.vue:220", response);
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
          formatAppLog("error", "at pages/content/content.vue:244", "捕获到异常", e);
        }
      },
      loadPage(page2, num) {
        if (num == 1) {
          if (page2 == 1) {
            this.currentChapter--;
            if (this.currentChapter < this.indexchapter) {
              return;
            }
            this.getcontent(this.currentChapter, 2);
          }
          let start;
          let end;
          if (page2 == 2) {
            start = 0;
            end = (page2 - 2) * 348 + 348;
          } else if (page2 == this.totilpage) {
            start = (page2 - 2) * 348 + 348;
            end = this.totilnum;
          } else {
            start = (page2 - 2) * 348 + 348;
            end = (page2 - 1) * 348 + 348;
          }
          const pageContent = this.html.substring(start, end);
          this.chapterContent = pageContent;
          this.paragraphsPerPage--;
          this.currentContent = pageContent;
        } else {
          if (page2 == this.totilpage) {
            this.currentChapter++;
            let last = parseInt(this.currentChapter);
            if (last > this.lastchapter) {
              uni.showToast({
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
          if (page2 == 1) {
            start = 348;
          } else {
            start = (page2 - 1) * 348 + 348;
          }
          formatAppLog("log", "at pages/content/content.vue:294", start);
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        ref: "body",
        style: { "height": "100vh", "width": "100vw", "position": "absolute", "z-index": "2" },
        onTouchstart: _cache[4] || (_cache[4] = (...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
        onTouchmove: _cache[5] || (_cache[5] = (...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
        onTouchend: _cache[6] || (_cache[6] = (...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args))
      },
      [
        vue.createElementVNode("view", null, [
          vue.createCommentVNode(' <div>\r\n			    <h1>{{ currentChapterTitle }}</h1>\r\n				<div v-html=" currentContent" style="padding: 1rem;margin-top: 1rem;;font-size: 1.2rem;line-height: 2rem;"></div>\r\n			    <button @click="loadPrevPage" :disabled="currentPage === 1">上一页</button>\r\n			    <button @click="loadNextPage" :disabled="currentPage * contentPerPage >= chapterContent.length">下一页</button>\r\n			  </div> '),
          vue.createElementVNode("div", {
            innerHTML: $data.currentContent,
            style: { "padding": "1rem", "margin-top": "1rem", "font-size": "1.2rem", "line-height": "2rem" }
          }, null, 8, ["innerHTML"]),
          vue.createElementVNode("view", {
            class: "bg-g",
            onClick: _cache[3] || (_cache[3] = ($event) => $data.show = !$data.show)
          }, [
            vue.createVNode(_component_u_popup, {
              show: $data.show,
              style: { "z-index": "6" }
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "",
                  style: { "padding": "20px", "max-height": "400px", "overflow-y": "auto", "width": "100%" }
                }, [
                  $data.pageNum === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.chapternum, (item, index2) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "border-b bg-g ma-b10",
                          key: index2,
                          style: { "padding": "0.7rem", "width": "80%", "border-radius": "0.5rem" }
                        }, [
                          vue.createElementVNode("view", {
                            class: "overflow-ellipsis",
                            style: { "width": "100%" },
                            onClick: ($event) => $options.getcontent(index2, 1)
                          }, vue.toDisplayString(item), 9, ["onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 滑块 "),
                  $data.pageNum === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createCommentVNode(' <u-slider v-model="value" step="2" min="0" max="100"  @input="cha(value)"></u-slider> '),
                    vue.createCommentVNode(' <u-slider v-model="value"></u-slider> '),
                    vue.createElementVNode("div", {
                      class: "book-progress",
                      style: { "width": "80%" }
                    }, [
                      vue.createElementVNode("div", { class: "progress-bar" }, [
                        vue.createElementVNode(
                          "div",
                          {
                            style: vue.normalizeStyle({ width: `${$options.progress}%` })
                          },
                          null,
                          4
                          /* STYLE */
                        )
                      ]),
                      vue.createElementVNode(
                        "div",
                        { class: "progress-info" },
                        vue.toDisplayString($options.progress) + "%",
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $data.pageNum === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "panel-around"
                  }, [
                    vue.createElementVNode("view", {
                      class: "icon-35 ra-50 fff border",
                      onClick: _cache[0] || (_cache[0] = ($event) => $options.changback(1))
                    }),
                    vue.createElementVNode("view", {
                      class: "icon-35 ra-50 ant border",
                      onClick: _cache[1] || (_cache[1] = ($event) => $options.changback(2))
                    }),
                    vue.createElementVNode("view", {
                      class: "icon-35 ra-50 grey border",
                      onClick: _cache[2] || (_cache[2] = ($event) => $options.changback(3))
                    })
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("view", {
                  class: "panel-around pa-10 ma-b20 border-t",
                  style: {}
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.nav_types, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        onClick: ($event) => $options.setPageNum(index2)
                      }, vue.toDisplayString(item.value), 9, ["onClick"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["show"])
          ])
        ])
      ],
      544
      /* HYDRATE_EVENTS, NEED_PATCH */
    );
  }
  const PagesContentContent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/before/Project/uniApp/pages/content/content.vue"]]);
  const _sfc_main$2 = {
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
      this.myid = uni.getStorageSync("name").id;
      this.getword(1, 7);
    },
    // 触底事件
    onReachBottom() {
      this.page++;
      const page2 = this.page;
      this.getword(page2, 7);
    },
    methods: {
      async getword(num, num1) {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/word/getall",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "num": num,
              "pagesize": num1
            }
          });
          var list1 = [];
          list1 = response.data.data;
          formatAppLog("log", "at pages/words/words.vue:100", response);
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.time);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
            var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
            item.time = formattedDate;
          });
          if (num == 1) {
            that.comment = list1;
          } else {
            that.comment = that.comment.concat(list1);
          }
        } catch (e) {
          formatAppLog("log", "at pages/words/words.vue:115", "error");
          formatAppLog("log", "at pages/words/words.vue:116", e);
        }
      },
      async deleteword() {
        const that = this;
        formatAppLog("log", "at pages/words/words.vue:122", that.wordid);
        try {
          const response = await uni.request({
            url: base_url + "/word/delbyid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "id": that.wordid
            }
          });
          that.close();
          uni.showToast({
            title: "留言删除成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
          that.page = 1;
          that.getword(1, 7);
        } catch (e) {
          formatAppLog("log", "at pages/words/words.vue:143", "error");
          formatAppLog("log", "at pages/words/words.vue:144", e);
        }
      },
      async outword() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/word/add",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "content": that.value1,
              "userId": uni.getStorageSync("name").id,
              "userName": uni.getStorageSync("name").username
            }
          });
          that.closeword();
          uni.showToast({
            title: "留言发布成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
          that.value1 = "", that.page = 1;
          that.getword(1, 7);
        } catch (e) {
          formatAppLog("log", "at pages/words/words.vue:172", "error");
          formatAppLog("log", "at pages/words/words.vue:173", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      },
      open(num) {
        formatAppLog("log", "at pages/words/words.vue:180", num);
        this.wordid = num;
        this.show = true;
      },
      close() {
        this.show = false;
      },
      openword(num) {
        this.wordshow = true;
      },
      closeword() {
        this.wordshow = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u__textarea = resolveEasycom(vue.resolveDynamicComponent("u--textarea"), __easycom_0);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 评论区 "),
      vue.createElementVNode("view", { class: "bg-g" }, [
        vue.createElementVNode("view", {
          class: "panel-around",
          style: { "color": "#db4900", "font-size": "1.5rem", "padding": "0.5rem" }
        }, " 留言板 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.comment, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "bg-w ra-10 ma-10 pa-10 rel",
              key: item.index
            }, [
              vue.createCommentVNode(" 头像 "),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("view", {
                  class: "inbox ra-50",
                  style: { "width": "2.5rem", "height": "2.5rem", "margin": "0.3rem", "overflow": "hidden" }
                }, [
                  vue.createElementVNode("img", {
                    src: item.head,
                    alt: "",
                    style: { "width": "100%", "height": "100%" }
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "inbox" },
                  vue.toDisplayString(item.userName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 评论内容 "),
              vue.createElementVNode(
                "view",
                { class: "pa-l10" },
                vue.toDisplayString(item.content),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" 评论时间 "),
              vue.createElementVNode(
                "view",
                {
                  class: "fo-g",
                  style: { "font-size": "0.8rem", "padding": "0.5rem" }
                },
                vue.toDisplayString(item.time),
                1
                /* TEXT */
              ),
              $data.myid == item.userId ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "pa-l10 pos",
                style: { "bottom": "1rem", "right": "1rem", "font-size": "0.8rem", "color": "#db4900" },
                onClick: ($event) => $options.open(item.id)
              }, " 删除我的留言 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", {
          class: "icon-30 ra-50 panel-around fo-w",
          style: { "background-color": "#db4900", "position": "fixed", "bottom": "2rem", "right": "0.5rem", "align-items": "center", "font-size": "3rem" },
          onClick: _cache[0] || (_cache[0] = ($event) => $options.openword())
        }, " + ")
      ]),
      vue.createVNode(_component_u_popup, {
        show: $data.wordshow,
        mode: "bottom",
        closeable: "true",
        onClose: $options.closeword,
        onOpen: $options.openword
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "",
            style: { "padding": "2.5rem 0.5rem" }
          }, [
            vue.createVNode(_component_u__textarea, {
              modelValue: $data.value1,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.value1 = $event),
              placeholder: "请输入内容"
            }, null, 8, ["modelValue"])
          ]),
          vue.createElementVNode("button", {
            class: "ma-10 ra-20 fo-w",
            style: { "background-color": "#ff6633" },
            onClick: _cache[2] || (_cache[2] = ($event) => $options.outword())
          }, "发布留言")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "onClose", "onOpen"]),
      vue.createCommentVNode(" 弹出层 "),
      vue.createVNode(_component_u_popup, {
        show: $data.show,
        mode: "bottom",
        closeable: "true",
        onClose: $options.close,
        onOpen: $options.open
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "pa-10 w-100 text-center" }, " 是否确认删除 "),
          vue.createElementVNode("view", { class: "panel-around" }, [
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[3] || (_cache[3] = ($event) => $options.deleteword())
            }, "确认"),
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[4] || (_cache[4] = ($event) => $options.close())
            }, "取消")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "onClose", "onOpen"])
    ]);
  }
  const PagesWordsWords = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/before/Project/uniApp/pages/words/words.vue"]]);
  const _sfc_main$1 = {
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
      this.myid = uni.getStorageSync("name").id;
      this.getword(1, 7);
    },
    // 触底事件
    onReachBottom() {
      this.page++;
      const page2 = this.page;
      this.getword(page2, 7);
    },
    methods: {
      async getword(num, num1) {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/word/getuserid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "num": num,
              "pagesize": num1,
              "userId": uni.getStorageSync("name").id
            }
          });
          var list1 = [];
          list1 = response.data.data;
          formatAppLog("log", "at pages/myword/myword.vue:87", response);
          list1.forEach(function(item, index2) {
            var date2 = new Date(item.time);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            var day = date2.getDate();
            var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
            item.time = formattedDate;
          });
          if (num == 1) {
            that.comment = list1;
          } else {
            that.comment = that.comment.concat(list1);
          }
        } catch (e) {
          formatAppLog("log", "at pages/myword/myword.vue:102", "error");
          formatAppLog("log", "at pages/myword/myword.vue:103", e);
        }
      },
      async deleteword() {
        const that = this;
        try {
          const response = await uni.request({
            url: base_url + "/word/delbyid",
            // 替换为实际的 API 地址
            method: "POST",
            // 请求方法，可以是 'GET'、'POST' 等
            header: {
              "Authorization": uni.getStorageSync("token")
              // 添加认证头部
            },
            data: {
              "id": that.wordid
            }
          });
          formatAppLog("log", "at pages/myword/myword.vue:120", "留言id");
          formatAppLog("log", "at pages/myword/myword.vue:121", that.wordid);
          that.close();
          uni.showToast({
            title: "留言删除成功",
            icon: "none",
            // 'none' 表示不显示图标，可根据需求调整
            duration: 1e3
            // 显示时长，单位毫秒
          });
          that.page = 1;
          that.getword(1, 7);
        } catch (e) {
          formatAppLog("log", "at pages/myword/myword.vue:131", "error");
          formatAppLog("log", "at pages/myword/myword.vue:132", e);
        }
      },
      addLeadingZero(number2) {
        return number2 < 10 ? "0" + number2 : number2;
      },
      open(num) {
        formatAppLog("log", "at pages/myword/myword.vue:139", "传入数字");
        formatAppLog("log", "at pages/myword/myword.vue:140", num);
        this.wordid = num;
        this.show = true;
      },
      close() {
        this.show = false;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 评论区 "),
      vue.createElementVNode("view", { class: "bg-g" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.comment, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "bg-w ra-10 ma-10 pa-10 rel",
              key: item.index
            }, [
              vue.createCommentVNode(" 头像 "),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode("view", {
                  class: "inbox bg-s ra-50",
                  style: { "width": "2.5rem", "height": "2.5rem", "margin": "0.3rem", "overflow": "hidden" }
                }, [
                  vue.createElementVNode("img", {
                    src: item.head,
                    alt: "",
                    style: { "width": "100%", "height": "100%" }
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "inbox" },
                  vue.toDisplayString(item.userName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 评论内容 "),
              vue.createElementVNode(
                "view",
                { class: "pa-l10" },
                vue.toDisplayString(item.content),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" 评论时间 "),
              vue.createElementVNode(
                "view",
                {
                  class: "fo-g",
                  style: { "font-size": "0.8rem", "padding": "0.5rem" }
                },
                vue.toDisplayString(item.time),
                1
                /* TEXT */
              ),
              $data.myid == item.userId ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "pa-l10 pos",
                style: { "bottom": "1rem", "right": "1rem", "font-size": "0.8rem", "color": "#db4900" },
                onClick: ($event) => $options.open(item.id)
              }, " 删除我的留言 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 弹出层 "),
      vue.createVNode(_component_u_popup, {
        show: $data.show,
        mode: "bottom",
        closeable: "true",
        onClose: $options.close,
        onOpen: $options.open
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "pa-10 w-100 text-center" }, " 是否确认删除 "),
          vue.createElementVNode("view", { class: "panel-around" }, [
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.deleteword())
            }, "确认"),
            vue.createElementVNode("button", {
              class: "ma-10 ra-20 fo-w",
              style: { "background-color": "#db4900", "width": "30%" },
              onClick: _cache[1] || (_cache[1] = ($event) => $options.close())
            }, "取消")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show", "onClose", "onOpen"])
    ]);
  }
  const PagesMywordMyword = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/before/Project/uniApp/pages/myword/myword.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/main/main", PagesMainMain);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/special/special", PagesSpecialSpecial);
  __definePage("pages/score/score", PagesScoreScore);
  __definePage("pages/study/study", PagesStudyStudy);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/book/book", PagesBookBook);
  __definePage("pages/commment/commment", PagesCommmentCommment);
  __definePage("pages/booklist/booklist", PagesBooklistBooklist);
  __definePage("pages/essay/essay", PagesEssayEssay);
  __definePage("pages/mybooklist/mybooklist", PagesMybooklistMybooklist);
  __definePage("pages/password/password", PagesPasswordPassword);
  __definePage("pages/content/content", PagesContentContent);
  __definePage("pages/words/words", PagesWordsWords);
  __definePage("pages/myword/myword", PagesMywordMyword);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/before/Project/uniApp/App.vue"]]);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function useStore(key) {
    if (key === void 0)
      key = null;
    return vue.inject(key !== null ? key : storeKey);
  }
  function find(list, f) {
    return list.filter(f)[0];
  }
  function deepCopy(obj, cache) {
    if (cache === void 0)
      cache = [];
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    var hit = find(cache, function(c) {
      return c.original === obj;
    });
    if (hit) {
      return hit.copy;
    }
    var copy = Array.isArray(obj) ? [] : {};
    cache.push({
      original: obj,
      copy
    });
    Object.keys(obj).forEach(function(key) {
      copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
  }
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject$1(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject$1(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install2(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error2) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error2);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error2);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  var mapState = normalizeNamespace(function(namespace, states) {
    var res = {};
    if (!isValidMap(states)) {
      console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(states).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedState() {
        var state = this.$store.state;
        var getters = this.$store.getters;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapState", namespace);
          if (!module) {
            return;
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === "function" ? val.call(this, state, getters) : state[val];
      };
      res[key].vuex = true;
    });
    return res;
  });
  var mapMutations = normalizeNamespace(function(namespace, mutations) {
    var res = {};
    if (!isValidMap(mutations)) {
      console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(mutations).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedMutation() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var commit = this.$store.commit;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapMutations", namespace);
          if (!module) {
            return;
          }
          commit = module.context.commit;
        }
        return typeof val === "function" ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });
  var mapGetters = normalizeNamespace(function(namespace, getters) {
    var res = {};
    if (!isValidMap(getters)) {
      console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(getters).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      val = namespace + val;
      res[key] = function mappedGetter() {
        if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
          return;
        }
        if (!(val in this.$store.getters)) {
          console.error("[vuex] unknown getter: " + val);
          return;
        }
        return this.$store.getters[val];
      };
      res[key].vuex = true;
    });
    return res;
  });
  var mapActions = normalizeNamespace(function(namespace, actions) {
    var res = {};
    if (!isValidMap(actions)) {
      console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object");
    }
    normalizeMap(actions).forEach(function(ref) {
      var key = ref.key;
      var val = ref.val;
      res[key] = function mappedAction() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var dispatch = this.$store.dispatch;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, "mapActions", namespace);
          if (!module) {
            return;
          }
          dispatch = module.context.dispatch;
        }
        return typeof val === "function" ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });
  var createNamespacedHelpers = function(namespace) {
    return {
      mapState: mapState.bind(null, namespace),
      mapGetters: mapGetters.bind(null, namespace),
      mapMutations: mapMutations.bind(null, namespace),
      mapActions: mapActions.bind(null, namespace)
    };
  };
  function normalizeMap(map) {
    if (!isValidMap(map)) {
      return [];
    }
    return Array.isArray(map) ? map.map(function(key) {
      return { key, val: key };
    }) : Object.keys(map).map(function(key) {
      return { key, val: map[key] };
    });
  }
  function isValidMap(map) {
    return Array.isArray(map) || isObject$1(map);
  }
  function normalizeNamespace(fn) {
    return function(namespace, map) {
      if (typeof namespace !== "string") {
        map = namespace;
        namespace = "";
      } else if (namespace.charAt(namespace.length - 1) !== "/") {
        namespace += "/";
      }
      return fn(namespace, map);
    };
  }
  function getModuleByNamespace(store2, helper, namespace) {
    var module = store2._modulesNamespaceMap[namespace];
    if (!module) {
      console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
    }
    return module;
  }
  function createLogger(ref) {
    if (ref === void 0)
      ref = {};
    var collapsed = ref.collapsed;
    if (collapsed === void 0)
      collapsed = true;
    var filter = ref.filter;
    if (filter === void 0)
      filter = function(mutation, stateBefore, stateAfter) {
        return true;
      };
    var transformer = ref.transformer;
    if (transformer === void 0)
      transformer = function(state) {
        return state;
      };
    var mutationTransformer = ref.mutationTransformer;
    if (mutationTransformer === void 0)
      mutationTransformer = function(mut) {
        return mut;
      };
    var actionFilter = ref.actionFilter;
    if (actionFilter === void 0)
      actionFilter = function(action, state) {
        return true;
      };
    var actionTransformer = ref.actionTransformer;
    if (actionTransformer === void 0)
      actionTransformer = function(act) {
        return act;
      };
    var logMutations = ref.logMutations;
    if (logMutations === void 0)
      logMutations = true;
    var logActions = ref.logActions;
    if (logActions === void 0)
      logActions = true;
    var logger = ref.logger;
    if (logger === void 0)
      logger = console;
    return function(store2) {
      var prevState = deepCopy(store2.state);
      if (typeof logger === "undefined") {
        return;
      }
      if (logMutations) {
        store2.subscribe(function(mutation, state) {
          var nextState = deepCopy(state);
          if (filter(mutation, prevState, nextState)) {
            var formattedTime = getFormattedTime();
            var formattedMutation = mutationTransformer(mutation);
            var message = "mutation " + mutation.type + formattedTime;
            startMessage(logger, message, collapsed);
            logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
            logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
            logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
            endMessage(logger);
          }
          prevState = nextState;
        });
      }
      if (logActions) {
        store2.subscribeAction(function(action, state) {
          if (actionFilter(action, state)) {
            var formattedTime = getFormattedTime();
            var formattedAction = actionTransformer(action);
            var message = "action " + action.type + formattedTime;
            startMessage(logger, message, collapsed);
            logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
            endMessage(logger);
          }
        });
      }
    };
  }
  function startMessage(logger, message, collapsed) {
    var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
    try {
      startMessage2.call(logger, message);
    } catch (e) {
      logger.log(message);
    }
  }
  function endMessage(logger) {
    try {
      logger.groupEnd();
    } catch (e) {
      logger.log("—— log end ——");
    }
  }
  function getFormattedTime() {
    var time = /* @__PURE__ */ new Date();
    return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
  }
  function repeat(str, times2) {
    return new Array(times2 + 1).join(str);
  }
  function pad(num, maxLength) {
    return repeat("0", maxLength - num.toString().length) + num;
  }
  var index$1 = {
    version: "4.1.0",
    Store,
    storeKey,
    createStore,
    useStore,
    mapState,
    mapMutations,
    mapGetters,
    mapActions,
    createNamespacedHelpers,
    createLogger
  };
  const store = createStore({
    state: {
      login: false,
      essayid: 0,
      id: 1,
      user: {},
      lljl: []
    },
    mutations: {
      // 定义mutations，用于修改状态(同步)
      update(state, payload) {
        state[state] = payload;
      },
      setNumber(state, newValue) {
        state.essayid = newValue;
      }
    },
    actions: {
      // 定义actions，用于修改状态(异步)
      // 2秒后更新状态
      updateUid(context, payload) {
        setTimeout(() => {
          context.commit("updateUid", payload);
        }, 2e3);
      },
      updateNumber({ commit }, newValue) {
        commit("setNumber", newValue);
      }
    },
    getters: {
      // 定义一个getters
      formatUid(state) {
        return state.uid + " Tom";
      },
      formatessayid(state) {
        return state.essayid;
      }
    },
    modules: {}
  });
  const { toString } = Object.prototype;
  function isArray(val) {
    return toString.call(val) === "[object Array]";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isDate(val) {
    return toString.call(val) === "[object Date]";
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  function deepMerge$1() {
    const result = {};
    function assignValue(val, key) {
      if (typeof result[key] === "object" && typeof val === "object") {
        result[key] = deepMerge$1(result[key], val);
      } else if (typeof val === "object") {
        result[key] = deepMerge$1({}, val);
      } else {
        result[key] = val;
      }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url2, params) {
    if (!params) {
      return url2;
    }
    let serializedParams;
    if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts = [];
      forEach(params, (val, key) => {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (isArray(val)) {
          key = `${key}[]`;
        } else {
          val = [val];
        }
        forEach(val, (v) => {
          if (isDate(v)) {
            v = v.toISOString();
          } else if (isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(`${encode(key)}=${encode(v)}`);
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  function settle(resolve, reject, response) {
    const { validateStatus } = response.config;
    const status = response.statusCode;
    if (status && (!validateStatus || validateStatus(status))) {
      resolve(response);
    } else {
      reject(response);
    }
  }
  const mergeKeys$1 = (keys, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
    return config3;
  };
  const adapter = (config2) => new Promise((resolve, reject) => {
    const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
    const _config = {
      url: fullPath,
      header: config2.header,
      complete: (response) => {
        config2.fullPath = fullPath;
        response.config = config2;
        try {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }
        } catch (e) {
        }
        settle(resolve, reject, response);
      }
    };
    let requestTask;
    if (config2.method === "UPLOAD") {
      delete _config.header["content-type"];
      delete _config.header["Content-Type"];
      const otherConfig = {
        filePath: config2.filePath,
        name: config2.name
      };
      const optionalKeys = [
        "files",
        "timeout",
        "formData"
      ];
      requestTask = uni.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
    } else if (config2.method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        _config.timeout = config2.timeout;
      }
      requestTask = uni.downloadFile(_config);
    } else {
      const optionalKeys = [
        "data",
        "method",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      requestTask = uni.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
    }
    if (config2.getTask) {
      config2.getTask(requestTask, config2);
    }
  });
  const dispatchRequest = (config2) => adapter(config2);
  function InterceptorManager() {
    this.handlers = [];
  }
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  };
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager.prototype.forEach = function forEach2(fn) {
    this.handlers.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  };
  const mergeKeys = (keys, globalsConfig, config2) => {
    const config3 = {};
    keys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      } else if (!isUndefined(globalsConfig[prop])) {
        config3[prop] = globalsConfig[prop];
      }
    });
    return config3;
  };
  const mergeConfig = (globalsConfig, config2 = {}) => {
    const method = config2.method || globalsConfig.method || "GET";
    let config3 = {
      baseURL: globalsConfig.baseURL || "",
      method,
      url: config2.url || "",
      params: config2.params || {},
      custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
      header: deepMerge$1(globalsConfig.header || {}, config2.header || {})
    };
    const defaultToConfig2Keys = ["getTask", "validateStatus"];
    config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
    if (method === "DOWNLOAD") {
      if (!isUndefined(config2.timeout)) {
        config3.timeout = config2.timeout;
      } else if (!isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else if (method === "UPLOAD") {
      delete config3.header["content-type"];
      delete config3.header["Content-Type"];
      const uploadKeys = [
        "files",
        "filePath",
        "name",
        "timeout",
        "formData"
      ];
      uploadKeys.forEach((prop) => {
        if (!isUndefined(config2[prop])) {
          config3[prop] = config2[prop];
        }
      });
      if (isUndefined(config3.timeout) && !isUndefined(globalsConfig.timeout)) {
        config3.timeout = globalsConfig.timeout;
      }
    } else {
      const defaultsKeys = [
        "data",
        "timeout",
        "dataType",
        "responseType",
        "sslVerify",
        "firstIpv4"
      ];
      config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
    }
    return config3;
  };
  const defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: true,
    firstIpv4: false,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  var clone = function() {
    function _instanceof(obj, type) {
      return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_) {
      nativePromise = function() {
      };
    }
    function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone2.__isArray(parent2)) {
          child = [];
        } else if (clone2.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone2.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.from) {
            child = Buffer.from(parent2);
          } else {
            child = new Buffer(parent2.length);
            parent2.copy(child);
          }
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto = Object.getPrototypeOf(parent2);
            child = Object.create(proto);
          } else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }
        if (circular) {
          var index2 = allParents.indexOf(parent2);
          if (index2 != -1) {
            return allChildren[index2];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i in parent2) {
          var attrs = Object.getOwnPropertyDescriptor(parent2, i);
          if (attrs) {
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          try {
            var objProperty = Object.getOwnPropertyDescriptor(parent2, i);
            if (objProperty.set === "undefined") {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          } catch (e) {
            if (e instanceof TypeError) {
              continue;
            } else if (e instanceof ReferenceError) {
              continue;
            }
          }
        }
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(parent2);
          for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            Object.defineProperty(child, symbol, descriptor);
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i = 0; i < allPropertyNames.length; i++) {
            var propertyName = allPropertyNames[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, descriptor);
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c = function() {
      };
      c.prototype = parent;
      return new c();
    };
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o) {
      return typeof o === "object" && __objToStr(o) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o) {
      return typeof o === "object" && __objToStr(o) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o) {
      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
      var flags = "";
      if (re.global)
        flags += "g";
      if (re.ignoreCase)
        flags += "i";
      if (re.multiline)
        flags += "m";
      return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
  }();
  class Request {
    /**
    * @param {Object} arg - 全局配置
    * @param {String} arg.baseURL - 全局根路径
    * @param {Object} arg.header - 全局header
    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
    * @param {String} arg.dataType = [json] - 全局默认的dataType
    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
    * @param {Object} arg.custom - 全局默认的自定义参数
    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
    */
    constructor(arg = {}) {
      if (!isPlainObject(arg)) {
        arg = {};
        formatAppLog("warn", "at uni_modules/uview-plus/libs/luch-request/core/Request.js:39", "设置全局参数必须接收一个Object");
      }
      this.config = clone({ ...defaults, ...arg });
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */
    setConfig(f) {
      this.config = f(this.config);
    }
    middleware(config2) {
      config2 = mergeConfig(this.config, config2);
      const chain = [dispatchRequest, void 0];
      let promise2 = Promise.resolve(config2);
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise2 = promise2.then(chain.shift(), chain.shift());
      }
      return promise2;
    }
    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
    request(config2 = {}) {
      return this.middleware(config2);
    }
    get(url2, options = {}) {
      return this.middleware({
        url: url2,
        method: "GET",
        ...options
      });
    }
    post(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "POST",
        ...options
      });
    }
    put(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "PUT",
        ...options
      });
    }
    delete(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "DELETE",
        ...options
      });
    }
    options(url2, data, options = {}) {
      return this.middleware({
        url: url2,
        data,
        method: "OPTIONS",
        ...options
      });
    }
    upload(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "UPLOAD";
      return this.middleware(config2);
    }
    download(url2, config2 = {}) {
      config2.url = url2;
      config2.method = "DOWNLOAD";
      return this.middleware(config2);
    }
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = uni.$u.queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = uni.$u.deepMerge(this.config, options);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig2.url === uni.$u.page())
        return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = uni.$u.deepMerge(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha) {
    color2 = rgbToHex(color2);
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = String(color2).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return `rgba(${sColorChange.join(",")},${alpha})`;
    }
    return sColor;
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range: range$1,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uview-plus/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (test.number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = "") {
    if (!unit) {
      unit = uni.$u.config.unit || "px";
    }
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    const o = test.array(obj) ? [] : {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else if (target[prop].concat && source[prop].concat) {
          target[prop] = target[prop].concat(source[prop]);
        } else {
          target[prop] = deepMerge(target[prop], source[prop]);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uview-plus/libs/function/index.js:238", `uView提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else {
      date2 = new Date(
        typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
      );
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = uni.$u.$parent.call(instance, "u-form-item");
    const form = uni.$u.$parent.call(instance, "u-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    const pages2 = getCurrentPages();
    return `/${pages2[pages2.length - 1].route || ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function setConfig({
    props: props2 = {},
    config: config2 = {},
    color: color2 = {},
    zIndex: zIndex2 = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$u;
    uni.$u.config = deepMerge2(uni.$u.config, config2);
    uni.$u.props = deepMerge2(uni.$u.props, props2);
    uni.$u.color = deepMerge2(uni.$u.color, color2);
    uni.$u.zIndex = deepMerge2(uni.$u.zIndex, zIndex2);
  }
  const index = {
    range,
    getPx,
    sleep,
    os,
    sys,
    random,
    guid,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge,
    error,
    randomArray,
    timeFormat,
    timeFrom,
    trim,
    queryParams,
    toast,
    type2icon,
    priceFormat,
    getDuration,
    padZero,
    formValidate,
    getProperty,
    setProperty,
    page,
    pages,
    setConfig
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  let platform = "none";
  platform = "vue3";
  platform = "plus";
  const platform$1 = platform;
  const $u = {
    route,
    date: index.timeFormat,
    // 另名date
    colorGradient: colorGradient$1.colorGradient,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    colorToRgba: colorGradient$1.colorToRgba,
    test,
    type: ["primary", "success", "error", "warning", "info"],
    http: new Request(),
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props: props$i,
    ...index,
    color,
    platform: platform$1
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.config.globalProperties.$u = $u;
    Vue2.config.globalProperties.$nextTick = (cb) => {
      cb();
    };
    Vue2.mixin(mixin);
  };
  const uviewPlus = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uviewPlus);
    app.use(store);
    app.use(index$1);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
