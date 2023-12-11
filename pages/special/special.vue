<template>
	<view>
		  <u-tabs :list="list0"  @click="click" lineColor="#e2510e"></u-tabs>
	</view>
	<view class="" v-for="(item,index) in list0[namevalue].essay" :key="index" @click="gotoessay(item.essayId)">
		<view class=" ma-10 pa-10 rel" style=" border-radius: 0.3rem;background-color: #f9f9f9;">
			<view class="overflow-ellipsis " style="font-size: 1.1rem;">
				{{item.title}}
			</view>
			<view class="fo-g" style="font-size: 0.8rem;">
				{{item.creatTime}}
			</view>
			<view class="red pos" style="right: 2rem;top: 40%;" v-if="item.show==0">
				未学习
			</view>
			<view class="green pos" style="right: 2rem;top: 40%;" v-if="item.show==1">
				已学习
			</view>
		</view>
		
	</view>
</template>

<script>
import { base_url } from "../base.js"
	export default {
		data() {
			return {
				falg:0,
				type:"warning",
				value:3,
				namevalue:0,
				page:1,
					list0: [
						{
							name: '全部',
							disabled: false,
							essay:[]
						},{
						name: '马克思列宁主义',
						disabled: false,
						essay:[]
					}, {
						name: '毛泽东思想',
						isDot:false ,
						essay:[]
					}, {
						name: '邓小平理论',
						isDot:false ,
						essay:[]
					},  {
						name: '三个代表重要思想',
						isDot:false ,
						essay:[]
					},  {
						name: '科学发展观',
						isDot:false,
						 essay:[]
					}, {
						name: '习思想',
						isDot:false,
						essay:[]
					},{
						name: '课后习题',
						isDot:false,
						essay:[]
					}],
					listhis:[]
			}
			},
		mounted() {
			this.gethis()
			this.getallessay(1,10,0)
		},
		onShow() {
			this.gethis()
			if(this.namevalue==0){
				this.getallessay(1,10,0)
			}else{
				this.getessay(1,10,this.namevalue)
			}
		},
		// 触底
		onReachBottom() {
			 this.page++
			const page=this.page
			const label=this.namevalue
			if(label==0){
				this.getallessay(page,10,0)
			}else{
				this.getessay(page,10,label)
			}
		   },
		methods: {
			 click(item,index) {
				 const name=item.name
				 if (name=="全部") {
					 this.namevalue=0
					 this.page=1
				 	this.getallessay(this.page,10,0)
				 } else if(name=="马克思列宁主义"){
					 this.namevalue=1
					 this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else if(name=="毛泽东思想"){
					 this.namevalue=2
				 	this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else if(name=="邓小平理论"){
					 this.namevalue=3
				 	this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else if(name=="三个代表重要思想"){
					 this.namevalue=4
				 	this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else if(name=="科学发展观"){
					 this.namevalue=5
				 	this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else if(name=="习思想"){
					 this.namevalue=6
				 	this.page=1
					this.getessay(this.page,10,this.namevalue)
				 }else{
					 
				 }
			},
			// 根据标签获取
			async getessay(num,num1,num2){
				const that=this
				try{
					const response = await uni.request({
						url: base_url+'/essay/getlimitbylabel', // 替换为实际的 API 地址
						method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data: {
							"num":num,
							"pagesize":num1,
							"label":num2
						},
					  });
						var list1=[]
						list1=response.data.data
						list1.forEach(function(item, index) {
						    var date = new Date(item.creatTime);
							  var year = date.getFullYear();
							  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
							  var day = date.getDate();
							 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
								item.creatTime= formattedDate;
								if(that.listhis.includes(item.essayId)){
									item.show=1
								}
						});		
						if(num==1){
							that.list0[num2].essay=list1
						}else{
							that.list0[num2].essay=that.list0[num2].essay.concat(list1)
						}}catch(e){
					console.log("error");
					console.log(e);
					//TODO handle the exception
				}
				},	
				// 获取全部
				async getallessay(num,num1,num2){
					const that=this
					try{
						const response = await uni.request({
							url: base_url+'/essay/getlimit', // 替换为实际的 API 地址
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
							list1.forEach(function(item, index) {
							    var date = new Date(item.creatTime);
								  var year = date.getFullYear();
								  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								  var day = date.getDate();
								 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									item.creatTime= formattedDate;
									if(that.listhis.includes(item.essayId)){
										item.show=1
									}
							});		
							if(num==1){
								that.list0[num2].essay=list1
							}else{
								that.list0[num2].essay=that.list0[num2].essay.concat(list1)
							}
							}catch(e){
						console.log("error");
						console.log(e);
						//TODO handle the exception
					}
					},	
					// 获取历史
			async gethis(){
				const that=this
				try{
					const response = await uni.request({
						url: base_url+'/history/getlist', // 替换为实际的 API 地址
						method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data: {
							"userId":uni.getStorageSync("name").id
						},
					  });
						var list1=[]
						list1=response.data.data
						list1.forEach(function(item, index) {
						   that.listhis.push(item.essayId)
						});
						}catch(e){
					console.log("error");
					console.log(e);
					//TODO handle the exception
				}
				},
			// 补零函数
			addLeadingZero(number) {
				    return number < 10 ? "0" + number : number;
				},
			// 去文章
			gotoessay(num){
				console.log(num);
				    uni.navigateTo({
				        url: "/pages/essay/essay?num="+num 
				    });
			},
				
				}
			
	}
</script>

<style scoped>
.box{
		width: 100px; 
		height: 100px;
		border-radius: 15px;
	}
.red{
	color: red;
}
.green{
	color: green;
}
.overflow-ellipsis {
	width:14rem;
	overflow: hidden;
     -webkit-line-clamp: 1;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
}
</style>
