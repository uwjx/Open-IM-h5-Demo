<template>
	<view >
		<u-navbar
			fixed
		    title=" "
			height="80">
			 <view slot="left" class="s-nav-left" @click.stop="()=>{}" hover-class="none">
				<view class="s-flex">
				 	<u-avatar mode="aspectFill"  :src="userInfo.icon" size="50"></u-avatar>
					<view class="s-m-l-20 u-line-1" style="width: 400rpx; ">
						<text class=" s-font-24"> xx信息技术有限公司 </text>
						<view class="s-font-36">
							{{userInfo.name}}
						</view>
					</view>
				 </view>
			</view>
		    <view slot="right" class="s-flex s-nav-right">
				<image class="right-icon" src="../../static/icons/indexPhone.png"></image>
				<view class="s-flex" @click="showMenu">
					<image class="right-icon s-m-l-32" src="../../static/icons/indexAdd.png"></image>
					<u-overlay :show="maskShow" @click="maskShow = false" opacity="0">
						<view class="menu-box" :style="{top: menuBoxTop+'px'}">
							<view class="s-flex menu-box-item" @click.stop="()=>{}">
								<image src="../../static/icons/indexMenuScan.png"></image>
								<view class="s-m-l-34">
									扫一扫
								</view>
							</view>
							<u-line></u-line>
							<view class="s-flex menu-box-item" @click.stop="addFriend">
								<image src="../../static/icons/indexMenuAdd.png"></image>
								<view class="s-m-l-34">
									添加好友
								</view>
							</view>
							<u-line></u-line>
							<view class="s-flex menu-box-item" @click.stop="()=>{}">
								<image src="../../static/icons/indexMenuGroup.png"></image>
								<view class="s-m-l-34">
									发起群聊
								</view>
							</view>
						</view>
					</u-overlay>
					
				</view>
				
			</view>
		</u-navbar>
		<view class="s-navbar-shadow"></view>
		<u-gap height="91"></u-gap>
		
		<view class="s-spacing-col-lr">
			<u-search 
				v-model="keywords" 
				placeholder="搜索"  
				shape="square"
				:show-action="false"
				>
			</u-search>
		</view>
		<u-gap height="16"></u-gap>
		<scroll-view
			scroll-y
			refresher-enabled
			scroll-with-animation
			:style="[scollView]"
			:refresher-triggered = "loadingStatus"
			@refresherrefresh="refresh"
			@scrolltolower = "loadingMore"
		>	
			<view class="" @click="navToSingle(item.userID)" v-for="(item,index) in covList" :key="index" >
				<s-covs-list
					:msg-noread="100" 
					:key="index" 
					:name="item.showName"
					:avatar="item.faceUrl"
					:msg="item.latestMsg"
					:timestamp="item.latestMsgSendTime"
					:msgNoread="item.unreadCount"
				></s-covs-list>
			</view>
			<view v-show="showLoading">
				<u-loadmore :status="status" />
				<u-gap height="16"></u-gap>
			</view>
		</scroll-view>
		<s-tabbar current="0"></s-tabbar>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {client} from '@/utils/tools'
	export default {
		data() {
			return {
				keywords: '',
				covList: [],
				loadingStatus: true,
				status: 'loadmore',
				showLoading: false,
				maskShow: false,
				menuBoxTop: 0,
				noRead: 0
			}
		},
		computed: {
			...mapGetters(['userInfo']),
			scollView() {
				const { screenHeight,statusBarHeight,platform } = uni.getSystemInfoSync()
				let height = 0,style = {};
				if(client==1){
					// if(platform=='ios') height = screenHeight - statusBarHeight - 44
					// if(platform=='android') height = screenHeight - statusBarHeight - 48
					 height = screenHeight - statusBarHeight - 44 - 189
				}else {
					height = screenHeight - 189
				}
				style.height = height + 'px'
				style.width = '100%'
				style.padding = '0 22px'
				style.boxSizing = 'border-box'
				return style 
			}
		},
		onLoad() {
			uni.$on('covListChange',async res=>{
				console.log('会话列表改变')
				const data = JSON.parse(res.data)
				if(!data.length) return
				const id = data[0]['conversationID']
				this.covList.forEach(item=>{
					if(id==item.conversationID)
						item.unreadCount = data[0]['unreadCount']
				})
				await this.getCovList()
			})
			
		},
		onReady() {
			
		},
		onShow() {
			this.getCovList()
		},
		
		methods: {
			async getTotalUnreadMsgCount() {
				const {data} = await this.$imIntercptor(this.$openim.getTotalUnreadMsgCount)
				console.log(data)
				this.$store.commit('SETBADGE',{index:0,count:data})
			},
			async getCovList() {
				const {data} = await this.$imIntercptor(this.$openim.getAllConversationList)
				this.covList = JSON.parse(data)
				await this.getTotalUnreadMsgCount()
			},
			
			//刷新
			refresh() {
				this.loadingStatus = true
				setTimeout(()=>{
					
					this.loadingStatus = false
				},1000)
			},
			//滚动到底部
			loadingMore() {
				this.showLoading = true
				// this.status = 'loading'
				setTimeout(()=>{
					setTimeout(()=>this.status = 'nomore',5000)
					this.status = 'loading'
				},500)
				
			},
			showMenu() {
				const query = uni.createSelectorQuery()
				query.select('.right-icon').fields({rect:true})
				query.exec(res=>{
					const rect = res[0]
					// console.log(res) 
					// return
					this.menuBoxTop = rect.bottom + 12
					this.maskShow = true
				})
			},
			addFriend() {
				this.maskShow = false
				uni.$u.route('/pages/friend/add/add')
			},
			async navToSingle(uid) {
				console.log('single')
				await this.$imIntercptor(this.$openim.markSingleMessageHasRead,uid)
				await this.getTotalUnreadMsgCount()
				uni.$u.route('/pages/chat/single/single',{uid})
			},
			
		} 
	}
</script>

<style lang="scss">
	.right-icon {
		width: 46rpx;
		height: 46rpx;
	}
	.menu-box {
		width: 340rpx;
		height: 300rpx;
		box-shadow: 0 0 12rpx 4rpx rgba($color: #000000, $alpha: 0.16);
		border-radius: 12rpx;
		background-color: #FFFFFF;
		position: absolute;
		right: 44rpx;
		padding: 18rpx 0;
		box-sizing: border-box;
		
		.menu-box-item {
			height: 88rpx;
			padding: 0 44rpx;
		}
		
		image {
			width: 44rpx;
			height: 44rpx;
		}
	}
</style>
