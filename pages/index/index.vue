<template>
	<view class="content" style="background-color: #f9f9f9;width: 100vw;height: 100vh;">
		<view class="body">
			<view class="" style="display: flex;justify-content: center;
			align-items: center;padding: 25% 0 5% 0;">
				<text style="font-size: 24px;">红色阅读app</text>
			</view>
			<view class="input_content">
				<view class="input">
					<text class="text">账号：</text>
					<input class="info" type="text" v-model="username"
					placeholder="请输入账号">
				</view>
				<view class="input">
					<text class="text">密码：</text>
					<input type="password" class="info" v-model="password"
					placeholder="请输入密码">
				</view>
				<view class="">
					<button class="btn" @click="login()">登录</button>
				</view>
				<view style="margin-top: 10px;">
					<text style="font-size: 12px;" class="gotoRes"
					 @click="gotoRes()">
						还没有注册？点击我注册
					</text>
				</view>
			</view>
		</view>
	</view>
	<view :class="color? 'success' : 'erro'" style="position: fixed;padding: 0.6rem;color: #ffffff;border-radius: 0.2rem;top: 2rem;left: 30%;" v-if="show">
		{{mesg}}
	</view>
</template>

<script>
import { base_url } from "../base.js"
	export default {
	data() {
		return {
			password: "",
			username: "",
			show:false,
			mesg:"",
			color:true
		}
	},
	watch: {
		password(){
			// console.log(this.password);
		},
		username(){
			// console.log(this.username);
		}
	},
	onLoad() {
	},
	methods: {
		gotoRes(){
			uni.navigateTo({
				url:"/pages/register/register"
			})
		},
		gotoIndex(){
			uni.request({
				url:""
			})
		uni.switchTab({
			url:"/pages/main/main"
		})
	},
		async login(){
				const that=this
				try {
					console.log("ahahah");
						const response = await uni.request({
							url: base_url+'/user/loginuser', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							data: {
							  // 请求参数
							  username: that.username,
							  pwd: that.password,
							},
						  });
						  // 处理返回的数据
						if (response.data.code === 200) {
							console.log(response);
							 uni.setStorageSync("name", response.data.data.data)
							 uni.setStorageSync("token", response.data.data.token)
									  // this.show=true
									  this.mesg=response.data.message
									 uni.showToast({
									        title: '登录成功',
									        icon: 'none', // 'none' 表示不显示图标，可根据需求调整
									        duration: 1000, // 显示时长，单位毫秒
									      });
									this.password=''
									this.username=''
									uni.switchTab({
										url:"/pages/main/main"
									})
									// 在这里进行你的数据处理逻辑
						} else {
							uni.showToast({
							       title: '账号或者密码错误',
							       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
							       duration: 1000, // 显示时长，单位毫秒
							     });
						} 
				   } catch (error) {
					   console.log(error);
					   uni.showToast({
					          title: '服务器错误',
					          icon: 'none', // 'none' 表示不显示图标，可根据需求调整
					          duration: 1000, // 显示时长，单位毫秒
					        });
				}
			}
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
	$backColor: #1f7efe;
	.content{
		.body{
			.input_content{
				width: 96%;
				margin: 0 auto;
				.input{
					display: flex;align-items: center;
					margin-bottom: 5%;
					height: 50px;
					border-bottom: 3px solid rgb(241, 241, 241);
					.text{
						width: 80px;
						text-align: center;
					}
					.info{
						flex: 1;
						background-color: transparent;
					}
				}
				.btn{
					background-color: #d5480f;
					color: white;
				}
				.gotoRes{
					color: #d5480f;
				}
				.gotoRes:active{
					color: #d5480f;
				}
			}
		}
	}
</style>
