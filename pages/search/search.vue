<template>
	<view class="pa-10">
		<u-search placeholder="请输入搜索书籍名" v-model="value" :clearabled="true" @search="getbook()" @custom="getbook()"></u-search>
	</view>
	
	<view class="bg-g ra-10  pa-10 rel"   v-for="(item,index) in list" :key="index" style="margin: 1rem 0.8rem;">
		<!-- 书的封面 -->
		<view class="bg-w inbox" style="width: 6rem;height: 7rem;"  @click="gotobook(item.bookid)">
			<img :src="item.bookImg" style="width: 100%;height: 100%;" class="inbox">
		</view>
		<!-- 书名 -->
		<view class="inbox pos pa-l10" style="top: 1rem; font-size: 1.2rem;font-weight: 700;width: 12rem;"  @click="gotobook(item.bookid)">
			{{item.bookName}}
		</view>
		<!-- 书的作者 -->
		<view class="inbox pos pa-l10 " style="top: 2.5rem;font-size: 0.9rem;margin: 0.6rem 0;width: 12rem;"  @click="gotobook(item.bookid)">
			{{item.bookAuther}}
		</view>
		<!-- 书的简介 -->
		<view class="inbox fo-g  pa-l10 text-container pa-t10" @click="open(index)" >
			<view class="overflow-ellipsis ">
				{{item.bookIntroduce}}
			</view>
		</view>
	</view>
	
	<view class="pa-10">
	</view>
	<u-popup :show="show" mode="center"  @close="close">
	        <view class="" style="padding: 0.5rem;margin: 0.5rem;border-radius: 0.6rem;">
				{{list[index].bookIntroduce}}
	        </view>
		</u-popup>
</template>

<script>
		import { base_url } from "../base.js"
	export default {
		data() {
			return {
				num:0,
				list:[],
				page:1,
				index:0,
				value:'',
				show: false
			}
		},
			onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				// this.num=option.num;
				// console.log(option.num); //打印出上个页面传递的参数。
			},
			onShow() {
				this.getbook(1,6,this.num)
			},
			// // 下拉刷新
			onPullDownRefresh (){
				this.page=0
				 setTimeout(() => {
					 this.getbook(1,6,this.num)
				        //结束下拉刷新
				      uni.stopPullDownRefresh ();
				    }, 1000);
			},
			// // 触底事件
			 onReachBottom() {
				 this.page++
				 this.getbook(this.page,6,this.num)
			    },
			methods: {
				async getbook(){
					const that=this
							try{
								const response = await uni.request({
									url: base_url+'/book/search', // 替换为实际的 API 地址
									method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
									header:{
										 'Authorization':uni.getStorageSync("token"), // 添加认证头部
									},
									data: {
										"bookName":that.value,
										"show":1
									},
								  });
								  that.list=response.data.data
								  console.log(response);
								  console.log(that.list);
								 //  console.log(that.value);
									// console.log(response);
							}catch(e){
								console.log("error");
								console.log(e);
								//TODO handle the exception
							}
							},	
				gotobook(num){
					uni.navigateTo({
						url:"/pages/book/book?num="+num
					})
				},
				 open(num) {
					 this.index=num
					  this.show = true
				      },
				      close() {
				        this.show = false
				        // console.log('close');
				      }
		},
		
	}
</script>

<style lang="scss" scoped>
.overflow-ellipsis {
	width:12rem;
	font-size: 0.8rem;
	overflow: hidden;
     -webkit-line-clamp: 3;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
}
</style>
