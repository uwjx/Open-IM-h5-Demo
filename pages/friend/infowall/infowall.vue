<template>
	<view class="s-bg-white">
		<u-navbar
			fixed
		    title=" "
			height="40">
			 <view slot="left"  class="s-nav-left" @click="navBack">
			 	<u-icon name="arrow-left" size="20"></u-icon>
			 </view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;" ></view>
		<u-gap height="60"></u-gap>
		
		<view class="s-flex s-row-between s-spacing-col-lr">
			<view class="name">
				{{userInfo.name|| '--'}}
			</view>
			<view class="">
				<u-avatar mode="aspectFill" :src="userInfo.icon" size="70"></u-avatar>
			</view>
		</view>
		<u-gap height="57"></u-gap>
		<u-line color="rgba(153,153,153,0.4)" :hairline="false"></u-line>
		<view class="s-spacing-col-lr s-flex s-row-between item">
			<view class="">
				备注
			</view>
			<view class="">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-line color="rgba(153,153,153,0.4)" :hairline="false"></u-line>
		<view class="s-spacing-col-lr s-flex s-row-between item">
			<view class="">
				ID号
			</view>
			<view class="">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view v-if="isFriend" class="s-flex s-row-between bottom-menu" style="padding: 0 160rpx;">
			<view class="" @click="sendMsg">
				<image src="../../../static/icons/searchMsgActive.png" size="50"></image>
				<u-gap height="6"></u-gap>
				<view class="s-text-center primary-color">发消息</view>
			</view>
			<view class="" >
				<image src="../../../static/icons/searchCallActive.png" size="50"></image>
				<u-gap height="6"></u-gap>
				<view class="s-text-center primary-color">司聊电话</view>
			</view>
		</view>
		<view v-else class="s-flex s-row-between bottom-menu">
			<view class="">
				<image src="../../../static/icons/searchMsg.png"  size="50"></image>
				<u-gap height="6"></u-gap>
				<view class="s-text-center font-disabled-color">发消息</view>
			</view>
			<view class="">
				<image src="../../../static/icons/searchCall.png" size="50"></image>
				<u-gap height="6"></u-gap>
				<view class="s-text-center font-disabled-color">司聊电话</view>
			</view>
			<view class="" @click="add">
				<image src="../../../static/icons/searchAddActive.png" size="50"></image>
				<u-gap height="6"></u-gap>
				<view class="s-text-center primary-color">添加好友</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFriend: false,
				userInfo: {}
			}
		},
		onLoad(opt) {
			this.userInfo = {...opt} || {}
			this.checkFriend()
		},
		methods: {
			sendMsg() {
				const {uid} = this.userInfo
				uni.$u.route('/pages/chat/single/single',{uid})
			},
			add() {
				const {uid,name} = this.userInfo
				uni.$u.route('/pages/friend/sendverify/sendverify',{uid,remark:name})
			},
			navBack() {
				uni.navigateBack({delta: 1})
			},
			async checkFriend() {
				const res = await this.$imIntercptor(this.$openim.checkFriend,[this.userInfo.uid])
				const relation = JSON.parse(res.data)[0]
				if(relation.flag) this.isFriend = true
				else this.isFriend = false
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.item {
		height: 110rpx;
		font-size: 36rpx;
	}
	.name {
		font-size: 48rpx;
		font-weight: 500;
	}
	.bottom-menu {
		box-sizing: border-box;
		padding: 0 100rpx;
		position: fixed;
		left: 0;
		bottom: 200rpx;
		width: 100%;
		image {
			width: 100rpx;
			height: 100rpx;
		}
	}
	.primary-color {
		color: $uni-color-primary;
	}
	.font-disabled-color {
		color: #B8B8B8
	}
</style>
