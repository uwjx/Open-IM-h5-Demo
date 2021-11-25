import store from '@/store';
import { baseURL } from '@/config/app';
import Cache from './cache';



const request = (opt = {})=>{
	opt.header = {
		'content-type': 'application/json',
	}
	opt.url = baseURL + opt.url
	// console.log(opt.url)
	return new Promise((resolve,reject)=>{
		uni.request({
			url: opt.url,
			method: opt.method,
			data: opt.data || {},
			header: opt.header
		})
		.then( response => {
			var  [err, res]  = response;
			// console.log(response)
			if(err) {
				return  uni.$u.toast('请求错误')
			}
			// console.log('statusCode:'+res.statusCode)
			if(res.statusCode!=200) {
				// console.log('错误响应！')
				return 
			}
			resolve(res.data)
		})
		.catch( err => {
			console.log(err)
			reject(err)
		})
	})
	
}

const post = (url,data,opt = {}) => {
	opt.method = 'POST';
	opt.data = data;
	opt.url = url;
	return request(opt);
}

export default {
	post
}
