<template>
	<view>
		<u-navbar
			id="nav"
			fixed
		    title="搜索好友"
			height="40">
			 <view slot="left"  class="s-nav-left" @click="navBack">
			 	<u-icon name="arrow-left" size="20"></u-icon>
			 </view>
		</u-navbar>
		<view class="s-spacing-col-lr s-flex search">
			<u-search shape="square" :showAction="false" placeholder="搜索好友"></u-search>
		</view>
		<u-gap height="100"></u-gap>
		<view class="">
			<scroll-view
				scroll-y
				class="scoll-v"
				scroll-with-animation
				:scroll-into-view="anchor"
				:style="{height: scollViewHeight + 'px'}"
			>
				<view v-for="(item,index) in iList" :key="index" :id="(index<iList.length-1)?item.anchor:'ido'">
					<view class="anchor"  >
						{{item.anchor}}
					</view>
					<view class="man" v-for="(v,k) in item.man" :key="k"  @click="navToSingle(v.uid)" >
						<s-linkman-item 
							topH="44" 
							:avatar="v.icon"
							:title="v.name"
							:isSlot="true" 
							:font="{fontSize: '32rpx',fontWeight:'500'}"
							:line="k<item.man.length-1" 
							:rowGap="k<(item.man.length-1)?'10':'0'"></s-linkman-item>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="indexAnchor"
		:style="{top: 100+'px',height:indexAnchor+'px' }">
			<view class="indexAnchor-item" 
				:class="{'indexAnchor-active': item.anchor==curAnchor}" 
				v-for="(item,index) in iList" @click="scollTo(item.anchor)">
				{{item.anchor}}
			</view>
		</view>
	</view>
</template>

<script>
	import { codefans_net_CC2PY } from '@/utils/pinyin'
	export default {
		data() {
			return {
				scollViewHeight: 0,
				searchHeight: 0,
				anchor: 'A',
				curAnchor: '',
				friendList: [],
				iList: [],
			}
		},
		computed: {
			indexAnchor() {
				return uni.$u.sys().screenHeight - 100
			}
		},
		onLoad() {
			this.getScollViewHeight()
			this.getFriendList()
		},
		methods: {
			navToSingle(uid) {
				uni.$u.route('/pages/chat/single/single',{uid})
			},
			navBack() {
				uni.navigateBack({delta: 1})
			},
			scollTo(id) {
				if(id!="#")this.anchor = id 
				else this.anchor = 'ido'
				this.curAnchor = id
				return this.anchor
			},
			async getFriendList() {
				const {data} = await this.$imIntercptor(this.$openim.getFriendList)
				console.log(typeof data)
			
				let tmp = JSON.parse(data)
				console.log(tmp)
				let index = []
				let arr = []
				tmp.forEach(item=>{
					let name = item.name[0]
					let enName = this.toEn(name)
					index.push(enName)
					item.en = enName
				}),
				index = Object.values(Array.from(new Set(index))) 
				index = index.sort()
				index.push(index.shift())
				index.forEach(item=>{
					let arr = []
					tmp.forEach(v=> {if(v.en==item) arr.push(v)})
					this.iList.push({anchor: item,man: arr})
				})
			},
			getScollViewHeight() {
				this.$nextTick(()=>{
					const {screenHeight} = uni.$u.sys()
					const query = uni.createSelectorQuery()
					query.select('.search').boundingClientRect()
					query.exec(res=>{
						let rect = res[0]
						this.searchHeight = rect.height
						this.scollViewHeight = screenHeight - 40 - rect.height
					})
				})
				
			},
			toEn(name) {
				let en = codefans_net_CC2PY(name)[0]
				en = en.toUpperCase()
				if(en<'A'||en>'Z') en = '#'
				console.log(en)
				return en
			}
		}
	}
</script>

<style lang="scss">
	.search {
		position: fixed;
		top: 40px;
		left: 0;
		width: 100%;
		height: 60px;
		box-sizing: border-box;
		box-shadow: 0 2rpx 8rpx 0 rgba($color: #000000, $alpha: 0.15);
		background-color: #FFFFFF;
		z-index: 10;
	}
	.scoll-v {
		position: relative;
		background-color: $uni-bg-color-grey;
		
	}
	.indexAnchor{
		position: fixed;
		right: 22rpx;
		width: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		z-index: 100;
		color: $uni-color-primary;
		
		.indexAnchor-item,.indexAnchor-active {
			padding: 2rpx 0;
			height: 40rpx;
			width: 40rpx;
			text-align: center;
			line-height: 40rpx;
		}
		.indexAnchor-active {
			background-color: $uni-color-primary;
			border-radius: 50%;
			color: #FFFFFF;
		}
	}
	.anchor {
		background-color:$uni-bg-color-grey;
		height: 46rpx;
		width: 100%;
		padding: 0 44rpx;
		line-height: 46rpx;
		color: #666666;
	}
	.man {
		background-color: #FFFFFF;
		padding: 20rpx 0 20rpx 44rpx;
	}
</style>
