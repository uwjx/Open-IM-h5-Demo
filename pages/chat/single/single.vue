<template>
	<view>
		<u-navbar
			fixed
		    :title="recvInfo.name"
			height="40">
			<view slot="left" class="s-nav-left" @click="navToHome" hover-class="none">
				<u-icon name="arrow-left" size="20"></u-icon>
			</view>
			<view slot="right" class="s-flex s-nav-right">
				<image class="right-icon" src="../../../static/icons/indexPhone.png"></image>
				<view class="s-m-l-32">
					<u-icon name="more-dot-fill" size="23"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="s-navbar-shadow" style="height: 40px;"></view>
		<u-gap height="40"></u-gap>
		<scroll-view
			scroll-y
			scroll-with-animation
			class="msg-box"
			:style="{height: msgBoxHeight+'px'}"
			:refresher-enabled="true"
			:refresher-triggered = "loadingStatus"
			:scroll-top="scollTop" 
			@refresherrefresh="loadingMsg"
		>
			<u-gap height="22"></u-gap>
			<view class="msg-box-item s-p-b-30" v-for="(item,index) in msgList" :key="index">
				<receive-msg v-if="item.sendID==recvInfo.uid" :msg='item.content' :avatar="item.senderFaceUrl"></receive-msg>
				<send-msg v-if="item.sendID==userInfo.uid"  :msg='item.content' :avatar="userInfo.icon" :status="item.status+''"></send-msg>
			</view>
			<u-gap height="7"></u-gap>
		</scroll-view>
		<view class="edit-box" :style="{bottom: editBoxBottom + 'px'}">
			<view class="s-flex s-width-fill">
				<textarea
					auto-height 
					v-model="msgContent" 
					class="textarea"
					maxlength="-1"
					:adjust-position="false"
					@keyboardheightchange="keyboardheightchange"
					@linechange="linechange"
				/>
				<view class="s-m-l-16 btn" @click="send">
					<button class="u-reset-button">发送</button>
				</view>
			</view>
			<view v-if="0" class="more-item">
				
			</view>
		</view>
	</view>
</template>

<script>
	import {client} from '@/utils/tools'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				sendErr: false,
				msgContent: '',
				msgBoxHeight: 0,
				scollTop: 0,
				editBoxHeight: 0,
				editBoxBottom: 0,
				keyboardHeight: 0,
				preLineCount: 1,
				loadingStatus: true,
				historyMsg: [],
				msgList: [],
				recvInfo: {}
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad(opt) {
			this.getRecvInfo(opt.uid)
			this.$imIntercptor(this.$openim.markSingleMessageHasRead,opt.uid)
			uni.$on('newMsg',res=>{
				const page = getCurrentPages()
				const route = page[page.length-1].route
				if(route!='pages/chat/single/single') return
				console.log('newMsg single')
				res = JSON.parse(res.data)
				if(this.recvInfo.uid!=res.sendID) return
				console.log(this.recvInfo.uid,res.sendID)
				console.log('aaa')
				const data = res
				this.msgList.push({
					sendID: data.sendID,
					recvID: '',
					senderFaceUrl:  data.senderFaceUrl,
					content: data.content,
					status: data.status
				})
				this.setMsgBox(this.keyboardHeight)
				this.$imIntercptor(this.$openim.markC2CMessageAsRead,{receiver:data.sendID,msgIDList:[data.clientMsgID]})
			})
			
		},
		onUnload() {
			console.log('unload')
			this.recvInfo = {}
		},
		onReady() {
			
		},
		methods: {
			navToHome() {
				uni.switchTab({
					url: '../../index/index'
				})
			},
			keyboardheightchange(e) {
				const {height} = e.detail
				this.editBoxBottom = height 
				this.keyboardHeight = height
				this.setMsgBox(height)
			},
			linechange(e) {
				const {lineCount} = e.detail
				const varlineNum = lineCount - this.preLineCount
				this.preLineCount = lineCount
				if (varlineNum == 0) return
				this.setMsgBox(this.keyboardHeight)
			},
			setMsgBox(varH=0) {
				const sys = uni.getSystemInfoSync()
				let navBar = 0
				this.$nextTick(()=>{
					const query = uni.createSelectorQuery()
					query.select('.edit-box').boundingClientRect()
					query.selectAll('.msg-box-item').boundingClientRect()
					query.exec(data=>{
						const editRect = data[0]
						const msgRect = data[1]
						let itemHeight = 0
						this.editBoxHeight = editRect.height
						if(client == 1) {
							if(sys.platform=='android') navBar = 48
							else navBar = 44
						}else navBar = 0
						this.msgBoxHeight = sys.safeArea.height - navBar  - editRect.height - 40 - varH
						
						msgRect.forEach(item=>{
							itemHeight += item.height
						})
						itemHeight += 30
						if(itemHeight>this.msgBoxHeight){
							this.scollTop = itemHeight - this.msgBoxHeight 
						}
						
					})
				})
			},
			loadingMsg() {
				const history = this.historyMsg
				const startMsg = history[0]
				this.loadingStatus = true
				setTimeout(()=>{
					this.getHistoryMsg(startMsg)
					this.loadingStatus = false
				},1000)
			},
			async getRecvInfo(uid) {
				
				const res = await this.$imIntercptor(this.$openim.getUsersInfo,[uid])
				this.recvInfo = JSON.parse(res.data)[0]
				await this.getHistoryMsg()
				
			},
			async send() {
				const {msgContent} = this
				const {uid} = this.recvInfo
				if (!msgContent) return this.$u.toast('消息不能为空')
				this.msgList.push({
					sendID: this.userInfo.uid ,
					recvID: '',
					senderFaceUrl:  this.userInfo.icon,
					content: this.msgContent,
					status: 1
				})
				
				this.setMsgBox(this.keyboardHeight)
				this.msgContent = ''
				//生成文本消息
				const {data: textMsgContent} = await this.$imIntercptor(this.$openim.createTextMessage, msgContent)
				//发送文本消息
				this.$openim.sendMessage({
					recvID: uid,
					groupID: '',
					onlineUserOnly: false,
					message: textMsgContent
				}).then(res=>{
					this.getHistoryMsg(null, 1) 
					
				}).catch(err=>{
					console.log('发送失败')
				})
				
				//监听发送进度
				this.$openim.on('SendMsgProgress',data=>{
					console.log(data)
				})
				
			},
			async getHistoryMsg(startMsg = null, count = 10) {
				const {uid} = this.recvInfo
				let history = []
				let params = {
					groupID: '',
					userID: uid,
					startMsg: startMsg,
					count: count,
				}
				const {data,event} = await this.$imIntercptor(this.$openim.getHistoryMessageList, params)
				history = JSON.parse(data)
				if(startMsg!=null) {
					history.shift()
					this.historyMsg.unshift(...history)
				}else {
					this.historyMsg.push(...history)
				}
				//首次进入，获取全部
				if(count!=1){
					this.historyMsg.forEach(item=>{
						this.msgList.push({
							sendID: item.sendID,
							recvID: item.recvID,
							senderFaceUrl: item.senderFaceUrl,
							content: item.content,
							status: item.status //1:发送中 2:发送成功 3:发送失败 4:已删除 5:已撤回
						})
					})
				}
				if(count==1) {
					const {status} = this.historyMsg[this.historyMsg.length-1]
					this.msgList[this.msgList.length-1]['status'] = status
					console.log(this.msgList[this.msgList.length-1]['status'])
				}
				this.setMsgBox(this.keyboardHeight)
				
			},
		}
	}
</script>

<style lang="scss">
	.right-icon {
		width: 46rpx;
		height: 46rpx;
	}
	.msg-box {
		box-sizing: border-box;
		width: 100%;
		padding: 0 44rpx;
	}
	.edit-box {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 24rpx 122rpx 24rpx 20rpx;
		background-color: #E8F2FF ;
		box-shadow: 0 -1px 8rpx 0 rgba($color: #000000, $alpha: 0.12);
	}
	.btn {
		position: absolute;
		right: 20rpx;
		bottom: 24rpx;
		width: 86rpx;
		height: 50rpx;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
		border-radius: 8rpx;
	}
	.textarea {
		padding: 10rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		width: 100%;
		max-height: 230rpx;
		overflow: hidden;
	}
</style>
