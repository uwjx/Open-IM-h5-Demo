<template>
	<view>
		<view class="search-box">
			<u-search focus @custom="navBack" v-model="keyword" shape="square" :show-action="true" action-text="取消" height="82"
			  :action-style="actionStyle" @change = "$u.debounce(stopInput, 500)"
			  bg-color="#F0F0F0"
			placeholder="通过手机号/ID号搜索添加"></u-search>
		</view>
		<view class="s-flex s-m-t-32 query-res" v-if="keywordReceiver"  @click="search">
			<image src="../../../static/icons/addFriend.png"></image>
			<view class="s-m-l-18">
				搜索：{{keywordReceiver}}
			</view>
		</view>
		
		<view class="u-m-t-32 no-res" v-if="searchRes">
			无法找到该用户
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				keywordReceiver: '',
				searchRes: false
			}
		},
		computed: {
			actionStyle() {
				let style = {};
				style.height = '50rpx';
				style.lineHeight = '50rpx';
				style.fontSiez = '36rpx';
				style.fontWeight = 600;
				return style
			}
		},
		methods: {
			async search() {
				const {keyword} = this
				console.log('res')
				const resData = await this.$imIntercptor(this.$openim.getUsersInfo,[keyword])
				console.log('res')
				let data = JSON.parse(resData.data)
				if(!data.length) {
					this.keywordReceiver = ''
					this.searchRes = true //查找为空
					return 
				}
				const {name,icon,uid} = data[0]
				uni.$u.route('/pages/friend/infowall/infowall',{uid,name,icon})
			},
			stopInput() {
				this.searchRes = false
				this.keywordReceiver = this.keyword
			},
			navBack() { uni.navigateBack({delta: 1})}
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color-grey;
	}
	.search-box {
		padding: 20rpx 44rpx 24rpx;
		background-color: #FFFFFF;
	}
	.query-res {
		background-color: #FFFFFF;
		padding: 0 44rpx;
		height: 118rpx;
		image {
			width: 38rpx;
			height: 40rpx;
		}
	}
	.no-res {
		height: 174rpx;
		width: 100%;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 174rpx;
		font-size: 32rpxpx;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-weight: 400;
		color: #666666;
	}
	
</style>
