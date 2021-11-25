<template>
	<view>
		<view class="box">
			<u-gap height="100"></u-gap>
			<view class="title">
				请设置账号密码
			</view>
			<u-gap height="4"></u-gap>
			<view class="sub-title">
				登录密码用于登录司聊账号
			</view>
			<u-gap height="28"></u-gap>
			<view >
				密码
			</view>
			<u-gap height="20"></u-gap>
			<u--input v-model="pwd" placeholder="请输入密码"  border="none" password clearable adjustPosition cursorSpacing="40"></u--input>
			<u-gap height="6"></u-gap>
			<u-line :hair="false"></u-line>
			<u-gap height="14"></u-gap>
			<view class="tip">
				需6～20位不含空格的字符
			</view>
			<u-gap height="38"></u-gap>
			<view class="btn" @touchend.stop="nextStep">
				<button class="u-reset-button" :class="{'login-btn-active': loginBtnActive}"> 下一步 </button>
			</view>
		</view>
	</view>
</template>

<script>
	import { register } from '@/api/auth'
	import {loginIM} from '@/utils/login'
	export default {
		data() {
			return {
				pwd: '',
				mobile: '',
				code: '',
			}
		},
		computed: {
			loginBtnActive() {
				const {pwd} = this
				if(pwd.length>=6) return true
				return false
			}
		},
		onLoad(opt) {
			const {mobile,code} = opt 
			this.mobile = mobile
			this.code = code
		},
		onBackPress() {
			console.log('back')
			uni.navigateBack({
				delta:3
			})
		},
		methods: {
			nextStep() {
				const {pwd} = this
				let trimPwd = uni.$u.trim(pwd)
				if(trimPwd!=pwd) return  uni.$u.toast('密码设置失败，请重试');
				
				uni.$u.route('/pages/entrance/setprofile/setprofile')
			},
			async nextStep() {
				const {mobile,code,pwd} = this
				let trimPwd = uni.$u.trim(pwd)
				if(trimPwd!=pwd) return  uni.$u.toast('密码设置失败，请重试');
				//注册
				const { errCode, data } = await register({
					phoneNumber: mobile,
					password: pwd,
					verificationCode: code
				})
				if(errCode !=0 ) return uni.$u.toast('注册失败')
				//缓存token 和 id , 登录 im
				await this.$store.commit('LOGIN',data)
				await loginIM(data)
				this.$u.route('/pages/entrance/setprofile/setprofile?mobile='+mobile)
			}
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 0 64rpx;
		
		.title {
			font-size: 52rpx;
			font-weight: 500;
		}
		.sub-title {
			font-size: 32rpx;
			color: $uni-color-primary;
		}
		.tip {
			font-size: 24rpx;
			color: $uni-color-primary;
		}
		
		.btn,
		.login-btn-active {
			width: 100%;
			height: 44px;
			line-height: 44px;
			background: rgba($color: #D8D8D8, $alpha: 0.4);
			border-radius: 4px;
			font-size: 18px;
			color: #FFFFFF;
			font-weight: 600;
			border-radius: 4px;
		}
		
		.login-btn-active {
			
			background: rgba($color: #1D6BED, $alpha: 1);
			transition: background-color 1s;
		}
		
	}
</style>
