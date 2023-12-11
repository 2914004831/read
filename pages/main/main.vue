<template>
	<view class="" style="">
		<view class="pa-10">
			<!-- 搜索 -->
			<u-search shape="round" :clearabled="true" class="pa-10" @focus="tip"></u-search>
			<!-- 轮播图 -->
			 <u-swiper
			            :list="circle"
						indicator
						circular
			></u-swiper>
		</view>
		<!-- 书单 -->
		<view class="bg-g ra-10  ma-10"  v-for="(item,index) in bookall" :key="index" >
			
			<view class="pa-10" v-if="item.books.length!=0">
				<view class="" style="font-weight: 700;font-size: 1.2rem;padding: 0.5rem 0;position: relative;">
					<view class="ra-10" style="height: 3px; width: 20%; position: absolute; bottom: 0;background-color: #e2510e;left: 5%;">
					</view>
					{{item.name}}
				</view>
				<view class="inbox pa-t10" style="width:33%" v-for="(it,ind) in item.books" :key="ind" >
					<view class="">
						<view class="inbox book"  id="imageContainer" @click="book(it.bookid)">
							<img class="inbox itimg " :src="it.bookImg" alt="Image">
							<view class="overflow-ellipsis" style="position: absolute;font-size: 0.8rem;margin-left: 0.1rem;">
								{{it.bookName}}
							</view>
						</view>
						
					</view>
				</view>
				<view class="">
					<view	class=" ma-t20 button " style="" @click="gotolist(index+1)">	查看书单 </view>
				</view>
			</view>
		</view>
		<view class="pa-10">
			
		</view>
	</view>
	
</template>

<script>
import { base_url } from "../base.js"

	export default {
		data() {
			return {
					circle: [],
					bookall:[
						{
							name:'马克思列宁主义书单',
							books:[]
						},
						{
							name:'毛泽东思想书单',
							books:[]
						},
						{
							name:'邓小平理论书单',
							books:[]
						},
						{
							name:'三个代表重要思想书单',
							books:[]
						},
						{
							name:'科学发展观书单',
							books:[]
						},
						{
							name:'习思想书单',
							books:[]
						}
					],
					}
				
		},
		onShow() {
			this.getbook(1)
			this.getbook(2)
			this.getbook(3)
			this.getbook(4)
			this.getbook(5)
			this.getbook(6)
			this.getcircle()
			// console.log(this.list6.length);
		},
		mounted() {
			this.getbook(1)
			this.getbook(2)
			this.getbook(3)
			this.getbook(4)
			this.getbook(5)
			this.getbook(6)
			this.getcircle()
		},
		methods: {
			tip(e){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			async getcircle(){
				const that=this
				try{
					const response = await uni.request({
						url:base_url+'/circle/getlist',
						method:"GET",
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data:{}
					})
					let list=[];
					let list2=[]
					list=response.data.data
					list.forEach(function(item,index){
						var img=item.img
						list2.push(img)
					})
					that.circle=list2
				}catch(e){
					
				}
			},
			async getbook(num){
				const that=this
						try{
							const response = await uni.request({
								url: base_url+'/book/getlabellimit', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"num":1,
									"pagesize":3,
									"bookLabel":num,
									"show":1
								},
							  });
								var list=[]
								list=response.data.data
								console.log(list);
								console.log(response);
								if(num==1){
									that.bookall[0].books=list
								}else if(num==2){
									that.bookall[1].books=list
								}else if(num==3){
									that.bookall[2].books=list
								}else if(num==4){
									that.bookall[3].books=list
								}else if(num==5){
									that.bookall[4].books=list
								}else if(num==6){
									that.bookall[5].books=list
								}else {
								}
						}catch(e){
							console.log("error");
							console.log(e);
							//TODO handle the exception
						}
						},	
			gotolist(num){
				uni.navigateTo({
					 url: "/pages/booklist/booklist?num=" + num 
				})
			},
			book(num){
				uni.navigateTo({
					url:"/pages/book/book?num="+num
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.book{
	border-radius: 0.7rem;
	width: 90%;height: 7rem;
	 overflow: hidden;
	 .itimg {
		 width: 100%;
		 height: 100%;
	 }
}
.button {
	color: #525252;
	width:40%;
	height:2rem;
	font-size:0.9rem;
	border-bottom: 0.2rem solid #dfdfdf;
	text-align: center;line-height: 2rem;
	margin-left: 6rem;
}
.overflow-ellipsis {
	width:5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.overflow-ellipsis:hover{
    overflow:visible;
	white-space: normal;
}
</style>
