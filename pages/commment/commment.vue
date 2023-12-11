<template>
	<view>
		<!-- 评论区 -->
		<view class="bg-g  ">
			<view class="bg-w ra-10 ma-10 pa-10 rel"  v-for="item in comment" :key="item.index" >
				<!-- 头像 -->
				<view class="">
					<view class="inbox bg-s ra-50" style="width: 2.5rem;height: 2.5rem;margin: 0.3rem;overflow: hidden;">
						<img :src="item.head" alt="" class="icon-100">
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
					{{item.creatTime}}
				</view>
						<view class="pa-l10 pos" style="bottom: 1rem;right: 1rem;font-size: 0.8rem;color: #db4900;"  @click="open(item.commentId)" v-if="myid==item.userId" >
							删除我的评论
						</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup :show="show" mode="bottom"  closeable="true" >
			<view class="pa-10 w-100 text-center">
				是否确认删除
			</view>
			<view class="panel-around">
				<button class="ma-10 ra-20  fo-w" style=" background-color: #db4900;width: 30%;" @click="deletecomment()" >确认</button>
				<button class="ma-10 ra-20  fo-w" style=" background-color: #db4900;width: 30%;" @click="close()">取消</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { log } from "console"
import { base_url } from "../base.js"
	export default {
		data() {
			return {
				show:false,
				book:{},
				comment:[],
				commentid:[],
				num:0,
				myid:0,
				page:1,
			}
		},
		mounted() {
			this.myid=uni.getStorageSync("name").id
			const num=this.num
			this.getbook(num);
			console.log(num)
			this.getcomment(1,7,num);
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.num=option.num;
		},
		// 触底事件
		 onReachBottom() {
			 this.page++
			 const num=this.num
			 const page=this.page
			 this.getcomment(page,7,num);
		    },
		methods: {
			async getbook(num){
				const that=this
				try{
					console.log(base_url+"/book/bookByid")
					const response = await uni.request({
						url: base_url+'/book/bookByid', // 替换为实际的 API 地址
						method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data: {
							"bookid":num
						},
					  });
						var list1={}
						list1=response.data.data
						that.book=list1
				}catch(e){
					console.log("error");
					console.log(e);
					//TODO handle the exception
				}
				},	
				async getcomment(num,num1,num2){
					const that=this
					console.log(num)
					console.log(num1)
					console.log(num2)
					try{
						const response = await uni.request({
							url: base_url+'/comment/getlimit', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							header:{
								 'Authorization':uni.getStorageSync("token"), // 添加认证头部
							},
							data: {
									"num":num,
									"pagesize":num1,
									"bookId":num2
							},
						  });
							var list1=[]
							list1=response.data.data
							console.log(response)
							list1.forEach(function(item, index) {
							    var date = new Date(item.creatTime);
								  var year = date.getFullYear();
								  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								  var day = date.getDate();
								 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									item.creatTime= formattedDate;
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
				async deletecomment(){
						const that=this
						console.log(that.commentid);
						try{
							const response = await uni.request({
								url: base_url+'/comment/delcomment', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"commentId":that.commentid,
								},
							  });
								that.close()
								const number=that.num
								that.getcomment(1,7,number);
						}catch(e){
							console.log("error");
							console.log(e);
						}
					},
					addLeadingZero(number) {
						    return number < 10 ? "0" + number : number;
						},
				open(num) {
					this.commentid=num
						this.show=true
				      },
				close() {
				    this.show = false
				}
		}
	}
</script>

<style>
body{
	background-color: #f3f3f3;
}
</style>
