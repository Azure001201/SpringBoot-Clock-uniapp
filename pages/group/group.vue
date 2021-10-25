<template>
	<view class="groups">
		<!-- 搜索 -->
		<u-search placeholder="请输入小组名" v-model="gname" @search="search"></u-search>
		<navigator class="item u-border-bottom" :url="'/subpages/creategroup/creategroup'">
			<image mode="aspectFill" src="../../static/group_logo.png" />
			<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
			<view class="title-wrap">
				<text class="title u-line-2">点击创建一个小组吧</text>
			</view>
		</navigator>
		<u-swipe-action :index="index" v-for="(i, index) in groupsList" :key="i.gid" @click="click" :options="options">
			<view class="item u-border-bottom">
				<image mode="aspectFill" src="../../static/group_logo.png" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">小组：{{ i.gname }}</text>
				</view>
			</view>
		</u-swipe-action>
		<u-toast ref="uToast"></u-toast>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		onLoad() {
			this.getGroups()
			if (this.gname!='') this.search()
		},
		data() {
			return {
				gname: '',
				groupsList: [],
				isrepect: false,
				options: [{
					text: '加入该小组',
					style: {
						backgroundColor: '#007aff'
					}
				}]
			}
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		methods: {
			async getGroups() {
				let res = await this.$u.api.selectAllGroups()
				console.log(res.data)
				this.groupsList = res.data
			},
			// create
			async click(index, data) {
				let uid = uni.getStorageSync('uid')
				// console.log(uid)
				let gid = this.groupsList[index].gid
				// console.log(gid)
				console.log(this.groupsList)
				let resa = await this.$u.api.selectMyGroups({'uid':uid})
				for(let i = 0;i<resa.data.length;i++){
					if(resa.data[i].gid = gid){
						console.log(resa.data[i].gid)
						this.$refs.uToast.show({
							title:'你已经加入该小组，不能重复加入',
							type:'error'
						})
						this.isrepect = true;
						break;
					}
				}
				if(this.isrepect!=true){
					let res = this.$u.api.userJoinGroup({
						'uid': uid,
						'gid':gid
					})
					this.$refs.uToast.show({
						title: '成功加入小组',
						type:'success',
						url: '/pages/me/me',
						isTab: true,
						duration: 2500,
					})
					console.log(res)
				}
			},
			async search(value) {
				// console.log(value)
				let res = await this.$u.api.selectByGroupName({
					"gname": value
				})
				console.log(res)
				this.groupsList = res.data
			},
		}
	};
</script>

<style scoped lang="scss">
	.groups {
		margin-top: 75rpx;
	}

	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.search {
		margin-top: 50rpx;
	}
</style>
