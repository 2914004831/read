<template>
	<view class="content">
		<view class="body">
			<view class="" style="display: flex;justify-content: center;
			align-items: center;margin: 25% 0 5% 0;">
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
					placeholder="请输入密码 密码至少六位">
					
				</view>
				<view class="input">
					<text class="text">确认密码：</text>
					<input type="password" class="info" v-model="password1"
					placeholder="请再次输入密码">
				</view>
				<view class="">
					<button class="btn" @click="register()">注册</button>
				</view>
			</view>
		</view>
	</view>
		<view :class="color? 'success' : 'erro'" style="position: fixed;padding: 0.6rem;color: #ffffff;border-radius: 0.2rem;top: 3rem;left: 35%;" v-if="show">
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
				username: "",
				show:false,
				mesg:"",
				color:true
			}
		},
		watch: {
			password(){
				console.log(this.password.length);
			},
			username(){
			}
		},
		onLoad() {
		},
		methods: {
			checkpwd(){
				if(this.username!=''){
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
				}else{
					this.show=true
					this.color=false
					this.mesg="账号不能为空"
					setTimeout(() => {
					      this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
					    }, 800);
					return false
				}
				
				
			},
		async register(){
			const that=this
				try {
						if(that.checkpwd()){
							const response = await uni.request({
							    url: base_url+'/user/register', // 替换为实际的 API 地址
							    method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							    data: {
							      // 请求参数
							      username: that.username,
							      pwd: that.password,
								  role:0
							    },
							  });
							  // 处理返回的数据
							  console.log(response);
							  if (response.data.code === 200) {
								  this.show=true
								  this.color=true
								  this.mesg=response.data.message
								  setTimeout(() => {
								        this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
								}, 800);
								this.password=''
								this.username=''
								this.password1=''
								
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
				       } catch (error) {
						   this.show=true
						   this.color=false
						   this.mesg=error.message
						   setTimeout(() => {
						         this.show= false; // 2秒后将 isVisible 设置为 false，消息框消失
						       }, 800);
				      
				      }
		}
	},
	}
</script>

<style lang="scss" scoped>
	$backColor: #1f7efe;
	.success{
		background-color: #62d93a;
	}
	.erro{
		background-color: #db3315;
	}
	.content{
		.body{
			.input_content{
				width: 96%;margin: 0 auto;
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
					background-color:#d5480f;
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
