<template>
	<view class="s-flex s-col-top s-row-right">
		<view class="left" v-if="msg">
			{{msg}}
			<view class="status" v-if="status=='3'">
				<u-icon name="info-circle-fill" color="red" size="16"></u-icon>
			</view>
		</view>
		<view class="right">
			<u-avatar mode="aspectFill" :src="avatar" size="42"></u-avatar>
		</view>
	</view>
</template>

<script>
	export default {
		name:"send-msg",
		props: {
			msg: {
				type: String,
				default: ''
			},
			status: {
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
				statusStyle: {
					
				}
			};
		},
	}
</script>

<style lang="scss" scoped>

	.right {
		position: relative;
		height: 84rpx;
		width: 84rpx;
		margin-left: 26rpx;
		flex-shrink: 1;
		image {
			height: 84rpx;
			width: 84rpx;
			border-radius: 50%;
		}
	}
	
	.left {
		position: relative;
		// min-height: 68rpx;
		max-width: 440rpx;
		background-color: #F0F0F0;
		padding: 16rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #333333;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		margin-left: 16rpx;
		word-wrap:break-word;
	}
	.left::after {
		content: '';
		position: absolute;
		right: -20rpx;
		top: 16rpx;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 18rpx 0 18rpx 36rpx;
		border-color: transparent transparent transparent #F0F0F0;
	}
	.status {
		position: absolute;
		bottom: 18rpx;
		left: -48rpx;
	}

	
</style>
