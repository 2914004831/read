
export default function (to, from, next) {
  const token = uni.getStorageSync('token'); // 假设你的登录状态是通过 token 来验证的

  // 如果用户未登录，重定向到登录页
  if (!token||token==null||token=="") {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
	
    uni.redirectTo({
      url: '/pages/index/index' // 请根据实际路由路径进行调整
    });
  } else {
    next(); // 用户已登录，继续导航
  }
}
