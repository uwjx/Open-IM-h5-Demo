<template>
	<view>
		<view class="box">
			<u-gap height="75"></u-gap>
			<view style="font-size:26px;font-weight: 500;">
				新用户注册
			</view>
			<u-gap height="44"></u-gap>
			<view >手机号码</view>
			<u-gap height="10"></u-gap>
			<view class="s-flex">
				<view>+86</view>
				<view style="width: 10px;"></view>
				<u-icon name="arrow-down" color="#333"></u-icon>
				<view style="width: 10px;"></view>
				<view style="width: 1px; height: 16px; background: #D8D8D8;"></view>
				<view style="width: 30px;"></view>
				<u--input v-model="acc" placeholder="请输入手机号码" type="number" maxlength="11" border="none" clearable :cursorSpacing="150">
				</u--input>
			</view>
			<u-gap height="6"></u-gap>
			<u-line :hair="false"></u-line>
			<u-gap height="59"></u-gap>
			<view class="btn" @touchend.stop="register">
				<button class="u-reset-button" :class="{'login-btn-active': loginBtnActive}"> 立即注册 </button>
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
	import { sendVerCode } from '@/api/auth';
	export default {
		data() {
			return {
				acc: '',
				checkboxList: ['agree'],
				assent: true,
			}
		},
		computed: {
			loginBtnActive() {
				const {acc} = this
				if(acc.length>10) return true
				return false
			}
		},
		methods: {
			agreement(e) {
				if(e[0]=='agree'){
					this.assent = true
				}else this.assent = false
			},
			async register() {
				if(!this.loginBtnActive) return
				let {acc,assent} = this
				acc = uni.$u.trim(acc)
				if(!uni.$u.test.mobile(acc)) return uni.$u.toast('手机号码不正确')
				if(!assent) return uni.$u.toast('请勾选同意后再进行注册')
				const {errCode} = await sendVerCode({
					phoneNumber: acc
				})
				if(errCode!=0&&errCode!=10007) return uni.$u.toast('error')
				uni.$u.route('/pages/entrance/verifycode/verifycode',{mobile:acc,code:errCode})
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
