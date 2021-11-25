<template>
	<view>
		<view class="s-flex">
			<view class="left">
				<view class="s-flex s-row-center" :style="{height: topH+'px',width: topH+'px'}">
					<u-avatar mode="aspectFill" :src="avatar" :size="size" :shape="shape"></u-avatar>
				</view>
				<u-gap :height="rowGap"></u-gap>
			</view>
			<view class=" s-font-24 right s-item-fill" :style="{paddingLeft: colGap+'px'}">
				<view class="s-flex s-row-between" :style="{height: topH + 'px'}">
					<view>
						<view class="font-style" :style="font">
							{{title}}
						</view>
						<u-gap height="4"></u-gap>
						<view v-if="desc.length" style="color: #999">
							{{desc}}
						</view>
					</view>
					<view v-if="isSlot">
						<slot></slot>
					</view>
					<view v-else class="s-flex">
						<u-badge :value="badge"></u-badge>
						<view class="" style="width: 18rpx;"></view>
						<u-icon v-if="icon" name="arrow-right" color="#999999" ></u-icon>
					</view>
				</view>
				
				<u-gap :height="rowGap"></u-gap>
				<u-line v-if="line" color="#F1F1F1" :hairline="false"></u-line>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"s-linkman-item",
		props: {
			size: {
				type: String,
				default: '44'
			},
			topH: {
				type: String,
				default: '42'
			},
			shape: {
				type: String,
				default: 'circle'
			},
			colGap: {
				type: String,
				default: '18'
			},
			rowGap: {
				type: String,
				default: '10'
			},
			title: {
				type: String,
				default: '10'
			},
			desc: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			},
			font: {
				type: Object,
				default: ()=> {}
			},
			line: {
				type: Boolean,
				default: true
			},
			icon: {
				type: Boolean,
				default: true
			},
			badge: {
				type: String,
				default: '0'
			},
			isSlot: {
				type: Boolean,
				default: false
			}
			
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
	.left, .right {
		height: 100%;
	}
	.font-style {
		font-size: 18px;
	}
</style>
