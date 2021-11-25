<template>
	<view>
		<u-navbar
			fixed
		    title="好友验证"
			height="40">
			 <view slot="left"  class="s-nav-left" @click="navBack">
			 	<u-icon name="arrow-left" size="20"></u-icon>
			 </view>
		    <view slot="right" class="s-flex s-nav-right ">
				<button class="u-reset-button btn" @click="send">发送</button>
			</view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;"></view>
		<u-gap height="40"></u-gap>
		<view class="s-p-t-20 s-p-b-20 s-spacing-col-lr" style="color: #666;">
			发送添加好友申请
		</view>
		<view class="s-font-32 msg-area">
			{{reqMessage+' '+userInfo.name}}
		</view>
		<view class="s-p-t-20 s-p-b-20 s-spacing-col-lr" style="color: #666;">
			备注名
		</view>
		<view class="s-font-32 comment">
			{{Info.remark}}
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				Info: {},
				reqMessage: '我是来自xx信息技术公司的'
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad(opt) {
			this.Info = opt
			console.log(this.userInfo)
		},
		methods: {
			async send() {
				await this.$imIntercptor(this.$openim.addFriend,{
					uid: this.Info.uid,
					reqMessage: this.reqMessage+this.userInfo.name
				})
				uni.$u.toast('申请已发送')
				setTimeout(()=>{
					this.navBack()
				},800)
			},
			navBack() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.btn {
		width: 102rpx;
		height: 56rpx;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		border-radius: 8rpx;
		font-size: 32rpx;
		line-height: 56rpx;
	}
	.msg-area {
		box-sizing: border-box;
		width: 100%;
		height: 244rpx;
		background: #FFFFFF;
		padding: 28rpx 44rpx;
	} 
	.comment {
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 26rpx 44rpx;
	}
</style>
