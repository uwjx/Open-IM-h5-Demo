<template>
	<view >
		<u-modal showCancelButton :show="modal.show" @cancel="modal.show=false" @confirm="logout">
			<view class="s-text-center">
				{{modal.content}}
			</view>
		</u-modal>
		<view class="info-wall">
			<image class="bg-img" src="../../static/icons/userBg.png"></image>
			<view class="s-flex s-row-center avatar">
				<u-avatar mode="aspectFill"  :src="userInfo.icon" size="76"></u-avatar>
			</view>
			<view class="s-flex s-row-center nickname">
				{{userInfo.name}}
			</view>
			<view class="s-flex s-row-center uid">
				<view class="">
					ID：{{userInfo.uid}}
				</view>
				<view class="">
					
				</view>
			</view>
		</view>
		<u-gap height="37"></u-gap>
		<view class="">
			<u-cell-group
				:border="false"	
			>
			<!-- 	<u-cell
					
				    title="我的信息"
				    isLink
					:border="false"
				></u-cell> -->
				<u-cell
					isLink
					:border="false"
				>
					<view slot="title" class="s-flex s-p-l-14 s-p-r-14" @click="modal.show=true">
						<image  class="left-icon" src="../../static/icons/switchAcc.png"></image>
						<view class="s-m-l-24 s-font-32">
							退出登录
						</view>
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<s-tabbar current="2"></s-tabbar>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import {TOKEN,ID} from '@/config/cachekey'
	export default {
		data() {
			return {
				temsrc: 'https://img2.baidu.com/it/u=3337575788,2803100384&fm=26&fmt=auto',
				modal: {
					show: false,
					content: '您确定要退出登录吗？'
				}
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
		},
		onShow() {
			
		},
		methods: {
			logout() {
				this.$openim.logout()
				.then(res=>{
					if(res.errCode==0) {
						console.log('aaa')
						this.$Cache.remove(TOKEN)
						this.$Cache.remove(ID)
						uni.redirectTo({
							url: '../loading/loading'
						})
					}
				})
				.catch(err=>{
					uni.$u.toast('退出失败，请重试！')
					console.log(err)
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.info-wall {
		height: 444rpx;
		width: 100%;
		position: relative;
		
		.bg-img {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			
		}
		
		.avatar {
			position: absolute;
			top: 126rpx;
			left: 0;
			width: 100%;
		}
		.nickname {
			position: absolute;
			top: 294rpx;
			left: 0;
			width: 100%;
			color: #FFFFFF;
			font-size: 20px;
		}
		.uid {
			position: absolute;
			top: 362rpx;
			left: 0;
			width: 100%;
			color: #FFFFFF;
			font-size: 14px;
		}
	}
	
	.left-icon {
		width: 44rpx;
		height: 44rpx;
	}
</style>
