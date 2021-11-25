import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui"
import store from './store'
import openim from './utils/open-im'
import imIntercptor from './utils/im-interceptor'
import Cache from './utils/cache'

Vue.use(uView);
Vue.config.productionTip = false

Vue.prototype.$Cache = Cache
Vue.prototype.$openim = openim
Vue.prototype.$imIntercptor = imIntercptor
Vue.prototype.$store = store
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
// import { createSSRApp } from 'vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// #endif