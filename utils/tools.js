//所在环境
let client = null

/*小程序*/
// #ifdef MP-WEIXIN
	client = 1
// #endif

/* H5 */
// #ifdef H5
	client = isWeixinClient() ? 2 : 6
// #endif

/* App */
// #ifdef APP-PLUS
	client = 3
	uni.getSystemInfo({
		success: res => {client = (res.platform == 'ios') ? 3 : 4},
		fail: res => client = 3
	})
// #endif
export { client }

//判断是否为微信环境
export function isWeixinClient() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		//这是微信环境
		return true;
	} else {
		//这是非微信环境
		return false;
	}
}

//判断是否为安卓环境
export function isAndroid() {
	let u = navigator.userAgent;
	return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

//对象参数转为以？&拼接的字符
export function paramsToStr(params) {
	let p = '';
	if (typeof params == 'object') {
		p = '?'
		for (let props in params) {
			p += `${props}=${params[props]}&`
		}
		p = p.slice(0, -1)
	}
	return p
}

// H5复制方法
export function copy(str) {
	// #ifdef H5
	let aux = document.createElement("input");
	aux.setAttribute("value", str);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	uni.showToast({
		title: "复制成功",
	})
	// #endif

	// #ifndef H5
	uni.setClipboardData({
		data: str.toString(),
	})
	// #endif
}
