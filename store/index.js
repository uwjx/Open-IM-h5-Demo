import Vue from 'vue'
import Vuex from 'vuex'
import {
	USER_INFO,
	TOKEN,
	CONFIG,
	ID
} from '@/config/cachekey';
import Cache from '@/utils/cache'
import im from '@/utils/open-im';

Vue.use(Vuex);
 
const store = new Vuex.Store({
    state:{//存放状态
		userInfo: {},
		token: Cache.get(TOKEN) || null,
		uid:  Cache.get(ID) || null,
		newMsg: '',
		tabBarList: [
			{
				pagePath: "/pages/index/index",
			    iconPath: "/static/icons/tabBar/index.png",
			    selectedIconPath: "/static/icons/tabBar/indexActive.png",
			    text: "司聊",
				badge: 0,
				curItem: 0,
				dot: false
			}, {
				pagePath: "/pages/linkman/linkman",
			    iconPath: "/static/icons/tabBar/linkman.png",
			    selectedIconPath: "/static/icons/tabBar/linkmanActive.png",
			    text: "通讯录",
				badge: 0,
				curItem: 1,
				dot: false
			}, {
				pagePath: "/pages/user/user",
				iconPath: "/static/icons/tabBar/user.png",
				selectedIconPath: "/static/icons/tabBar/userActive.png",
				text: "我的",
				badge: 0,
				curItem: 2,
				dot: false
			}
		]
    },
	mutations: {
		//登录
		LOGIN(state, opt) {
			state.token = opt.token;
			Cache.set(TOKEN, opt.token, opt.expiredTime);
			Cache.set(ID,opt.uid)
		},
		//登出
		LOGOUT(state) {
			state.token = undefined;
			state.userInfo = {
				user_money: 0,
				user_integral: 0,
				coupon: 0
			}
			Cache.remove(TOKEN);
		},
		SETUSERINFO(state, user) {
			state.userInfo = user
		},
		SETBADGE(state, payload) {
			const { index,count,dot=false } = payload
			state.tabBarList.map(item=> {
				 if(item.curItem==index) {
					 item.badge = count
					 item.dot = dot
				 }
			})
		},
		SETNEWMSG(state, payload) {
			state.newMsg = state, payload
		}
	},
	actions: {
		//获取用户信息
		getUser({commit},payload) {
			let {uid} = payload
			return new Promise(reslove=>{
				im.getUsersInfo([uid])
				.then(res=>{
					// console.log(res)
					const data = JSON.parse(res.data)
					console.log('getuser')
					if(res.errCode==0) commit('SETUSERINFO',data[0])
					reslove(res)
				})
				.catch(err=>{
					console.log('im.getUsersInfo err:' + err)
				})
			})
		},
	},
	getters: {
		userInfo: state => state.userInfo || {},
		token: state => state.token,
		isLogin: state => (!!state.token) && (!!state.uid),
		uid: state => state.uid,
		tabBar: state => state.tabBarList || []
	}
})
export default store