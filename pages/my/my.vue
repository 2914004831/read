<template>
	<view class="" style=" background: linear-gradient(to right, #ff5500, #ff5e62);;position: fixed;width: 100vw;height: 5rem;z-index: -1;">
	</view>

	<!-- 头部区域 -->
	<view class="pa-10">
		<view class=" ra-50 ma-10 bg-s inbox" style="width: 4rem;height: 4rem;" @click="upload">
			<!-- 这里使用 :src="cover"  将src动态赋值-->
			<image  :src="cover" class="ra-50" style="width: 4rem;height: 4rem;"></image>
			
		</view>
		
		<view class="inbox  pa-10 fo-w" style="font-size: 1rem; position: absolute;top: 2rem;">
			{{user.name}}
		</view>
		
		<view class="pa-10">
			学习积分:{{user.score}}
		</view>
		<!-- 下面的区域 -->
		<view class="pa-10 border ra-10">
			<view class="pa-10 border-b" @click="gotoscore()">
				我的积分
			</view>
			<view class="pa-10 border-b" @click="gotostudy()">
				我的学习
			</view>
			<view class="pa-10 border-b" @click="gotoself()">
				我的书架
			</view>
			<view class="pa-10 border-b" @click="gotoword()">
				我的留言
			</view>
			<view class="pa-10 border-b" @click="showModal()">
				积分规则
			</view>
		</view>
		
		<view class=" pa-10">
			<button class=" fo-w ra-20" style="background: linear-gradient(to right, #ff5500, #ff5e62);" @click="gotopassword()">修改密码</button>
		</view>
		<view class=" pa-10">
			<view class="ra-20 pos" style="top: 8rem;right: 3rem;color: #ff5500 ;" @click="logout">退出登录</view>
		</view>
	</view>
		<view >
			<u-modal :show="show" :title="title" :content='content' @confirm="confirm" ref="uModal" :asyncClose="true"></u-modal>
		</view>
		
</template>

<script>
	import { base_url } from "../base.js"
	import api from '../base.js'
	import routingIntercept from '@/interpeceptor.js'
	export default {
		data() {
					return {
					cover: '', // 存储头像的 URL
						show:false,
						title:'积分规则',
						content:'学习专题加十分',
						user: { 
							name: '',
							 head: '', 
							 score: '' },
					}
				},
		mounted() {
			this.get()
			this.getuser()
		  },
		 onShow() {
			 console.log("我的主页")
			 routingIntercept()
		 	this.getuser()
		 },
		 
		methods: {
			
		upload() {
		    uni.chooseImage({
		        count: 1, // 只允许选择一张图片
		        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		        sourceType: ['album'], // 从相册选择
		        success: (chooseImageRes) => {
		            // 压缩选择的图片
		            uni.compressImage({
		                src: chooseImageRes.tempFilePaths[0],
		                quality: 50, // 压缩质量
		                success: (compressRes) => {
							this.cover=chooseImageRes.tempFilePaths[0]
		                    // 上传图片
		                    uni.uploadFile({
		                        url: base_url+'/user/updatehead', // 替换为实际的上传接口地址
		                        filePath: compressRes.tempFilePath, // 上传的文件路径
		                        name: 'imageFile', // 服务器接收文件的字段名
		                        formData: {
		                            id: uni.getStorageSync("name").id // 其他表单数据
		                        },
		                        header: {
		                            'Authorization': uni.getStorageSync("token") // 添加认证头部
		                        },
		                        success: (uploadRes) => {
		                            console.log('上传成功', uploadRes);
		                            // 在这里处理上传成功后的逻辑
		                        },
		                        fail: (uploadErr) => {
		                            console.log('上传失败', uploadErr);
		                            // 在这里处理上传失败后的逻辑
		                        }
		                    });
		                },
		                fail: (compressErr) => {
		                    console.log('压缩图片失败', compressErr);
		                    // 在这里处理压缩失败后的逻辑
		                }
		            });
		        },
		        fail: (chooseImageErr) => {
		            console.log('选择图片失败', chooseImageErr);
		            // 在这里处理选择图片失败后的逻辑
		        }
		    });
		},
			showModal() {
						this.show = true;
					},
					confirm() {
							// 3秒后自动关闭
							this.show = false;
					},
			gotopassword(){
				uni.navigateTo({
					url:"/pages/password/password"
				})
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
					  // console.log(response);
					uni.navigateTo({
						url:"/pages/index/index"
					})
					
					uni.setStorageSync("token", null)
				}catch(e){
					console.log("error");
					console.log(e);
					//TODO handle the exception
				}
				},
					async get(){
						const that=this
						try{
							that.user.name=uni.getStorageSync("name").username
							that.user.score=uni.getStorageSync("name").score
						}catch(e){
							console.log(e);
							//TODO handle the exception
						}
					},
					async getuser(){
						const that=this
						const num=uni.getStorageSync("name").username
								try{
									const response = await uni.request({
										url: base_url+'/user/userByname', // 替换为实际的 API 地址
										method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
										header:{
											 'Authorization':uni.getStorageSync("token"), // 添加认证头部
										},
										data: {
											"username":num,
										},
									  });
									  console.log(response);
									  that.user.score=response.data.data[0].score;
									  that.cover=response.data.data[0].head;
								}catch(e){
									console.log("error");
									console.log(e);
									//TODO handle the exception
								}
								},	
					gotoscore(){
						uni.navigateTo({
							url:"/pages/score/score"
						})
					},
					gotostudy(){
						uni.navigateTo({
							url:"/pages/study/study"
						})
					},
					gotoself(){
						uni.navigateTo({
							url:"/pages/mybooklist/mybooklist"
						})
					},
					gotoword(){
						uni.navigateTo({
							url:"/pages/myword/myword"
						})
					}
		
		}
	}
</script>

<style>

</style>
