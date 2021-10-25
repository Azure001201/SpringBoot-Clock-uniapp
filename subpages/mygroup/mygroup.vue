<template>
	<view class="groups">
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
		},
		data() {
			return {
				groupsList: [],
				options: [
					{
						text: '打卡',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text:'退出小组',
						style:{
							backgroundColor: '#ff0000'
						}
					}
				]
			}
		},
		computed: {
			...mapState(['loginState', 'userInfo'])
		},
		methods: {
			async getGroups() {
				let uid = uni.getStorageSync('uid')
				let res = await this.$u.api.selectMyGroups({'uid':uid})
				this.groupsList = res.data
				console.log(this.groupsList)
			},
			click(index,index1) {
				let uid = uni.getStorageSync('uid')
				let gid = this.groupsList[index].gid
				if(index1 == 1){
					let res = this.$u.api.userQuitGroup({
						'uid': uid,
						'gid':gid
					})
					this.$refs.uToast.show({
						title: '成功退出该小组',
						type:'success',
						url: '/subpages/mygroup/mygroup',
						isTab: false,
						duration: 2500,
					})
				}else {
					console.log(this.groupsList)
					if(this.groupsList[index].uclockstate!=0){
						this.$refs.uToast.show({
							title: '今天已经打过卡了哦',
							type:'error',
							duration: 2500,
						})
					}else{
						let res = this.$u.api.userGroupClock({
							'uid':uid,
							'gid':gid
						})
						if(res.code = 200){
							this.$refs.uToast.show({
								title: '打卡成功',
								type:'success',
								duration: 2500,
							})
						}
					}
				}
			},
		}
	};
</script>

<style scoped lang="scss">
	.groups {
		
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
