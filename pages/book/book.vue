<template>
	<view>
		<view class="bg-g ra-10 ma-10 pa-10">
			<!-- 书的封面 -->
			<view class="bg-w inbox ra-10" style="width: 8rem;height: 10rem;">
				<img :src="book.bookImg" alt="" style="width: 100%;height: 100%; " class="inbox">
			</view>
			<view class="inbox pos pa-10">
				<!-- 书名 -->
				<view class="" style="font-size: 1.5rem; width: 11rem;">
					<view class="overflow-ellipsis " style="font-weight: 700;">
						{{book.bookName}}
					</view>
				</view>
				<!-- 书的作者 -->
				<view class="inbox" style="padding: 0.4rem 1rem;width: 9rem;">
					<view class="overflow-ellipsis ">
						{{book.bookAuther}}
					</view>
				</view>
				<!-- 书的简介 -->
				<view class="inbox fo-g   text-container pa-t10" @click="op()" >
					<view class="overflow-ellipsis ">
						{{book.bookIntroduce}}
					</view>
				</view>
			</view>
		</view>
		<!-- 简介 -->
		<u-popup :show="bookshow" mode="center"  @close="close">
		        <view class="" style="padding: 0.5rem;margin: 0.5rem;border-radius: 0.6rem;">
					{{book.bookIntroduce}}
		        </view>
			</u-popup>
		<!-- 评论区 -->
		<view class="bg-g ra-10 ma-10 pa-10">
			<view class="w-100 text-center" v-if="textshow">
				暂无评论
			</view>
			<view class="bg-w ra-10  pa-10 rel ma-b10" v-for="(item,index) in comment" :key="index">
				
				<!-- 头像 -->
				<view class="">
					<view class="inbox  ra-50" style="width: 2.5rem;height: 2.5rem;margin: 0.3rem;overflow: hidden;">
						<img :src="item.head" alt="" style="width:100%;height: 100%
						;">
					</view>
					<view class="inbox">
						{{item.userName}}
					</view>
				</view>
				<!-- 评论内容 -->
				<view class=" pa-l10 overflowcomment" >
					{{item.content}}
				</view>
				<!-- 评论时间 -->
				<view class=" fo-g " style="font-size: 0.8rem; padding: 0.5rem;">
					{{item.creatTime}}
				</view>

			</view>
			<view class="" v-if="more">
				<button class="ra-20  fo-w bg-red"  style=" margin: 2rem 0.5rem;"
					@click="gotocomment()">查看更多评论</button>
			</view>
			
		</view>
		<view class="">
			<view class="ma-10  "  style="background-color: #ffffff;border-bottom: 0.3rem solid #e2510e;width: 20%;"
				@click="open()">发布评论</view>
		</view>
		<view class="pa-10">
			
		</view>
		<u-popup :show="show" mode="bottom" >
			<view class="" style="padding: 2.5rem 0.5rem;">
				<u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
			</view>
			<button class="ma-10 ra-20  fo-w bg-red" @click="outcomment()">发布评论</button>
		</u-popup>
	</view>
	<view class="" style="height: 3rem;">
		
	</view>
		<view class="" style="position: fixed;bottom: 0; display: flex;background-color: #ffffff;width: 100%;padding: 5px;">
			<button class="ra-10 bg-red" style="color: #ffffff;width: 40%;" @click="inself()" v-if="!isself">加入书架</button>
			<button class="ra-10 bg-red" style="color: #ffffff;width: 40%;" @click="outself()" v-if="isself">已经加入书架</button>
			<button class="ra-10" style="background-color: #ffffff;border: 0.1rem solid #e2510e;width: 35%;" @click="gotocontent()">阅读</button>
		</view>
</template>
<script>
	import { base_url } from "../base.js"
	export default {
		data() {
		return {
			value:0,
			ok:false,
			value1: '',
			show:false,
			comment:[],
			book:{},
			num:0,
			page:1,
			likeid:0,
			more:true,
			bookshow:false,
			textshow:false,
			isself:false,
			gocomment:true,
		}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.num=option.num;
			this.getbook(option.num);
			this.istrueself()
		},
		onShow() {
			const num=this.num
			this.getcomment(num,1,3)
			this.istrueself()
		},
		onPullDownRefresh (){
			this.page=0
			const num=this.num
			 setTimeout(() => {
				 this.getbook(num)
				 this.getcomment(num,1,3)
			      uni.stopPullDownRefresh ();
			    }, 1000);
		},
		methods: {
			async getbook(num){
				console.log(num);
				const that=this
				try{
					const response = await uni.request({
						url: base_url+'/book/bookByid', // 替换为实际的 API 地址
						method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data: {
							"bookid":num,
							"show":1,
						},
					  });
						console.log(response);
						console.log(response.data.data);
						that.book=response.data.data
				}catch(e){
					console.log("bookerror");
					console.log(e);
					//TODO handle the exception
				}
				},	
				async getcomment(num,num1,num2){
					const that=this
					try{
						const response = await uni.request({
							url: base_url+'/comment/getlimit', // 替换为实际的 API 地址
							method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
							header:{
								 'Authorization':uni.getStorageSync("token"), // 添加认证头部
							},
							data: {
								"num":num1,
								"pagesize":num2,
								"bookId":num
							},
						  });
							let list1=[]
							list1=response.data.data
							console.log(response);
							if(list1.length==0){
								that.more=false
							}
							list1.forEach(function(item, index) {
							    var date = new Date(item.creatTime);
								  var year = date.getFullYear();
								  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								  var day = date.getDate();
								 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									item.creatTime= formattedDate;
							});					 
							that.comment=list1
							if(that.comment.length==0){
								that.textshow=true
							}else{
								that.textshow=false
							}
							
					}catch(e){
						console.log("commenterror");
						console.log(e);
						//TODO handle the exception
					}
					},	
				async outcomment(){
						const that=this
						try{
							const response = await uni.request({
								url: base_url+'/comment/add', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"userId":uni.getStorageSync("name").id,
									"content":that.value1,
									"bookId":that.num,
									"bookName":that.book.bookName,
									"userName":uni.getStorageSync("name").username
								},
							  });
								that.close()
								console.log(response);
								 uni.showToast({
								        title: '评论发布成功',
								        icon: 'none', // 'none' 表示不显示图标，可根据需求调整
								        duration: 1000, // 显示时长，单位毫秒
								      });
								this.getcomment(that.num,1,3)
						}catch(e){
							console.log("error");
							console.log(e);
						}
					},
					async inself(){
						const that=this
						try{
							const response = await uni.request({
								url: base_url+'/likebook/addhlike', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"userId":uni.getStorageSync("name").id,
									"bookId":that.num,
									"bookName":that.book.bookName,
								},
							  });
							  console.log(response);
							  if(response.data.code==200){
								  uni.showToast({
								         title: '加入书架成功',
								         icon: 'none', // 'none' 表示不显示图标，可根据需求调整
								         duration: 1000, // 显示时长，单位毫秒
								       });
							  }else{
								  uni.showToast({
								         title: '加入书架失败',
								         icon: 'none', // 'none' 表示不显示图标，可根据需求调整
								         duration: 1000, // 显示时长，单位毫秒
								       });
							  }
							  that.istrueself()
						}catch(e){
							console.log("error");
							console.log(e);
							uni.showToast({
							       title: '服务器错误',
							       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
							       duration: 1000, // 显示时长，单位毫秒
							     });
						}
					},
					async outself(){
						const that=this
						try{
							console.log(that.likeid);
							const response = await uni.request({
								url: base_url+'/likebook/del', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"likeId":that.likeid,
								},
							  });
							  console.log(response);
							  if(response.data.code==200){
							  uni.showToast({
									 title: '从书架移除成功',
									 icon: 'none', // 'none' 表示不显示图标，可根据需求调整
									 duration: 1000, // 显示时长，单位毫秒
								   });
							  }else{
							  uni.showToast({
									 title: '从书架移除失败',
									 icon: 'none', // 'none' 表示不显示图标，可根据需求调整
									 duration: 1000, // 显示时长，单位毫秒
								   });
							  }
							  that.istrueself()
						}catch(e){
							console.log("error");
							console.log(e);
							uni.showToast({
							       title: '服务器错误',
							       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
							       duration: 1000, // 显示时长，单位毫秒
							     });
						}
					},
					async istrueself(){
						const that=this
						try{
							const response = await uni.request({
								url: base_url+'/likebook/byuserbook', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"bookId":that.num,
									"userId":uni.getStorageSync("name").id,
								},
							  });
							  console.log(response);
							  if(response.data.data==0){
								  that.isself=false
							  }else{
								  if(response.data.data.likeId){
									  that.likeid=response.data.data.likeId
									   that.isself=true
								  }else{
									  that.isself=false
								  }
								 
							  }
						}catch(e){
							console.log("error");
							console.log(e);
						}
					},
					gotocontent(){
						const num=this.num
						uni.navigateTo({
							url:"/pages/content/content?num="+num
						})
					},
				gotocomment(){
					const num=this.num
					uni.navigateTo({
						url:"/pages/commment/commment?num="+num
					})
				},
			addLeadingZero(number) {
				    return number < 10 ? "0" + number : number;
				},
				open() {
						this.show=true
				      },
				op() {
						this.bookshow=true
				      },
				close() {
					this.value1='',
					this.bookshow=false
				    this.show = false
				}
		}
	}
	
</script>
<style scoped>
.overflow-ellipsis {
	width:10rem;
	font-size: 0.8rem;
	overflow: hidden;
     -webkit-line-clamp: 3;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
}
.overflowcomment {
	width:15rem;
	font-size: 1rem;
	overflow: hidden;
     -webkit-line-clamp: 10;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
}
.bg-red{
	background-color: #e2510e;
}
.bg-grey{
	background-color: #e2e1e1;
}

</style>