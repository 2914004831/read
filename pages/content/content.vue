<template>
	<view ref="body"  style="height: 100vh;width: 100vw;position: absolute;z-index: 2;" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
		@touchend="handleTouchEnd">
		<view>
			  <!-- <div>
			    <h1>{{ currentChapterTitle }}</h1>
				<div v-html=" currentContent" style="padding: 1rem;margin-top: 1rem;;font-size: 1.2rem;line-height: 2rem;"></div>
			    <button @click="loadPrevPage" :disabled="currentPage === 1">上一页</button>
			    <button @click="loadNextPage" :disabled="currentPage * contentPerPage >= chapterContent.length">下一页</button>
			  </div> -->
			<div v-html="currentContent" style="padding: 1rem;margin-top: 1rem;;font-size: 1.2rem;line-height: 2rem;"></div>
			<view class="bg-g" @click="show=!show">
				<u-popup :show="show" style="z-index: 6;">
					<view class="" style="padding: 20px;max-height: 400px;overflow-y: auto;width: 100%;">
						<view v-if="pageNum === 0">
							<view class="border-b bg-g ma-b10  " v-for="(item,index) in chapternum" :key="index" style="padding: 0.7rem; width: 80%;border-radius: 0.5rem;">
								<view class="overflow-ellipsis" style="width: 100%;" @click="getcontent(index,1)">
									{{item}}
								</view>
							</view>
						</view>
						<!-- 滑块 -->
						<view v-if="pageNum === 1">
							<!-- <u-slider v-model="value" step="2" min="0" max="100"  @input="cha(value)"></u-slider> -->
							<!-- <u-slider v-model="value"></u-slider> -->
							<div class="book-progress" style="width: 80%;">
							    <div class="progress-bar">
							      <div :style="{ width: `${progress }%` }"></div>
							    </div>
							    <div class="progress-info">{{ progress }}%</div>
							  </div>
						</view>
						<view v-if="pageNum === 2" class="panel-around">
							<view class="icon-35 ra-50 fff border"  @click="changback(1)">
							</view>
							<view class="icon-35 ra-50 ant border"  @click="changback(2)">
							</view>
							<view class="icon-35 ra-50 grey border"  @click="changback(3)">
							</view>
						</view>
					</view>
					<view class="panel-around pa-10 ma-b20 border-t" style="">
						<view @click="setPageNum(index)" v-for="(item, index) in nav_types"	>
							{{ item.value }}
							
						</view>
					</view>
				</u-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import { base_url } from "../base.js";
	export default {
		data() {
			return {
				value:0,
				num: 0,
				show: false,
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				lstshow: false,
				list: ["1", 2],
				chapternum:0,
				pageNum: 0,
				html:"",
				paragraphsPerPage: 0,          // 当前页码
				totilpage:0,
				totilnum:0,
				currentContent: "",      // 当前页的内容
			currentChapter: 0, // 当前章节
			indexchapter:0,
			lastchapter:0,
			chapters: [],     // 章节列表
				nav_types: [
					{
						value: "章节列表",
						className: "fff"
					},
					{
						value: "进度条",
						className: "ant"
					},
					{
						value: "背景色",
						className: "grey"
					}
				]
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.num = option.num;
			console.log("我的书籍Id是");
			this.getbook(this.num)
			// console.log(this.num);
		},
		watch: {
		  chapterContent(newContent) {
		    // 在chapterContent变化时更新页面内容
		    this.currentContent = newContent;
		  },
		},
		methods: {
			handleTouchStart(event) {
				this.startX = event.touches[0].clientX;
				this.startY = event.touches[0].clientY;
			},
			handleTouchMove(event) {
				this.endX = event.touches[0].clientX;
				this.endY = event.touches[0].clientY;
			},
			handleTouchEnd() {
				const right = Math.abs(this.endX - this.startX);
				const top = Math.abs(this.endY - this.startY);
				if (right >= top) {
					if (this.endX > this.startX) {
						this.handleRightSwipe(); // 右滑处理函数
					} else if (this.endX < this.startX) {
						this.handleLeftSwipe(); // 左滑处理函数
					}
				} else {
					if (this.endY > this.startY) {
						this.handledownSwipe()
						this.handleRightSwipe(); // 右滑Y处理函数
					} else if (this.endY < this.startY) {
						this.handleupSwipe()
						this.handleLeftSwipe(); // 左滑处理函数
					}
				}

			},
			
			handleRightSwipe() {
				if(!this.show){
					const page=this.paragraphsPerPage
					this.loadPage(page,1)
					// 执行右滑相关操作
				}
			},
			handleLeftSwipe() {
				if(!this.show){
					const page=this.paragraphsPerPage
					this.loadPage(page,2)
					// 执行左滑相关操作
				}
			},
			handleupSwipe() {
					this.open()
					// 执行左滑相关操作
			},
			handledownSwipe() {
					this.close()
					// 执行左滑相关操作
			},
			open() {
				this.show = true
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			setPageNum(num) {
				this.pageNum = num
			},
			async getbook(num){
				const that=this
				try{
					const response = await uni.request({
						url: base_url+'/book/read', // 替换为实际的 API 地址
						method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
						header:{
							 'Authorization':uni.getStorageSync("token"), // 添加认证头部
						},
						data: {
							"bookid":num
						},
					  });
					that.chapternum=response.data.data
					let lastkey
					let indexkey
					
					const keys = Object.keys(response.data.data);
					      if (keys.length > 0) {
					        lastkey = keys[keys.length - 1];
							indexkey= keys[0];
					      } else {
					        lastkey = '无数据';
					      }
						  that.indexchapter=indexkey
						  that.lastchapter=lastkey
						  that.getcontent(that.indexchapter,1)
					
				}catch(e){
					console.log("error");
					console.log(e);
					//TODO handle the exception
				}
			},
			
			async getcontent(index,num) {
			this.currentChapter=index;
			const that=this
			  try {
			    const response = await uni.request({
			      url: base_url+'/book/getcontent',
				  method: 'POST', // 请求方法，可以是 'GET'、'POST' 等
				  header:{
				  	 'Authorization':uni.getStorageSync("token"), // 添加认证头部
				  },
				  data: {
				  	"bookid":that.num,
					"num":index
				  },
			    });
				console.log(response);
				const paragraphs = response.data.data.split(/(<p>.*?<\/p>)/);
				const textWithoutPTags = response.data.data.replace(/<\/?p>/g, '');
				const textWithoutSpanTagspan = textWithoutPTags.replace(/<\s*span\b[^>]*>[\s\S]*?<\/span>/gi, '');
				const textWithoutATagsa = textWithoutSpanTagspan.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '');
				const textWithoutATagsaimg = textWithoutATagsa.replace(/<img\b[^>]*>(.*?)<\/img>/gi, '');
				that.html=textWithoutATagsaimg;
				that.totilnum=textWithoutATagsaimg.length
				 const totalChars = textWithoutATagsaimg.length-348;
				  const totalPages = Math.ceil(totalChars / 350)+1;
				that.totilpage=totalPages;
				// 0,348
				//348/ 320
				if(num==1){
					const pageContent = textWithoutATagsaimg.substring(0,348);
					 that.paragraphsPerPage=1
					// console.log(paragraphs[1]);
					that.currentContent=pageContent
				}else{
					 that.paragraphsPerPage=totalPages-1
					that.loadPage(totalPages-1,2)
				}
			  } catch (e) {
			    // 处理异常
			    console.error('捕获到异常', e);
			  }
			},
			loadPage(page,num) {
				if(num==1){
					if(page==1){
						this.currentChapter--
						if(this.currentChapter<this.indexchapter){
							return
						}
							this.getcontent(this.currentChapter,2)
						}
						let start;
						let end;
						if(page==2){
							start=0;
							end = (page-2)*348+348;
						}else if(page==this.totilpage){
							start = (page-2) * 348+348;
							end=this.totilnum;
						}else{
							start = (page-2) * 348+348;
							end = (page-1)*348+348;
						}
						const pageContent = this.html.substring(start, end);
										this.chapterContent=pageContent;
										this.paragraphsPerPage--
										this.currentContent=pageContent
						
				}else{
					if(page==this.totilpage){
						this.currentChapter++;
						let last=parseInt(this.currentChapter)
						if(last>this.lastchapter){
							uni.showToast({
							       title: '最后一章',
							       icon: 'none', // 'none' 表示不显示图标，可根据需求调整
							       duration: 1000, // 显示时长，单位毫秒
							     });
								 return
						}else{
							this.getcontent(this.currentChapter,1)
						}
					}
					let start;
					if(page==1){
						 start =348;
							}else{
						 start = (page-1) * 348+348;
						}
						console.log(start);
					const end = start + 348;
					const pageContent = this.html.substring(start, end);
									this.chapterContent=pageContent;
									this.paragraphsPerPage++
					this.currentContent=pageContent
				}
				
			},
			changback(num) {
				 const element = this.$refs.body
				if (num == 1) {
				element.className="fff";
				} else if (num == 2) {
					element.className="ant";
				} else if (num == 3) {
					element.className="grey";
				}
			}
		},
			
			
	// },
	computed: {
	    progress() {
	      if (this.totilpage === 0) {
	        return 0;
	      }
	      return ((this.paragraphsPerPage / this.totilpage) * 100).toFixed(2);
	    },
	  },
	  }
</script>

<style>
	.book-progress {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 10px;
	}
	
	.progress-bar {
	  width: 100%;
	  height: 10px;
	  background-color: #ccc;
	  position: relative;
	}
	
	.progress-bar div {
	  height: 100%;
	  background-color: #007bff;
	  transition: width 0.3s;
	}
	
	.progress-info {
	  margin-top: 10px;
	}

	.overflow-ellipsis {
		width:10rem;
		font-size: 0.8rem;
		overflow: hidden;
	     -webkit-line-clamp: 1;
	     text-overflow: ellipsis;
	     display: -webkit-box;
	     -webkit-box-orient: vertical;
	}
	.fff{
		background: #ffffff;
	}

	.ant{
		background-color: antiquewhite;
	}

	.grey{
		background-color: azure;
	}

	.green{
		background-color: aquamarine;
	}
</style>