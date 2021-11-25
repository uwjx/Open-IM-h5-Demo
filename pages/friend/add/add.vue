<template>
	<view>
		<u-navbar 
			fixed
			height="40"
			title="添加好友"
		>
			<view slot="left"  class="s-nav-left" @click="navBack">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;" ></view>
		<u-gap height="58" bgColor="#ffffff"></u-gap>
		<view class="s-spacing-col-lr s-bg-white">
			<view @click="navToSearch">
				<u-search disabled shape="square" :showAction="false" placeholder="通过手机号/ID号搜索添加"></u-search>
			</view>
			<view class="list">
				<s-linkman-item 
					size="24" 
					topH="42" 
					title="我的二维码" 
					desc="邀请对方扫码，添加好友" 
					shape="square"
					:avatar="'../../../static/icons/addFriendqrCode.png'"
					:font="fontStyle" 
					rowGap="14"></s-linkman-item>
				<u-gap height="14"></u-gap>
				<s-linkman-item 
					size="24" 
					topH="42" 
					title="扫一扫" 
					desc="扫描二维码名片" 
					shape="square"
					:avatar="'../../../static/icons/addFriendScan.png'"
					:font="fontStyle"  
					:line="false" 
					rowGap="0" ></s-linkman-item>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontStyle: {
					fontSize: '36rpx',
					fontWeight: '500'
				}
			}
		},
		methods: {
			navToSearch() {
				uni.$u.route('/pages/friend/search/search')
			},
			navBack() {
				uni.navigateBack({delta: 1})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.list {
		padding: 32rpx 0;
	}
</style>
