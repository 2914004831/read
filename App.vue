<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
	/*每个页面公共css */
	.back {
		width: 100vw;
		height: 100vh;
		background-color: antiquewhite;
	}
	/*每个页面公共css */
	/*下划线*/
	.th-line{
	  text-decoration: line-through
	}
	/*居中*/
	.text-center{
	  text-align: center
	}
	.text-right{
	  text-align: right
	}
	/*加粗*/
	.bold{
	  font-weight: bold
	}
	/*斜体*/
	.it{
	  font-style: italic
	}
	/*省略号*/
	.ell{
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap
	}
	.ell-2{
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 2;
	  overflow: hidden;
	}
	.ell-3{
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 3;
	  overflow: hidden;
	}
	.ell-4{
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 4;
	  overflow: hidden;
	}
	/* 弹性布局 */
	.panel{
	  padding: 3rem;
	  background: #ffffff
	}
	.panel-start{
	  display: flex;
	  justify-content: flex-start;
	}
	.panel-between{
	  display: flex;
	  justify-content: space-between;
	}
	.panel-end{
	  display: flex;
	  justify-content: flex-end;
	}
	.panel-around{
	  display: flex;
	  justify-content: space-around;
	}
	.panel-center{
	  display: flex;
	  justify-content: center;
	}
	.wrap{
	  flex-flow: wrap
	}
	.item-center{
	  align-items: center
	}
	.item-start{
	  align-items: flex-start
	}
	.item-end{
	  align-items: flex-end
	}
	.wa {
	  flex-wrap: wrap;
	}
	.flex-1{
	  flex: 1;
	}
	.flex-2{
	  flex: 2;
	}
	/* 行内 */
	.inbox {
	  display: inline-block;
	}
	/* 盒子大小不变 */
	.box{
	  box-sizing: border-box;
	}
	/* 定位 */
	.rel{
	  position: relative;
	}
	.pos{
	  position: absolute;
	}
	
	/* 背景颜色 */
	
	.bg-w{
	  background-color: #fff
	}
	.bg-b{
	  background-color: #000
	}
	.bg-g{
	  background-color: #f3f3f3
	}
	.bg-s{
	  background-color: #c5c5c5;
	}
	.bg-r{
		background-color: #ff5500;
	}
	
	/*字体颜色*/
	.fo-w{
	  color: #fff
	}
	.fo-b{
	  color: #000
	}
	.fo-g{
	  color: #999
	}
	.fo-f3{
	  color: #f3f3f3
	}
	.fo-333{
	  color: #333333
	}
	.fo-fa {
	  color: #fa5b3d;
	}
	.fo-fd {
	  color: #fd9800;
	}
	
	/* 外边距规范 */
	.ma-l200{
	  margin-left: 20rem;
	}
	
	
	.ma-40{
	  margin: 4rem
	}
	.ma-l40{
	  margin-left: 4rem
	}
	.ma-r40{
	  margin-right: 4rem
	}
	.ma-t40{
	  margin-top: 4rem
	}
	.ma-b40{
	  margin-bottom: 4rem
	}
	
	.ma-30{
	  margin: 3rem
	}
	.ma-l30{
	  margin-left: 3rem
	}
	.ma-r30{
	  margin-right: 3rem
	}
	.ma-t30{
	  margin-top: 3rem
	}
	.ma-b30{
	  margin-bottom: 3rem
	}
	
	.ma-20{
	  margin: 2rem
	}
	.ma-l20{
	  margin-left: 2rem
	}
	.ma-r20{
	  margin-right: 2rem
	}
	.ma-t20{
	  margin-top: 2rem
	}
	.ma-b20{
	  margin-bottom: 2rem
	}
	
	.ma-10{
	  margin: 1rem
	}
	.ma-l10{
	  margin-left: 1rem
	}
	.ma-r10{
	  margin-right: 1rem
	}
	.ma-t10{
	  margin-top: 1rem
	}
	.ma-b10{
	  margin-bottom: 1rem
	}
	
	/* 内边距规范 */
	.pa-10{
	  padding: 1rem
	}
	.pa-l10{
	  padding-left: 1rem
	}
	.pa-r10{
	  padding-right: 1rem
	}
	.pa-t10{
	  padding-top: 1rem
	}
	.pa-b10{
	  padding-bottom: 1rem
	}
	
	.pa-20{
	  padding: 2rem
	}
	.pa-l20{
	  padding-left: 2rem
	}
	.pa-r20{
	  padding-right: 2rem
	}
	.pa-t20{
	  padding-top: 2rem
	}
	.pa-b20{
	  padding-bottom: 2rem
	}
	
	.pa-30{
	  padding: 3rem
	}
	.pa-l30{
	  padding-left: 3rem
	}
	.pa-r30{
	  padding-right: 3rem
	}
	.pa-t30{
	  padding-top: 3rem
	}
	.pa-b30{
	  padding-bottom: 3rem
	}
	
	.ra-5{
		border-radius: 0.5rem;
	}
	/*圆角*/
	.ra-30{
	  border-radius: 3rem
	}
	.ra-20{
	  border-radius: 2rem
	}
	.ra-120 {
	  border-radius: 12rem;
	}
	.ra-10{
	  border-radius: 1rem
	}
	.ra-l30{
	  border-radius: 3rem 0 0 3rem
	}
	.ra-l20{
	  border-radius: 2rem 0 0 2rem
	}
	.ra-l10{
	  border-radius: 1rem 0 0 1rem
	}
	.ra-r30{
	  border-radius: 0 3rem 3rem 0
	}
	.ra-r20{
	  border-radius: 0 2rem 2rem 0
	}
	.ra-r10{
	  border-radius: 0 1rem 1rem 0
	}
	.ra-t30{
	  border-radius: 3rem 3rem 0 0
	}
	.ra-t20{
	  border-radius: 2rem 2rem 0 0
	}
	.ra-t10{
	  border-radius: 1rem 1rem 0 0
	}
	.ra-b30{
	  border-radius:  0 0 3rem 3rem
	}
	.ra-b20{
	  border-radius:  0 0 2rem 2rem
	}
	.ra-b10{
	  border-radius:  0 0 1rem 1rem
	}
	.ra-50{
	  border-radius: 50%;
	}
	
	
	
	/*阴影*/
	.shadow{
	  box-shadow: 0 0 2rem 0 #e1e1e1
	}
	
	/*边框*/
	.border{
	  border: solid 0.1rem #e1e1e1
	}
	.border-b{
	  border-bottom: solid 0.1rem #e1e1e1
	}
	.border-t{
	  border-top: solid 0.1rem #e1e1e1
	}
	.border-l{
	  border-left: solid 0.1rem #e1e1e1
	}
	.border-r{
	  border-right: solid 0.1rem #e1e1e1
	}
	.bordere2{
	  border: 0.5rem solid #e2e2e2; 
	}
	.border68 {
	  border: 0.5rem solid #6887e1; 
	}
	.borderff{
	  border: 0.5rem solid #ffffff;
	}
	
	/*加载动画*/
	@keyframes three-quarters-loader {
	  0% {
	    -moz-transform: rotate(0deg);
	    -ms-transform: rotate(0deg);
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }
	  100% {
	    -moz-transform: rotate(360deg);
	    -ms-transform: rotate(360deg);
	    -webkit-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
	.three-quarters-loader:not(:required) {
	  animation: three-quarters-loader 1250ms infinite linear;
	  border: 0.8rem solid #aaa;
	  border-right-color: transparent;
	  border-radius: 2rem;
	  box-sizing: border-box;
	  display: inline-block;
	  overflow: hidden;
	  text-indent: -9999rem;
	  width: 3.5rem;
	  height: 3.5rem;
	}
	.loading-txt{
	  margin-left: 2rem;
	  font-size: 3rem;
	  color: #aaa;
	}
	
	/*字体大小*/
	.fo-8{
		font-size: 0.8rem
	}
	.fo-20{
	  font-size: 2rem
	}
	.fo-22{
	  font-size: 2.2rem
	}
	.fo-24{
	  font-size: 2.4rem
	}
	.fo-26{
	  font-size: 2.6rem
	}
	.fo-28{
	  font-size: 2.8rem
	}
	.fo-30{
	  font-size: 3rem
	}
	.fo-32{
	  font-size: 3.2rem
	}
	.fo-34{
	  font-size: 3.4rem
	}
	.fo-36{
	  font-size: 3.6rem
	}
	.fo-38{
	  font-size: 3.8rem
	}
	.fo-40{
	  font-size: 4rem
	}
	.fo-42{
	  font-size: 4.2rem
	}
	.fo-44{
	  font-size: 4.4rem
	}
	.fo-46{
	  font-size: 4.6rem
	}
	.fo-48{
	  font-size: 4.8rem
	}
	
	/*图标*/
	.icon-20{
	  width: 2rem;
	  height: 2rem
	}
	.icon-25{
	  width: 2.5rem;
	  height: 2.5rem
	}
	.icon-30{
	  width: 3rem;
	  height: 3rem
	}
	.icon-35{
	  width: 3.5rem;
	  height: 3.5rem
	}
	.icon-40{
	  width: 4rem;
	  height: 4rem
	}
	.icon-45{
	  width: 4.5rem;
	  height: 4.5rem
	}
	.icon-50{
	  width: 5rem;
	  height: 5rem
	}
	.icon-60{
	  width: 6rem;
	  height: 6rem
	}
	.icon-80 {
	  width: 8rem;
	  height: 8rem
	}
	
	.icon-100 {
	  width: 100%;
	  height: 100%;
	}
	/*优先级*/
	.z-1{
	  z-index: 1
	}
	.z-2{
	  z-index: 2
	}
	.z-3{
	  z-index:3
	}
	.z-4{
	  z-index: 4
	}
	.z-5{
	  z-index: 5
	}
	.z-6{
	  z-index: 6
	}
	.z-7{
	  z-index: 7
	}
	
	/*行高*/
	.lh-30{
	  line-height: 3rem
	}
	.lh-40{
	  line-height: 4rem
	}
	.lh-50{
	  line-height: 5rem
	}
	.lh-60{
	  line-height: 6rem
	}
	.lh-70{
	  line-height: 7rem
	}
	.lh-80{
	  line-height: 8rem
	}
	.lh-90{
	  line-height: 9rem
	}
	.lh-100{
	  line-height: 10rem
	}
	
	/*
	百分比宽度
	*/
	.w-20{
	  width: 20%
	}
	.w-25{
	  width: 25%
	}
	.w-33{
	  width: 33%
	}
	.w-3333{
	  width: 33.33%
	}
	.w-50{
	  width: 50%;
	}
	.w-40{
	  width: 40%
	}
	.w-45{
	  width: 45%;
	}
	.w-60{
	  width: 60%
	}
	.w-30{
	  width: 30%
	}
	.w-70{
	  width: 70%
	}
	.w-90{
	  width: 90%;
	}
	.w-100{
	  width: 100%;
	}
	.filter-btn{
	  background: none;
	  padding: 0;
	  border: none;
	  outline: none;
	  line-height: unset;
	  box-sizing: unset;
	  -webkit-tap-highlight-color: unset;
	  position: unset;
	  display: block
	}
	.filter-btn::after{
	  background: none;
	  padding: 0;
	  border: none;
	  outline: none;
	  line-height: unset;
	  box-sizing: unset;
	  -webkit-tap-highlight-color: unset;
	  position: unset;
	  display: block
	}
</style>
