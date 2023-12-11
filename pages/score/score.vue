<template>
	<view class="bg-g pa-10">
		<view class="bg-w">
			<view class="" v-for="item in list" :key="item.index">
				<u-cell-group>
					<u-cell  size="large"
					:title="item.name"
					:value="item.score"
					></u-cell>
					<view class="fo-g " style="font-size: 0.2rem;padding: 0.2rem;">
						{{item.time}}
					</view>
				</u-cell-group>
			</view>
			<view class="" style="padding: 0.2rem;">
				<u-divider text="没有更多了"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
		import { base_url } from "../base.js"
	export default {
		
		data() {
			return {
				list:[]
			}
		},
		onShow() {
			this.getscore()
		},
		methods: {
			async getscore(){
				const that=this
				const num=uni.getStorageSync("name")
				console.log(num);
						try{
							const response = await uni.request({
								url: base_url+'/history/getlist', // 替换为实际的 API 地址
								method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
								header:{
									 'Authorization':uni.getStorageSync("token"), // 添加认证头部
								},
								data: {
									"userId":uni.getStorageSync("name").id,
								},
							  });
							console.log("更新哦");
							console.log(response);
							
							var list1=[];
							list1=response.data.data
							console.log(response);
							console.log(list1);
							list1.forEach(function(item, index) {
							    var date = new Date(item.time );
								  var year = date.getFullYear();
								  var month = date.getMonth() + 1; // 注意：月份从0开始，需要加1
								  var day = date.getDate();
								 var formattedDate = year + "-" + that.addLeadingZero(month) + "-" + that.addLeadingZero(day);
									item.time = formattedDate;
									item.score='+'+item.score
							});
							that.list=list1
							console.log(that.list);
						}catch(e){
							console.log("error");
							console.log(e);
							//TODO handle the exception
						}
						},
						addLeadingZero(number) {
						    return number < 10 ? "0" + number : number;
						},
		}
	}
</script>

<style>

</style>
