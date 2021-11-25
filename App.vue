<script>
	import { loginIM } from '@/utils/login'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.routeDefend()
			uni.$on('newFriendApply',res=>{
				console.log('好友申请')
				this.$store.commit('SETBADGE',{index:1,count:1,dot: true})
			})
			// uni.$on('covListChange',res=>{
			// 	console.log('会话列表改变')
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			routeDefend() {
				let pages = getCurrentPages(),
					page = pages[pages.length - 1];
				if(page!='pages/loading/loading')
				uni.reLaunch({
					url: 'pages/loading/loading'
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "style/common.scss";
	page {
		color: $uni-text-color;
		font-size: $uni-font-size-base;
		font-weight: 400;
		font-family: PingFangSC-Regular, PingFang SC, PingFangSC-Medium;	
		box-sizing: border-box;
	}
	
	
	
</style>
