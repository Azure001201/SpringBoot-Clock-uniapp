import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginState: !!uni.getStorageSync('loginState') ? true : false,
		userInfo: !!uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {
			name: '未知用户',
			avatar: '/static/nopic.png',
			
		}
	},
	getters: {

	},
	mutations: {
		userLogin(state, userInfo) {
			state.loginState = true
			state.userInfo = userInfo
			uni.setStorageSync('loginState', 'ok')
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		userLogout(state) {
			state.loginState = false
			state.userInfo = {
				name: '未知用户',
				avatar: '/static/nopic.png',
			}
			uni.clearStorageSync('userInfo')
			uni.clearStorageSync('loginState')
		}
	},
	actions: {
		userLoginAction(context, userInfo) {
			context.commit('userLogin', userInfo)
		},
		userLogoutAction(context) {
			context.commit('userLogout')
		}
	}
})
export default store
