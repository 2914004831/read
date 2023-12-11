<template>
	<view>
		<!-- 评论区 -->
		<view class="bg-g  ">
			<view class="panel-around " style="color: #db4900;font-size: 1.5rem;padding: 0.5rem;">
				留言板
			</view>
			<view class="bg-w ra-10 ma-10 pa-10 rel"  v-for="item in comment" :key="item.index" >
				<!-- 头像 -->
				<view class="">
					<view class="inbox ra-50" style="width: 2.5rem;height: 2.5rem;margin: 0.3rem;overflow: hidden;">
						<img :src="item.head" alt="" style="width: 100%;height: 100%;">
					</view>
					<view class="inbox">
						{{item.userName}}
					</view>
				</view>
				<!-- 评论内容 -->
				<view class=" pa-l10">
					{{item.content}}
				</view>
				<!-- 评论时间 -->
				<view class=" fo-g " style="font-size: 0.8rem; padding: 0.5rem;" >
					{{item.time}}
				</view>
						<view class="pa-l10 pos" style="bottom: 1rem;right: 1rem;font-size: 0.8rem;color: #db4900;"  @click="open(item.id)" v-if="myid==item.userId" >
							删除我的留言
						</view>
			</view>
			<view class="icon-30 ra-50 panel-around fo-w" style="background-color: #db4900;position: fixed;bottom: 2rem;right: 0.5rem; align-items: center;font-size: 3rem;"   @click="openword()">
				+
			</view>
		</view>
		
		
		<u-popup :show="wordshow" mode="bottom" closeable="true" @close="closeword" @open="openword">
			<view class="" style="padding: 2.5rem 0.5rem;">
				<u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
			</view>
			<button class="ma-10 ra-20  fo-w" style=" background-color: #ff6633;" @click="outword()">发布留言</button>
		</u-popup>
		
		
		<!-- 弹出层 -->
		<u-popup :show="show" mode="bottom"  closeable="true" @close="close" @open="open">
			<view class="pa-10 w-100 text-center">
				是否确认删除
			</view>
			<view class="panel-around" >
				<button class="ma-10 ra-20  fo-w" style=" background-color: #db4900;width: 30%;" @click="deleteword()" >确认</button>
				<button class="ma-10 ra-20  fo-w" style=" background-color: #db4900;width: 30%;" @click="close()">取消</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { base_url } from "../base.js"
	export default {
		data() {
			return {
				wordshow:false,
				show:false,
				value1:'',
				comment:[],
				commentid:[],
				wordid:0,
				num:0,
				myid:0,
				page:1,
			}
		},
		mounted() {
			this.myid=uni.getStorageSync("name").id
			this.getword(1,7);
		},
		// 触底事件
		 onReachBottom() {
			 this.page++
			 const page=this.page
			 this.getword(page,7);
		    },
		methods: {
				async getword(num,num1){
					const that=this
					try{
						const response = await uni.request({
							url: base_url+'/word/getall', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							header:{
								 'Authorization':uni.getStorageSync("token"), // 添加认证头部
							},
							data: {
								"num":num,
								"pagesize":num1
							},
						  });
							var list1=[]
							list1=response.data.data
							console.log(response);
							list1.forEach(function(item, index) {
							    var date = new Date(item.time);
								  var year = date.getFullYear();
								  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								  var day = date.getDate();
								 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									item.time= formattedDate;
							});		
							if(num==1){
								that.comment=list1
							}else{
								that.comment=that.comment.concat(list1)
							}
					}catch(e){
						console.log("error");
						console.log(e);
						//TODO handle the exception
					}
					},	
				async deleteword(){
						const that=this
						console.log(that.wordid);
						try{
							const response = await uni.request({
								url: base_url+'/word/delbyid', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"id":that.wordid,
								},
							  });
								that.close()
								uni.showToast({
								       title: '留言删除成功',
								       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
								       duration: 1000, // 显示时长，单位毫秒
								     });
								that.page=1;
								that.getword(1,7);
						}catch(e){
							console.log("error");
							console.log(e);
						}
					},
					async outword(){
							const that=this
							try{
								const response = await uni.request({
									url: base_url+'/word/add', // 替换为实际的 API 地址
									method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
									header:{
										 'Authorization':uni.getStorageSync("token"), // 添加认证头部
									},
									data: {
										"content":that.value1,
										"userId":uni.getStorageSync("name").id,
										"userName":uni.getStorageSync("name").username
									},
								  });
									that.closeword()
									uni.showToast({
									       title: '留言发布成功',
									       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
									       duration: 1000, // 显示时长，单位毫秒
									     });
									that.value1='',
									that.page=1;
									that.getword(1,7);
							}catch(e){
								console.log("error");
								console.log(e);
							}
						},
					addLeadingZero(number) {
						    return number < 10 ? "0" + number : number;
						},
				open(num) {  
						console.log(num);
						this.wordid=num
						this.show=true
				      },
				close() {
				    this.show = false
				},
				openword(num) {
						this.wordshow=true
				      },
				closeword() {
				    this.wordshow = false
				}
		}
	}
</script>

<style>
body{
	background-color: #f3f3f3;
}
</style>
