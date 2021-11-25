<template>
	<view>
		<view class="box">
			<u-gap height="48"></u-gap>
			<view class="title">
				欢迎使用司聊
			</view>
			<u-gap height="4"></u-gap>
			<view class="sub-title">
				请完善个人信息
			</view>
			<u-gap height="50"></u-gap>
			<view class="camera">
				<image class="camera-icon" :src="src" @click="selectImg" ></image>
				<view class="u-m-t-12 upload-tip">
					<!-- {{src=='../../../static/icon/camera.png'?'点击上传头像':''}} -->
					点击上传头像
				</view>
			</view>
			
			<u-gap height="50"></u-gap>
			<view class="s-flex">
				<view class="s-font-36">你的姓名</view>
				<view style="width: 39px;"></view>
				<u--input v-model="realName" placeholder="请填写真实姓名" type="number" maxlength="11" border="none" clearable>
				</u--input>
			</view>
			<u-gap height="6"></u-gap>
			<u-line :hair="false"></u-line>
			<u-gap height="30"></u-gap>
			<view class="btn" @touchend.stop="submit">
				<button class="u-reset-button" > 进入司聊 </button>
			</view>
		</view>
		
	</view>
</template>

<script>
	var  uploadFile  = require('@/utils/upload');
	export default {
		data() {
			return {
				src: '',
				name: '',
				realName: '',
				mobile: '',
				flag: false
			}
		},
		onLoad(opt) {
			this.mobile = opt.mobile
		},
		methods: {
			selectImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths)
						const {tempFilePaths} = res
						this.uploadImg(tempFilePaths[0])
					}
				})
			},
			async uploadImg(filePath) {
				const url = await uploadFile(filePath)
				if(!url) return uni.$u.toast('上传失败，请重试')
				console.log(url)
				this.src = url
				this.flag = true
			},
			submit() {
				let {flag,realName,mobile} = this
				if(!realName) return uni.$u.toast('请设置姓名')
				if(!flag) return uni.$u.toast('请设置头像')
				//更新用户数据
				this.updateUserInfo(realName,mobile)
			},
			async updateUserInfo(realName,mobile) {
				//设置用户信息
				const {errCode,errMsg} = await this.$openim.setSelfInfo({
					name: realName,
					mobile: mobile,
					icon: this.src,
				}) 
				if(errCode==0) {
					// 获取用户ID
					const {data} = await this.$openim.getLoginUser()
					//更新vuex
					let res = await this.$store.dispatch('getUser',{uid:data})
					uni.switchTab({url:'../../index/index'})
				}else	return  uni.$u.toast('error')
					
			},
		}
	}
</script>

<style lang="scss">
	
	.camera {
		display: flex;
		flex-direction: column;
		align-items: center;
		.upload-tip {
			height: 34rpx;
			font-size: 24rpx;
			color: #999999;
			line-height: 34rpx;
		}
	}
	.camera-icon {
		height: 180rpx;
		width: 180rpx;
		border-radius: 50%;
	}
	.box {
		padding: 0 64rpx;
	}
	.placeholder {
		background-color: #D8D8D8;
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}
	.title {
		font-size: 52rpx;
		font-weight: 500;
	}
	.sub-title {
		font-size: 32rpx;
		color: $uni-text-color-grey;
	}
	.tip {
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}
	.btn,
	.login-btn-active {
		width: 100%;
		height: 44px;
		line-height: 44px;
		background: rgba($color: #1D6BED, $alpha: 1);
		border-radius: 4px;
		font-size: 18px;
		color: #FFFFFF;
		font-weight: 600;
		border-radius: 4px;
	}
</style>
