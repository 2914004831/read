export const base_url = "https://7888k0724y.zicp.fun/"
export const ws_base_url = "ws://127.0.0.1:5000/"

export default {
  request(options) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: base_url+ options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header:{
				'Authorization':uni.getStorageInfoSync("token"), // 添加认证头部
				'Content-Type': 'application/json' // 设置请求的 Content-Type
        },
        success: (res) => {
			console.log(res);
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
        },
        fail: (err) => {
			console.log("wozaizheqinqiu");
          reject(err);
        },
      });
    });
  },
};
