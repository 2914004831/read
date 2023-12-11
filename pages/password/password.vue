<template>
	<view class="pa-10 ma-t20" >
		<view class="pa-l30">
			新密码：<input type="password"  v-model="password" placeholder="请输入密码不少于6位" class="border ra-10 " style="margin: 1rem;width: 60%;padding: 0.2rem 0.7rem;">
			确认密码：<input type="password" v-model="password1" placeholder="请再次输入密码" class="border ra-10 "  style="margin: 1rem;width: 60%;padding: 0.2rem 0.7rem;">
			<button class=" ra-20 fo-w ma-20" @click="changepass()" style="background: linear-gradient(to right, #ff5500, #ff5e62); ">确认修改</button>
		</view>
	</view>
	<view :class="color? 'success' : 'erro'"  style="position: fixed;padding: 0.6rem;color: #ffffff;border-radius: 0.2rem;top: 3rem;left: 35%;" v-if="show">
		{{mesg}}
	</view>
		
</template>

<script>
	import { base_url } from "../base.js"
	export default {
		data() {
			return {
				password: "",
				password1: "",
				show:false,
				mesg:"",
				color:true
			}
		},
		methods: {
			checkpwd(){
					if(this.password==this.password1){
						if(this.password.length>=6){
							return true
						}else{
							this.show=true
							this.color=false
							this.mesg="密码格式错误"
							setTimeout(() => {
							      this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
							    }, 1500);
								return false
						}
					}
					else{
						this.show=true
						this.color=false
						this.mesg="密码不一致"
						setTimeout(() => {
						      this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
						    }, 800);
						return false
					}
			},
			
		async changepass(){
				const that=this
				try{
					if(that.checkpwd()){
						console.log("yes");
						console.log(uni.getStorageSync("token"));
						const response = await uni.request({
							url: base_url+'/user/updatepwd', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							header:{
								 'Authorization':uni.getStorageSync("token"), // 添加认证头部
							},
							data: {
								username:uni.getStorageSync("name").username,
								pwd: that.password,
							},
						  });
						  console.log(response);
						  if (response.data.code === 200) {
								  this.show=true
								  this.color=true
								  this.mesg=response.data.message
								  setTimeout(() => {
										this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
								}, 800);
								this.password=''
								this.password1=''
						  			this.logout()					
						    // 在这里进行你的数据处理逻辑
						  } else {
						    this.show=true
						  								this.color=false
						     this.mesg=response.data.message
						    setTimeout(() => {
						          this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
						        }, 800);
						  }
					}else{
						
					}
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
		},
		async logout(){
					const that=this
					try{
						const response = await uni.request({
							url: base_url+'/user/logout', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							header:{
								 'Authorization':uni.getStorageSync("token"), // 添加认证头部
							},
							data: {},
						  });
						  console.log(response);
						uni.navigateTo({
							url:"/pages/index/index"
						})
					}catch(e){
						console.log("error");
						console.log(e);
						//TODO handle the exception
					}
					},
			},
		
	}
</script>

<style lang="scss" scoped>
.success{
		background-color: #62d93a;
	}
	.erro{
		background-color: #db3315;
	}
</style>
