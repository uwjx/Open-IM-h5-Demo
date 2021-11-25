<template>
	<view>
		<u-navbar
			fixed
		    title="新的好友"
			height="40">
			 <view slot="left"  class="s-nav-left" @click="navBack">
			 	<u-icon name="arrow-left" size="20"></u-icon>
			 </view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;" ></view>
		<u-gap height="50"></u-gap>
		<view class="s-spacing-col-lr s-font-24" style="color: #999;">
			新的好友请求
		</view>
		<u-gap height="10"></u-gap>
		<view class="s-spacing-col-lr list" v-if="list.length">
			<view class="s-p-b-24" v-for="(item,index) in list" :key="index">
				<s-linkman-item  
					:title="item.name" 
					:desc="item.reqMessage" 
					:avatar="item.icon" 
					:line="index<list.length-1?true:false"
					size="48"
					topH="48"
					:font="{fontSize:'32rpx'}"
					rowGap="14"
					:isSlot="true" >
					<view class="btn" v-if="item.flag == 0" @click="agree(item.uid,index)">
						<button class="u-reset-button">接受</button>
					</view>
					<view v-else class="hello" @click="call(item.uid)">
						打招呼
					</view>
				</s-linkman-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getFriendApplicationList()
		},
		methods: {
			navBack() {
				uni.navigateBack({delta: 1})
			},
			async getFriendApplicationList() {
				const {data} = await this.$imIntercptor(this.$openim.getFriendApplicationList)
				const temp = JSON.parse(data)
				this.list = temp
			},
			async agree(uid,index) {
				const res = await this.$imIntercptor(this.$openim.acceptFriendApplication,uid)
				console.log(res)
				this.list[index]['flag'] = 1
			},
			call(uid) {
				uni.$u.route('/pages/chat/single/single',{uid})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color-grey;
	}
	.btn {
		width: 88rpx;
		height: 44rpx;
		border-radius: 6rpx;
		border: 1px solid #999999;
		text-align: center;
		line-height: 44rpx;
	}
	.hello {
		width: 88rpx;
		height: 44rpx;
		line-height: 44rpx;
		text-align: center;
		color: $uni-color-primary;
	}
	.list {
		background-color: #FFFFFF;
		padding-top: 32rpx;
	}
</style>
