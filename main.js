import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from 'uview-ui'
Vue.use(uView)

App.mpType = 'app'

// 引入登录组件
import login from "@/components/login.vue"
Vue.component("login", login)

// 引入 store 
import store from '@/store/index.js'
Vue.prototype.$store = store

const app = new Vue({
	...App,
	store
})



// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
