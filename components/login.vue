<template>
	<view class="login" :class="{show:show}">
		<view class="mask" @tap="closeLogin" bind:tap="cancel" catch:touchmove="emptyHandler"></view>
		<view class="container">

			<view class="close-box" @tap="closeLogin" bind:tap="cancel">
				<u-icon name="close"></u-icon>
			</view>

			<view class="p-name" v-if="!getUserInfoTag">
				欢迎使用星星打卡
			</view>

			<button class="submit-btn" open-type="getUserInfo" @getuserinfo="getWechatUserInfo" v-if="!getUserInfoTag">
				<text class="iconfont icon-wechat">点击获取微信用户信息</text>
			</button>

			<u-form :model="form" ref="uForm" v-show="getUserInfoTag">
				<u-form-item label="用户名" prop="name" label-width="150" required v-if="loginType !== 'pwlogin'">
					<u-input v-model="form.name" placeholder='输入用户名/昵称' />
				</u-form-item>
				<u-form-item label="账号" prop="account" label-width="150" required>
					<u-input v-model="form.account" placeholder='输入账号' />
				</u-form-item>
				<u-form-item label="密码" label-width="150" required prop="password">
					<u-input v-model="form.password" type="password" placeholder='限4-20个字符,区分大小写' />
				</u-form-item>
				<u-form-item label="重复密码" required label-width="150" prop="repassword" v-if="loginType !== 'pwlogin'">
					<u-input v-model="form.repassword" type="password" placeholder='再次输入密码' />
				</u-form-item>
				<view class="btns">
					<u-button class="ubtn" @click="submit">提交</u-button>
					<u-button class="ubtn" @click="cancel">取消</u-button>
				</view>
				<view class="type">
					<u-subsection active-color="#007cba" font-size="20" height="52" :list="subsectionList" :current="0"
						@change="sectionChange"></u-subsection>
				</view>
			</u-form>

			<view class="serve-info">点击登录/注册星星打卡</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				show: true,
				getUserInfoTag: false,
				// 登陆方式
				loginType: 'pwlogin',
				// 登陆方式选择器
				subsectionList: [{
						name: '登陆'
					},
					{
						name: '注册'
					},
				],
				// 用户信息输入框
				form: {
					account: '',
					uavg: '',
					name: '',
					password: '',
					repassword: ''
				},
				// 用户登录校验规则
				rules: {
					// 密码登陆账号校验
					login: [{
						validator: (rule, value, callback) => {
							// 只有在 密码登陆 的情况下才需要进行前端规则校验
							if (this.loginType === 'pwlogin') {
								return !this.$u.test.isEmpty(value)
							} else {
								return true
							}
						},
						message: '必填 * 输入内容不许为空',
						trigger: ['change', 'blur'],
					}],

					// 密码验证
					password: [{
						validator: (rule, value, callback) => {
							// 除了 手机验证码登陆 其他均需要验证
							return true
						},
						message: '必填  * 请输入 4-20 位密码',
						trigger: ['change', 'blur'],
					}],
					repassword: [{
						validator: (rule, value, callback) => {
							return this.form.password === value
						},
						message: '必填 * 两次密码输入不一致',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		// 应用校验规则
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		created() {
			wx.getSetting({
				success: res => {
					if (!res.authSetting["scope.userInfo"]) {
						uni.getUserInfo({
							success: res => {
								this.getUserInfoTag = true
								this.form.name = res.userInfo.nickName
								this.form.uavg = res.userInfo.avatarUrl
							},
							fail: () => {
								console.log('用户未授权！')
							}
						})
					}
				}
			})
		},
		methods: {
			...mapActions(['userLoginAction', 'userLogoutAction']),
			// 关闭弹窗
			closeLogin() {
				this.show = false
			},
			openLogin() {
				this.show = true
			},
			// 跳转页面
			gotoWeb(url) {
				wx.navigateTo({
					url: '/pages/webview/webview?url=' + encodeURI(url)
				})
			},
			// 微信授权
			getWechatUserInfo() {	
				uni.getUserInfo({
					success: res => {
						console.log(res)
						this.getUserInfoTag = true
						this.form.name = res.userInfo.nickName
						this.form.uavg = res.userInfo.avatarUrl
					},
					fail: () => {
						console.log('用户未授权！')
					}
				})
			},
			async submit() {
				this.$refs.uForm.validate(async valid => {
					if (!valid) {
						uni.showToast({
							title: '输入格式有误，请重新检查',
							icon: 'none'
						})
						return false
					}
					if (this.loginType === "pwlogin") {
						let res = await this.$u.api.userLogin({
							"account": this.form.account,
							"password": this.form.password
						})
						if (res.code === 200) {
							console.log(res.data.id)
							let uid = res.data.id
							uni.setStorageSync('uid', uid)
							// 登陆成功
							this.show = false
							let name = this.form.name
							let loginInfo = {
								name,
								uavg: this.form.avatar,
							}
							this.userLoginAction(loginInfo)
							uni.$emit('meUserLogin')
						} else {
							uni.showModal({
								title: '登陆失败',
								content: res.data.message
							})
						}
					} else {
						let resa = await this.$u.api.userRegister({
							"account": this.form.account,
							"password": this.form.password,
							"role": 1,
							"id": 1
						})
						console.log(resa)
						if (resa.code === 200) {
							// 注册成功
							uni.showModal({
								title: '注册成功'
							})
							this.sectionChange()
							this.loginType = "pwlogin"
						} else {
							uni.showModal({
								title: '注册失败',
								content: resa.data.message
							})
						}
					}

				});

			},
			// 取消表单输入
			cancel() {
				this.form = {
					account: '',
					name: '',
					password: '',
					repassword: ''
				}
			},
			// 更改 登陆 注册 方式选择
			sectionChange(index) {
				switch (index) {
					case 0:
						this.loginType = "pwlogin";
						break;
					case 1:
						this.loginType = "register";
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.login {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
		opacity: 0;
		transition: opacity 300, z-index 0 300;
		pointer-events: none;
		z-index: 99999999999;

		&.show {
			z-index: 9999;
			opacity: 1;
			pointer-events: auto;
		}

		.mask {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.3);
		}

		.container {
			z-index: 999;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 40upx 20upx;
			background-color: #f1f1f1;
			border-radius: 20upx;
			align-items: center;
			position: relative;

			.p-name {
				margin-top: 48upx;
				font-size: 36upx;
				font-weight: normal;
			}

			.close-box {
				position: absolute;
				right: 32upx;
				top: 38upx;
				width: 56.56upx;
				height: 56.56upx;
				padding: 10upx;

				.close-img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28upx;

			.logo-wrap {
				width: 144upx;
				height: 144upx;
				overflow: hidden;
				border-radius: 20upx;
			}

			.logo {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			color: #333;
		}

		.submit-btn {
			width: 642upx;
			height: 88upx;
			margin-top: 60upx;
			margin-bottom: 60upx;
			border-radius: 44upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: #fff;
			background-color: #0046f5;
			font-size: 36upx;

			.wechat-img {
				width: 44upx;
				height: 34upx;
				margin: 0 18upx;
			}
		}

		.phone-login {
			color: #0046f5;
			font-size: 28upx;
			margin-top: 40upx;
			border: none;
			background-color: #f1f1f1;
		}

		.cancel-btn {
			width: 100%;
			margin-top: 60upx;
			color: #333;
			background-color: #f1f1f1;
		}

		.serve-info {
			font-size: 22upx;
			margin-top: 20upx;
		}

		.serve-text {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 22upx;
			color: #6079b8;
			margin-top: 10upx;
		}
	}

	button::after {
		border: none;
	}

	.btns {
		margin-top: 20upx;
		text-align: center;

		.ubtn {
			display: inline-block;
			margin: 0 20upx;
		}
	}

	.type {
		margin-top: 80upx;
	}
</style>
