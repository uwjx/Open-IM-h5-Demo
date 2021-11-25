<template>
	<view>
		<u-tabbar
			fixed
			placeholder
			safeAreaInsetBottom
			activeColor="#1B72EC"
			inactiveColor="#1B72EC"
			:value="current"
			@change="changeItem">
			<u-tabbar-item name="0" :text="tabBar[0].text" @click="tapItem" :badge="tabBar[0].badge">
				<image class="s-tabBar-item-slot-icon" slot="inactive-icon" :src="tabBar[0].iconPath"></image>
				<image class="s-tabBar-item-slot-icon" slot="active-icon" :src="tabBar[0].selectedIconPath"></image>
			</u-tabbar-item>
			<u-tabbar-item name="1" :text="tabBar[1].text"   @click="tapItem" :badge="tabBar[1].badge" :dot="tabBar[1].dot">
				<image class="s-tabBar-item-slot-icon" slot="inactive-icon" :src="tabBar[1].iconPath"></image>
				<image class="s-tabBar-item-slot-icon" slot="active-icon" :src="tabBar[1].selectedIconPath"></image>
			</u-tabbar-item>
			<u-tabbar-item  name="2" :text="tabBar[2].text"  @click="tapItem" :badge="tabBar[2].badge">
				<image class="s-tabBar-item-slot-icon" slot="inactive-icon" :src="tabBar[2].iconPath"></image>
				<image class="s-tabBar-item-slot-icon" slot="active-icon" :src="tabBar[2].selectedIconPath"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name:"s-tabbar",
		props: {
			current: {
				type: String,
				default: '0',
			},
		},
		data() {
			return {
			};
		},
		computed: {
			...mapGetters(['tabBar']),
		},
		created() {
			// 隐藏原生tabbar
			 uni.hideTabBar();
		},
		methods: {
			tapItem(e) {
				const count = parseInt(this.count)
				const index = parseInt(e)
				if(index==1){
					console.log(index)
					this.$store.commit('SETBADGE',{index:1,count:0,dot:false})
				}
					
			},
			//切换tabBar时触发
			changeItem(e) {
				this.curItem = e
				uni.switchTab({url: this.tabBar[e].pagePath})
				
			}
		}
		
	}
</script>

<style>

</style>
