<template>
	<view class="loading">
		<u-loading-page 
			color="#1D6BED "
			loading-color="#1D6BED "
			:loading-text="loadingText"
			:loading="status"
		></u-loading-page>
	</view>
</template>

<script>
	import {TOKEN,ID} from '@/config/cachekey'
	import {loginIM} from '@/utils/login'
	export default {
		data() {
			return {
				status: true,
				loadingText: 'Open-IM Demo',
			}
		},
		onLoad() {
			console.log('loading')
			this.autoLogin()
		},
		methods: {
			async autoLogin() {
				const token = this.$Cache.get(TOKEN)
				const uid = this.$Cache.get(ID)
				if(token&&uid) {
					await loginIM({token,uid})
					await this.$store.dispatch('getUser',{token,uid})
					uni.switchTab({url: '../index/index'})
				}else{
					setTimeout(()=>{
						uni.redirectTo({url: '../entrance/login/login'})
					},1000)
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
