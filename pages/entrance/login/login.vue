<template>
	<view>
		<view class="box">
			<u-gap :height="isMp?'100':'146'"></u-gap>
			<view class="welcome-title">
				欢迎使用OpenIM
			</view>
			<u-gap height="42"></u-gap>
			<view>手机号码</view>
			<u-gap height="10"></u-gap>
			<view class="s-flex">
				<view >+86</view>
				<view style="width: 10px;"></view>
				<u-icon name="arrow-down" color="#333"></u-icon>
				<view style="width: 10px;"></view>
				<view style="width: 1px; height: 16px; background: #D8D8D8;"></view>
				<view style="width: 30px;"></view>
				<u--input v-model="acc" placeholder="请输入手机号码" type="number" maxlength="11" border="none" clearable>
				</u--input>
			</view>
			<u-gap height="6"></u-gap>
			<u-line :hair="false"></u-line>
			<u-gap height="28"></u-gap>
			<view>密码</view>
			<u-gap height="10"></u-gap>
			<u--input v-model="pwd" placeholder="请输入密码"  border="none" password clearable adjustPosition cursorSpacing="40"></u--input>
			<u-gap height="6"></u-gap>
			<u-line :hair="false"></u-line>
			<u-gap height="14"></u-gap>
			<view class="s-flex s-row-between">
				<view class="s-font-24">
					忘记密码
				</view>
				<view class="s-font-24" style="color: #1D6BED;" @click="navRegister">
					新用户注册
				</view>
			</view>
			<u-gap height="84"></u-gap>
			<view class="s-flex btn" @click="login">
				<button class="u-reset-button" :class="{'login-btn-active': loginBtnActive}"> 登录 </button>
			</view>
			<u-gap height="18"></u-gap>
			<view class="s-flex s-row-center s-font-24" >
				<view class="">
					<u-checkbox-group v-model="checkboxList" @change="agreement">
						<u-checkbox shape="circle" name="agree" checked></u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="s-flex s-text-center">
					我已阅读并同意：
					<span style="color: #1D6BED;">《服务协议》，《隐私权政策》</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {client} from '@/utils/tools'
	import { loginFunc,loginIM } from '@/utils/login'
	export default {
		data() {
			return {
				acc: '',
				pwd: '',
				checkboxList: ['agree'],
				assent: true,
			}
		},
		computed: {
			isMp() {
				if(client ==1) return true
				return false
			},
			loginBtnActive() {
				const {pwd,acc} = this
				if(acc.length>10&&pwd.length>5) return true
				return false
			}
		},
		onReady() {
			//#ifdef MP
			// uni.hideBackHome()
			//#endif
			
		},
		methods: {
			agreement(e) {
				if(e[0]=='agree'){
					this.assent = true
				}else this.assent = false
			},
			async login() {
				if(!this.loginBtnActive) return
				let {pwd,acc,assent} = this
				acc = uni.$u.trim(acc)
				pwd = uni.$u.trim(pwd)
				if(!uni.$u.test.mobile(acc)) return uni.$u.toast('手机号或密码不正确')
				if(pwd.length<6) return uni.$u.toast('手机号或密码不正确')
				if(!assent) return uni.$u.toast('请勾选同意后再进行登录')
				//loginAPI
				const data = await loginFunc(acc,pwd)
				await loginIM(data)
				this.$store.dispatch('getUser',data)
				uni.switchTab({url:'../../index/index'})
			},
			navRegister() {
				uni.$u.route('/pages/entrance/register/register')
			},
		}
	}
</script>

<style lang="scss">
	.loading {
		
	}
	.box {
		box-sizing: border-box;
		padding: 0 80rpx;
		width: 750rpx;
	}
	.welcome-title {
		height: 90rpx;
		font-size: 64rpx;
		font-weight: 600;
		line-height: 90rpx;
	}
	.btn, .login-btn-active {
	
		width: 295px;
		height: 44px;
		line-height: 44px;
		background: rgba($color: #D8D8D8, $alpha: 0.4);
		border-radius: 4px;
		font-size: 18px;
		color:  #898989;
		font-weight: 600;
		border-radius: 4px;
	}
	.login-btn-active {
		color:  #FFFFFF;
		background: rgba($color: #1D6BED, $alpha: 1);
		transition: background-color 1s;
	}
</style>
