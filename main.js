import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from 'uview-ui'
Vue.use(uView)

// 引入登录组件
import login from "@/components/login.vue"
Vue.component("login",login)

// 引入 store 
import store from '@/store/index.js'
Vue.prototype.$store = store


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
