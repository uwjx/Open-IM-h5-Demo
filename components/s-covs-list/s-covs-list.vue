<template>
	<view>
		<view class="s-flex s-p-b-36 box">
			<u-avatar mode="aspectFill" size="48" :src="avatar"></u-avatar>
			<view class="right">
				<view class="s-flex s-row-between">
					<view class="s-item-fill s-font-32 s-weight-500  u-line-1">
						{{name}}
					</view>
					<view class="s-item-noshrink s-font-24 s-m-l-20  color-date ">
						<!-- 三天前 -->
						{{$u.timeFrom(timestamp, 'yyyy/mm/dd')}}
					</view>
				</view>
				<u-gap height="5"></u-gap>
				<view class="s-flex s-row-between u-m-t-8">
					<view class="s-item-fill s-font-26   color-info  u-line-1">
						{{msgContent}}
					</view>
					<view class="s-m-l-20 ">
						<u-badge  size="mini" :type="type" max="99" :value="msgNoread"></u-badge>
					</view>
				</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"s-covs-list",
		props: {
			msgNoread: {
				type: Number,
				default: 0
			},
			msg: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			},
			timestamp: {
				type: Number,
				default: 0
			}
			
		},
		computed: {
			msgContent() {
				let msg = this.msg
				msg = JSON.parse(msg)
				return msg.content
			}
		},
		data() {
			return {
				type:'error',
				value: '99'
			};
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		color: #333;
		width: 100%;
		
		.right {
			box-sizing: border-box;
			width: calc(100% - 48px);
			padding-left: 24rpx;
		}
	}
	.color-date {color: #999;}
	.color-info {color: #666;}
</style>
