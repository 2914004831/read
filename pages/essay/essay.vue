<template>
	
	<view style="padding: 0.7rem;" >
		<view class="fo-g" >
			{{list.creatTime}}
		</view>
		<h1>{{list.title}}</h1>
		<div v-html="list.content" ></div>
	</view>
</template>

<script>
	
import { base_url } from "../base.js"

	export default {
		data() {
			return {
				num:0,
				essayid:0,
				list:{},
				content:'<p>1111</p>',
				enterTimestamp: 0, // 记录进入页面的时间戳
				stayDuration: 0,   // 停留时间
			}
		},
		onShow() {
			this.getessay();
		   this.enterTimestamp = Date.now();
		   },
	
		   onLoad (option) { //option为object类型，会序列化上个页面传递的参数
		   this.essayid=option.num;
		    this.enterTimestamp = Date.now();
		   },
	onUnload(){
		const exitTimestamp = Date.now();
		   this.stayDuration = exitTimestamp - this.enterTimestamp;
		const date = new Date(this.stayDuration);
		if(this.stayDuration>5000){
			this.addhis()
			this.updatascore()
		}
	},
	
		methods: {
			async getessay(){
				const that=this
						try{
							const response = await uni.request({
								url: base_url+'/essay/essayByid', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"essayId":that.essayid,
								},
							  });
							      var date = new Date(response.data.data[0].creatTime);
								      var year = date.getFullYear();
								      var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								      var day = date.getDate();
									 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									    response.data.data[0].creatTime = formattedDate;							 
							  that.list=response.data.data[0]
							  // 图片自适应
							  const regex = new RegExp('<img', 'gi')
							  that.list.content = that.list.content.replace(regex, `<img style="max-width: 100%; height: auto"`);
						}catch(e){
							console.log("error");
							console.log(e);
							//TODO handle the exception
						}
						},	
			async addhis(){
				const that=this
						try{
							console.log("我添加记录了");
							const response = await uni.request({
								url: base_url+'/history/addhis', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"name":that.list.title,
									"score":10,
									"userId":uni.getStorageSync("name").id,
									"essayId":that.list.essayId
								},
							  });
							  console.log(response );
						}catch(e){
							console.log("error");
							console.log(e);
							
							//TODO handle the exception
						}
						},
						
						addLeadingZero(number) {
						    return number < 10 ? "0" + number : number;
						},
		},
	
		
	}
</script>

<style>

</style>

