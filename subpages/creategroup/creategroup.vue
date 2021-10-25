<template>
	<view class="wrap">
		<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="小组名字" prop="form.gname" label-width="150">
				<u-input type="text" :border="border" placeholder="请填写小组名" v-model="form.gname"/>
			</u-form-item>
			<u-form-item class="" :label-position="labelPosition" label="打卡类别" prop="form.clockType">
				<u-radio-group v-model="form.clockType" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
						:disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">创建打卡小组</u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		onLoad() {
			this.getList()
			console.log(this.form.clockType)
			console.log(this.list)
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		data() {
			return {
				list: [],
				form: {
					gname: '',
					dimg: '',
					clockType: '学习',
				},
				action: 'http://localhost:1013/user/imgStr',
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
				let res = this.$u.api.userAddGroup({
					"gname": this.form.gname,
					"clocktype" : this.clockType,
				})
			
				this.$u.api.userJoinGroup({
					"gid" : 'sd',
					"uid" : uid
				})
				this.$refs.uToast.show({
					title: '创建小组成功',
					type: 'success',
					url: '/pages/group/group',
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
