<template>
	<view >
		<u-navbar
			fixed
			height="40"
		    title=" "
		>
			<view slot="left" class="s-nav-left title">
				通讯录
			</view>
			<view slot="right" class="s-flex s-nav-right">
				<image class="right-icon" src="../../static/icons/linkmanSearch.png"></image>
				<image class="right-icon s-m-l-32" src="../../static/icons/indexAdd.png"></image>
			</view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;"></view>
		<u-gap height="40"></u-gap>
		<view class="menu s-bg-white">
			<view  @click="navToApply">
				<s-linkman-item size="42" title="新的好友" avatar="../../static/icons/linkmanNewF.png" :badge="applyNum+''"></s-linkman-item>
			</view>
			<u-gap height="10"></u-gap>
			<view @click="navToFriend">
				<s-linkman-item size="42" title="我的好友" avatar="../../static/icons/linkmanM.png" ></s-linkman-item>
			</view>
			<u-gap height="10"></u-gap>
			<s-linkman-item size="42"  title="我的群组" avatar="../../static/icons/linkmanMG.png" :line="false" rowGap="0"  shape="square"></s-linkman-item>
		</view>
		<s-tabbar current="1"></s-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyNum:'0'
			}
		},
		computed: {
		},
		onLoad() {
			
		},
		onShow() {
			this.getFriendApplicationList()
		},
		methods: {
			navTo() {
				console.log('adda')
			},
			navToFriend() {
				uni.$u.route('/pages/linkman/friend/friend')
			},
			navToApply() {
				uni.$u.route('/pages/linkman/apply/apply')
			},
			async getFriendApplicationList() {
				console.log('aa')
				const {data} = await this.$imIntercptor(this.$openim.getFriendApplicationList)
				const arr = JSON.parse(data)
				const apply = arr.filter(item=>item.flag==0)
				this.applyNum = apply.length
			}
		}
	}
</script>

<style lang="scss">
	page { background-color: $uni-bg-color-grey;}
	.title {
		font-size: 44rpx;
		color: $uni-color-primary;
	}
	.right-icon {
		width: 46rpx;
		height: 46rpx;
	}
	.menu {
		padding: 26rpx 44rpx;
	}
</style>
