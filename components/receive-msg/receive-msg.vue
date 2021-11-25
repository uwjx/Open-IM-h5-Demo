<template>
	<view class="s-flex s-col-top">
		<view class="left">
			<u-avatar mode="aspectFill" :src="avatar" size="42"></u-avatar>
		</view>
		<view class="right" v-if="msg">
			{{msg}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"receive-msg",
		props: {
			msg: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	
	.left {
		position: relative;
		height: 84rpx;
		width: 84rpx;
		margin-right: 26rpx;
		
	}
	.right {
		position: relative;
		background-color: #f0f0f0;
		padding: 16rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #333333;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		max-width: 440rpx;
		// min-height: 68rpx;
		word-wrap:break-word;
	}
	.right::before {
		content: '';
		position: absolute;
		left: -20rpx;
		top: 16rpx;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 18rpx 36rpx 18rpx 0;
		border-color: transparent #f0f0f0 transparent transparent;
	}
	
	

</style>
