<template>
	<view class="wrap">
		<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="上传图片" prop="form.dimg" >
				<u-upload width="160" height="160" :action="action" ref="uUpload" label-width="150" :max-size="500 * 1024" max-count="1"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="打卡体会" prop="form.dconcern" label-width="150">
				<u-input type="textarea" :border="border" placeholder="请填写体会" v-model="form.dconcern" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="打卡类别" prop="form.clockType">
				<u-radio-group v-model="form.clockType" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
						:disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">打卡并发布动态</u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		onLoad(params) {
			this.getList()
			console.log(params.index)
			console.log(this.list[params.index])
			this.form.clockType = this.list[params.index].name
			console.log(this.form.clockType)
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		data() {
			return {
				form: {
					dconcern: '',
					dimg: '',
					clockType: '学习',
				},
				action: 'http://localhost:1013/user/imgStr',
				list: [],
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				console.log(e)
				// this.clockType = 
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// this.result = e;
				//console.log(e);
			},

			async submit() {
				let uid = uni.getStorageSync('uid')
				// let tid = 
				let files = [] 
				files = await this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				let dimg = files[0].file.path
				let res = this.$u.api.addUserDynamic({
					"dconcern" : this.form.dconcern,
					"dimg": dimg,
					"uid" : uid,
				})
				this.$refs.uToast.show({
					title: '打卡成功',
					type:'success',
					url: '/pages/index/index',
					isTab: true,
					duration: 2500,
				})
			},
			getList() {
				this.list = [
					{
						name: '早起',
						tid: '1',
						disabled: false
					},
					{
						name: '学习',
						tid: '2',
						disabled: false
					},
					{
						name: '早睡',
						tid: '3',
						disabled: false
					},
					{
						name: '运动',
						tid: '4',
						disabled: false
					},
					{
						name: '读书',
						tid: '5',
						disabled: false
					},
					{
						name: '禁x',
						tid: '6',
						disabled: false
					},
					{
						name: '练字',
						tid: '7',
						disabled: false
					},
					{
						name: '其他',
						tid: '8',
						disabled: false
					},
				]
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
