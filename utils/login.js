import {
	login
} from '@/api/auth'
import store from '@/store'
import im from './open-im'

//登录
export function loginFunc(phoneNumber, password) {
	console.log('login')
	return new Promise(resolve=>{
		login({
			phoneNumber,
			password,
			platform: 5
		})
		.then(res=>{
			store.commit('LOGIN',res.data)
			resolve(res.data)
		})
		.catch(err=>{
			uni.$u.toast('账号或密码错误')
			// console.log(err)
		})
	})
	
}




export function loginIM(payload) {
	console.log('LoginIM')
	const { uid, token} = payload
	return new Promise((resolve,reject)=>{
		im.login({
			uid,token,
			platformID: 5,
			// url: 'ws://121.37.25.71:30000',
			url: 'ws://172.16.8.136:30000',
			// url: 'ws://172.16.8.144:30000',
			
		})
		.then(res=>{
			console.log('服务器连接成功')
			//监听消息、会话、提示信息
			im.on('OnFriendApplicationListAdded',res=>uni.$emit('newFriendApply',res))
			im.on('OnRecvNewMessage',res=>{
				console.log('新消息')
				uni.$emit('newMsg',res)
				store.commit('SETBADGE',{index:0,count:res.data})
			})
			im.on('OnConversationChanged',res=>uni.$emit('covListChange',res))
			resolve()
		})
		.catch(err=>{
			console.log(err)
			console.log('服务器连接失败')
		})
		im.on('OnKickedOffline',()=>uni.redirectTo({ url:'/pages/loading/loading' }))
		
		im.on('OnUserTokenExpired',()=>uni.redirectTo({ url:'/pages/loading/loading' }))
		
		im.on('OnSelfInfoUpdated',res=>{
			console.log('用户信息已变更')
			const data = JSON.parse(res.data)
			store.commit('SETUSERINFO',data) 	
		})
		
	})		
	// url: 'ws://1.14.194.38:30000',
}
