const IMIntercptor = (func, param,msg) => {
	return new Promise(reslove => {
		func(param || null)
		.then(res => {
			if(msg){
				uni.showToast({
					title: msg,
					icon: 'none'
				})
			}
			console.log('imIntercptor ==> '+res.event)
			reslove(res)
		})
		.catch(err => {
			console.log('imIntercptoErr ==> '+err.event)
			console.log(err)
			uni.showToast({
				title:'系统繁忙，请稍后再试',
				icon: 'none'
			}) 
		})
	})
} 
export default IMIntercptor
