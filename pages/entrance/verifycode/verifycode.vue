<template>
	<view>
		<u-toast ref="uToast" overlay></u-toast>
		<view class="box">
			<u-gap height="75"></u-gap>
			<view style="font-size:26px;font-weight: 500;">
				验证码已发送至手机
			</view>
			<u-gap height="4"></u-gap>
			<view class="s-font-32 mobile">
				+86 {{mobile}}
			</view>
			<u-gap height="28"></u-gap>
			<view class="">
				请输入验证码
			</view>
			<u-gap height="12"></u-gap>
			<view class="s-flex s-row-center s-width-fill">
				<u-code-input v-model="code" hairline  mode="line" space="20" @finish="finish" ></u-code-input>
			</view>
			<u-gap height="12"></u-gap>
			<!-- <view class="mobile s-font-24 s-width-fill s-flex">
				<view class="">
					{{'0'}}
				</view>
				<view class="s-p-l-6 s-p-r-6" style="color: #333;">后</view>
				<view class="">
					重发验证码
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {checkVerCode} from '@/api/auth'
	export default {
		data() {
			return {
				code: '',
				mobile: '',
			}
		},
		computed: {
		},
		onLoad(res) {
			this.mobile = res.mobile
			if(res.code==10007)  uni.$u.toast('请使用超级验证码')
			else if(res.code==0) uni.$u.toast('验证码已发送')
		},
		onReady() {
			
		},
		methods: {
			//验证验证码
			finish(e) {
				console.log('verify finish')
				this.code = e
				this.checkVerCodeFun()
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				})
			},
			async checkVerCodeFun() {
				let { mobile, code } = this
				if(!mobile || !code) return this.$u.toast('手机号或验证码错误')
				const  { errCode,data }  = await checkVerCode({
					phoneNumber: mobile,
					verificationCode: code
				})
				if(errCode != 0 ) return this.$u.toast('验证失败')
				if(data.verifyCode==2) return this.$u.toast('验证码已过期')
				setTimeout(()=>{
					uni.navigateTo({
						animationDuration: 500,
						url: '../setpwd/setpwd?mobile='+mobile+'&code='+code
					})
				},1200)
			}
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 0 32px;
		.regist-back {
			width: 72rpx;
			height: 66rpx;
		}
		.mobile {
			color: $uni-color-primary;
		}
	}
</style>
